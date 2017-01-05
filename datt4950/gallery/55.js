author = "Akeem Glasgow"
title = "Voting Agents Game of Life"

// GAME OF LIFE SECTION -------------------------------

// create a new field:

var field = new field2D(300);
var agentfield = new field2D(300);
var totalEnergy;
var totalEnergy_game;
var total_E_Thresh = 1000;
var total_E_Thresh_GOL = 1000;
var boring_threshold = 3000;

// initialize with some noise:
field.set(function(x, y) {
  return random(2);
});

// duplicate the field for double-buffering:
past = field.clone();

// the game of life rule:
function game(x, y) {
  // get neighbourhood
  var N = past.get(x, y + 1);
  var E = past.get(x + 1, y);
  var S = past.get(x, y - 1);
  var W = past.get(x - 1, y);
  var NE = past.get(x + 1, y + 1);
  var SE = past.get(x + 1, y - 1);
  var SW = past.get(x - 1, y - 1);
  var NW = past.get(x - 1, y + 1);
  var near = N + S + E + W + NW + SW + NE + SE;
  // current state:
  var C = past.get(x, y);
  var C2 = agentfield.get(x, y);
  // disable agent spray if  too noisey
  if(totalEnergy > total_E_Thresh){
    rule = 0;
  }else{
    //no idea why this numer works
    if(C2 > 0.000000000001 && C == 0 ){
      C = 1;
    }else{
      C = 0;
    }
  }
  // transition rule:
  // if alive:
  if (C == 1 ) {
    if (near < 2) {
      // die by loneliness:
      return 0;
    } else if (near > 3) {
      // die by overcrowding:
      return 0;
    }
  } else if (C == 0) {
    // if dead, rebirth by three neighbours:
    if (near == 3) {
      return 1;
    }
  }
  // else remain the same:
  return C;
}

// SENSOR-------------------------------
var sensor_size = 4/5; 
var min_sense = 0.01; // sensors never report zero
var sensor_noise = 0.01;
function biggerSenorArea(pos){

  var area_width = 3;
  var area_height = 3;
  var total;

  for( x = pos[0] - area_width ; x <  pos[0]  + area_width ;x++){
    for( y = pos[1] - area_height ; y <  pos[1]  + area_height ;y++){
      total +=agentfield.sample(x,y);
    }
  }
  return total;
}



// AGENT SECTION------------------------
var colors = ['DarkOrchid','DeepPink','red', 'green', 'blue', 'orange', 'yellow','Indigo','FireBrick','Crimson','DarkKhaki','DarkCyan'];
var max_speed = 0.003;
var max_force = 0.0002;
var centering_factor = 0.001;
var avoidance_factor = 1;
var agent_optimal_distance = 0.004;
var agent_range_of_view = 0.05;
var agent_field_of_view = 2.5;
var random_walk_variance = 1;
var spacing_from_object_factor = 2;
var pop_agent_size = 50;

// our agents:
var agents = [];
function make_agent() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * max_speed),
    alive: 10,
    acceleration: new vec2(),
    color : colors[ Math.floor((Math.random() * colors.length) )],
    size: (random() + 1) / 160
  };
  agents.push(a);
  return a;
}

//make some agents
for (var i = 0; i < pop_agent_size; i++) {
  make_agent();
}
// make agent of a specif color and place anywhere
function make_agents(x) {
  var a = {
    pair : false,
    pairvalue: -1,
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * max_speed),
    acceleration: new vec2(),
    size: (random() + 1)/160,
    alive: 10,
    color : x
  };
  agents.push(a);
  return a;
}


//GENOME SECTION-------------------------------
var lexicon = "FFFfff++--><rw|=.".split("");
var timer_interval = 0.25;
var code = "";
var steplen = 1 / 40;
var turnangle1 = Math.PI / 2;
var turnangle2 = Math.PI / 2;
var genome_size = 25;
var pop_size = 9;
var t0 = now;
var obstacles = [];

// make obstacles:
function make_obstacle(i) {
  var p = {

    polarity: 1,
    vel: vec2.random(random() * max_speed),
    acceleration: new vec2(),
    genome: make_genome(),
    pos: new vec2(random(),random()),
    size: (random() + 1) * 0.05
  };
  obstacles.push(p);
  return p;
}
for (var i = 0; i < pop_size; i++) make_obstacle(i);


//ELECTION SECTION---------------------
var timer = 0;
var global_poll = 0;

var vote_booth = [];
for (var i = 0; i < pop_size; i++) {
  vote_booth.push(0);
}

// make a genome 
function make_genome() {
  var g = [];
  for (var i = 0; i < genome_size; i++) {
    var gene = lexicon[random(lexicon.length)];
    g.push(gene);
  }
  return g.join("");
}

