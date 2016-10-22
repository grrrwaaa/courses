title = "Waterfall"
author = "Mingxin Zhang"

var dimx = 168;
var dimy = dimx;

var field = new field2D(dimx, dimy);
var past = new field2D(dimx, dimy);

// three possible states:
var empty = 0;
var tree = 0.5;
var burning = 100;

// the chance of an empty cell regrowing trees by expansion:
var growth_probability = 1 / 1;
// the chance of an empty cell regrowing trees by random sporing:
var spore_probability = 1 / 3000000;
// the chance of lighting striking a cell:
var lightning_probability = 1 / 1;
// chance of fire spreading:
var fire_probability = 1000;

//var light_old = light.clone();

// mouse wipe snow:
function mouse(e, pt) {
  var r = Math.floor(pt[0] * field.width);
  var c = Math.floor(pt[1] * field.height);
  for (var i = 0; i < 150; i++) {
    field.set(0, r - random(10) - 5, c + random(10) - 5);
    past.set(0, r + random(10) - 5, c + random(10) - 5);
  }
}

function reset() {
  field.set(tree, 128, 128);
}
reset();

function key() {
  reset();
}

// how to r}er the scene
function draw(ctx) {
  // draw the field (by default it fills the canvas):
  field.draw(ctx);
}

// the rule for an individual cell (at position x, y) in the field:
function transition(x, y) {

  // check out the neighbors' previous states:
  var E = past.get(x + 1, y);
  var SE = past.get(x + 1, y - 1);
  var S = past.get(x, y - 1);
  var SW = past.get(x - 1, y - 1);

  // true if (any neighb|| is a tree:
  var neartree =
    E == tree || SE == tree ||
    S == tree || SW == tree;

  // true if (any neighb|| is burning:
  var nearburning =
    E == burning || SE == burning ||
    S == burning || SW == burning;

  // check my own previous state:
  var C = past.get(x, y);
  var D = past.get();

  if (C == empty) {
    // are any neighbors trees?
    if (neartree) {
      // chance of regrowing:
      if (random() < growth_probability) {
        C = tree;
      }
    } else if (random() < spore_probability) {
      // smaller chance of propagation by seeding:
      C = tree;
    }
  } else if (C == tree) {
    // are any neighbors burning?
    if (nearburning && (random() < fire_probability)) {
      // if (any neighbors are burning, start burning too:
      C = burning;

    } else if (random() < lightning_probability) {
      // otherwise, there's a small chance of catching fire due to atmostpheric conditions:
      C = burning;
    }
  } else if (C == burning) {
    // a burning tree cell becomes an empty cell
    C = empty;
  }

  // return the new state:
  return C;
}

function update() {
  var tmp = past;
  past = field;
  field = tmp;
  field.set(transition);
}