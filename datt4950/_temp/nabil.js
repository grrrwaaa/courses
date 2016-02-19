// create a field of sugar concentrations
var sugar = new field2D(128);
var sugar_old = sugar.clone();

var phero_food = sugar.clone();
var phero_food_old = phero_food.clone();
var phero_nest = sugar.clone();
var phero_nest_old = phero_nest.clone();

var phero_diffuse = 0.01;
var phero_decay = 0.99;

var signal_decay = 0.001;

var nest = new vec2(.03, .03);
var nest_radius = 0.03;

var sensor_size = 0.5;
var sensor_noise = 0.01;

//ANTelopes Stats - change for different results
var antelopeSpeed = 0.002;
var antelopeFlee = 1 / 100;
var numOfANT = 50;
var energyfromFood = 0.75;
var antelopeDead = 0.005;
var antelopeBirth = 1.5;

//Lions Stats - change for different results
var lionSpeed = 1 / 300;
var lionChase = 1 / 70;
var lionStamina = 0.5;
var lionDead = 0.003;
var lionEnergyGainRate = 0.2;

//change for different results
var energyDecay = 0.001;
var highenergyDecay = 0.01;

// prevents lion from being in constant chase mode
var chaseCooldown;

var target = new vec2();
var target2 = new vec2();
//Thresholds for chase and kill - change for different results
var chase_threshold = 0.2;
var kill_threshold = 0.02;

// fill it:
function reset_sugar() {
  // clear it:
  sugar.set(0);
  // add some randomized points:
  for (var i = 0; i < 10; i++) {
    var p = vec2.random(0.8).add(1).mul(0.5);
    sugar.deposit(random(8), p);
  }
  // blur it
  sugar.diffuse(sugar.clone(), sugar.width, 150);
  // fit to 0..1 range
  sugar.normalize();
  // threshold it:
  sugar.map(function(v) {
    return v > 0.1 ? 1 : 0;
  });
}
reset_sugar();

var ANTelope = [];
for (var i = 0; i < numOfANT; i++) {
  ANTelope.push({
    pos: nest.clone(),
    vel: vec2.random(0.001),
    size: 0.01,
    // internal states:
    has_food: false,
    signal: 1,
    flee: false,
    steering: new vec2(),
    // clipping:
    max_force: 1 / 2000,
    max_speed: antelopeFlee,
    energy: 1,
    eating: false,
  });
}

var lion = {
  //start lion in the center
  pos: new vec2(0.5, 0.5),
  //state variable for chasing
  chase: false,
  vel: vec2.random(0.001),
  size: 0.02,
  steering: new vec2(),
  // for random walk, current turning tendency
  wander: vec2.random(),

  max_force: 1 / 2000,
  max_speed: 1 / 300,
  //chase mode stats
  chase_speed: lionChase,
  chase_meter: lionStamina,
  dead: false,
  energy: 1,
  chase_cooldown: 2,
};

//Basic Locomotion not restricted to the Lion
function locomotion(lion) {
  var force = lion.steering.limit(lion.max_force);
  var acceleration = force;
  lion.vel.add(acceleration);
  lion.pos.add(lion.vel);
  lion.pos.wrap(1);
}

//Hunting function for Lion
function steering_hunt(lion) {
  lion.wander.add(vec2.random(0.5)).len(0.5);
  var desired_velocity = lion.vel.clone().len(0.5).add(lion.wander);
  desired_velocity.limit(lion.max_speed);
  lion.steering = desired_velocity.sub(lion.vel);
  lion.energy -= lion.energy * energyDecay;

}
//Chasing function for Lion
function steering_chase(lion, target) {
  var rel = target.clone().sub(lion.pos);
  rel.relativewrap(1);
  var desired_velocity = rel.limit(lion.chase_speed * (1 + lion.energy));
  lion.steering = desired_velocity.sub(lion.vel);
  lion.energy -= lion.energy * highenergyDecay;

}

//Fleeing function for ANTelopes
function steering_flee(a, target) {
  var rel = target.clone().sub(a.pos);
  rel.relativewrap(1);
  desired_velocity = rel.limit(a.max_speed * (1 + a.energy));
  desired_velocity.negate();
  a.steering = desired_velocity.sub(a.vel);
  a.energy -= a.energy * highenergyDecay;

}
chaseCooldown = lion.chase_cooldown; // Gives lion time before chase

