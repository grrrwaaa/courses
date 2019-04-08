title = "Surfing the Wave"
author = "Jeremy Tantuco"

// create a 32 x 32 grid of cells:
let dim = 256;
let grid = new field2D(dim);
let gridnext = new field2D(dim);

let grid_copy = grid.clone();

let population_size = 100;
let agents = [];

function reset() {  
  
  //grid.set(function() { return random(2); });
  grid.set(0);
  
  for (let i=0; i<population_size; i++) {
    let agent = {
      pos: new vec2(random(), random()),
      vel: vec2.random(0.01),
      size: 0.03,
      color: 0.6,
      colordir: true,
    };
    agents[i] = agent;
  }
}

function draw(ctx) {
  grid_copy.draw();
  
  for (let a of agents) {
    draw2D.hsl(a.color);
    
    draw2D.push()    
        .translate(a.pos)
        .rotate(a.vel)
        .scale(a.size);
    
    draw2D.circle();
    
    draw2D.pop();
  }
}

function update(dt) {
  for (let a of agents) {
    // sense the world:
    a.smell = grid_copy.sample(a.pos);
    
    
    if (a.smell < 0.55) {
      // if on a dark spot
      // change color to blue hues
      if (a.colordir) {
        if (a.color > 0.65) {
          a.colordir = !a.colordir;
        }
        a.color += 0.01;
      } else {
        if (a.color < 0.6) {
          a.colordir = !a.colordir;
        }
        a.color -= 0.01;
      }
      a.color += 0.0001*(random()-0.5);//slight variation between agents
      
      // have agents shuffle upwards, randomly going left and right
      a.vel[0] += 0.005*(random()-0.5);
      a.vel[0] = clamp(a.vel[0], -0.01, 0.01)
      a.vel[1] = -1 - 0.01*random();
      
    } else {
      // if on a bright spot
      // change color to red hues
      a.color = 0.9;
      if (a.colordir) {
        if (a.color > 1) {
          a.colordir = !a.colordir;
        }
        a.color += 0.05;
      } else {
        if (a.color < 0.9) {
          a.colordir = !a.colordir;
        }
        a.color -= 0.05;
      }
      
      // have agents shuffle upwards at a slower speed, randomly going left and right
      a.vel = new vec2(0, 1);
      a.vel.rotate(1*(random()-0.5)).len(0.01*random() - (a.color - 0.6) * 0.03);
    }
    
    // move agents
    a.pos.add(a.vel).wrap(1);
    // resize agents depending on y axis
    a.size = 0.008 + a.pos[1] * 0.036;
  }
  
  // cellular automata code taken from my assignment 1, Waves
  gridnext.set(function(x, y) { 
    let C = grid.get(x, y);
    // we only need the 3 south neighbours
    let SE = grid.get(x+1, y+1);
    let S = grid.get(x, y+1);
    let SW = grid.get(x-1, y+1);
    
    let total = SE+S+SW;
    
    if (C==1 && total == 1) {
      // if current cell == 1 and there's 1 live southward cell, invert all southward neighbours
      grid.set(invert(SE), x+1, y+1);
      grid.set(invert(S), x, y+1);
      grid.set(invert(SW), x-1, y+1);
      
      return 0;
    } else if (random() < 0.0007) {
      // float balanced to prevent overcrowding and undercrowding
      // random placement of live cells provide constant unique generation of cell structures
      return 1;
    }
    return C;
  });
  
  let temp = grid;
  grid = gridnext;
  gridnext = temp;
  // get a diffused copy of the original grid
  grid_copy = gridnext;
  grid_copy.diffuse(grid, 10);
}

// called when any mouse (or touch) events happen
// kind is the event type (down, up, move, etc.)
// pt is a normalized mouse coordinate
// id refers to any button pressed/released
function mouse(kind, pt, id) {
}

// called when any key events happen
// kind is the event type (down, up, etc.)
// key is the key (or keycode) pressed/released
function key(kind, key) {
  // run one frame only if the "f" key is pressed:
  if (kind == "down" && key == "f") {
    update();
  }
}

function invert(i) {
  return i==1 ? 0 : 1;
}