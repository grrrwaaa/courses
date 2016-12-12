author = "Daniel James"
title = "Northern Mites"

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

background = new field2D(30);
fitness = new field2D(30);

background.diffuse(background.clone(),100, 50);

background.normalize();
background_past = background.clone();

var angle1 = Math.PI * 3 * (1.5 + Math.cos(now));
var angle2 = Math.PI * 0.1 * (1.5 + Math.sin(now));

var lexicon = "123abcdefghi+-<>".split("");
var code = "";
var genome_size = 25;

agents = [];

function make_genome() {
  var g = [];
  for (var i = 0; i < genome_size; i++) {
    var gene = lexicon[random(lexicon.length)];
    g.push(gene);
  }
  return g.join("");
}

for (var i = 0; i < 100; i++) {
  var strength = 20;
  if (random() < 0.5) strength = -strength;
  
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(max_speed), // velocity
    acc: new vec2(), // acceleration
    size:  0.03 * (random() + 0.8),
    // sensing:
    neighbours_count: 0,
    attractions: new vec2(), // center of attraction
    flows: new vec2(), // average velocity of neighbours
    avoidances: new vec2(), // sum of vectors to avoid collisions
    
    r1: random(),
    g1: random(),
    b1: random(),
    
    r2: random(),
    g2: random(),
    b2: random(),
    
    r3: random(),
    g3: random(),
    b3: random(),
    
    eating_strength: strength,
    code: make_genome(),
  };
  agents.push(a);
}

// to calculate the average colour between all agents
var r_sum = 0;
var g_sum = 0;
var b_sum = 0;
var agent_sum = 0;

function update() {
  
  fitness.set(function(r, c) {
    
    // quantify an "interesting" background
    var top_left = background.cell(r + 1, c - 1);
    var top_middle = background.cell(r + 1, c);
    var top_right = background.cell(r + 1, c + 1);
    var middle_left = background.cell(r, c - 1);
    var middle = background.cell(r, c);
    var middle_right = background.cell(r, c + 1);
    var bottom_left = background.cell(r - 1, c - 1);
    var bottom_middle = background.cell(r - 1, c);
    var bottom_right = background.cell(r - 1, c + 1);
    
    var r = Math.abs((top_left[0] + top_middle[0] + top_right[0] + middle_left[0] 
                     + middle_right[0] + bottom_left[0] + bottom_middle[0] + bottom_right[0]) / 8);
    
    var g = Math.abs((top_left[1] + top_middle[1] + top_right[1] + middle_left[1] 
                     + middle_right[1] + bottom_left[1] + bottom_middle[1] + bottom_right[1]) / 8);
    
    var b = Math.abs((top_left[2] + top_middle[2] + top_right[2] + middle_left[2] 
                     + middle_right[2] + bottom_left[2] + bottom_middle[2] + bottom_right[2]) / 8);
    
    var total = r + g + b;
    
    // more colourful areas are more fit
    return 0.005 * total;
  });
  
  var tmp = background_past;
  background_past = background;
  background = tmp;
  
  background.diffuse(background_past, diffusion_rate);

  // sensing (of other agents)
  for (var a of agents) {
    
    // reset sensing state:
    a.neighbours_count = 0;
    a.attractions.set(0, 0);
    a.flows.set(0, 0);
    a.avoidances.set(0, 0);
    
    // either remove from the environment or add to it
    var amt = a.eating_strength * a.size;
    background.deposit([amt * a.r1, amt * a.g1, amt * a.b1], a.pos);
    
    // check each possible neighbour:
    for (var n of agents) {
      if (a == n) continue; // don't count self as a neighbour
      
      a.size = Math.min(a.neighbours_count * 0.01 + random() * 0.005, 0.15);
      var rel = n.pos.clone().sub(a.pos);
      rel.relativewrap(1); 
      var distance = Math.max(rel.len() - a.size - n.size, 0);
      if (distance > agent_range_of_view) continue;
      a.neighbours_count++;
      a.attractions.add(rel);
      a.flows.add(n.vel);
      var future_rel = n.pos.clone().add(n.vel)
        .sub(a.pos.clone().add(a.vel));
      future_rel.relativewrap(1); 
      
      var future_distance = Math.max(future_rel.len() - a.size - n.size, 0);
      if (future_distance < personal_space) {
        var mag = 1 - (future_distance / personal_space);
        var avoid = future_rel.clone().scale(-mag);
        a.avoidances.add(avoid);
        
        // take the colour of your neighbour
        if (random() < n.size) {
          var adopt = 0.8;
          a.r1 += adopt * (n.r1 - a.r1);
          a.g1 += adopt * (n.g1 - a.g1);
          a.b1 += adopt * (n.b1 - a.b1);
        }
      }
      
      var a_genome = a.code;
      var n_genome = n.code;
      
      if (random(2) == 1) {
        var tmp = a_genome;
        a_genome = n_genome;
        n_genome = tmp;
      }
      
      var cut1 = random(a_genome.length);
      var cut2 = random(n_genome.length);
      
      // ensure cut1 <= cut2
      if (cut1 > cut2) {
        var tmp = cut1;
        cut1 = cut2;
        cut2 = tmp;
      }
      
      // get the cut sections
      var sec1 = n_genome.substring(0, cut1);
      var sec2 = a_genome.substring(cut1, cut2);
      var sec3 = n_genome.substring(cut2);
      // and join:
      child = sec1 + sec2 + sec3;
      
      // mutate a gene:
      var local_fitness = fitness.sample(a.pos); 
      var mutation_rate = local_fitness;
      
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
      n.code = child;
    }
  }
  
  // thinking (i.e. calculate steering force)
  for (var a of agents) {
    var desired_velocity = a.vel.clone();
    
    desired_velocity.rotate(srandom() * 0.5)
    
    if (a.neighbours_count > 0) {
      a.attractions.div(a.neighbours_count).scale(centering_factor);
      a.flows.div(a.neighbours_count).scale(flow_factor);
      a.avoidances.scale(avoidance_factor);
      
      desired_velocity
        .add(a.attractions)
        .add(a.flows);
    }
    
    // colour drift:
    var drift = 0.01;
    a.r1 = Math.max(0, Math.min(1, a.r1 + srandom() * drift));
    a.g1 = Math.max(0, Math.min(1, a.g1 + srandom() * drift));
    a.b1 = Math.max(0, Math.min(1, a.b1 + srandom() * drift));
    
    desired_velocity.add(a.avoidances);
    
    a.acc = desired_velocity.sub(a.vel)
      .limit(max_acceleration);
  }
  // action (moving)
  for (var a of agents) {
    a.vel.add(a.acc).limit(max_speed);
    a.pos.add(a.vel).wrap(1);
  }
  // keep the background more black
  background.mul(0.99);
  var tmp = background_past;
  background_past = background;
  background = tmp;
  
  background.diffuse(background_past, diffusion_rate);
}

