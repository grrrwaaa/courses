title = "Homocromaticity"
author = "Daniel James"

max_speed = 0.002;
max_acceleration = 0.0002;
agent_range_of_view = 0.023;
personal_space = 0.0075;

centering_factor = 0.01;
flow_factor = 0.1;
avoidance_factor = 1;
eating = 0.01;

// background colour
var red = 0;
var green = 0;
var blue = 0;

diffusion_rate = 0.01;

background = new field2D(64);

background.diffuse(background.clone(),100, 50);

background.normalize();
background_past = background.clone();

agents = [];

for (var i = 0; i < 100; i++) {
  var num = random();
  var strength;
  
  // half of the agents eat the environment, half add to it
  if (num > 0.6) {
    strength = 0.05;
  }
  else {
    strength = -0.06;
  }
  
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(max_speed), // velocity
    acc: new vec2(), // acceleration
    size:  0.01 * (random() + 0.8),
    // sensing:
    neighbours_count: 0,
    attractions: new vec2(), // center of attraction
    flows: new vec2(), // average velocity of neighbours
    avoidances: new vec2(), // sum of vectors to avoid collisions
    r: random(),
    g: random(),
    b: random(),
    eating_strength: strength,
    //
  };
  agents.push(a);
}

// to calculate the average colour between all agents
var r_sum = 0;
var g_sum = 0;
var b_sum = 0;
var agent_sum = 0;

function update() {
  
  var tmp = background_past;
  background_past = background;
  background = tmp;
  
  background.diffuse(background_past, diffusion_rate);
  
  r_sum = 0;
  g_sum = 0;
  b_sum = 0;
  agent_sum = 0;
  
  // sensing (of other agents)
  for (var a of agents) {
    
    // reset sensing state:
    a.neighbours_count = 0;
    a.attractions.set(0, 0);
    a.flows.set(0, 0);
    a.avoidances.set(0, 0);
    
    // count up average colour
    r_sum += a.r;
    g_sum += a.g;
    b_sum += a.b;
    agent_sum++;
    
    // either remove from the environment or add to it
    background.deposit(a.eating_strength * (a.size * 50), a.pos);
    
    // check each possible neighbour:
    for (var n of agents) {
      if (a == n) continue; // don't count self as a neighbour
      
      a.size = Math.min(a.neighbours_count * 0.01 + random() * 0.005, 0.15);
      
      // get relative vector from a to n:
      var rel = n.pos.clone().sub(a.pos);
      // pick the shortest vector in toroidal space
      rel.relativewrap(1); 
      // get distance between bodies (never be negative)
      var distance = Math.max(rel.len() - a.size - n.size, 0);
      // skip neighbours that are too far away:
      if (distance > agent_range_of_view) continue;
      // we can sense a neighbour:
      a.neighbours_count++; // add a neighbour to our sensed count
      // accumulate neighbour (relative) positions to attractions:
      a.attractions.add(rel);
      // accumulate neighbour velocities:
      a.flows.add(n.vel);
      // accumulate avoidances:
      // base this on where we are going to be next:
      var future_rel = n.pos.clone().add(n.vel)
        .sub(a.pos.clone().add(a.vel));
      future_rel.relativewrap(1); // for toroidal space
      
      var future_distance = Math.max(future_rel.len() - a.size - n.size, 0);
      if (future_distance < personal_space) {
        var mag = 1 - (future_distance / personal_space);
        var avoid = future_rel.clone().scale(-mag);
        a.avoidances.add(avoid);
        
        // take the colour of your neighbour
        a.r = n.r;
        a.g = n.g;
        a.b = n.b;
      }
    }
  }
  
  // thinking (i.e. calculate steering force)
  for (var a of agents) {
    var desired_velocity = a.vel.clone();
    
    desired_velocity.rotate(srandom() * 0.5)
    
    if (a.neighbours_count > 0) {
      // cohesion (move to center)
      // compute the average relative vector to all neighbours:
      a.attractions.div(a.neighbours_count).scale(centering_factor);
      // alignment (move in same direction)
      // compute average velocity of all neighbours:
      a.flows.div(a.neighbours_count).scale(flow_factor);
      // avoidance (avoid collision)
      a.avoidances.scale(avoidance_factor);
      
      desired_velocity
        .add(a.attractions)
        .add(a.flows);
    }
    
    desired_velocity.add(a.avoidances);
    
    // use the desired velocity to compute the steering force:
    // (i.e. the acceleration)
    // and also constrain it
    a.acc = desired_velocity.sub(a.vel)
      .limit(max_acceleration);
  }
  // action (moving)
  for (var a of agents) {
    // increment velocity by acceleration
    // and constrain to limits:
    a.vel.add(a.acc).limit(max_speed);
    // increment position by velocity
    // and constrain to world
    a.pos.add(a.vel).wrap(1);
  }
  red = r_sum / agent_sum;
  green = g_sum / agent_sum;
  blue = b_sum / agent_sum;
}

function draw() {
  
  draw2D.color(red, green, blue);
  background.draw();
  
  // draw all the agents:
  for (var a of agents) {
    // go into agent's local coordinate system
    draw2D.push()
      .translate(a.pos)
      .rotate(a.vel.angle())
      .scale(a.size);
    
    // draw agent body
    draw2D.color(a.r, a.g, a.b);
    draw2D.circle([0.1, 0]);
    
    // eye colour
    draw2D.color(red, green, blue);
    draw2D.circle([0.2, 0], 0.6);
    
    // white part of eye
    draw2D.color(1,1,1);
    draw2D.circle([0.25, 0], 0.6);
    
    draw2D.color(red * 0.8, green * 0.8, blue * 0.8);
    draw2D.circle([0.28, 0], 0.5);
    
    draw2D.pop();
  }
}

var mousepos = new vec2();

function mouse(event, pos) {
  
  mousepos.set(pos);
  
  // randomize 
  if (event == "down") {
    for (var a of agents) {
      a.r = random();
      a.g = random();
      a.b = random();
    }
  }
}