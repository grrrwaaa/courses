title = "Custom Game of Life"
author = "Chohan Anas"

// create a 32 x 32 grid of cells:
let dim = 256;
let grid = new field2D(dim);
let gridnext = new field2D(dim);

// called at start, and whenever Enter key is pressed:

function reset() {
  grid.set(function() { return random(2); });
}

function draw(ctx) {
  grid.draw();
}

// called before rendering each frame
function update(dt) {
  gridnext.set(function(x, y) { 
    let C = grid.get(x, y);
    let N = grid.get(x, y-3); // gets position 3 pixels up
    let NE = grid.get(x+1, y-random(3)+1); 
    let E = grid.get(x+1, y);
    let SE = grid.get(x+1, y+1);
    let S = grid.get(x, y+1);
    let SW = grid.get(x-1, y+1);
    let W = grid.get(x-1, y);
    let NW = grid.get(x-1, y-1);
    let total = N+NE+E+SE+S+SW+W+NW+(2*N); // total is emphasized with N position 
    if (C==1) { // alive
      if (N == 2)
        {
        return 1;
      } 
        
      if (total < 2) {
        return 0; //death by loneliness
      } else if (total > 3) {
        return 0; // death by overcrowding
      }
    } else if (C==0) { // dead
      if (total == 3) {
        return 1; // reproduction
      }
    }
    // else state remains same:
    return C;
  });
  
  let temp = grid;
  grid = gridnext;
  gridnext = temp;
}

reset();