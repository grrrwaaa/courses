title = "Forest Fire and Ants";
author = "Rose";

var dimx = dimy = 288;
var cells = new field2D(dimx, dimy);

// how many times to update the ants
var antspeed = 1500;

// initial condition
for (var i = 0; i < dimx; i++) {
  for (var j = 0; j < dimy; j++) {
    if (j > dimy / 2){
      cells.set(i%3==0 ? 1:.5, i, j);
    }else if (j <= dimy / 2){
      cells.set(i%3==0 ? .5:0, i, j);
    }
  }
}
// copy for double buffer
var past = cells.clone();

// define ants
function ant(x, y, spin) {
  this.x = x;
  this.y = y;
  this.direction = 0;
  // which direction the ant should turn when it finds an active cell:
  this.spin = spin;
}

// make ants
var ants = [
  new ant(dimx/3, dimy, 1),
  new ant(dimx, dimy/3, 1),
];

// param for forest fire
var empty, tree, burning;
// the chance of an empty cell regrowing trees by expansion:
var growth_probability = 1/400;
// the chance of an empty cell regrowing trees by random sporing:
var spore_probability = 1/1000000;
// the chance of lighting striking a cell:
var lightning_probability = 1/1000000;
// the chance of NW SW NE SE neighbors catching fire
var burncorner_probability = 2/5;

// forest fire transition rules
function transition(x,y){
  // check out the neighbors' previous states:
  var N  = past.get(x  , y+1);
  var NE = past.get(x+1, y+1);
  var E  = past.get(x+1, y  );
  var SE = past.get(x+1, y-1);
  var S  = past.get(x  , y-1);
  var SW = past.get(x-1, y-1);
  var W  = past.get(x-1, y  );
  var NW = past.get(x-1, y+1);
  
  // forest fire in the two different sections
  if(y <= dimy/2){
    empty = 0;
    tree = .5;
    burning = 1;
  }else if(y >= dimy/2){
    empty = .5;
    tree = 1;
    burning = 0;
  }
    // true if (any neighbor is a tree:
    var neartree = N == tree || E == tree 
          || W == tree || S == tree
          || NE == tree || SE == tree 
          || NW == tree || SW == tree;

    // true if (any neighbor is burning:
    var nearburning = N == burning || E == burning 
          || W == burning || S == burning 
          || NE  == burning && random()<burncorner_probability
          || SE == burning && random()<burncorner_probability
          || NW == burning && random()<burncorner_probability
          || SW == burning && random()<burncorner_probability;
      // check my own previous state:
    var C = past.get(x, y);

    if (C == empty) {
      if (neartree) {		    // are any neighbors trees?
        // chance of regrowing:
        if (random() < growth_probability) {
          C = tree;
        }
      } else if  (random() < spore_probability) {
        // smaller chance of propagation by seeding:
        C = tree;
      }
    } else if  (C == tree) {   // are any neighbors burning?
      if (nearburning) {
        // if (any neighbors are burning, start burning too:
        C = burning;

      } else if  (random() < lightning_probability) {		
        // otherwise, there's a small chance of catching fire due to atmostpheric conditions:
        C = burning;
      }
    } else if  (C == burning) { // a burning tree cell becomes empty
      C = empty;
    } 
  
	// return the new state:
	return C;
};

function update() {
    // how many times to update the ants:
  for (var i = 0; i < antspeed; i++) {
    for (var j = 0; j < ants.length; j++) {
      var ant = ants[j];

      // move the ant
      if (ant.direction == 0) {
        // North
        ant.y = (ant.y + 1) % cells.height;
      } else if (ant.direction == 1) {
        // West
        ant.x = (ant.x - 1) % cells.width;
      } else if (ant.direction == 2) {
        // South
        ant.y = (ant.y - 1) % cells.height;
      } else {
        // East
        ant.x = (ant.x + 1) % cells.width;
      }

      // apply the rule
      var state = cells.get(ant.x, ant.y);
      if (state == 0) {
        // change the cell state:
        cells.set(0.5, ant.x, ant.y);
        // turn in the preferred direction:
        ant.direction = wrap(ant.direction + ant.spin, 4);
      } else if(state == 0.5){
        // change the cell state:
        cells.set(1, ant.x, ant.y);
        // turn in the opposite direction:
        ant.direction = wrap(ant.direction - ant.spin, 4);
      }else{
        // change the cell state:
        cells.set(0, ant.x, ant.y);
        // turn in the opposite direction:
        ant.direction = wrap(ant.direction - ant.spin, 4);
      }
    }
  }
  
  // swap buffers
  var tmp = past;
  past = cells;
  cells = tmp;
  
  // apply forest fire transition rules
  cells.set(transition);
}

function draw() {
  cells.draw();
}