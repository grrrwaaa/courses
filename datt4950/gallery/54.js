title = "Colour Psychology"
author = "Benjamin Silverman"

// changing these parameters can strongly affect emergent behaviour:
var max_speed = 0.004;
var max_force = 0.0006;
var centering_factor = 0.01;
var agent_range_of_view = 0.04;
var agent_field_of_view = 1.5;
var random_walk_variance = 1;

// default optimal distance:
var default_optimal_distance = 0.004;

// default max speed:
var default_max_speed = 0.004;

// optimal distance for individual colours:
var red_optimal_distance = 0.4;
var orange_optimal_distance = 0.004;
var yellow_optimal_distance = 0.004;
var green_optimal_distance = 0.004;
var blue_optimal_distance = 0.004;
var purple_optimal_distance = 0.004;
var white_optimal_distance = 0.004;
var black_optimal_distance = 0.004;

// max speed for the ORANGE personality:
var orange_max_speed = 0.001;

// max speed for the GREEN personality:
var green_max_speed = 0.010;

// our agents (i.e the array of our 8 colour personalities):
var agents = [];

// create a field to set the background colour to grey:
var field = new field2D();
field.set(function(x, y) {
  return [0.65, 0.65, 0.65];
});

// function to return an agent with one of the eight colour personality parameter values:
function type_generator(agent) {
  var randomType = random(8);
  // true if the random value is 0 (RED):
  if (randomType == 0) {
    // set the agent type to the RED personality:
    agent.type = "RED";
    // set the agents inner type to RED:
    agent.inner_type = agent.type;
    // set the agents optimal distance to the RED value:
    agent.agent_optimal_distance = red_optimal_distance;
    // set the agents influencial value:
    agent.influence = 50000;
    // true if the random value is 1 (ORANGE):  
  } else if (randomType == 1) {
    // set the agent type to the ORANGE personality:
    agent.type = "ORANGE";
    // set the agents inner type to ORANGE:
    agent.inner_type = agent.type;
    agent.max_speed = orange_max_speed;
    // set the agents optimal distance to the ORANGE value:
    agent.agent_optimal_distance = orange_optimal_distance;
    // true if the random value is 2 (YELLOW):  
  } else if (randomType == 2) {
    // set the agent type to the YELLOW personality:
    agent.type = "YELLOW";
    // set the agents inner type to YELLOW:
    agent.inner_type = agent.type;
    // set the agents optimal distance to the YELLOW value:
    agent.agent_optimal_distance = yellow_optimal_distance;
    // true if the random value is 3 (GREEN):
  } else if (randomType == 3) {
    // set the agent type to the GREEN personality:
    agent.type = "GREEN";
    // set the agents inner type to GREEN:
    agent.inner_type = agent.type;
    // set the agents max speed:
    agent.max_speed = green_max_speed;
    // set the agents optimal distance to the GREEN value:
    agent.agent_optimal_distance = green_optimal_distance;
    // true if the random value is 4 (BLUE):
  } else if (randomType == 4) {
    // set the agent type to the BLUE personality:
    agent.type = "BLUE";
    // set the agents inner type to BLUE:
    agent.inner_type = agent.type;
    // set the agents optimal distance to the BLUE value:
    agent.agent_optimal_distance = blue_optimal_distance;
    // set the agents influencial value:
    agent.influence = 50000;
    // true if the random value is 5 (PURPLE):
  } else if (randomType == 5) {
    // set the agent type to the PURPLE personality:
    agent.type = "PURPLE";
    // set the agents inner type to PURPLE:
    agent.inner_type = agent.type;
    // set the agents optimal distance to the PURPLE value:
    agent.agent_optimal_distance = purple_optimal_distance;
    // true if the random value is 6 (WHITE):
  } else if (randomType == 6) {
    // set the agent type to the WHITE personality:
    agent.type = "WHITE";
    // set the agents inner type to WHITE:
    agent.inner_type = agent.type;
    // set the agents optimal distance to the WHITE value:
    agent.agent_optimal_distance = white_optimal_distance;
    // true if the random value is 7 (BLACK):
  } else if (randomType == 7) {
    // set the agent type to the BLACK personality:
    agent.type = "BLACK";
    // set the agents inner type to BLACK:
    agent.inner_type = agent.type;
    // set the agents optimal distance to the BLACK value:
    agent.agent_optimal_distance = black_optimal_distance;
    // set the agents influencial value:
    agent.influence = 50000;
  }
  return agent;
}

