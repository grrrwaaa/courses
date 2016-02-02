title = "Bacterium";
author = "Si Qi Zhou";

// create a new field
var field = new field2D(444);

// add initial noise
field.set(function(x, y) {
  return random(4);
});

// double-buffering
past = field.clone();

function world(x, y) {

  // directions
  var N = past.get(x, y + 1);
  var E = past.get(x + 1, y);
  var S = past.get(x, y - 1);
  var W = past.get(x - 1, y);
  var NE = past.get(x + 1, y + 1);
  var SE = past.get(x + 1, y - 1);
  var SW = past.get(x - 1, y - 1);
  var NW = past.get(x - 1, y + 1);
  var neighbours = N + S + E + W + NW + SW + NE + SE;
  var cross = N + S + E + W;
  var saltire = NE + SE + NW + SW;

  // CONDITIONS
  // current state:
  var current = past.get(x, y);
  // if alive
  // less than 2 neighbours, die
  // more than 3 neighhours, die
  //if (x < field.width){

  //begin rules
  // if it's alive
  if (current == 1) {
    // if there it's a cross, it dies
    if (cross == 4) {
      return 0;
      // if there it's a saltire, it dies
    } else if (saltire == 4) {
      return 0;
    }
    // if it's dead
  } else if (current == 0) {
    // if there 4 neighbours, it may respawn
    if (neighbours == 4) {
      return random();
      // if there is more than 4 neighbours, it'll respawn for sure
    } else if (neighbours > 4) {
      return 1;
    }
  } else {
    // otherwise it respawns
    return 1;
    //end rules

  }

  return current;

}

// update the simulation
// NB. called frequently
function update() {
  var temp = past;
  past = field;
  field = temp;

  // run the world
  field.set(world);

  // if there's more than 200 alive, then start killing some
  if (field.min < 4444) {
    for (i = 0; i < 4; i++) {
      var a = random(444);
      var b = random(444);
      for (j = 0; j < 44; j++) {
        field.set(0, a++, b++);
      }
    }
  }

}

function draw() {
  field.draw();
}