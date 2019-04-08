title = "Whirlpool"
author = "Ann Arizapa"

// Template page for developing minimal artificial life simulations
// see http://artificialnature.net/courses/datt4950/labs.html for more documentation

//create a 200x200 grid of cells
let dim = 200;
let grid = new field2D(dim);
let gridNext = new field2D(dim);

let population_size = 50;
let agents = [];

let source = {
  pos: new vec2(0.5, 0.5),
  vel: vec2.random(0.003),
};
let sugar = new field2D(100);
let sugar_copy = grid.clone();

//grid values: alpha, x, y
//grid.set(1, 10, 10)

// called at start, and whenever Enter key is pressed:
function reset() {
  //randomly create grids that regenerates new grids each time it resets
  grid.set(function() {
    return random(2);
    agents.length = 0;
  for (let i=0; i<50; i++) {
    agents.push(makeAgent());
  }
    return 0;
  });
  
  for (let i=0; i < population_size; i++) {
    let agent = {
      pos: new vec2(random(), random()),
      vel: vec2.random(0.01),
      size: 0.03,
      
      memory: 0,
    };
    agents[i] = agent;
  }
}
// called to render graphics
// ctx is an HTML5 canvas 2D rendering context
function draw(ctx) {
  grid.draw();
  
  for (let a of agents) {
    draw2D.push()    
        .translate(a.pos)
        .rotate(a.vel)
        .scale(a.size);
    
    draw2D.color("blue");
    draw2D.triangle();
    draw2D.pop();
  }
}

// called before rendering each frame
// dt is the time in seconds since the last update()
function update(dt) {
  //draw grids in random locations
  //grid.set(random(2), random(32), random(32))
  
  gridNext.set(function(x,y){
    let C = grid.get(x, y);
    
    let N = grid.get(x, y - 1);
    let NE = grid.get(x + 1, y - 1);
    let E = grid.get (x + 1, y);
    let SE = grid.get(x + 1, y + 1);
    let S = grid.get (x, y + 1);
    let SW = grid.get(x - 1, y + 1);
    let W = grid.get(x - 1, y);
    let NW = grid.get(x - 1, y - 1);
    let diagonal = NE + NW + SW + SE;
    let perpendicular = N + E + W + S;
    let poles = E + W;
    let luck = 1/2;
    
    if (C == 1){ // alive
      if (diagonal < 1 && perpendicular < 1 && poles < 1 && random() < luck){
        return 0; //death by loneliness
      } else if (diagonal > 2 && perpendicular > 2 && poles > 1 && random() < luck){
        return 0; //death by overcrowding
      }
    } else if (C == 0){ //dead
      if ((diagonal == 3 && random() > luck) || (perpendicular == 3 && random() > luck) && (poles > 1 && random() > luck)){
        return 1; //reproduction
      }
    } else if (C == 0){//dead
      if ((total > 3) && random() > luck){
        return 1 // reproduction
      }
    }
    return C;
  })
  
  let temp = grid;
  grid = gridNext;
  gridNext = temp;
  
  for (let a of agents) {
    // sense the world:
    a.smell = grid.sample(a.pos);
    
    if (a.smell < a.memory) {
      // swimming:
      a.vel.rotate(0.1*(random()-0.5)).len(0.01*random());
      
    }else if (a.smell > a.memory){ //creates a "whirlpool"
      a.vel.rotate(0.01*random());
    } 
    else { //allow the agents to escape
   a.vel.add(vec2.random(0.02))
    }
    // remember this:
    a.memory = a.smell;
    
    grid.deposit(a.smell, a.pos);
    
    // now move:
    a.pos.add(a.vel).wrap(1);
  }
  
  sugar.map(function(v) {
    return Math.min(1, v*0.99);
  })
  
  // spread the sugar over space:
  let tmp = sugar_copy;
  sugar_copy = sugar;
  sugar = tmp;
  sugar.diffuse(sugar_copy, 0.5);
}

// called when any key events happen
// kind is the event type (down, up, etc.)
// key is the key (or keycode) pressed/released
function key(kind, key) {
  if (kind == "down" && key == "f") {
    update();
  }
}

reset();