// function to randomly return an agent with one of the eight colour personality parameter values:
function randomInnerType(agent) {
  var randomType = random(8);
  // true if the random value is 0 (RED):
  if (randomType == 0) {
    // set the agents parameters to the RED personality:
    agent.inner_type = "RED";
    agent.agent_optimal_distance = red_optimal_distance;
    agent.influence = 50000;
    agent.max_speed = default_max_speed;
    // true if the random value is 1 (ORANGE):
  } else if (randomType == 1) {
    // set the agents parameters to the ORANGE personality:
    agent.inner_type = "ORANGE";
    agent.max_speed = orange_max_speed;
    agent.agent_optimal_distance = orange_optimal_distance;
    // true if the random value is 2 (YELLOW):
  } else if (randomType == 2) {
    // set the agents parameters to the YELLOW personality:
    agent.inner_type = "YELLOW";
    agent.max_speed = default_max_speed;
    agent.agent_optimal_distance = yellow_optimal_distance;
    // true if the random value is 3 (GREEN):
  } else if (randomType == 3) {
    // set the agents parameters to the GREEN personality:
    agent.inner_type = "GREEN";
    agent.max_speed = green_max_speed;
    agent.agent_optimal_distance = green_optimal_distance;
    // true if the random value is 4 (BLUE):
  } else if (randomType == 4) {
    // set the agents parameters to the BLUE personality:
    agent.inner_type = "BLUE";
    agent.agent_optimal_distance = blue_optimal_distance;
    agent.influence = 50000;
    agent.max_speed = default_max_speed;
    // true if the random value is 5 (PURPLE):
  } else if (randomType == 5) {
    // set the agents parameters to the PURPLE personality:
    agent.max_speed = default_max_speed;
    agent.agent_optimal_distance = purple_optimal_distance;
    // true if the random value is 6 (WHITE):
  } else if (randomType == 6) {
    // set the agents parameters to the WHITE personality:
    agent.inner_type = "WHITE";
    agent.max_speed = default_max_speed;
    agent.agent_optimal_distance = white_optimal_distance;
    // true if the random value is 7 (BLACK):
  } else if (randomType == 7) {
    // set the agents parameters to the BLACK personality:
    agent.inner_type = "BLACK";
    agent.influence = 50000;
    agent.max_speed = default_max_speed;
    agent.agent_optimal_distance = black_optimal_distance;
  }
  return agent;
}

// function to return an agent with its original colour personality parameter values:
function resetPersonality(agent) {
  // true if the agent has the RED personality:
  if (agent.type == "RED") {
    // set the agents parameters to the RED personality:
    agent.inner_type = "RED";
    agent.agent_optimal_distance = red_optimal_distance;
    agent.influence = 50000;
    agent.max_speed = default_max_speed;
    // true if the agent has the ORANGE personality:
  } else if (agent.type == "ORANGE") {
    // set the agents parameters to the ORANGE personality:
    agent.inner_type = "ORANGE";
    agent.max_speed = orange_max_speed;
    agent.agent_optimal_distance = orange_optimal_distance;
    // true if the agent has the YELLOW personality:
  } else if (agent.type == "YELLOW") {
    // set the agents parameters to the YELLOW personality:
    agent.inner_type = "YELLOW";
    agent.max_speed = default_max_speed;
    agent.agent_optimal_distance = yellow_optimal_distance;
    // true if the agent has the GREEN personality:
  } else if (agent.type == "GREEN") {
    // set the agents parameters to the GREEN personality:
    agent.inner_type = "GREEN";
    agent.max_speed = green_max_speed;
    agent.agent_optimal_distance = green_optimal_distance;
    // true if the agent has the BLUE personality:
  } else if (agent.type == "BLUE") {
    // set the agents parameters to the BLUE personality:
    agent.inner_type = "BLUE";
    agent.agent_optimal_distance = blue_optimal_distance;
    agent.influence = 50000;
    agent.max_speed = default_max_speed;
    // true if the agent has the PURPLE personality:
  } else if (agent.type == "PURPLE") {
    // set the agents parameters to the PURPLE personality:
    agent.max_speed = default_max_speed;
    agent.agent_optimal_distance = purple_optimal_distance;
    // true if the agent has the WHITE personality:
  } else if (agent.type == "WHITE") {
    // set the agents parameters to the WHITE personality:
    agent.inner_type = "WHITE";
    agent.max_speed = default_max_speed;
    agent.agent_optimal_distance = white_optimal_distance;
    // true if the agent has the BLACK personality:
  } else if (agent.type == "BLACK") {
    // set the agents parameters to the BLACK personality:
    agent.inner_type = "BLACK";
    agent.influence = 50000;
    agent.max_speed = default_max_speed;
    agent.agent_optimal_distance = black_optimal_distance;
  }
  return agent;
}