function update() {

  // update field:
  var tmp = phero_food_old;
  phero_food_old = phero_food;
  phero_food = tmp;
  // diffuse it:
  phero_food.diffuse(phero_food_old, phero_diffuse).mul(phero_decay);

  // update field:
  var tmp = phero_nest_old;
  phero_nest_old = phero_nest;
  phero_nest = tmp;
  // diffuse it:
  phero_nest.diffuse(phero_nest_old, phero_diffuse).mul(phero_decay);
  var i = ANTelope.length;
  // Updates for Antelopes 
  while (i--) {
    var a = ANTelope[i];
    if (a.energy <= antelopeDead) {
      var index = ANTelope.indexOf(a);
      if (index > -1) {
        ANTelope.splice(index, 1);
      }
    } else if (a.energy >= antelopeBirth) {
      //Give Birth to child
      ANTelope.push({
        pos: a.pos.clone(),
        vel: vec2.random(0.001),
        size: 0.01,
        // internal states:
        has_food: false,
        signal: 1,
        flee: false,
        steering: new vec2(),
        // clipping:
        max_force: 1 / 2000,
        max_speed: antelopeFlee,
        energy: a.energy / 2,
        eating: false,
      });
      console.log("Birth!");
      a.energy = a.energy / 2;
    }
    var dir = a.vel.angle();
    // get sensor location:
    var s1 = new vec2(sensor_size, sensor_size).mul(a.size).rotate(dir).add(a.pos);
    var s2 = new vec2(sensor_size, -sensor_size).mul(a.size).rotate(dir).add(a.pos);

    var steer = srandom() * 0.5;
    //Fleeing?
    if (a.flee) {
      steering_flee(a, lion.pos);
      locomotion(a);
    } else {
      if (a.has_food) {
        // trail:
        if (a.signal > 0) phero_food.deposit(a.signal, a.pos);

        //Has eaten?
        if (a.eating == false) {
          a.energy += energyfromFood;
          a.eating = true;
        } else {
          a.energy -= a.energy * energyDecay;
        }

        // arrive?
        var atnest = a.pos.distance(nest) < nest_radius;
        if (atnest) {
          a.signal = 1;
          a.has_food = false;
          a.eating = false;
          a.vel.negate();
        }

        var v1 = phero_nest.sample(s1);
        var v2 = phero_nest.sample(s2);
        if (v1 + v2 > sensor_noise) {
          steer = v1 - v2;
        }
      } else if (!a.has_food) {
        a.energy -= a.energy * energyDecay;

        // trail:
        if (a.signal > 0) phero_nest.deposit(a.signal, a.pos);

        // arrive?
        var food = Math.max(0, sugar.sample(a.pos));
        if (food > 0) {
          a.signal = 1;
          sugar.deposit(-food, a.pos);
          a.has_food = true;
          a.vel.negate();

        }

        var v1 = phero_food.sample(s1);
        var v2 = phero_food.sample(s2);
        if (v1 + v2 > sensor_noise) {
          steer = v1 - v2;
        }

      }
      a.vel.rotate(steer).len(antelopeSpeed);
      a.pos.add(a.vel).wrap(1);
    }
    //Check distance to lion

    if (lion.dead == false) {
      var d = a.pos.distance(lion.pos)
      if (d < chase_threshold && chaseCooldown == 0) {
        target = a.pos;
        lion.chase = true;
        a.flee = true;
        // check for Lion kill
        if (d <= kill_threshold) {
          //Remove ANTelope from array
          lion.energy += (a.energy * lionEnergyGainRate);
          console.log("KILL");
          var index = ANTelope.indexOf(a);
          if (index > -1) {
            ANTelope.splice(index, 1);
          }
        }
      } else {
        //reset flee
        a.flee = false;
      }
    }
  }
  // Lion updates
  if (lion.dead == false) {
    if (lion.chase) {
      steering_chase(lion, target);
      lion.chase_meter -= 0.01;
      if (lion.chase_meter < 0) {
        lion.chase = false;
        lion.chase_meter = 1;
        chaseCooldown = lion.chase_cooldown;
      }
    } else {
      steering_hunt(lion);
      chaseCooldown -= 0.01;

      if (chaseCooldown <= 0) {
        chaseCooldown = 0;
      }
    }

    locomotion(lion);
    
  }

  if (lion.energy <= lionDead) { // replace magic number 
    lion.dead = true;
    console.log("Lions dead");
  }

}

function draw() {
  // draw fields
  draw2D.blend(true);
  draw2D.color("blue");
  phero_food.draw();
  draw2D.color("darkred");
  phero_nest.draw();
  draw2D.color("green");
  sugar.draw();
  draw2D.blend(false);
  // draw antelopes
  for (var a of ANTelope) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // body
    draw2D.color("darkred").circle([0.3, 0]).circle([-0.3, 0]);
    // sensor (shows current state by color)
    draw2D.color(a.has_food ? "orange" : "green");
    draw2D.circle([sensor_size, sensor_size], sensor_size);
    draw2D.circle([sensor_size, -sensor_size], sensor_size);
    draw2D.pop();
  }

  // draw Lion
  if (lion.dead == false) {
    draw2D.push().translate(lion.pos).rotate(lion.vel).scale(lion.size);
    draw2D.color("Orange").circle([0.7, 0]).rect();
    draw2D.color("black").circle([1.0, 0], 0.2);
    draw2D.pop()
  }

}