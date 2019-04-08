let alphabet = "Ff+-<>|=$".split("");
let population = []
let population_size = 15;
let genome_size = 24;
let mutation_rate = 0.05;
let shuffle_rate = 0.2;

let field = new field2D(100);
const mouth_size = 0.02;
const body_size = 0.05;
  
function reset() {
  population = [];
  
  for (let id =0; id<population_size; id++) {
    let genome = []
    for (let i=0; i<genome_size; i++) {
      genome.push(alphabet[Math.floor(Math.random()*alphabet.length)])
    }
    genome = genome.join("")
    vector=vec2.random(0.02);
    population[id] = {
      genome: genome,
      fitness: 0,
      lines: [],
      age: 6,
      pos: new vec2(random(), random()),
      hue: Math.random(),
      vel: vector,
      mouth: new vec2()
    };
  } 
  show_population();
  field.set(0);
  field.smooth = true;
  field.loadImage("https://scontent.fybz1-1.fna.fbcdn.net/v/t1.15752-0/p280x280/56119669_2294905207221387_3069909814202073088_n.jpg?_nc_cat=103&_nc_ht=scontent.fybz1-1.fna&oh=fba1e1a650b34fb7d50015a83298054f&oe=5D443C93");
}

function show_population() {
  for (let p of population) {
    //write(p.genome, p.fitness)
  }
}

function interpret_subset(lines, commands, turtle) {
  
  for (let i=0; i<commands.length; i++) {
    let cmd = commands[i];
    if (cmd == "F") {
      // move forward, drawing a line
      // start point, end point
      lines.push(turtle.pos.clone()) // insert copy of position
      turtle.pos.add(turtle.vel) // move
      lines.push(turtle.pos.clone()) // insert copy of position
    } else if (cmd == "f") {
      // move forward, drawing a line
      // start point, end point
      lines.push(turtle.pos.clone()) // insert copy of position
      turtle.pos.add(turtle.vel.clone().mul(0.5)) // move
      lines.push(turtle.pos.clone()) // insert copy of position
    } else if (cmd == "$") {
      turtle.vel.mul(0.75);
    
    } else if (cmd == "+") {
      // turn left:
      turtle.vel.rotate(Math.sin(turtle.a) * Math.PI/6);
    } else if (cmd == "-") {
      // turn left:
      turtle.vel.rotate(-Math.sin(turtle.a) * Math.PI/6);
    } else if (cmd == "<") {
      // turn left:
      turtle.vel.rotate(Math.sin(turtle.b) * Math.PI/8);
    } else if (cmd == ">") {
      // turn left:
      turtle.vel.rotate(-Math.sin(turtle.b) * Math.PI/8);
    } else if (cmd == "|") {
      let subset = commands.slice(i+1)
      let turtle1 = {
        pos: turtle.pos.clone(),
        vel: turtle.vel.clone().mul(-1),
        a: turtle.a*0.5,
        b: turtle.b*0.5
      }
      interpret_subset(lines, subset, turtle1);
    } else if (cmd == "=") {
      let subset = commands.slice(i+1)
      let turtle1 = {
        pos: turtle.pos.clone(),
        vel: turtle.vel.clone(),
        a: -turtle.a,
        b: -turtle.b
      }
      interpret_subset(lines, subset, turtle1);
    }
  }
}

function interpret(lines, code,age) {
  let commands = code.split("");
  lines.length = 0;
  
  // set up the context:
  let turtle = {
    pos: new vec2(0, 0),
    vel: new vec2(0, 0.1),
    a: (now),
    b: (now*3)+Math.PI/2
  }

  commands=commands.slice(0,age);
  interpret_subset(lines, commands, turtle);
}

function make_child(child, parent) {
  let local_mutation_rate = mutation_rate * (1-child.fitness);
  let local_shuffle_rate = shuffle_rate * (1-child.fitness);

  let genome = []
  for (let i=0; i<child.genome.length; i++) {
    if (random() < local_mutation_rate) {
      genome[i] = alphabet[Math.floor(Math.random()*alphabet.length)]
    } else {
      genome[i] = parent.genome[i];
    }
  }

  if (random() < local_shuffle_rate) {
    // shuffle the genes around:
    let num_to_shuffle = random(genome.length-1) + 1;
    let shuffle_point = random(genome.length - num_to_shuffle + 1);
    let shuffled = genome.splice(shuffle_point, num_to_shuffle);
    if (random() < 0.5) {
      shuffled = shuffled.reverse();
    }
    if (random() < 0.5) {
      genome = genome.concat(shuffled);
    } else {
      genome = shuffled.concat(genome);
    }
  }

  child.genome = genome.join("")
  child.fitness *= 0.5;
  child.age = 3;
  child.vel=vec2.random(0.01)
  child.hue = wrap(parent.hue + 0.5*(Math.random()-0.5), 1)
}

function regenerate() {
  population.sort(function(a, b) {
    return b.fitness - a.fitness;
  })
  
  for (let id=0; id<population_size; id++) {
    let child = population[id];
    let parent = population[random(id)];
    
    make_child(child, parent)
  }
  
  show_population();
}


function draw() { 
  field.draw();
  let age_chance=.05;

  for (let p of population) {
    
//     console.log(p.vel[0]);
//     console.log(p.vel[1]);
    
    p.pos.add(p.vel).wrap(1);
    p.vel.rotate((random() - 0.5) * 0.03).len(0.002);

    if (random() < age_chance && p.age<=genome_size) {
      p.age=p.age+1;
      
      //console.log(p.age)
    }
    draw2D
      .hsl(p.hue, (p.fitness+1)*0.5, 0.5)
    draw2D.push()
      .translate(p.pos)
      .rotate(p.vel)
      //location cordinates not scaled
      .scale(1/2)
    
      interpret(p.lines, p.genome,p.age)
    //body
      draw2D.circle(body_size)
      draw2D.lines(p.lines, 2)
      
      if (p.lines.length) {
        p.mouth = p.lines[p.lines.length-1]
          .clone()
          .scale(1/2)
          .rotate(p.vel.angle())
          .translate(p.pos)
        
      }
    //if it's not old enough to have a mouth
    //draw mouth on body
    else{
      p.mouth=p.pos;
    }
     // write(p.mouth)
    
    draw2D.pop()
    draw2D.triangle(p.mouth, mouth_size)
    
    
    if(p.age>=genome_size+1){
      //console.log(p.lines.length-1);
     // console.log(p.lines[p.lines.length-1][1]);
    }
 
  }
  
  collision();
}

function collision() {
  //console.log()
  for (let p of population) {
    for (let q of population) {
      // don't test self
      if (p == q) continue;
      
      // are p.mouth and q.pos close enough to eat?
      let d = p.mouth.distance(q.pos);
      if (d < mouth_size) {
       
        // p can eat q: 
        make_child(q, p)
      }
    }
  }
}

function mouse(e, pt) {
  let c = Math.floor(pt[0]*3);
  let r = Math.floor(pt[1]*3);
  if (c < 0 || c >= 3 || r < 0 || r >= 3) {
    return;
  }
  let p = population[r*3+c];
  
  if (e == "down") {
    // breed based on this one:
    p.fitness = 1;
    regenerate();
  }
  collision();
}




title = "ExSporers"
author = "Mengnan Yang, Susan Choi, and Pail Liu"
reset();