// set base genome
code = make_genome();
var which = 0;
// voted results elects alpha
function elect(booth) {
  // swarm to alpha to vote
  // then flee from alpha

  for (var i = 0; i < pop_size; i++) {
    if (booth[i] > booth[which]) {
      which = i;
      rule = booth[which] %2;
     // console.log(rule);
    }
    if (which == i) {
      obstacles[i].polarity = booth[i] / spacing_from_object_factor;
    } else {
      obstacles[i].polarity = -booth[i] / spacing_from_object_factor;
    }

  }

  var parent = obstacles[which];

  t = 0;

  for (var j = 0; j < pop_size; j++) {
    if (i == j) continue;

    // get parent genomes:
    var parent1_genome = parent.genome;
    var parent2_genome = obstacles[j].genome;
    // 50% chance of swapping parents around:
    if (random(2) == 1) {
      var tmp = parent1_genome;
      parent1_genome = parent2_genome;
      parent2_genome = tmp;
    }
    // insert a segment of parent 2 into parent 1:
    // pick two cut points
    var cut1 = random(parent1_genome.length);
    var cut2 = random(parent2_genome.length);
    // ensure cut1 <= cut2
    if (cut1 > cut2) {
      var tmp = cut1;
      cut1 = cut2;
      cut2 = tmp;
    }
    // get the cut sections
    var sec1 = parent2_genome.substring(0, cut1);
    var sec2 = parent1_genome.substring(cut1, cut2);
    var sec3 = parent2_genome.substring(cut2);
    // and join:
    child = sec1 + sec2 + sec3;

    // chance of randomizing genome:
    if (random() < 1 / pop_size) {
      var list = child.split("");
      list = shuffle(list);
      child = list.join("");
    }

    // mutate a gene:
    var mutation_rate = (1 / child.length)/(1/booth[which]);

    var mutated = [];
    for (k = 0; k < child.length; k++) {
      if (random() < mutation_rate) {
        var gene = lexicon[random(lexicon.length)];
        mutated.push(gene);
      } else {
        mutated.push(child[k]);
      }
    }
    child = mutated.join("");

    // replace in population:
    obstacles[j].genome = child;
  }

}
function interpret(turtle, code) {
  for (var i = 0; i < code.length; i++) {
    var c = code[i];
    switch (c) {
      case "=":
        // fork another turtle with flipped chirality
        var t1 = {
          pos: turtle.pos.clone(),
          dir: turtle.dir.clone().negate(),
          chirality: turtle.chirality,
          color: turtle.color,
        };
        // run the rest of the string on it too:
        var remain = code.substring(i + 1);
        // run the second turtle:
        interpret(t1, remain);
        break;
      case "|":
        // fork another turtle with flipped chirality
        var t1 = {
          pos: turtle.pos.clone(),
          dir: turtle.dir.clone(),
          chirality: -turtle.chirality,
          color: turtle.color,
        };
        // run the rest of the string on it too:
        var remain = code.substring(i + 1);
        // run the second turtle:
        interpret(t1, remain);
        break;
      case "r":
        turtle.color = "red";
        break;
      case "w":
        turtle.color = "white";
        break;
      case ".":
        draw2D.color(turtle.color);
        draw2D.circle(turtle.pos, steplen);
        break;
      case "F":
        // move forward drawing a line
        var p2 = turtle.dir.clone().mul(steplen).add(turtle.pos);
        draw2D.color(turtle.color);
        draw2D.line(turtle.pos, p2);
        turtle.pos = p2;
        break;
      case "f":
        // move forward drawing a line
        var p2 = turtle.dir.clone().mul(steplen * 0.5).add(turtle.pos);
        draw2D.color(turtle.color);
        draw2D.line(turtle.pos, p2);
        turtle.pos = p2;
        break;
      case "+":
        // turn positively
        turtle.dir.rotate(turtle.chirality * turnangle1);
        break;
      case "-":
        // turn the other way
        turtle.dir.rotate(turtle.chirality * -turnangle1);
        break;
      case ">":
        // turn positively
        turtle.dir.rotate(turtle.chirality * turnangle2);
        break;
      case "<":
        // turn the other way
        turtle.dir.rotate(turtle.chirality * -turnangle2);
        break;

             }
  }
}


