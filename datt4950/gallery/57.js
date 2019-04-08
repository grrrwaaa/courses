title = "Ants in 8 directions"
author = "Malcolm Harriott"

var dimx = 256,
  dimy = dimx;
var field = new field2D(dimx, dimy);
var fieldnext = field;

var speed = 10;
var numfish = 20;

// define a fish:
function fish(x, y, spin) {
  this.x = x;
  this.y = y;
  this.direction = random(8);
  // which direction the fish should turn when it finds an active cell:
  this.spin = spin;
}

// make some fish!
var school = [];

function reset() {
  // turn it white:
  field.set(1);
  school = [];
  for (var i = 0; i < numfish; i++) {
    randspin = random(15) - 8;
    if (randspin >= 0) {
      randspin += 1;
    }
  school.push(new fish(random(field.width), random(field.height), randspin));//random(2) ? 1 : -1))
  }
}

// how to render the scene
function draw(ctx) {
  // draw the field (by default it fills the canvas):
  field.draw();

  // scale context to field pixel size:
  ctx.scale(1 / dimx, 1 / dimy);

  for (var j = 0; j < school.length; j++) {
    var fish = school[j];
    if (fish.spin > 0) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "green";
    }
    ctx.fillRect(fish.x, fish.y, 1, 1);
  }
}

function update(dt) {
  for (var i = 0; i < speed; i++){
  for (var j = 0; j < school.length; j++) {
    var fish = school[j];

    // move the fish.
    if (fish.direction == 0) {
      // North
      fish.y = (fish.y + 1) % field.height;
    } else if (fish.direction == 1) {
      // Northeast
      fish.x = (fish.x + 1) % field.width;
      fish.y = (fish.y + 1) % field.height;
    } else if (fish.direction == 2) {
      // East
      fish.x = (fish.x + 1) % field.width;      
    } else if (fish.direction == 3) {
      // Southeast
      fish.x = (fish.x + 1) % field.width;
      fish.y = (fish.y - 1) % field.height;
    } else if (fish.direction == 4) {
      // South
      fish.y = (fish.y - 1) % field.height;
    } else if (fish.direction == 5) {
      // Southwest
      fish.x = (fish.x - 1) % field.width;
      fish.y = (fish.y - 1) % field.height;
    } else if (fish.direction == 6) {
      // West
      fish.x = (fish.x - 1) % field.width;
    } else if (fish.direction == 7) {
      // Northwest
      fish.x = (fish.x - 1) % field.width;
      fish.y = (fish.y + 1) % field.height;
    }

    // apply the rule.
    var state = field.get(fish.x, fish.y);
    if (state == 1) {
      // change the cell state:
      fieldnext.set(0, fish.x, fish.y);
      // turn in the preferred direction:
      fish.direction = wrap(fish.direction + fish.spin, 8);
    } else {
      // change the cell state:
      fieldnext.set(1, fish.x, fish.y);
      // turn in the opposite direction:
      fish.direction = wrap(fish.direction - fish.spin, 8);
      
      var temp = field;
      field = fieldnext;
      fieldnext = temp;
    }
  }
  }
}

reset();