title = "Tom and Jerry"
author = "Jennifer Wu"

// Predators are green triangles. They turn orange when they're hunting.
// Prey are blue circles. They turn red when they're running away.

// global variables

// agents/prey
var A_MAX_AGE = 25;
var A_BIRTHRATE = 0.60;
var A_MAX = 100; //70; //10; // max number of agents at a time
var A_MIN = 100; //70; //7; // min number of agents before they start evading hunters
var A_INIT = 80; //50; //5; // initial number of agents
var A_MAXSPEED = 1 / 140; //how fast it runs away

// predators
var P_MAX_AGE = 30;
var P_ENERGYNEEDED = 20; //25; //5; // amount of energy needed to reproduce
var P_ENERGYGAINED = 2; //1; // amount of energy gained from eating
var P_MAX = 70; //70; //10; // max number of predators at a time
var P_MINENERGY = 30; // when energy gets low, predator starts hunting
var P_INIT = 5; //5; // initial number of predators
var P_MAXSPEED = 0.004; // how fast it chases
var P_INITSPEED = 0.003;

var TIME_TO_AGE = 5000;

// create a field of sugar concentrations
var sugar = new field2D(256);
var sugar_old = sugar.clone();

var agentTrail = sugar.clone();
var agentTrail_old = agentTrail.clone();

var nest = new vec2(0.5, 0.5);
var pred = new vec2(0.5, 1);

var trail_diffuse = 0.01;
var trail_decay = 0.93;

// timer
var timer = setInterval(age, TIME_TO_AGE);

function age() {
  for (var a of agents) {
    a.age += 1;
    //console.log(a.age);
  }
  for (var p of predators) {
    p.age += 1;
    p.energy -= 0.5;
  }
}

// fill it:
function reset_sugar() {
  // fill with uniform noise
  sugar.set(0);
}
reset_sugar();

// mouse adds sugar:
function mouse(e, pt) {
  sugar.deposit(10, pt);
}

var agents = [];
var predators = [];
for (var i = 0; i < A_INIT; i++) {
  agents.push({
    pos: nest.clone(),
    vel: vec2.random(0.001),
    size: (random() + 1) / 80,
    // stored recollection of previous sense
    sense_memory: 0.5,
    running: false,

    age: 0
  });
}

for (var i = 0; i < P_INIT; i++) {
  predators.push({
    pos: pred.clone(),
    vel: vec2.random(P_INITSPEED),
    size: 0.03,
    // stored recollection of previous sense
    chasing: false,
    color: "lime",
    sense_memory: 0.5,
    energy: 10,
    age: 0,
  });
}

var source = {
  pos: new vec2(0.5, 0.5),
  vel: vec2.random(),
};

