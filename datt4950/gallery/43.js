title = "Data Rot"
author = "Rory Hoy"

var dimx = 256,
  dimy = 256;
var field = new field2D(dimx, dimy);
var future = field.clone();

field.set(function(c, r) {
  if (c > 125) {
    return 1;
  } else if (r > 125) {
    return 1;
  } else {
    return 0;
  }
});

function update() {

  //transition rule:
  future.set(function(c, r) {
      //current state:
      var C = field.get(c, r - 2);
      //neighbour states:
      var E = field.get(c + 1, r);
      var W = field.get(c - 1, r);
      var N = field.get(c, r + 1);
      var S = field.get(c, r - 1);
      var NE = field.get(c + 1, r + 1);
      var NW = field.get(c - 1, r + 1);
      var SE = field.get(c + 1, r - 1);
      var SW = field.get(c - 1, r - 1);
      //how many neighbours are alive
      var n = E + W + N + S + NE + NW + SE + SW;
      ///////////////////////////
      //middle line
      if (c > random(2) + 90 && c < random(2) + 165.5 && r < random(5) + 129.5 && r > random(5) + 128) {
        if (n > 0) {
          return [random(), random(), random()];
        }
      } else if (c > 85.5 && c < 171 && r < 171 && r > 85.5) {
        //black square
        return 0;
      } else {
        if (C == 1) {
          if (n < 1) {
            return 0;
          } else if (n > 3) {
            return [random(), random(), random()];
          } else {
            return 1;
          }
        } else {
          if (n == 2) {
            return 1;
          } else {
            return 0;
          }
        }
      }
      return C;
    })
    //swap:
  var temp = future;
  future = field;
  field = temp;

}

function draw() {
  // rendering code here
  field.draw();
}