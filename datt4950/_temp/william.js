/*
A program meant to simulate the active hunting of prey by a hawk, the smaller blue boids are meant to disperse whenever tha hawk is near
and the Hawk (brown boid) is intended to hunt down the little blue ones. However, the success rate for the hawk is 0 to reflect a scenario of endless and constant hunting and chasing (A game of cat and mouse)
*/

//boid parameters
var boidSpeed = 0.002;

//optimal speed ensure hawk never hits it's prey (cat and mouse)
var hawkSpeed = 1 / 140;

//target, relative to the hunter and hunted
var target = new vec2();

//Thresholds for the hanks hunting rage, determines how far the boids will get when they detect a hawk
var hunt_threshold = 0.15;

var boids = [];
for (var i = 0; i < 200; i++) {
  boids.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    size: 0.01,
    flee: false,
    steering: new vec2(),
    max_force: 1 / 2000,
  });
}

var hawk = {
  //start hawk in the center
  pos: new vec2(0.5, 0.5),
  vel: vec2.random(0.001),
  size: 0.02,
  steering: new vec2(),
  max_force: 1 / 2000,
  speed: hawkSpeed,
};

//Basic Locomotion not restricted to the hawk
function locomotion(hawk) {
  var force = hawk.steering.limit(hawk.max_force);
  var acceleration = force;
  hawk.vel.add(acceleration);
  hawk.pos.add(hawk.vel);
  hawk.pos.wrap(1);
}

//This function is needed so le hawk can hunt
function steering_hunt(hawk, target) {
  var rel = target.clone().sub(hawk.pos);
  //make sure they dont
  rel.relativewrap(1);
  var desired_velocity = rel.limit(hawk.speed);
  hawk.steering = desired_velocity.sub(hawk.vel);

}

//Fleeing function for agents
function steering_flee(a, target) {
  var rel = target.clone().sub(a.pos);
  //make sure they dont flee out of the world
  rel.relativewrap(1);
  desired_velocity = rel.limit(a.max_speed);
  desired_velocity.negate();
  a.steering = desired_velocity.sub(a.vel);
}

function update() {
  var i = boids.length;
  
  // Updates for boids (starligns)
  while (i--) {
    var a = boids[i];
    var dir = a.vel.angle();
    
    //Boids Fleeing?
    if (a.flee) {
      steering_flee(a, hawk.pos);
      locomotion(a);
    } else {
      a.vel.rotate(srandom() * 0.5).len(boidSpeed);
      a.pos.add(a.vel).wrap(1);
    }
    
    //Boid check distance to Hawk
      var d = a.pos.distance(hawk.pos)
      if (d < hunt_threshold) {
        target = a.pos;
        a.flee = true;
      } else {
        //reset flee
        a.flee = false;
      }
  }
  //Make the hawk hunt constantly
      steering_hunt(hawk, target);
      locomotion(hawk);
  }

function draw() {
  draw2D.blend(false);
  
  // draw boids or agents or "Starlings"
  for (var a of boids) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // body
    draw2D.color("blue").triangle([0.7, 0])
    
    //different colours intended to actively display fear/fleeing behaviours
    if (a.flee){
      draw2D.color("pink")
    } else {
      draw2D.color("blue")
    }
    draw2D.pop();
  }

  // draw Hawk
    draw2D.push().translate(hawk.pos).rotate(hawk.vel).scale(hawk.size);
    draw2D.color("brown").triangle([0.7, 0]);
    draw2D.pop()
}