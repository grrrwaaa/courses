title = "Black_Plague";
author = "Michael Stuart";

//Black_Plague.js
//inspiration from:
//https://www.youtube.com/watch?v=rnp4-RoRxSo
//sped up mold spore growth, also inspiration on the bubonic plague spread with
//"colonies" that are grouped tightly together passing the desease onto one another
//as the "colonies" grow closer together 
//this is an edit on the "Forest Fire" by grrrwaaa

var dimx = 300;
var dimy = dimx;

var field = new field2D(dimx, dimy);
var past = new field2D(dimx, dimy);

// four possible states:
var empty = 0;
var carrier = 0.6;
var tree = 1;
var sick = 0.5;

// the chance of an empty cell regrowing trees by expansion:
var growth_probability = 1 / 200;
// the chance of an empty cell regrowing trees by random sporing:
var spore_probability = 1 / 5000000;
// the chance of a cell becoming sick:
var lightning_probability = 1 / 100000;
// the chance cell becoming sick by proximity
var sick_prob = 1 / 3;
// the chance sick cell dying
var sick_death = 10 / 16;

// how to render the scene
function draw(ctx) {
  // draw the field (by default it fills the canvas):
  field.draw();
}

// the rule for an individual cell (at position x, y) in the field:
function transition(x, y) {

  // check out the neighbors' previous states:
  var N = past.get(x, y + 1);
  var NE = past.get(x + 1, y + 1);
  var E = past.get(x + 1, y);
  var SE = past.get(x + 1, y - 1);
  var S = past.get(x, y - 1);
  var SW = past.get(x - 1, y - 1);
  var W = past.get(x - 1, y);
  var NW = past.get(x - 1, y + 1);

  // true if (any neighb|| is a tree:
  var neartree = N == tree || E == tree || W == tree || S == tree || NE == tree || SE == tree || NW == tree || SW == tree;

  // true if (any neighb|| is sick:
  var nearsick = N == sick || E == sick || W == sick || S == sick || NE == sick || SE == sick || NW == sick || SW == sick;

  //true is an ajeacent cell is a carrier
  var nearcarrier = N == carrier || E == carrier || W == carrier || S == carrier || NE == carrier || SE == carrier || NW == carrier || SW == carrier;

  // check my own previous state:
  var C = past.get(x, y);

  // ***EMPTY CELLS***
  if (C == empty) {
    // are any neighbors trees?
    if (neartree || nearcarrier) {
      // chance of regrowing:
      if (random() < growth_probability) {
        C = tree;
      }
    } else
    if (random() < spore_probability) {
      // smaller chance of propagation by seeding:
      C = tree;
    }
  }

  //***TREE CELLS***
  else
  if (C == tree) {
    // are any neighbors sick?
    if (nearsick) {
      // if any neighbors are sick, start sick too:
      if (random() < sick_prob) {
        C = sick;
      } else {
        C = tree
      }
    } else
    if (nearcarrier) {
      // if any neighbors are sick, start sick too:
      if (random() < sick_prob) {
        C = sick;
      }
    } else
    if (random() < lightning_probability) {
      // otherwise, there's a small chance of catching illness due to atmostpheric conditions:
      C = sick;
    }
  }

  //***SICK CELLS***
  else
  if (C == sick) {
    // a sick cell becomes a carrier cell a small amount of the time
    if (random() > sick_death) {
      C = carrier;
    }
    // a sick tree cell becomes an empty cell
    else {
      C = empty;
    }
  }

  //***CARRIER CELLS***
  else
  if (C = carrier) {
    if (nearsick) {
      C = sick;
    }
  }

  // return the new state:
  return C;
}

function step() {
  var tmp = past;
  past = field;
  field = tmp;

  field.set(transition);
}

function update() {
	step();
}