title = "Fair Weather v2"
author = "Tongliang	Liu"

var ideal_energy_total = 800;

var agents = [];
var agent_energy_min = 0.1;
var agent_eating_efficiency = 0.5;
var agent_age_factor = 0.0005;
var agent_population_max = 50;
var defaultsize2 = 0.02;

var sensor_length = 0.5;
var normal_speed = 0.015;
var turn_rate = 4;
var turn_max = 1.5;
var def_voracity = 1.5;
var def_maxeng = 1.0;
var def_longevity = 0.5;
var def_agility = 0.5;
var def_sensitivity = 1.0;

//make the genome
var genome_size = 6;

function random_gene() {
  return random();
}

function make_genome() {
  var genome = [];
  for (var i = 0; i < genome_size; i++) {
    genome[i] = random_gene();
  }
  return genome;
}

function copy_genome(parent) {
  //mutation of genes and mutation rate
  var mutation_rate = parent[2];
  var genome = [];
  for (var i=0; i< genome_size; i++) {
    genome[i] = wrap(parent[i] + srandom()*mutation_rate, 1);
  }
  //disabled jumping
 // if (random() < mutation_rate) {
    //genome[random(genome_size)] = //genome[random(genome_size)];
  //}
  return genome;
}

function apply_genome(a) {
  return a;
}

//make the agent
function make_agent() {
  return {
    pos: new vec2(random(), random()), //.add(0.5),
    vel: vec2.random(normal_speed),
    size: defaultsize2,
    energy: 1 + random(),
    maxenergy: def_maxeng,
    sense: 0,
    age: 0,
    agility: def_agility,
    genome: make_genome(),
    longevity: def_longevity,
    voracity: def_voracity,
    sensitivity: def_sensitivity,
    colour: 0.5,
    mouthparts: [],
  }
}
//field value of light source to control how fast the agents reproduce
var food = new field2D(90);
for (var i = 0; i < ideal_energy_total; i++) {
  food.deposit(1, random(), random());
}
var food_past = food.clone();

function update() {

  var world_energy_total = food.sum();

  var i = agents.length;
  while (i--) {
    var a = agents[i];
    world_energy_total += a.energy;

    // lose energy
    // lose it faster as we get older
    a.age += dt;
    a.energy -= agent_age_factor * a.age * (a.longevity+0.5);

    var f = food.sample(a.pos) * agent_eating_efficiency;
    // sanity check
    f = Math.max(f, 0);
    a.sense = f;
    //how much the agents eat
    food.deposit(-f * a.voracity, a.pos);

    // gain energy from food:
    a.energy += f * 0.2;
    // dies if out of energy
    if (a.energy <= agent_energy_min) {
      agents.splice(i, 1);
    } else {
      if (a.energy > a.maxenergy) {
        if (agents.length < agent_population_max) {
          // reproduce:
          a.energy *= 0.4;

          var child = make_agent();
          child.pos.set(a.pos);
          child.energy = a.energy;
          child.genome = copy_genome(a.genome);
          apply_genome(child); //gene 3 affects metabolish in size, stored energy, and speed
          child.maxenergy = child.genome[3] * 0.4 - 0.2 + a.maxenergy;
          child.size = child.genome[3]*0.01 - 0.005 + a.size;
          child.agility = def_agility - child.genome[3]*0.4 + 0.1;
          
          newcolour = a.colour + child.genome[1]*0.05-0.02;
//colour change is slightly favoured
          if (newcolour > 1 || newcolour < 0) { child.colour = a.colour;} else { child.colour = newcolour; }
//longevity
          longevitychange = a.longevity + a.genome[4]*0.1-0.05;
          if (longevitychange > 1 || longevitychange < 0) { child.longevity = a.longevity;} else { child.longevity = longevitychange; }
//voracity, how fast the lgiht is consumed
           voracitychange = a.voracity + a.genome[5]*0.8-0.4;
           if (voracitychange > 5 || voracitychange < 1) { child.voracity = a.voracity;} else { child.voracity = voracitychange; }
//sensitivity
           child.sensitivity = def_sensitivity + child.genome[0]*6 - 1;
          //could not get change to size and speed working
          agents.push(child);
        } else {
          // limit:
          a.energy = a.maxenergy;
        }
      }
      var sensor1 = new vec2(sensor_length, +sensor_length)
        .mul(a.size)
        .rotate(a.vel.angle())
        .add(a.pos);
      var sensor2 = new vec2(sensor_length, -sensor_length)
        .mul(a.size)
        .rotate(a.vel.angle())
        .add(a.pos);
      // read field at these locations:
      var sense1 = food.sample(sensor1);
      var sense2 = food.sample(sensor2);

      //c/compare information for the left and right sensors
      //speed modification due to genes
      var speed = normal_speed * ((sense1 + sense2) * 0.1 + 0.06 + a.agility);
      var turn = turn_rate * ((sense1 - sense2) * a.sensitivity + 0.04 * srandom());
      // limit turns:
      if (turn > turn_max) {
        turn = turn_max;
      } else if (turn < -turn_max) {
        turn = -turn_max;
      }
      // turn that into steering:
      a.vel.rotate(turn).len(speed);
      // locomotion
      a.pos.add(a.vel).wrap(1);
    }
  }

  // if the world all dies out, try again:
  if (agents.length < 1) {
    agents.push(make_agent());
  }

  // want to keep total food steady:
  var deficit = ideal_energy_total - world_energy_total

  // rain some food:
  while (deficit > 100) {
    food.deposit(deficit, random(), random());
    deficit = 0;
  }

  var tmp = food;
  food = food_past;
  food_past = tmp;
  food.diffuse(food_past, 0.1);
  food.mul(0.987);
}

function mouse(e, p) {
  if (e == "down") {
    // move agent zero
    agents[0].pos.set(p);
  } else {
    // drop sugar
    food.deposit(1, p);
  }
}

function draw() {
  draw2D.color("white");
  food.smooth = true;
  food.draw();
  
  var debug = true;
  if (debug) {
    // temp genome viz for graham's benefit
    draw2D.push()
        .scale(1/genome_size, 1/50)
        .translate(0.5, 0.5)
        .color("red").alpha(0.5);
    draw2D.blend(true);
    
    for (var i=0; i<agents.length; i++) {
      var g = agents[i].genome;
      
      for (var j=0; j<genome_size; j++) {
        
      draw2D.rect([j,i], [g[j], 1]);
      }
    }
    draw2D.pop();
    draw2D.blend(false);
  }
  

  for (var a of agents) {

    draw2D.push()
      .translate(a.pos)
      .rotate(a.vel.angle())
      .scale(a.size);

    var hue = a.colour;
    draw2D.hsl(hue, 1. / (1 + a.age), 0.3)
      .rect();
    draw2D.hsl(hue, 1. / (1 + a.age), 0.7)
      .rect([0, 0], a.energy / a.maxenergy);
    draw2D.hsl(hue, 0.5, a.sense * 10)
      .circle([sensor_length, +sensor_length], 0.2)
      .circle([sensor_length, -sensor_length], 0.2);
    draw2D.pop();
  }
}