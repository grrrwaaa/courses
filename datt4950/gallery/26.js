author = "Lu Li";
title = "Pond Ecosystem"

// changing these parameters can strongly affect emergent behaviour
var max_speed = 0.004;
var max_force = 0.0002;
var centering_factor = 0.001;
var avoidance_factor = 1;
var agent_optimal_distance = 0.004;
var agent_range_of_view = 0.05;
var agent_field_of_view = 2.5;
var random_walk_variance = 1;
//eyes of new agent
// position of sensor in agent-local space:
var eyepos1 = new vec2(0.5, 0.3);
var eyepos2 = new vec2(0.5, -0.3);
var body = new vec2(0, 0);
var tail = new vec2(-0.8, 0);
var light = new field2D(200); //food resouces
var water = new field2D(200);
//var wave  = new vec2(0.5,0.5);
var agent1 = 2; // initial value of agent 1
var agent2 = 30; // initial value of agent 2
var ageent1consume = -0.08; //consume seeweed
var soneatemake = -0.08;
var agent2make = 0.08; //seed seeweed
var cellSum;
var previusCellSum;
var cellDifTotal = 30; // Difference between previous cell total and now, postive means incresing rate of seaweed
var interval = 3000; // update time for wave and seaweed and environmental control
var addingmaker = true; // weather need to add more crab
var chanceInheritformfather = 0.65; //chance to inherit someappearance of father
var birthrate = 8; //how much energy son absord will produce a son
var MaxValueofAgent = 100;
//seaweed
light.set(0.5);
var center = new vec2(light.width / 2, light.height / 2);
light.set(function(x, y) {
  var d = center.distance([x, y]) / light.width;
  return 1 - d;
});

//Water
water.set(0.5);
var center = new vec2(water.width / 2, water.height / 2);
water.set(function(x, y) {
  var d = center.distance([x, y]) / water.width;
  return 1 - d;
});
// waterwave

//seaweed food
var source = {
  pos: new vec2(random(), random()),
  vel: vec2.random(),
  size: 0.2
};
// fill with uniform noise
light.set(function(x, y) {
  return random();
});
// smoothen it out by long-range diffusion:
light.diffuse(light.clone(), light.width, 40);
// make it vary between 0 and 1:
light.normalize();
//cal cell sum
cellSum = light.sum();

//water
water.set(function(x, y) {
  return random();
});
// smoothen it out by long-range diffusion:
water.diffuse(water.clone(), water.width, 40);
// make it vary between 0 and 1:
water.normalize();

//new agent1 crab eat seaweed
var agents1 = [];
// son of the agents1
var son = [];

function make_son() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    size: (random() + 1) / 80,
    energy: random(),
    acceleration: new vec2(),
    make: random() * agent2make,
    consume: random() * ageent1consume,
    // consume: (random()-0.5)*2 * soneatmake,
    eye: random(4), //eye,tail body and behavior as geno 
    tail: random(4),
    body: random(3),
    behavior: random(3)
  };
  son.push(a);
  return a;
}

function make_agents1() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    size: 0.024,
    energy: random(),
    eye: 1,
    body: 1,
    tail: 0,
    behavior: 1,
    consume: random() * ageent1consume
  };
  agents1.push(a);
  return a;
}

function kill_agents1() {
  agents1.pop();
}

function kill_son() {
  son.pop();
}

for (var i = 0; i < agent1; i++) {
  make_agents1();
}
var t = 0;
// our agents:2
var agents = [];
// some obstacles:
var obstacles = [];
//seet the seeweed positon change evey 2 s
setInterval(radomPos, interval);

function make_agent() {
  var a = {
    pos: new vec2(random(), 1 - random() * 2 / 5),
    vel: vec2.random(random() * max_speed),
    acceleration: new vec2(),
    size: (random() + 1) / 60,
    make: random() * agent2make,
    effected: false
  };
  agents.push(a);
  return a;
}

function kill_agent() {
  agents.pop();
}
// make a few agents:
for (var i = 0; i < agent2; i++) make_agent();

// make obstacles:
function make_obstacle() {
  var p = {
    pos: new vec2(random(), random()),
    size: (random() + 1) * 0.05

  };
  obstacles.push(p);
  return p;
}
for (var i = 0; i < 5; i++) make_obstacle();