//moves agents AND obstacles
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
  var  likeness_attraction = new vec2();
  var finding_patner_probability =0;

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
       // accumulate relative locations for centering force of simular agents
      if(n.color==a.color){
        finding_patner_probability++;
        likeness_attraction.add(rel);

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
      }
    }
  }

  for (var x = 0; x  < obstacles.length;x++){
    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var p = obstacles[x];
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
      vote_booth[x]++;
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance - agent_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = p.polarity * negative_feeling / agent_optimal_distance;
        neighbour_avoidances.add(rel.clone().setmag(normalized));
      }
    }
  }

   if(finding_patner_probability >= 2 && agents.length < pop_agent_size ){

      make_agents(a.color);

    }
  // did we see anyone?
  a.sees_neighbours = neighbours > 0;
  if (a.sees_neighbours) {
    // convert accumulated information into averages:
    neighbour_locations.div(neighbours);
    neighbour_velocities.div(neighbours);
    likeness_attraction.mul(finding_patner_probability/2);
    // change factors:
    neighbour_locations.mul(centering_factor);
    // apply to desired velocity
    // (note avoidance is subtracted, as a repulsion):
    desired_velocity
      .add(neighbour_locations)
      .add(neighbour_velocities)
      .add(likeness_attraction);
  }else{
    // agent is alone , life fades
    a.alive -= 0.1;
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
function update_obstacles(n){
  // (take current velocity and rotate it slightly)
  var desired_velocity = n.vel.clone()
  .rotate(random_walk_variance * (random() - 0.5))
  .setmag(max_speed * random()); 

  // direction of agent for rotation
  var dir = n.vel.angle();
  // sensor area
  var sensor1 = new vec2(sensor_size, sensor_size).mul(n.size).rotate(dir).add(n.pos);
  var sensor2 = new vec2(sensor_size, -sensor_size).mul(n.size).rotate(dir).add(n.pos);


  // get the game of life energy at these locations:
  var sense1 = biggerSenorArea(sensor1);
  var sense2 = biggerSenorArea(sensor2);
  var steer = srandom() * 0.5;

  // clamp:
  sense1 = Math.max(Math.min(sense1, 1), min_sense);
  sense2 = Math.max(Math.min(sense2, 1), min_sense);
  n.wheel1 = sense2;
  n.wheel2 = sense1;

  if (sense1 + sense2 > sensor_noise) {
    steer = sense1-sense2;
  }

  // steering & locomotion
  var turn = n.vel.clone().rotate(steer);
  n.vel.add(turn.setmag(0.005));

  ;

}


function update() {
  var tmp = past;
  past = field;
  field = tmp;
  // run the game one step:
  
  field.set(game);
  

  var polls = 0;
  for (var i = 0 ; i < agents.length;i++) {
    if(agents[i].alive < 0){ 
      agents.splice(i,1);
    }
  }
  
  for (var a of obstacles) {
    update_obstacles(a);
  }
  for (var a of agents) {
    update_agent(a);
  }

  for (var a of obstacles) {
    move_agent(a);
  }
  for (var a of agents) {
    move_agent(a);
    agentfield.update(random(),a.pos);
  }



  // sample polls at interval
  timer += timer_interval;
  timer %= 60;
  if (timer == 0) {
    elect(vote_booth);
    //keep track of noise game of life energy
    var old_E_game = totalEnergy_game;
    //keep track of noise agent amount of agent spray 
    totalEnergy_game = field.sum();
    //spice it up again if it gets boring
    if(totalEnergy_game == old_E_game || totalEnergy_game <= boring_threshold){
      agentfield.set(0);
    }
    totalEnergy = agentfield.sum();
  }
  //reset votes
  vote_booth.fill(0);
  // genome animation
  turnangle1 = Math.PI * (1.5 + Math.cos(now)) / 8;
  turnangle2 = Math.PI * (1.5 + Math.sin(now * 4)) / 16;

}

function draw() {
  draw2D.color("green");
  draw2D.blend(true);
  field.draw();
  draw2D.color("blue");
  agentfield.draw();

  var age = Math.floor((now - t0) * 10);

  for (var i = 0; i < obstacles.length; i++) {
    var o = obstacles[i];
    var dir = vec2.anglebetween(o.vel, new vec2(0,1));
        

    draw2D.push().translate(o.pos).scale(o.size*7).rotate(dir/30);
    if (i == which) {
      draw2D.color(0.2, 0.2, 0.2);
      draw2D.circle(0,0,0.25);
    }

    var turtle = {
      pos: new vec2(),
      dir: new vec2(0, 1),
      chirality: 1,
      color: "white",
    };
    interpret(turtle, o.genome.substring(0, age));

    draw2D.pop();
  }

  draw2D.color("grey");

  //  for (var p of obstacles) {
  //  draw2D.circle(p.pos, p.size);
  // }

  for (var a of agents) {
    // push into agent's local coordinate system
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // draw agent body:
    draw2D.color(a.sees_neighbours ? a.color : "grey");
    draw2D.rect();
    // draw agent eyes:
    draw2D.color(a.sees_neighbours ? "white": "black");
    draw2D.circle([0.5, 0.5], 0.5);
    draw2D.circle([0.5, -0.5], 0.5);
    // done drawing agent:
    draw2D.pop();
  }

}
var t0 = now;