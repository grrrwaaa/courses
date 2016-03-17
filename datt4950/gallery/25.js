title = "Not So Natural Selection"
author = "Jeffrey Kwan"

// changing these parameters can strongly affect emergent behaviour
var max_speed = 0.007; //was  0.004
var max_force = 0.0008; //was 0.0002 how far they stay away from the obstacles
var centering_factor = 0.001;
var avoidance_factor = 50;
var agent_optimal_distance = 0.004;
var agent_range_of_view = 0.05;
var agent_field_of_view = 2.5;
var random_walk_variance = 0.5;
// our agents:
var agents = [];
// some obstacles:
var obstacles = [];

function make_agent() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * max_speed),
    acceleration: new vec2(),
    size: (random() + 1) / 160 //was 160
  };
  agents.push(a);
  return a;
}
// make a few agents:
for (var i = 0; i < 100; i++) make_agent();

// make obstacles:
function make_obstacle() {
  var p = {
    pos: new vec2(random(), random()),
    vel: vec2.random(1),
    acceleration: new vec2(), //added this to make obj move
    size: (random() + 1) * 0.05
  };
  obstacles.push(p);
  return p;
}
for (var i = 0; i < 12; i++) make_obstacle();

function move_agent(a) {
  // forward Euler integration + constraints
  a.vel.add(a.acceleration).limit(max_speed);
  a.pos.add(a.vel).wrap(1);
}

function move_obstacle(p) {

  // deviate acceleration:
  p.acceleration.add(vec2.random(0.3))
    .normalize();

  // forward Euler integration + constraints
  p.vel.add(p.acceleration).limit(max_speed * 0.5);
  p.pos.add(p.vel).wrap(1);
}

function update_agent(a) {
  // we will compute a desired velocity
  // intially, a simple random walker
  // (take current velocity and rotate it slightly)
  var desired_velocity = a.vel.clone()
    .rotate(random_walk_variance * (random() - 0.5))
    .setmag(max_speed * random());

  var dir = a.vel.angle(); // useful to know our direction:

  var neighbours = 0; // information to gather about visible neighbors:
  // these are for the three steering forces:
  var neighbour_locations = new vec2();
  var neighbour_velocities = new vec2();
  var neighbour_avoidances = new vec2();

  // check for visible neighbours:
  // (might not be the most optimal, but it is simple):
  for (var n of agents) {
    if (n == a) continue; // don't count yourself!

    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = n.pos.clone().sub(a.pos);
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1); // 1 is the size of our world    
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
      // are we likely to collide?
      // compute from where we are *going* to be
      var npos1 = n.pos.clone().add(n.vel);
      var apos1 = a.pos.clone().add(a.vel);
      var rel1 = npos1.sub(apos1);
      rel1.relativewrap(1);
      var distance1 = Math.max(rel1.len() - a.size - n.size, 0);
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance1 - agent_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling / agent_optimal_distance;
        neighbour_avoidances.add(rel1.clone().setmag(normalized));
      }
    }
  }

  for (var p of obstacles) {
    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = p.pos.clone().sub(a.pos);
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1); // 1 is the size of our world    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - p.size, 0);

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
      // are we likely to collide?
      // compute from where we are *going* to be
      var npos1 = p.pos.clone().add(p.vel);
      var apos1 = a.pos.clone().add(a.vel);
      var rel1 = npos1.sub(apos1);
      rel1.relativewrap(1);
      var distance1 = Math.max(rel1.len() - a.size - p.size, 0);
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance1 - agent_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling / agent_optimal_distance;
        neighbour_avoidances.add(rel1.clone().setmag(normalized));
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
    // apply to desired velocity
    // (note avoidance is subtracted, as a repulsion):
    desired_velocity
      .add(neighbour_locations)
      .add(neighbour_velocities);
  }

  // avoidances can happen even without neighbours (obstacles)
  neighbour_avoidances.mul(avoidance_factor);
  desired_velocity.add(neighbour_avoidances);

  // to convert desired_velocity into a steering force,
  // need to subtract current velocity
  a.acceleration = desired_velocity.sub(a.vel);
  // apply constraints:
  a.acceleration.limit(max_force);
}

function update() {
  for (var p of obstacles) {
    move_obstacle(p);
  }
  // to separate passes to prevent artefacts 
  // (similar to double-buffering)
  for (var a of agents) {
    update_agent(a);
  }
  for (var a of agents) {
    move_agent(a);
  }

  // death by collision:
  for (var p of obstacles) {
    for (var i=agents.length-1; i >= 0; i--) {
      var a = agents[i];
      // collide if distance between is less than their radii:
      if (p.pos.distance(a.pos) < (p.size + a.size)/2) {
        // remove agent
        agents.splice(i, 1);
      }
    }
  }
}

function draw() {
  //var ten = 10;
  //var five = 5;
  draw2D.color("red");
  for (var p of obstacles) {
    draw2D.circle(p.pos, p.size);
  }
  for (var a of agents) {
    // push into agent's local coordinate system
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // draw agent body:

    draw2D.color(a.sees_neighbours ? "green" : "white");

    draw2D.rect();
    // draw agent eyes:
    draw2D.color("white");
    draw2D.circle([0.5, 0.5], 0.5);
    draw2D.circle([0.5, -0.5], 0.5);
    // done drawing agent:
    draw2D.pop();
  }
}

// click to add more agents:
function mouse(e, pt) {
  if (e == "down") {
    var a = make_agent();
    a.pos.set(pt);
  }
}