//another agent behavior squre two eyes
function agents1_behavior(a) {
  // get world-space locations of my eyes:
  // eat the seaweed
  //
  var f = light.sample(a.pos);
  // sanity check
  f = Math.max(f, 0);
  // remove from field
  light.deposit(-f, a.pos);
  a.energy += f * 0.2;

  if (a.energy > 2) {
    // console.log("energy",a.energy);
    a.energy = a.energy * 0.1;
    var temp = make_son();
    temp.pos = a.pos.clone();
    //same eyes inherit from father
    if (random() < chanceInheritformfather) {
      temp.eye = a.eye;
    }
    //same body inherit from father
    if (random() < chanceInheritformfather) {
      temp.body = a.body;
    }
    //same Tail inherit from father
    if (random() < chanceInheritformfather) {
      temp.tail = a.tail;
    }
  }
  // lose energy due to effort of moving:
  a.energy *= 0.95;
  var dir = a.vel.angle();
  var e1 = eyepos1.clone()
    .mul(a.size)
    .rotate(dir)
    .add(a.pos);
  var e2 = eyepos2.clone()
    .mul(a.size)
    .rotate(dir)
    .add(a.pos);
  // get light intensity at these locations:
  // (relative to expected intensity)
  var s1 = light.sample(e1) - 0.5;
  var s2 = light.sample(e2) - 0.5;

  // steering:
  var w1 = -s1;
  var w2 = -s2;

  // locomotion:
  var turn = w2 - w1;
  var speed = (w1 + w2) / 10;
  // sanity limit:
  speed = Math.max(0.01, speed);

  a.vel.rotate(turn).len(0.1 * speed);
  a.pos.add(a.vel).wrap(1);

}

function son_behavior() {
  var i = son.length;
  while (i--) {
    var a = son[i];
    var f = light.sample(a.pos);
    // sanity check
    f = Math.max(f, 0);
    // remove from field
    if (a.behavior != 2) {
      light.deposit(-f, a.pos);
      // gain energy from food:
      a.energy += f * 0.1;
      // die?

      if (a.energy <= 0.1) {
        son.splice(i, 1);
      } else {
        if (a.energy > birthrate) {
          // console.log("energy",a.energy);
          a.energy = a.energy * 0.1;
          var temp = make_son();
          temp.pos = a.pos.clone();
          //same eyes inherit from father
          if (random() < chanceInheritformfather) {
            temp.eye = a.eye;
          }
          //same body inherit from father
          if (random() < chanceInheritformfather) {
            temp.body = a.body;
          }
          //same Tail inherit from father
          if (random() < chanceInheritformfather) {
            temp.tail = a.tail;
          }
          if (random() < 0.3) {
            temp.behavior = a.behavior;
          }
        }
      }
    }
    if (a.behavior == 0) {
      // random walk
      a.vel.rotate(0.4 * (random() - 0.5));
      // locomotion
      // lose energy due to effort of moving:
      a.energy *= 0.2;
      a.pos.add(a.vel).wrap(1);
    } else if (a.behavior == 1) {
      agents1_behavior(a)
    } else if (a.behavior == 2) {
      update_agent(a);
      move_agent(a);
      light.deposit(a.make, a.pos);
    }
  }
}

function move_agent(a) {
  // forward Euler integration + constraints
  a.vel.add(a.acceleration).limit(max_speed);
  // if(a.effected==false){ //limit their space
  // if(a.pos.greater(new vec2(0, 0.33333333333333))){
  //     a.pos.add(a.vel).wrap(1);
  //   	}
  // }else{
  a.pos.add(a.vel).wrap(1);
  // }
}

