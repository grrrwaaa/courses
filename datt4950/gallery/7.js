title = "Langton's Scanner";
author = "William Cook";

var speed = 128;
var dimx = 256,
  dimy = 256;
var field = new field2D(dimx, dimy);

// makes the field white:
field.set(1);

// starting position:
var antx = dimx / 2; //starts in the middle for aesthetics 
var anty = dimy; //starts at the top, 2as water should
var direction = 0;

function draw() {
  field.draw()
}

// update the state of the scene.
function update(dt) {

  for (var i = 1; i <= speed; i++) {

    // apply the rule.
    var state = field.get(antx, anty);
    if (state == 1) {
      direction = wrap(direction + 1, 4);
      field.set(0, antx, anty);
    } else {
      direction = wrap(direction - 1, 4);
      field.set(1, antx, anty);
    }
    if (state == 0) {
      direction = wrap(direction + 2, 8);
    }

    // move the ant, modulo removed to create more geometric patterns
    if (direction == 0) {
      // North
      anty = (anty + 1)
    } else if (direction == 1) {
      //West
      antx = (antx - 1)
    } else if (direction == 2) {
      // South
      anty = (anty - 5)
    } else {
      // East
      antx = (antx + 1)
    }
  }
}