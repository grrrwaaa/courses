author = "Victor Zohni"
title = "Simple Reynolds Vehicle with a Twist"

// simple vehicle model adapted from http://www.red3d.com/cwr/steer/gdc99/
// create a field of sugar concentrations
var sugar = new field2D(256);
//sugar.set(function() {return random();});
var sugar_old = sugar.clone();

// fill it:
function reset_sugar() {
  // fill with uniform noise
  sugar.set(1);
}
reset_sugar();


var agents = [];

function make_agent() {
  var a = {
    // action:
    sense_range: 0.4, // how far it can see
    // the current desired steering 
    steering: new vec2(),
    wander: vec2.random(),
    // clipping:
    max_force: 1 / 2000,
    max_speed: 1 / 200,
    energy: random(),
    trail:true,
    // physics:
    pos: new vec2(0.1),
    vel: new vec2(),
    // visual properties
    size: 1 / 40,
  };
  agents.push(a);
}
for (var i = 0; i < 1; i++) make_agent();

// the location of interest (moved with mouse)
var target = new vec2(0.8);

var obstacle = {
  pos: new vec2(0.5),
  size: 0.125
};

function mouse(e, p) {
  // click to toggle seek/flee:
  if (e == "down") {
    obstacle.pos.set(p);
    target.set(p);
    // console.log(a.pos);
  } else {}
}

// simple locomotion model
function locomotion(a) {
  // interpret steering as a force to get acceleration
  var force = a.steering.limit(a.max_force);
  var acceleration = force; // divided by mass?
  // forward Euler integration & clipping
  a.vel.add(acceleration);
  a.vel.limit(a.max_speed);
  a.pos.add(a.vel);
  a.pos.wrap(1);
}

// get desired steering to approach a target:
function steering_seek(a, target) {
  // we want our velocity to get us 
  // from the current location to the target
  //a.wander.add(vec2.random(0.5)).len(0.5);
  var rel = target.clone().sub(a.pos);
  // but it can't go any faster than our top speed:
  var desired_velocity = rel.limit(a.max_speed);
  // steering is relative to current velocity
  a.steering = desired_velocity.sub(a.vel);
}

function steering_wander(a) {
  // Reynold's recommendation:
  // random deviations to a stored value
  // constrained to lie on a circle
  a.wander.add(vec2.random(0.5)).len(0.5);
  // put this directly ahead of the agent:
  var desired_velocity = a.vel.clone().len(0.5).add(a.wander);
  // usual stuff:
  desired_velocity.limit(a.max_speed);
  a.steering = desired_velocity.sub(a.vel);
}

var source = {
  pos: new vec2(0.5, 0.5),
  vel: vec2.random(),
};

function update() {

  for (var a of agents) {

    var f = sugar.sample(a.pos);
    // sanity check
    f = Math.max(f, 0);
    // remove from field
    if (a.trail == true){
     sugar.deposit(-f, a.pos);
    }
    // absent: action selection (currently just mouse)  
    // steering calculation
    steering_seek(a, target);
    steering_wander(a);
    // adjust to avoid obstacle:
    // steering_avoid(a, obstacle);
    // turn into motion:

    var attarget = a.pos.distance(obstacle.pos) < obstacle.size;
    if (attarget) {
      // console.log("hit!");
     a.trail = true;
      //drop some sugar in the target's place
      sugar.deposit(obstacle.pos.x, obstacle.pos.y, 1);

      // push into agent coordinate frame
      obstacle.pos.set(random(), random());
      target.set(obstacle.pos);
      if (agents.length < 20) {
        make_agent();
      } else {
        agents.splice(i, Math.floor((Math.random() * 10) + 1));
        //console.log("max agents");
      }
    }

    locomotion(a);
  }
}

function draw() {
  sugar.draw();
  // draw obstacle:
  draw2D.color("grey");
  draw2D.circle(obstacle.pos, obstacle.size);
  // push into agent coordinate frame

  for (var a of agents) {
    draw2D.push().translate(a.pos)
      .rotate(a.vel).scale(a.size);
    // simple body and "eyes"
    draw2D.color("red");
    draw2D.circle();
    draw2D.color("HotPink");
    draw2D.circle([0.4, 0.4], 0.4);
    draw2D.circle([0.4, -0.4], 0.4);
    // done drawing agent
    draw2D.pop();
  }
}