function update_agent(a) {
  // we will compute a desired velocity
  // intially, a simple random walker
  // (take current velocity and rotate it slightly
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
    if (in_visible_range && in_visible_angle) {
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance - agent_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling / agent_optimal_distance;
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

//random seeweed position and update the amount of two creature
function radomPos() {
  //previusCellSum
  previusCellSum = cellSum;
  cellSum = light.sum();
  var dif = cellSum - previusCellSum;
  console.log(dif);
  console.log(cellSum);
  if (cellSum >= 25000) { //total resouce too much
    make_agents1();
    make_agents1();
    make_agents1();
    kill_agent();
    kill_agent();
    kill_agent();
    //kill_agent();
    //   addingmaker = 0; //too many resouces seeweed stop updating
  } else if (cellSum <= 15000) { //total resources critcal low
    if (agents.length < MaxValueofAgent) {
      make_agent();
      make_agent();
      make_agent();
    }

    kill_agents1();
    kill_agents1();
    kill_son();
    kill_son();

    //  addingmaker = 0; //lack resouces
  } else {
    //  addingmaker = 1;
  }

  if (cellDifTotal < dif) { //intersting to change less than or more rhan  different behavior
    //need more eater
    console.log("add eater");
    make_agents1();
    kill_agent();
  } else {
    //need more maker
    if (agents.length < MaxValueofAgent) {
      var a = make_agent();
    }
    // kill_agents1(); 
    console.log("addmaker");
    if (random() > 0.8) {
      kill_son();
    } else {
      kill_agents1; //80% kill fater if too less food 
    }
  }
  //random seaweed position
  source.pos = new vec2(random(), random());
  light.diffuse(light.clone(), 0.06);
  //light.diffuse(light.clone(), light.width, 0.1);
  //water update
  //wave

}

function update() {
  // light.diffuse(light.clone(),0.01);
  // to separate passes to prevent artefacts 
  // (similar to double-buffering)
  //
  // light2.diffuse(light2.clone,40).mul(0.99999);

  //seaweed groth spped

  light.deposit(random(), source.pos);
  source.vel.rotate(random() - 0.3).len(random() * 0.01);
  source.pos.add(source.vel).wrap(1);
  son_behavior();
  // some removals for water:
  //for (var i = 0; i < 500; i++) {
  // light.set(0, random(), random());
  //}
  var i = agents1.length;
  while (i--) {
    agents1_behavior(agents1[i]);
  }
  for (var a of agents) {
    update_agent(a);
  }
  for (var a of agents) {
    move_agent(a);
    light.deposit(a.make, a.pos);
  }

}

// the rule for an individual SeaWeed (at position x, y) in the field:

function draw() {

  //draw2D.color("Blue").alpha(0.2).rect(0, 0.68, 2, 2);
  //water and seaweed field
  draw2D.blend(true);
  draw2D.color("blue").alpha(0.5);
  water.draw();
  draw2D.color("green").alpha(0.6);
  light.draw();
  // light2.draw();

  draw2D.blend(false);

  draw2D.color("grey");
  for (var p of obstacles) {
    draw2D.circle(p.pos, p.size);
  }
  //draw agent flock 1
  for (var a of agents) {
    // push into agent's local coordinate system
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // draw agent body:
    draw2D.color("White").circle(-0.2, 0, 0.2);
    draw2D.color("red").circle(-0.2, 0, 0.06);
    draw2D.color("red").rect(-0.21, 0.09, 0.08, 0.02);
    // wings:
    draw2D.color("red").circle(0.02, 0.13, 0.2);
    draw2D.color("red").circle(0.02, -0.13, 0.2);
    // body
    draw2D.color(a.sees_neighbours ? "red" : "pink");

    draw2D.rect(0, 0, 0.3, 0.2);

    draw2D.pop();
  }
  //draw agen squre seeking light2 
  for (var a of agents1) {
    draw2D.push()
      .translate(a.pos)
      .rotate(a.vel)
      .scale(a.size);
    // tail:
    draw2D.color("yellow").rect([-0.8, 0], 0.5);
    // draw2D.color("grey").rect([-0.4, -0.3], 0.2);
    // eyes:
    draw2D.color("white").circle(eyepos1, 0.4);
    draw2D.color("white").circle(eyepos2, 0.4);
    // body
    draw2D.color("pink").rect(0, 0, 1, 0.7);
    draw2D.pop();
  }

  //draw son
  for (var a of son) {
    draw2D.push()
      .translate(a.pos)
      .rotate(a.vel)
      .scale(a.size);
    // Tail:
    if (a.tail == 0) {
      draw2D.color("blue").circle(tail, 0.6);
    } else if (a.tail == 1) {
      draw2D.color("yellow").rect(tail, 0.6);
    } else if (a.tail == 2) {
      draw2D.color("red").triangle(tail, 0.6);
    }
    //eyes
    if (a.eye == 0) {
      draw2D.color("white").circle(eyepos1, 0.8);
      draw2D.color("white").circle(eyepos2, 0.8);
    } else if (a.eye == 1) {
      draw2D.color("green").rect(eyepos1, 0.6);
      draw2D.color("green").rect(eyepos2, 0.6);
    } else if (a.eye == 2) {
      draw2D.color("red").triangle(eyepos1, 0.8);
      draw2D.color("red").triangle(eyepos2, 0.8);
    }
    // body
    if (a.body == 0) {
      draw2D.color("blue").circle(body, 0.8);
    } else if (a.body == 1) {
      draw2D.color("pink").rect(body, 0.8);
    } else if (a.body == 2) {
      draw2D.color("green").triangle(body, 1);
    }
    draw2D.pop();
  }
}

// click to add more agents:
function mouse(e, pt) {
  if (e == "down") {
    // add crab
    var a = make_agent();
    a.pos.set(pt)
  } else {
    //add seaweed
    light.deposit(1, pt);
  }
}