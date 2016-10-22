title = "Strand Extraction";
author = "Tongliang Liu";

//new field and a clone for buffering
var field = new field2D(256, 256);
var future = field.clone();

//random start
field.set(function(c, r) {
  return random(2);
});

//when the field is reset, randomize again
function reset() {
  field.set(function(c, r) {
    return random(2);
  });
}
//reset on a key press
function key() {
  reset();
}

function update() {
  //for (var i = 0; i < 500; i++) {
  // simulation code here
  future.set(function(c, r) {
    //current state
    var C = field.get(c, r);
    //neighbourhoodstates
    var E = field.get(c + 1, r);
    var W = field.get(c - 1, r);
    var N = field.get(c, r + 1);
    var S = field.get(c, r - 1);
    var NE = field.get(c + 1, r + 1);
    var NW = field.get(c - 1, r + 1);
    var SE = field.get(c + 1, r - 1);
    var SW = field.get(c - 1, r - 1);
    //bottom and top areas of a square
    var z = N + W + NW;
    var z2 = S + E + SE;

    //rules
    if (C == 1) {
      //bottom area is full
      if (z2 == 3) {
        return 0;
      } else if (z >= 1) {
        return 1; //top area has at least 1, if the bottom area isnt full
      } else {
        return 0;
      }
    } else { //creates more if the top area has at least 2 and the square is empty
      if (z >= 2) {
        return 1;
      } else {
        return 0;
      }
    }
    return C;
  });
  //swap, buffering
  var temp = future;
  future = field;
  field = temp;
  //}
}

function draw() {
  // rendering code here
  field.draw();
}