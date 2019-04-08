author = "Nicole Skrypuch"
title = "Swimming Ripples"

//214068720
//Assignment 1

//create a 32 x 32 grid of cells
let dim = 256;
let grid = new field2D(dim);
let gridnext = new field2D(dim);

//To only show the edges
let edges = new field2D(dim);

//agents
let population_size = 80;
let agents = [];

console.log(grid)

// called at start, and whenever Enter key is pressed:
function reset() {
  grid.set(function() { 
    return random(10)
  })
  
  for (let i=0; i<population_size; i++) {
    let agent = {
      pos: new vec2(random(), random()),
      vel: vec2.random(0.01),
      size: 0.01,
      memory: 0,
      sensorR: new vec2(0,0),
      sensorL: new vec2(0,0),
    };
    agents[i] = agent;
  }
  
}


// called before rendering each frame
// dt is the time in seconds since the last update()
function update(dt) {
  gridnext.set(function(x, y) { 
    
    //current cell
    let C = grid.get(x, y);
    
    //Get neighborhood
    let N = grid.get(x, y-1);
    let NE = grid.get(x+1, y-1);
    let E = grid.get(x+1, y);
    let SE = grid.get(x+1, y+1);
    let S = grid.get(x, y+1);
    let SW = grid.get(x-1, y+1);
    let W = grid.get(x-1, y);
    let NW = grid.get(x-1, y-1);
    let total = N+NE+E+SE+S+SW+W+NW;    
    if (C == 1) { //if cell is active
      return 0.5; //half alive/color 
    } else if (C == 0 && total < 3) { 
       return 1; //set alive      
    } else if (C==0.5 && total < 1){
      return 0.8; //0.8 alive/color
    } else {
      return 0; //dead
    } 
 });
  
  let temp = grid;
  grid = gridnext;
  gridnext = temp;
  
  
  
  //to show edges
  edges.set(function(x, y) {

    //get cell + neighbours  
    let C = grid.get(x, y);
    let N = grid.get(x, y-1);
    let E = grid.get(x+1, y);
    let S = grid.get(x, y+1);
    let W = grid.get(x-1, y);
    let NE = grid.get(x+1, y-1);
    let SE = grid.get(x+1, y+1);
    
    if (C != N || C != E) {
      return [1,random() < 0.5 ? 0 : 0.5,random() < 0.1 ? 0.5 : 1]; //main edge line that is formed
    } else if (C==S || C == W) {
      return 0; //background
    } 
    return 1; //highlight on edge
 });
  
  for (let a of agents) {
    // right and left sensors
    a.sensorR = a.vel.clone().rotate((Math.PI)/4).len(0.01).add(a.pos);
    a.sensorL = a.vel.clone().rotate(-(Math.PI)/4).len(0.01).add(a.pos);
    
    a.smell = edges.sample(a.sensorR);
    a.smellL = edges.sample(a.sensorL);
    
    //difference between two sensors
    let sensorDif = a.smell - a.smellL;
    
    if (a.smell > a.memory) {
      // swimming:
       a.size += 0.008;
      a.vel.rotate(sensorDif).len(0.005*random());
      //a.vel.rotate(0.1*(random()-0.5)).len(0.005*random());
    } else {
      // tumbling:
      a.size = 0.02;
      a.vel.rotate(sensorDif).len(0.005*random());
      //a.vel.rotate(2*(random()-0.5)).len(0.001*random());
     
    }
    // remember this:
    a.memory = a.smell;
    
    a.pos.add(a.vel).wrap(1);
  }
  
  //edges.diffuse(edges, 10);
  
}

// called to render graphics
// ctx is an HTML5 canvas 2D rendering context
function draw(ctx) {
  edges.draw();
  
  for (let a of agents) {
    draw2D.hsl(0.5, 0.8, 0.2 + (a.smell)/2);
    
    draw2D.push()    
        .translate(a.pos)
        .rotate(a.vel)
        .scale(a.size);
    
    draw2D.triangle();
    
    draw2D.pop();
  }
  
}

// called when any key events happen
// kind is the event type (down, up, etc.)
// key is the key (or keycode) pressed/released
function key(kind, key) {
  if (kind == "down" && key == "f") {
    update();
  }
}

