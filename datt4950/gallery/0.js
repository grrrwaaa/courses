title = "Fire Work";
author = "Lu Li";

var dimx = 256;
var dimy = dimx;
var boundaries = new field2D(256);
var field = new field2D(dimx, dimy);
var past = new field2D(dimx, dimy);
var rsqrts2 = 0.2;
// three possible states:
var empty = 0;
var tree = 1;
var burning = 2;
// the chance of an empty cell regrowing trees by expansion:
var growth_probability = 1 / 10;
// the chance of an empty cell regrowing trees by random sporing:
var spore_probability = 1 / 1000;
// the chance of lighting striking a cell:
var lightning_probability = 1 / 10000;

var burn_probability = 1;
// how to r}er the scene

//set up the ant as monster
var ants = [{
    x: 130,
    y: 30,
    direction: 2,
    spin: 1
  },
  // another ant { x: 130, y: 200, direction: 2, spin: 1 },
];
boundaries.set(function(x, y) {
  if (y < dimy * 2 / 3 && y > dimy / 3)
    return x == 1 ? 1 : 0;
});

function draw() {
  // draw the field (by default it fills the canvas):
  field.draw();
}

// the rule for an individual cell (at position x, y) in the field:
function transition(x, y) {

  var N = past.get(x, y + 1);
  var E = past.get(x + 1, y);
  var S = past.get(x, y - 1);
  var W = past.get(x - 1, y);
  var NE = past.get(x + 1, y + 1);
  var SE = past.get(x + 1, y - 1);
  var SW = past.get(x - 1, y - 1);
  var NW = past.get(x - 1, y + 1);
  var near = N + S + E + W + NW + SW + NE + SE
    // current state:
  var C = past.get(x, y);
  // transition rule:
  // if alive:
  if (C == 1) {
    if (near < 2) {
      // die by loneliness:
      return 1;
    } else if (near > 3) {
      // die by overcrowding:
      return 2;
    }
  } else if (C == 0) {
    // if dead, rebirth by three neighbours:
    if (near == 3) {
      return 3;
    }
  }
  // else remain the same:
  return C / 2;

}

function update() {
  var tmp = past;
  past = field;
  field = tmp;
  field.set(transition);
  //set up boundaries
  boundaries.set(function(x, y) {
    return boundaries.get(x + 1, y); // boundary move speed
  });
  //set up the ant 
  for (var i = 0; i < 100; i++) {
    // how many ants:
    for (var a = 0; a < ants.length; a++) {
      // get a reference to the current ant:
      var ant = ants[a];
      var sense = field.get(ant.x, ant.y);
      field.set(1 - sense, ant.x, ant.y);
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
        ant.y += 1.5 //change to 2
      } else if (ant.direction == 1) {
        ant.x += 1.5; //change to 2
      } else if (ant.direction == 2) {
        ant.y -= 1; //change to 2
      } else if (ant.direction == 3) {
        ant.x -= 1.5; //change to 2
      }

    }
  }
}