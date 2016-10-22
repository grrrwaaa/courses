author = "Benjamin Silverman"
title = "The Infected Game of Life"

// create a new field:
var dim = 140;
var field = new field2D(dim);

// duplicate the field for double-buffering:
var future = field.clone();

// chance of a cell being intitialized as a healing center:
var healing_center_probability = 1800;

// function to initialize with noise with chance of creating green healing centers:  
function reset() {
  field.set(function(c, r) {
    if (random(2) == 1) {
      return [1, 1, 1];
    } else if (random(healing_center_probability) == 2) {
      return [0, 1, 0];
    } else {
      return [0, 0, 0];
    }
  });
}

// calls the reset function:
reset();

// press a key to repopulate the field:
function key() {
  reset();
}

// true if the cell is infected(red):
function isinfected(cell) {
  return cell[0] == 1 && cell[1] == 0;
}

// true if the cell is a healer(green):
function ishealer(cell) {
  return cell[0] == 0 && cell[1] == 1 && cell[2] == 0;
}

// true if the cell is healed(yellow):
function ishealed(cell) {
  return cell[0] == 1 && cell[1] == 1 && cell[2] == 0;
}

// chance of a live cell becoming infected:
var infection_probability = 1 / 110000;

// update the simulation
function update() {
  future.set(function(c, r) {

    // neighbourhood:
    var C = field.cell(c, r);
    var E = field.cell(c + 1, r);
    var W = field.cell(c - 1, r);
    var N = field.cell(c, r + 1);
    var S = field.cell(c, r - 1);
    var NE = field.cell(c + 1, r + 1);
    var NW = field.cell(c - 1, r + 1);
    var SE = field.cell(c + 1, r - 1);
    var SW = field.cell(c - 1, r - 1);

    // check for alive neighbours:
    var near = E[0] + W[0] + N[0] + S[0] + NE[0] + NW[0] + SE[0] + SW[0];

    // true if any neighbour is infected:
    var nearinfected =
      isinfected(N) || isinfected(S) || isinfected(W) || isinfected(E) ||
      isinfected(NW) || isinfected(NE) || isinfected(SW) || isinfected(SE);

    // true if any neighbour is a healing center:
    var nearhealer =
      ishealer(N) || ishealer(S) || ishealer(W) || ishealer(E) ||
      ishealer(NW) || ishealer(NE) || ishealer(SW) || ishealer(SE);

    // true if any neighbour is healed:
    var nearhealed =
      ishealed(N) || ishealed(S) || ishealed(W) || ishealed(E) ||
      ishealed(NW) || ishealed(NE) || ishealed(SW) || ishealed(SE);

    // true if the cell is alive:
    if (C[0] == 1) {
      // true if the cell is infected:
      if (C[1] == 0) {
        // true if the infected cell is near a healing center:
        if (nearhealer) {
          // become healed:
          return [1, 1, 0];
          // true if the infected cell is near a healed neighbour:
        } else if (nearhealed) {
          // become healed:
          return [1, 1, 0];
        } else {
          // stay infected:
          return [1, 0, 0];
        }
      } else if (near < 2) {
        // die by loneliness:
        return [0, 0, 0];
      } else if (near > 3) {
        // die by overcrowding:
        return [0, 0, 0];
      } else {
        // true if a healed cell is near another healed neighbour:
        if (nearhealed) {
          // become alive:
          return [1, 1, 1];
          // true if an alive cell is near an infected neighbour:
        } else if (nearinfected) {
          // become infected:
          return [1, 0, 0];
          // small chance of an alive cell becoming infected:
        } else if (random() < infection_probability) {
          // become infected:
          return [1, 0, 0];
        } else {
          // stay alive:
          return [1, 1, 1];
        }
      }
      // true if the cell is dead or a healing center:
    } else {
      // true if the cell is a healing center:
      if (ishealer(C)) {
        // stay as healing center
        // true if the cell is healed:
      } else if (ishealed(C)) {
        // become alive:
        return [1, 1, 1];
        // true if the dead cell is near 3 alive neighbours:
      } else if (near == 3) {
        // become alive:
        return [1, 1, 1];
      } else {
        // stay dead:
        return [0, 0, 0];
      }
    }
    // return the new state:
    return [C[0], C[1], C[2]];
  });
  // swap the buffers:
  var temp = future;
  future = field;
  field = temp;
}

// render the simulation
function draw() {
  field.draw();
}