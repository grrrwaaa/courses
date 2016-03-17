title = "Let it Bee"
author = "Sophie Roginsky"

//beehive
var nest = {
  pos: new vec2(0.5, 0.5),
  size: 0.5,
};

//flowers
var flower = [];

function make_flower() {
  var f = {
    pos: new vec2(random(), random()),
    radius: random() / 5,
    amount: 1,
  }
  flower.push(f);
  return f;
}

//generate flowers in one of 4 corners
for (var i = 0; i < 30; i++) {
  var f = make_flower();
  if (f.pos[0] > 0.25 && f.pos[0] < 0.5) f.pos[0] = (f.pos[0] - 0.25);
  if (f.pos[0] > 0.5 && f.pos[0] < 0.75) f.pos[0] = (f.pos[0] + 0.25);
  if (f.pos[1] > 0.25 && f.pos[1] < 0.5) f.pos[1] = (f.pos[1] - 0.25);
  if (f.pos[1] > 0.5 && f.pos[1] < 0.75) f.pos[1] = (f.pos[1] + 0.25);
}

var agents = [];

function make_agent() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    // the current desired steering 
    steering: new vec2(),
    // clipping:
    max_force: 1 / 1500,
    max_speed: 1 / 50,
    size: 1 / 60,
    has_food: false,
    food_amount: 0,
    target: new vec2(),
    //fly in rotation
    rotation: random(),
    direction: random(2),
    //flower to collect from
    patch: random(flower.length)
  }
  agents.push(a);
  return a;

}

for (var i = 0; i < 10; i++) {
  var a = make_agent();
  //set flower as initial target
  a.target = flower[a.patch].pos.clone();
}

//create honeycombs
var combs = [];
for (var x = 0; x < 0.475; x = x + 0.025) {
  for (var y = 0; y < 0.475; y = y + 0.025) {
    combs.push({
      pos: new vec2(0.275 + x, 0.275 + y),
      has_food: false,
      size: 0.025,
      colour: "black",
      full: 0,
      larvae: false,
      larvae_growth: 0
    });
  }
}

function steering_seek(a, target) {
  // we want our velocity to get us 
  // from the current location to the target
  var rel = target.clone().sub(a.pos);
  // for toroidal space:
  //rel.relativewrap(1);
  // but it can't go any faster than our top speed:
  desired_velocity = rel.limit(a.max_speed);
  
  if (a.direction == 1)
    var d = -1;
  else
    d = 1;

  a.steering = desired_velocity.sub(a.vel);
}

function locomotion(a) {
  // interpret steering as a force to get acceleration
  var force = a.steering.limit(a.max_force);
  var acceleration = force; 
  // forward Euler integration & clipping
  a.vel.add(acceleration);
  a.vel.limit(a.max_speed);
  
  //fly in rotation
  a.vel.rotate(a.rotation/10); 
  a.pos.add(a.vel);
  // keep it in-world
 //   a.pos.wrap(1);

}


function update() {

  for (var a of agents) {
    steering_seek(a, a.target);
    locomotion(a);

    var d = a.pos.distance(flower[a.patch].pos);
    //if bee near a flower and doesn't have food
    if (d < (flower[a.patch].radius / 3) && !a.has_food) {
      //slow down
      a.max_speed = 1 / 9000;
      //collect food
      a.food_amount += 0.05;
      //when reach critical mass
      if (a.food_amount >= 1) {
        //has food
        a.has_food = true;
        //speed up back to hive
        a.max_speed = 1 / 50;

        for (c of combs) {
          //check which comb is without food or larvae
          if (!c.has_food && !c.larvae) {
            //set target to that comb
            a.target = c.pos;
            
            steering_seek(a, a.target);
          }
        }
      }
    }
 
    //once reach comb
    for (var c of combs) {
      var d = a.pos.distance(c.pos);
      if (d < c.size && a.has_food && !c.has_food && !c.larvae) {
        a.rotation = 0; 
        //slow down to fill honey
        a.max_speed = 1 / 9000;
        //fill up comb
        c.full += 0.1;
        //when comb full 
        if (c.full >= 1) {
          //comb has honey
          c.has_food = true;
          a.has_food = false;
          a.food_amount = 0;
          //speed up
          a.max_speed = 1 / 50;
          a.rotation = random(); 
          //set target back to flower
          a.target = flower[a.patch].pos.clone();
          steering_seek(a, a.target);
        }
      }
    }
  }

  //random larvae creation
  var birth = random(1000);
  if (birth < 10) {
    combs[random(combs.length)].larvae = true;
  }

  for (var c of combs) {
    //slowly deplete supply of honey 
    if (c.has_food) {
      c.full -= 0.001;
    }
    if (c.full <= 0) {
      c.has_food = false;
    }
  }

}

function draw() {

  //draw flowers
  for (var f of flower) {
    draw2D.push();
    draw2D.color("white").circle(f.pos, f.radius);
    draw2D.color("orange").circle(f.pos, f.radius / 3);
    draw2D.pop();
  }

  //draw hibe
  draw2D.push();
  draw2D.color("gold").rect(nest.pos, nest.size);

  for (var c of combs) {
    draw2D.color(c.has_food ? "orange" : "black").opacity(c.full);
    draw2D.circle(c.pos[0], c.pos[1], c.size);
   
    //grow larvae
    if (c.larvae) {
      draw2D.color("white").circle(c.pos[0], c.pos[1], c.size);
      c.larvae_growth += 0.05;
    }
    if (c.larvae_growth >= 1) {
      c.larvae_growth = 0;
      c.larvae = false;
      var a = make_agent();
      a.pos.set(c.pos.clone());
      a.target = flower[a.patch].pos.clone();
    }
  }
  draw2D.pop();

  //draw bees!
  for (var a of agents) {
    draw2D.push().translate(a.pos)
      .rotate(a.vel).scale(a.size);
    draw2D.push();
    
//carrying food
    if (a.has_food) draw2D.translate(1).scale(0.75).color("orange").opacity(a.food_amount).circle();

    draw2D.pop();
    draw2D.push();
    draw2D.color("gold");
    draw2D.circle();
    draw2D.translate(-0.7).color("black").circle();
    draw2D.translate(-0.71).color("gold").circle();
    draw2D.translate(-0.715).color("black").circle();
    draw2D.pop();
    // done drawing agent
    draw2D.pop();
  }
}

// handle mouse events
function mouse(e, pt) {
  
  //if nearby, ATTACK
  for (var a of agents) {
    if (!a.has_food && a.pos.distance(pt) < 0.2) {
      a.rotation = 0; 
      a.target.set(pt);
      steering_seek(a, a.target);
      
    }
    if (e == "out" && !a.has_food) {
      a.rotation = random(); 
      a.target = flower[a.patch].pos.clone();
      steering_seek(a, a.target);
    }
  }
}
