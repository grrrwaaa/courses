title = "Broken Diamonds";
author = "Victor Zohni";

var dimx = 256,
  dimy = dimx;
var field = new field2D(dimx, dimy);
//the spinValue variable starts with a randomly selected integer from 1 to 4
var spinValue = Math.floor((Math.random() * 4) + 1);
var count = 0;

// turn it white:
field.set(1);

// define an ant:
function ant(x, y, spin) {
  this.x = x;
  this.y = y;
  this.direction = 0;
  // which direction the ant should turn when it finds an active cell:
  this.spin = spin;
}

// make some ants!
var ants = [
  new ant(field.width/2, field.height/2, 1),
  new ant(field.width/2, field.height/2 + 1, 1),

];

// how to render the scene
function draw(ctx) {
  //draw the field (by default it fills the canvas):
  field.draw();

  // scale context to field pixel size:
  //ctx.scale(1 / dimx, 1 / dimy);

//   for (var j = 0; j < ants.length; j++) {
//     var ant = ants[j];
//     if (ant.spin == 1) {
//       ctx.fillStyle = "red";
//     } else {
//       ctx.fillStyle = "green";
//     }
//     ctx.fillRect(ant.x, ant.y, 1, 1);
//   }
}


function update(dt) {
  //added forloop for speed 
  for (var i = 1; i <= 50; i++)
  {
  
  for (var j = 0; j < ants.length; j++) {
    var ant = ants[j];

    // move the ant.
    if (ant.direction == 0) {
      // North
      ant.y = (ant.y + 1) % field.height;
    } else if (ant.direction == 1) {
      // West
      ant.x = (ant.x - 1) % field.width;
    } else if (ant.direction == 2) {
      // South
      ant.y = (ant.y - 1) % field.height;
    } else {
      // East
      ant.x = (ant.x + 1) % field.width;
    }

    // apply the rule.
    var state = field.get(ant.x, ant.y);
    if (state == 1) {
      // change the cell state:
      field.set(0, ant.x, ant.y);
      // turn in the preferred direction:
      
      //if count is 1000, which will happen over a period of time. change the spinValue. 
      if (count == 1000){
        //this is done to give the project a level of rigidness. If the value was over 4, it would start to look messy 
        if (spinValue == 4){
          spinValue = 0;
        }
        spinValue++;
        count =0;
      }
      ant.direction = wrap(ant.direction + ant.spin, spinValue);
      //increase count everytime the ant interacts with a white cell
      count++;
      //console.log("spinValue: " + spinValue);
       //console.log("count: " + count);
    } else {
      // change the cell state:
      field.set(1, ant.x, ant.y);
      // turn in the opposite direction:
      ant.direction = wrap(ant.direction - ant.spin,4);
      
    }
  }
  }
}