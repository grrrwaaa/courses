title = "Infection";
author = "Derek Martin";

// changing these parameters can strongly affect emergent behaviour
var max_speed = 0.004;
var max_force = 0.0006;
var centering_factor = 0.01;
var alignment_factor = 1;
var avoidance_factor = 1;
var agent_optimal_distance = 0.004;
var agent_range_of_view = 0.02;
var agent_field_of_view = 3;
var random_walk_variance = 1;
// our agents:
var agents = [];
var infected_prob = 1 / 100000;
var contagion_rate = 5;

var meds = new field2D(128);

var nest = {
  pos: new vec2(0.5, 0.5),
  radius: 0.5,
};

//place medicine 
for (var i = 0; i < 50; i++) {
  var p = vec2.random(0.2 + 0.2 * random())
    .add(nest.pos);
  meds.deposit(1, p);
}
meds.diffuse(meds.clone(), 100, 100);
meds.normalize();
meds.set(function(x, y) {
  var v = meds.get(x, y);
  if (v < 0.4) return 0;
});

function make_agent() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * max_speed),
    acceleration: new vec2(),
    size: (random() + 1) / 50,
    //is bug infected?
    isInfected: false,
    //full health is 100
    health: 100,
  };
  agents.push(a);
  return a;
}
// make a few agents:
for (var i = 0; i < 100; i++) make_agent();

agents[0].health = 40;
agents[0].isInfected = true;

function move_agent(a) {
  // forward Euler integration + constraints
  a.vel.add(a.acceleration).limit(max_speed);
  a.pos.add(a.vel).wrap(1);
}

function update_agent(a) {
  // we will compute a desired velocity
  // intially, a simple random walker
  // (take current velocity and rotate it slightly)
  var desired_velocity = a.vel.clone()
    .rotate(random_walk_variance * (random() - 0.5))
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
      if (n.isInfected) {

      } else {
        neighbour_locations.add(rel);
      }
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

        if (n.isInfected) {
          //becomes infected
          a.health -= contagion_rate;
          if (a.health < 50) {
            a.isInfected = true;
          }
        }
      }
    }

    //IF MORE THAN 5 NEIGHBOURS AND CHANCE OF BEING SICK
    if (neighbours > 5 && random() < infected_prob) {
      //becomes infected
      a.isInfected = true;
      //bugs health drops to 50 instead of 100
      a.health = 50;
    }

    //IF INFECTED, TUMBLE 
    if (a.isInfected) {
      a.vel
        .rotate(srandom() * 0.1)
        .len(0.005);

      /*
      //HEALTHY AGENTS AVOID
      var rel = n.pos.clone().sub(a.pos);
      rel.relativewrap(1); // 1 is the size of our world   
      var distance = Math.max(rel.len() - a.size - n.size, 0);
      var in_visible_range = distance < agent_range_of_view;
      var viewrel = rel.clone().rotate(-dir);
      var in_visible_angle = Math.abs(viewrel.angle()) < agent_field_of_view;
      if (in_visible_range && in_visible_angle) {
        var negative_feeling = Math.min(0, distance - agent_optimal_distance);
        if (negative_feeling < 0) {
          var normalized = negative_feeling / agent_optimal_distance;
          neighbour_avoidances.add(rel.clone().setmag(normalized));
        }
      }*/
    }

  }

  // did we see anyone?
  a.sees_neighbours = neighbours > 0;
  if (a.sees_neighbours) {
    neighbour_locations.div(neighbours);
    neighbour_velocities.div(neighbours);
    neighbour_locations.mul(centering_factor);
    neighbour_velocities.mul(alignment_factor);
    neighbour_avoidances.mul(a.isInfected ? avoidance_factor * 5 : avoidance_factor);
    desired_velocity
      .add(neighbour_locations)
      .add(neighbour_velocities)
      .add(neighbour_avoidances);
  }

  a.acceleration = desired_velocity.sub(a.vel);
  a.acceleration.limit(max_force);
}

function update() {
  for (var a of agents) {
    update_agent(a);
  }
  for (var a of agents) {
    move_agent(a);
  }

  var i = agents.length;
  while (i--) {
    var a = agents[i];
    var f = meds.sample(a.pos);
    // sanity check
    f = Math.max(f, 0);
    if (a.isInfected) {
      //health decreases if bug doesn't get medicine
      a.health -= 0.1;
      //size decreases as it dies
      a.size -= 0.00005;
      //if size is 0, agent dies
      if (a.size <= 0) {
        agents.splice(i, 1);
      }
      meds.deposit(-f, a.pos);
      //if medicine is eaten, increase health
      a.health += f * 0.9;
      a.size += f * 0.0005;
      //if health is below 0, bug dies
      if (a.health < 0) {
        agents.splice(i, 1);
      }

      //if bug's health increases above 50, becomes healthy again
      if (a.health > 50) {
        a.isInfected = false;
      }
      //console.log(a.health);
    } else if (a.health < 100) {
      a.health++;
      
    }
  }
}

function draw() {
  var colorRed = "#e74c3c";
  var colorGreen = "#27ae60";
  var colorYellow = "#f1c40f";
  var colorPurple = "#9b59b6";

  draw2D.color(colorPurple);
  meds.draw();
  
  for (var a of agents) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // draw bug body, green if infected, red if healthy:
    
    var color = draw2D.chroma.interpolate(colorGreen, colorRed, Math.max(0, (a.health-50)/50));
    
    draw2D.color(color);
    draw2D.circle();
    // draw agent eyes, yellow if infected, white if healthy:
    draw2D.color(a.isInfected ? "yellow" : "white");
    draw2D.circle([0.5, 0.5], 0.3);
    draw2D.circle([0.5, -0.5], 0.3);
    // done drawing agent:
    draw2D.pop();
  }

}