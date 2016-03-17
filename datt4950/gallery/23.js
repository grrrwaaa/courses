title = "Hawk and Starlings";
author = "Will Cook";

/*
A program meant to simulate the active hunting of prey by a hawk, the smaller blue boids are meant to disperse whenever tha hawk is near
and the Hawk (brown boid) is intended to hunt down the little blue ones. However, the success rate for the hawk is 0 to reflect a scenario of endless and constant hunting and chasing (A game of cat and mouse)
*/

//boid parameters
var boidSpeed = 0.004;

//optimal speed ensure hawk never hits it's prey (cat and mouse)
var hawkSpeed = 1 / 140;

//target, relative to the hunter and hunted
var target = new vec2();

//Thresholds for the hanks hunting rage, determines how far the boids will get when they detect a hawk
var hunt_threshold = 0.15;

// changing these parameters can strongly affect emergent behaviour
var max_speed = boidSpeed;
var centering_factor = 0.01;
var alignment_factor = 1;
var avoidance_factor = 1;
var agent_optimal_distance = 0.004;
var agent_range_of_view = 0.04;
var agent_field_of_view = 1.5;
var random_walk_variance = 1;

var boids = [];
for (var i = 0; i < 100; i++) {
  boids.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    size: 0.01,
    flee: false,
    steering: new vec2(),
    max_force: 1 / 5000,
    speed: boidSpeed,
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
  hawk.vel.add(acceleration).limit(hawk.speed);
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

function steering_flock(a) {
  // we will compute a desired velocity
  // intially, a simple random walker
  // (take current velocity and rotate it slightly)
  var desired_velocity = a.vel.clone()
    .rotate(random_walk_variance*(random()-0.5))
    .setmag(max_speed * random());
  
  // useful to know our direction:
	var dir = a.vel.angle();
	
  // information to gather about visible neighbors:
	var neighbours = 0;
  // these are for the three steering forces:
  var neighbour_locations = new vec2();
  var neighbour_velocities = new vec2();
  var neighbour_avoidances = new vec2();
	
  // check for visible neighbours:
  // (might not be the most optimal, but it is simple):
	for (var n of boids) {
		if (n == a) continue;	// don't count yourself!
		
    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = n.pos.clone().sub(a.pos);
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1);    // 1 is the size of our world    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - n.size, 0);
    // is the neighbour close enough to be seen?
    var in_visible_range = distance < agent_range_of_view;    
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < agent_field_of_view;   
    // neighbour seen if within range & field of view:
    if (in_visible_range && in_visible_angle) {
      // yes -- add to count of neighbours
      neighbours++;
      // accumulate relative locations for centering force
      neighbour_locations.add(rel);
      // rotate neighbour velocity into agent's perspective,
      // accumulate for aligning force
      var relative_velocity = n.vel.clone().rotate(-dir);
      neighbour_velocities.add(n.vel);    
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance - agent_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / agent_optimal_distance;
        neighbour_avoidances.add(rel.clone().setmag(normalized));
      }
    }
	}
	
  // did we see anyone?
	a.sees_neighbours = neighbours > 0;
	if (a.sees_neighbours) {
    // convert accumulated information into averages:
    neighbour_locations.div(neighbours);
    neighbour_velocities.div(neighbours);    
    // change factors:
    neighbour_locations.mul(centering_factor);
    neighbour_velocities.mul(alignment_factor);
    neighbour_avoidances.mul(avoidance_factor);   
    // apply to desired velocity
    // (note avoidance is subtracted, as a repulsion):
    desired_velocity
      .add(neighbour_locations)
      .add(neighbour_velocities)
      .add(neighbour_avoidances)
    ;
	}
  // to convert desired_velocity into a steering force,
  // need to subtract current velocity
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
      steering_flock(a);
      locomotion(a);
      //a.vel.rotate(srandom() * 0.5).len(boidSpeed);
      //a.pos.add(a.vel).wrap(1);
    }

    //Boid check distance to Hawk
    var d = a.pos.distance(hawk.pos)
    if (d < 0.02) {
      // eat it!
      a.flee = false;
      a.pos = new vec2(random(), random());
    } else if (d < hunt_threshold) {
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
    draw2D.color("lightblue").triangle([0.7, 0])

    //different colours intended to actively display fear/fleeing behaviours
    if (a.flee) {
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