function draw() {
  
  draw2D.blend(true);
  background.smooth = true;
  background.draw();
  
  //fitness.draw();
  
  draw2D.blend(false);
  
  // draw all the agents:
  for (var a of agents) {
    // go into agent's local coordinate system
    draw2D.push()
      .translate(a.pos)
      .rotate(a.vel.angle())
      .scale(a.size);
    
    turtle = {
      pos: new vec2(),
      dir: new vec2(1,0),
      r: 0,
      g: 0,
      b: 0,
      chirality: 1,
    };
    
    for (var i = 0; i < a.code.length; i++) {
      var c = a.code[i];
      
      turtle.r = a.r1;
      turtle.g = a.g1;
      turtle.b = a.b1;
      
      // for some parts of each creature,
      if (random() < 0.15) {
        // use either the first
        if (random() < 0.5) {
          turtle.r = a.r2;
          turtle.g = a.g2;
          turtle.b = a.b2;
        } 
        // or the second alternate colour
        else {
          turtle.r = a.r3;
          turtle.g = a.g3;
          turtle.b = a.b3;
        }
      }
      
      draw2D.color(turtle.r, turtle.g, turtle.b);
      
      // draw circles
      if (c == "a") {
        draw2D.circle(turtle.pos, 0.3);
      }
      else if (c == "b") {
        draw2D.circle(turtle.pos, 0.5);
      }
      else if (c == "c") {
        draw2D.circle(turtle.pos, 0.7);
      }
      
      // draw squares
      else if (c == "d") {
        draw2D.rect(turtle.pos, 0.07);
      }
      else if (c == "e") {
        draw2D.rect(turtle.pos, 0.11);
      }
      else if (c == "f") {
        draw2D.rect(turtle.pos, 0.15);
      }
      
      // draw lines
      else if (c == "g") {
        var p2 = turtle.dir.clone().mul(0.1).add(turtle.pos);
        draw2D.line(turtle.pos, p2);
        turtle.pos = p2;
      }
      else if (c == "h") {
        var p2 = turtle.dir.clone().mul(0.3).add(turtle.pos);
        draw2D.line(turtle.pos, p2);
        turtle.pos = p2;
      }
      else if (c == "i") {
        var p2 = turtle.dir.clone().mul(0.5).add(turtle.pos);
        draw2D.line(turtle.pos, p2);
        turtle.pos = p2;
      }
      
      // change the direction
      else if (c == "+") {
        turtle.dir.rotate(turtle.chirality * angle1);
      }
      else if (c == "-") {
        turtle.dir.rotate(turtle.chirality * -angle1);
      }
      else if (c == "<") {
        turtle.dir.rotate(turtle.chirality * angle2);
      }
      else if (c == ">") {
        turtle.dir.rotate(turtle.chirality * -angle2);
      }
    }
    
    draw2D.pop();
  }
}

function mouse(event, pos) {
  // randomize colours on click 
  if (event == "down") {
    for (var a of agents) {
      a.r1 = random();
      a.g1 = random();
      a.b1 = random();
      
      a.r2 = random();
      a.g2 = random();
      a.b2 = random();
      
      a.r3 = random();
      a.g3 = random();
      a.b3 = random();
    }
  }
}