// function used to handle the influence the current agent has on its neighbour agent:
function influence(current, neighbour) {
  // true if the current agents has the RED personality:
  if (current.type == "RED") {
    // true if the current agent is influencing and the the neighbour agent does not have a  BLUE or WHITE personality:
    if ((random(current.influence) == 1) && (neighbour.type != "BLUE") && (neighbour.type != "WHITE")) {
      // true if the neighbour agent does not have the PURPLE personality:
      if (neighbour.type != "PURPLE") {
        // the neighbour agents inner personality takes on the current agents outer personality:
        neighbour.inner_type = current.type;
      }
      // set the neighbour agents optimal distance to the RED personality optimal distance: 
      neighbour.agent_optimal_distance = red_optimal_distance;
      // set the neighbour agents max speed to the default max speed:
      neighbour.max_speed = default_max_speed;
    }
    // true if the current agents has the ORANGE personality:
  } else if (current.type == "ORANGE") {
    // true if the current agent is influencing and the the neighbour agent does not have a  BLUE or WHITE personality:
    if ((random(current.influence) == 1) && (neighbour.type != "BLUE") && (neighbour.type != "WHITE")) {
      // true if the neighbour agent does not have the PURPLE personality:
      if (neighbour.type != "PURPLE") {
        // the neighbour agents inner personality takes on the current agents outer personality:
        neighbour.inner_type = current.type;
      }
      // set the neighbour agents optimal distance to the ORANGE personality optimal distance: 
      neighbour.agent_optimal_distance = orange_optimal_distance;
      // set the neighbour agents max speed to the ORANGE personality max speed:
      neighbour.max_speed = orange_max_speed;
    }
    // true if the current agents has the YELLOW personality:
  } else if (current.type == "YELLOW") {
    // the current agent takes on the personality of the neighbour agents personality:
    current.inner_type = neighbour.type;
    // set the current agents optimal distance to the neighbour agents optimal distance:g
    current.agent_optimal_distance = neighbour.agent_optimal_distance;
    // true if the current agents has the GREEN personality:
  } else if (current.type == "GREEN") {
    // true if the current agent is influencing and the the neighbour agent does not have a  BLUE or WHITE personality:
    if ((random(current.influence) == 1) && (neighbour.type != "BLUE") && (neighbour.type != "WHITE")) {
      // true if the neighbour agent does not have the PURPLE personality:
      if (neighbour.type != "PURPLE") {
        // the neighbour agents inner personality takes on the current agents outer personality:
        neighbour.inner_type = current.type;
      }
      // set the neighbour agents optimal distance to the GREEN personality optimal distance: 
      neighbour.agent_optimal_distance = green_optimal_distance;
      // set the neighbour agents max speed to the GREEN personality max speed:
      neighbour.max_speed = green_max_speed;
    }
    // true if the current agents has the BLUE personality:
  } else if (current.type == "BLUE") {
    // true if the current agent is influencing:
    if (random(current.influence) == 1) {
      // reset the neighbour agents personality back to its original:
      neighbour = resetPersonality(neighbour);
    }
    // true if the current agents has the PURPLE personality:
  } else if (current.type == "PURPLE") {
    // the PURPLE personality is mysterious and does not influence...
    // true if the current agents has the WHITE personality:
  } else if (current.type == "WHITE") {
    // the WHITE personality is pure and does not influence others.
    // true if the current agents has the BLACK personality:
  } else if (current.type == "BLACK") {
    // true if the current agent is influencing and the the neighbour agent is not the BLUE personality:
    if ((random(current.influence) == 1) && (neighbour.type != "BLUE")) {
      // randomly set the neighbour agents personality to one of the eight colour personalities:
      neighbour = randomInnerType(neighbour);
    }
  }
  return neighbour;
}

