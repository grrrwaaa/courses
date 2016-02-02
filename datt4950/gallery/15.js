title = "Eternal Roads";
author = "Alexei Sizov";

var cells = new field2D(128);
var ants = [{
  x: 64,
  y: 64,
  direction: 3
}, {
  x: 60,
  y: 60,
  direction: 2
}, {
  x: 68,
  y: 68,
  direction: 1
}];
var ignore = 0;

cells.set(function() {
  return random() < 0.01 ? 1 : 0;
});

function update() {
  for (var a = 0; a < ants.length; a++) {
    var ant = ants[a];
    var sense = cells.get(ant.x, ant.y);
    cells.set(1 - sense, ant.x, ant.y);
    //set cells around to black
    cells.set(0, ant.x - 1, ant.y - 1);
    cells.set(0, ant.x - 1, ant.y + 1);
    cells.set(0, ant.x + 1, ant.y - 1);
    cells.set(0, ant.x + 1, ant.y + 1);

    if (sense == 1) {
      ignore++;
      //if 10 white squares were ignored
      if (ignore == 10) {
        // At a white square, turn 90° right,
        ant.direction += 1;
        ignore = 0;
      }

      //when white cell is hit turn to black
      cells.set(0, ant.x - 1, ant.y - 1);
      cells.set(0, ant.x - 1, ant.y + 1);
      cells.set(0, ant.x + 1, ant.y - 1);
      cells.set(0, ant.x + 1, ant.y + 1);
    }

    // keep directions sane:
    ant.direction = wrap(ant.direction, 4);

    // move forward one unit:
    if (ant.direction == 0) {
      ant.y += 1;
    } else if (ant.direction == 1) {
      ant.x += 1;
    } else if (ant.direction == 2) {
      ant.y -= 1;
    } else if (ant.direction == 3) {
      ant.x -= 1;
    }

  }
}

function draw() {
  cells.draw();
}