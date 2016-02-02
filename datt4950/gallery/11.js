title = "Ant Pattern";
author = "Peace Ayorinde";

// Title : antPattern 
// modified from http://codepen.io/grrrwaaa/pen/wMqpME
// by Peace Ayorinde 
var cells = new field2D(256);
// another alternative with different spin and direction values

/*var ants = [
  { x: cells.width - 30, y: cells.height - 30, direction: 1, spin: 1 },
  { x: 32, y: 32, direction: 2, spin: -1 }, 
];  */

// An array of two ants with opposite spins
var ants = [{
  x: cells.width - 30,
  y: cells.height - 30,
  direction: 2,
  spin: 1
}, {
  x: cells.width - 30,
  y: cells.height - 30,
  direction: 1,
  spin: -1
}, ];

function step() {

  // how many ants:
  for (var a = 0; a < ants.length; a++) {
    // get a reference to the current ant:
    var ant = ants[a];

    // get cell color of current ant
    var sense = cells.get(ant.x, ant.y);

    cells.set(1 - sense, ant.x, ant.y);

    if (sense == 1) {
      // At a white square, turn 90° right,
      ant.direction += ant.spin;
    } else {
      // At a black square, turn 90° left, 
      ant.direction -= ant.spin;
    }

    // keep directions sane:
    ant.direction = wrap(ant.direction, 4);

    // ants move forward with varied units depending on the direction 
    if (ant.direction == 0) {
      ant.y += 5; //10; 
    } else if (ant.direction == 1) {
      ant.x += 10; //2 ; 
    } else if (ant.direction == 2) {
      ant.y -= 10;
    } else if (ant.direction == 3) {
      ant.x -= 15; //5; 
    }
    // please fill free to try the alternate values that have been commented out above.   

  }
}

var steps = random(10);
function update() {
	for (var i=0; i<steps; i++) {
		step();
	}
}

function draw() {
  cells.draw();
}