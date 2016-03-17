author = "Brian's Brain"

var dimx = 256;
var dimy = dimx;
var field = new field2D(dimx, dimy);
var past = new field2D(dimx, dimy);

field.set(function() {
  if (random() < 0.1) {
    return 1;
  } else {
    return 0;
  }
});

function draw(ctx) {
  // draw the field (by default it fills the canvas):
  field.draw();
}

function transition(x, y) {
  
  var N;
  if (past.get(x, y + 1) > 0.5) {
    N = 1;
  } else {
    N = 0;
  }
  
  var N = past.get(x, y + 1) > 0.99 ? 1 : 0;
  var S = past.get(x, y - 1) > 0.99 ? 1 : 0;
  var E = past.get(x + 1, y) > 0.99 ? 1 : 0;
  var W = past.get(x - 1, y) > 0.99 ? 1 : 0;
  var NE = past.get(x + 1, y + 1) > 0.99 ? 1 : 0;
  var NW = past.get(x - 1, y + 1) > 0.99 ? 1 : 0;
  var SE = past.get(x + 1, y - 1) > 0.99 ? 1 : 0;
  var SW = past.get(x - 1, y - 1) > 0.99 ? 1 : 0;
  var total = N + S + E + W + NE + NW + SE + SW;
  var C = past.get(x, y);

  if (C == 1) {
    return 0.5;
  } else if (C < 0.1 && total == 2) {
    return 1;
  } else {
    return 0;
  }
}

function update() {
  var tmp = past;
  past = field;
  field = tmp;

  field.set(transition);
}