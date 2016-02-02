title = "Sword Ants";
author = "Rose";

var cells = new field2D(128);

var ants = [
  { x: cells.width/2+1, y: 32, direction: 1, spin: -1 },
  { x: cells.width/2-2, y: 32, direction: 3, spin: 1 },
];

function update() {
  // how many times to update the ants:
  for (var i = 0; i < 10; i++) {
    // how many ants:
    for (var a = 0; a < ants.length; a++) {
      // get a reference to the current ant:
      var ant = ants[a];
      
      var sense = cells.get(ant.x, ant.y);
      cells.set(1-sense, ant.x, ant.y);

      if (sense == 1) {
        // At a white square, turn 90° right,
        ant.direction += ant.spin;
      } else {
        // At a black square, turn 90° left, 
        ant.direction -= ant.spin;
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
}

function draw() {
  cells.draw();
}