// function used to initialize an agent with one of eight colour personalities:
function make_agent() {
  var a = {
    // agent colour personality type:
    type: "",
    // agent colour personality inner type:
    inner_type: "",
    // random starting position of the agent:
    pos: new vec2(random(), random()),
    // starting velocity of the agent:
    vel: vec2.random(random() * max_speed),
    // defualt agent acceleration factor:
    acceleration: new vec2(),
    // default max speed of the agent:
    max_speed: default_max_speed,
    // random size of the agent:
    size: (random() + 1.5) / 160,
    // default agent alignment factor:
    alignment_factor: 1,
    // default agent avoidance factor:
    avoidance_factor: 1,
    // default agent optimal distance:
    agent_optimal_distance: default_optimal_distance,
    // default agent influence factor:
    influence: 0
  };
  // decides the agents colour personality:
  type_generator(a);
  agents.push(a);
  return a;
}
// make a few agents:
for (var i = 0; i < 160; i++) make_agent();

// move the agents:
function move_agent(a) {
  // forward Euler integration + constraints
  a.vel.add(a.acceleration).limit(a.max_speed);
  a.pos.add(a.vel).wrap(1);
}

// update each agent:
function update_agent(a) {

  // the desired velocity of the agent:
  var desired_velocity = a.vel.clone()
    .rotate(random_walk_variance * (random() - 0.5))
    .setmag(a.max_speed * random());

  // direction of the agent:
  var dir = a.vel.angle();

  // information to gather about visible neighbors:
  var neighbours = 0;

  // these are for the three steering forces:
  var neighbour_locations = new vec2();
  var neighbour_velocities = new vec2();
  var neighbour_avoidances = new vec2();

  // check for visible neighbours:
  for (var n of agents) {
    if (n == a) continue; // don't count yourself!

    // get the (relative) vector to the neighbor from the agent:
    var rel = n.pos.clone().sub(a.pos);

    // find the closest neighbour:
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

      // apply any influence the current agent has on the neighbour agent or vice versa:
      influence(a, n);

      // feel uncomfortable if the neighbour is too close:
      var negative_feeling = Math.min(0, distance - a.agent_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling / a.agent_optimal_distance;
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
    neighbour_velocities.mul(a.alignment_factor);
    neighbour_avoidances.mul(a.avoidance_factor);
    // apply to desired velocity
    desired_velocity
      .add(neighbour_locations)
      .add(neighbour_velocities)
      .add(neighbour_avoidances);
  }

  // to convert desired_velocity into a steering force,
  // need to subtract current velocity
  a.acceleration = desired_velocity.sub(a.vel);
  // apply constraints:
  a.acceleration.limit(max_force);
}

// update agents:
function update() {

  // loop over the array of agents and update them:
  for (var a of agents) {
    update_agent(a);
  }

  // loop over the array of agents and move them:
  for (var a of agents) {
    move_agent(a);
  }
}

// draw all the agents:
function draw() {
  // draw the grey background field:
  field.draw();

  // loop over the agents:
  for (var a of agents) {
    // push into agent's local coordinate system
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // draw the agent body with the agent personality colour:
    draw2D.color(a.type);
    draw2D.rect();
    // draw the agent inner brain with the agent personality inner colour:
    draw2D.color(a.inner_type).circle([0, 0], a.size - 0.7);
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