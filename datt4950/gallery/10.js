title = "V4";
author = "James Ott";

//Size of the frame
var dimx = 256;
var dimy = dimx;
//pixel grid
var field = new field2D(dimx, dimy);
//change boundaries below
//set to 1 or 0 for different starting effect
field.set(1);
//dirt left behind a food worm
var dirt = 1;
//poop left behind a poop worm
var path = 0;
//the body of a poop worm
var poop = 0.2;
//the bosy of a food worm
var food = 0.7;
//the amount of worms in the earth, larger number will have more end movement, smaller will have stringier start paths, try 20, 200 or 2000
var wormSize = 2000;
//end of change boundaries
//worm class
function worm(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}
//initialize worm array
var worms = new Array(wormSize);
for (var i = 0; i < wormSize; i++) {
  //worms are given a random x and y and are randomly a poop or food worm
  worms[i] = new worm(random(dimx), random(dimy), random(2));
}
//draw function
function draw() {
  //draw the field
  field.draw();
}
//function that moves the worm according to there type and position
function wormMove() {
  //iterate throught the worms
  for (var j = 0; j < worms.length; j++) {
    //set the worm to the current iteration worm
    var worm = worms[j];
    //get all the neighbors of the current worm
    var N = field.get(worm.x, worm.y + 1);
    var NE = field.get(worm.x + 1, worm.y + 1);
    var E = field.get(worm.x + 1, worm.y);
    var SE = field.get(worm.x + 1, worm.y - 1);
    var S = field.get(worm.x, worm.y - 1);
    var SW = field.get(worm.x - 1, worm.y - 1);
    var W = field.get(worm.x - 1, worm.y);
    var NW = field.get(worm.x - 1, worm.y + 1);
    //logic for the poop worm
    if (worm.type == 0) {
      //direction the worm will move
      var direction = random(4);
      var temp = 0;
      //set of if statements that allow the worm to move the random direction according to the amount of neighbors it has that are a path 
      if (N == path) {
        temp++;
      }
      if (E == path) {
        temp++;
      }
      if (S == path) {
        temp++;
      }
      if (W == path) {
        temp++;
      }
      if (NE == path) {
        temp++;
      }
      if (SE == path) {
        temp++;
      }
      if (SW == path) {
        temp++;
      }
      if (NW == path) {
        temp++;
      }
      //if statements that move the worm if the direction it is going to free and the diagonals are free as well
      if (N != path && NE != path && NW != path && direction == 0) {
        field.set(path, worm.x, worm.y);
        worm.y++;
      } else if (E != path && NE != path && SE != path && direction == 1) {
        field.set(path, worm.x, worm.y);
        worm.x++;
      } else if (S != path && SE != path && SW != path && direction == 2) {
        field.set(path, worm.x, worm.y);
        worm.y--;
      } else if (W != path && SW != path && NW != path && direction == 3) {
        field.set(path, worm.x, worm.y);
        worm.x--;
      }
      //change the new spot to a poop worm
      field.set(poop, worm.x, worm.y);
      //if the worm can't move anymore then give it a new random spot
      if (temp >= 3) {
        worm.x = random(dimx);
        worm.y = random(dimy);
        //if uncommented it will allow for the CA to reach a stable point
        //worm.type = random(2);
      }
    } 
    //logic for a food worm
    else {
      //direction the worm can move, this one goes in all directions
      var direction = random(8);
       //if statements that move the worm if the direction it is going to free and the diagonals are free as well
      if ((N == path || N == poop) && direction == 0) {
        field.set(dirt, worm.x, worm.y);
        worm.y++;
      } else if ((E == path || E == poop) && direction == 1) {
        field.set(dirt, worm.x, worm.y);
        worm.x++;
      } else if ((S == path || S == poop) && direction == 2) {
        field.set(dirt, worm.x, worm.y);
        worm.y--;
      } else if ((W == path || W == poop) && direction == 3) {
        field.set(dirt, worm.x, worm.y);
        worm.x--;
      } else if ((NE == path || NE == poop) && direction == 4) {
        field.set(dirt, worm.x, worm.y);
        worm.x++;
        worm.y++;
      } else if ((SE == path || SE == poop) && direction == 5) {
        field.set(dirt, worm.x, worm.y);
        worm.x++;
        worm.y--;
      } else if ((SW == path || SW == poop) && direction == 6) {
        field.set(dirt, worm.x, worm.y);
        worm.x--;
        worm.y--;
      } else if ((NW == path || NW == poop) && direction == 7) {
        field.set(dirt, worm.x, worm.y);
        worm.x--;
        worm.y++;
      }
      //set the point as a food worm
      field.set(food, worm.x, worm.y);
    }
  }
}
//update function 
function update() {
  //calls the worm movement function
  wormMove();
}