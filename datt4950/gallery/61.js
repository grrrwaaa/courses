title = "Waves"
author = "Jeremy Tantuco"

// create a 32 x 32 grid of cells:
let dim = 256;
let grid = new field2D(dim);
let gridnext = new field2D(dim);

// called at start, and whenever Enter key is pressed:
function reset() {
  // start with an empty grid
  grid.set(0);
}

// called before rendering each frame
function update(dt) {
  gridnext.set(function(x, y) { 
    let C = grid.get(x, y);
    // for this project we only need the 3 south neighbours
    let SE = grid.get(x+1, y+1);
    let S = grid.get(x, y+1);
    let SW = grid.get(x-1, y+1);
    
    let total = SE+S+SW;
    
    if (C==1 && total == 1) {
      // if current cell == 1 and there's 1 live southward cell, invert all southward neighbours
      // invert() method found at line 65
      grid.set(invert(SE), x+1, y+1);
      grid.set(invert(S), x, y+1);
      grid.set(invert(SW), x-1, y+1);
      
      return 0;
    } else if (random() < 0.0007) {
      // random float balanced to prevent overcrowding and undercrowding
      // random placement of live cells provide constant unique generation of cell structures
      return 1;
    }
    
    return C;
  });
  
  let temp = grid;
  grid = gridnext;
  gridnext = temp;
}

// called to render graphics
function draw(ctx) {
  grid.draw();
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
  
}

function invert(i) {
  return i==1 ? 0 : 1;
}