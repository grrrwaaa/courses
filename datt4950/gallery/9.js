title = "Formulation";
author = "Cordelia Kwan";

// create a new field:
var field = new field2D(150);


// initialize with some noise:
field.set(function(x, y) {
  return random(2);
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
    if(N == 0 && S == 0){
      return 0;
    } else if (E == 1 && W == 1){
      return 0;
    } else if (NW == 0 && SE == 0){
      return 1;
    } else if (NE == 1 && SW == 1){
      return 0;
    }
    

    if(near < 3){
      return 1;
    } else if (near > 5){
      return 0;
      
    }
    if(N !== E){
      return 0;
    }
    
  } else if (C == 0) {
    // if dead
    if(N == 0 && S == 0){
      return 1;
    } else if (E == 1 && W == 1){
      return 1;
    } else if (NW == 0 && SE == 0){
      return 0;
    } else if (NE == 1 && SW == 1){
      return 0;
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
  
}

// render the simulation (called frequently!)
function draw() {
  field.draw();
}