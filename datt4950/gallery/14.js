title = "The Fuse of Life";
author = "Radi Hilaneh";

// create a new field:
var field = new field2D(512);

// initialize with some noise:
field.set(function(x, y) {
  return x == y || x == y - 1 ? 1 : 0;
});

// duplicate the field for double-buffering:
past = field.clone();

// the game of life rule:
function game(x, y) {
  // neighbourhood:
  var N = past.get(x, y + 1);
  var E = past.get(x + 1, y);
  var S = past.get(x, y - 1);
  var W = past.get(x - 1, y);
  var NE = past.get(x + 1, y + 1);
  var SE = past.get(x + 1, y - 1);
  var SW = past.get(x - 1, y - 1);
  var NW = past.get(x - 1, y + 1);
  var near = N + S + E + W + NW + SW + NE + SE;
  // current state:
  var C = past.get(x, y);
  // transition rule:
  // if alive:
  if (C == 1) {
    if (near < 2) {
      // die by loneliness:
      return [0, 1, 0];
    } else if (near > 3) {
      // die by overcrowding:
      return [0, 1, 1];
    }
  } else if (C == 0) {
    // if dead, rebirth by three neighbours:
    if (near == 3) {
      return [1, 1, 0];
    }
  }
  // else remain the same:
  return C;
}

// update the simulation (called frequently!)
function update() {
  // swap the buffers (cheaper than copying)
  var tmp = past;
  past = field;
  field = tmp;

  // run the game one step:
  field.set(game);
  //random is from 0 to 1
  if (random() < 1) {
    var x = random(field.width);
    var y = random(field.height);
    var v = field.get(x, y);
    //console.log(x, y, +!v);
    field.set(1 - v, x, y);
  }
}

// render the simulation (called frequently!)
function draw() {
  field.draw();
}