function update() {
  // update field:
  var tmp = sugar_old;
  sugar_old = sugar;
  sugar = tmp;
  //sugar.mul(0.8);
  // diffuse it:
  sugar.diffuse(sugar_old, 0.1).mul(trail_decay);
  // small background noise:
  //sugar.map(function(v) { return v + 0.01*srandom(); });

  // agent trail:
  var tmp = agentTrail_old;
  agentTrail_old = agentTrail;
  agentTrail = tmp;
  agentTrail.diffuse(agentTrail_old, trail_diffuse).mul(trail_decay);

 

  var i = agents.length;
  while (i--) {
    var a = agents[i];

    var index = agents.indexOf(a);

    var j = predators.length;
    while (j--) {
      var p = predators[j];
      if (a.pos.distance(p.pos) < 0.03) { // collide

        //gets eaten

        agents.splice(index, 1);

        p.energy += P_ENERGYGAINED;
        if (p.size < 0.01) {
          p.size += 0.002;
        }
        // console.log(p.energy);

      }

    }

    // death

    if (a.age > A_MAX_AGE) {
      agents.splice(index, 1);
    } else {
      a.running = false;

      // escaping hunters
      if (agents.length <= A_MIN) {
        // find closest predator
        for (var p of predators) {
          if (a.pos.distance(p.pos) < 0.05) {
            a.running = true;
            var rel = p.pos.clone().sub(a.pos);
            rel.relativewrap(1);
            var desired_velocity = rel;
            desired_velocity.limit(1 / 80); //max speed
            desired_velocity.negate(); //run away!

            for (var n of agents) {
              if (a != n) {
                var rel = n.pos.clone().sub(a.pos);
                rel.relativewrap(1);

                var heading = a.vel.angle();
                var relview = rel.clone().rotate(-heading);

                //collide?
                var in_front = relview[0] > 0;
                var in_range = relview[0] < a.view_range;
                var in_path = Math.abs(relview[1]) < (a.size / 2 + n.size / 2);

                if (in_front && in_range && in_path) {
                  // take evasive action!
                  var avoid = new vec2(0, -relview[1]);
                  avoid.rotate(heading);
                  desired_velocity.add(avoid);
                }

              }
            }

            // locomotion:

            // subtract our current velocity //
            var steering = desired_velocity.sub(a.vel);
            // forward Euler integration
            //var steering = vec2.random(0.001);
            var acceleration = steering.limit(1 / 100);
            a.vel.add(acceleration).limit(A_MAXSPEED);
            a.pos.add(a.vel).wrap(1);

          }

        }

      }

      // get the sugar level at this location:
      var sense = sugar.sample(a.pos);
      // sanity: no such thing as a negative intensity:
      sense = Math.max(0, sense);
      // update the field to show that we removed sugar here:
      sugar.deposit(-sense, a.pos);

      agentTrail.deposit(1, a.pos);

      // compare to the previous one:
      var change = sense / a.sense_memory;
      if (change > 1) {
        // getting better
        // forward swimming behavior:
        a.vel
          .rotate(srandom() * 0.1)
          .len(0.005);
      } else {
        // getting worse
        // tumbling behavior:
        a.vel
          .rotate(srandom() * 0.5)
          .len(0.005);
      }
      // remember for the next time:
      a.sense_memory = sense;

      // reproduction
     
      if (random() < A_BIRTHRATE && agents.length < A_MAX) {
        agents.push({
          pos: a.pos.clone(),
          vel: vec2.random(0.001),
          size: (random() + 1) / 80,
          // stored recollection of previous sense
          sense_memory: 0.5,
          running: false,

          age: 0
        });

      }

      // locomotion
      a.pos.add(a.vel).wrap(1);
    }

  }

  var i = predators.length;
  while (i--) {
    var p = predators[i];
    var index = predators.indexOf(p);
    p.chasing = false;
    // if reached max age, die
    if (p.age > P_MAX_AGE || p.energy <= 0) {
      predators.splice(index, 1);
    } else {
      // if predator has enough energy, reproduce
      if (p.energy > P_ENERGYNEEDED && predators.length < P_MAX) {
        predators.push({
          pos: p.pos.clone(),
          vel: vec2.random(P_INITSPEED),
          size: 0.03,
          color: "lime",
          chasing: false,
          sense_memory: 0.5,
          energy: p.energy * 0.5,
          age: 0
        });

        p.energy /= 2;
        //console.log("added pred");
      }

      // hunting
      if (p.energy < P_MINENERGY) {
        // find closest prey from predator
        for (var a of agents) {
          if (a.pos.distance(p.pos) < 0.1) {
            p.chasing = true;
            var rel = a.pos.clone().sub(p.pos);
            rel.relativewrap(1);
            var desired_velocity = rel;
            desired_velocity.limit(1 / 100); //max speed

            for (var n of predators) {
              if (p != n) {
                var rel = n.pos.clone().sub(p.pos);
                rel.relativewrap(1);

                var heading = p.vel.angle();
                var relview = rel.clone().rotate(-heading);

                //collide?
                var in_front = relview[0] > 0;
                var in_range = relview[0] < p.view_range;
                var in_path = Math.abs(relview[1]) < (p.size / 2 + n.size / 2);

                if (in_front && in_range && in_path) {
                  // take evasive action!
                  var avoid = new vec2(0, -relview[1]);
                  avoid.rotate(heading);
                  desired_velocity.add(avoid);
                }

              }
            }

            // locomotion:

            // subtract our current velocity
            var steering = desired_velocity.sub(p.vel);
            // forward Euler integration
           
            var acceleration = steering.limit(1 / 400);
            p.vel.add(acceleration).limit(P_MAXSPEED);
            p.pos.add(p.vel).wrap(1);

          }

        }

      }

      sugar.deposit(2, p.pos);
     
      p.pos.add(p.vel).wrap(1);
    }

  }
}

function draw() {
  // draw field
  draw2D.color("crimson");
  sugar.draw();

  draw2D.blend(true);
  draw2D.color("khaki");
  agentTrail.draw();
  draw2D.blend(false);

  // draw agents
  for (var a of agents) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // body
    draw2D.color("black")
      .circle([0.3, 0]).circle([0.3, 0]);
    // sensor (shows current state by color)
    draw2D.color(a.running ? "red" : "deepskyblue")
    
      .circle([0.3, 0.], 0.7);
    draw2D.pop();
  }

  for (var p of predators) {
    //console.log(p.energy);
    draw2D.push().translate(p.pos).rotate(p.vel).scale(p.size);
    // body
    draw2D.color("black")
      .triangle([0.5, 0]).rect([-0.1, 0], 0.06);
    // sensor (shows current state by color)
    draw2D.color(p.chasing ? "orange" : "lime")
    
      .triangle([0.3, 0], Math.max(0, Math.min((p.energy * 0.1), 0.7)));
    draw2D.pop();
  }
}