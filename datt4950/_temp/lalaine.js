// see https://grrrwaaa.github.io/courses/datt4950/labs.html for available methods

/* Swimming up stream
 * AQUA is the river stream
 * RED  is food 
 */

// field vars
var resolution = 128;
var wallNormalLeft = new vec2(-1, 0);
var wallNormalRight = new vec2(1, 0);
var wallMargin = 0.05;
var midTop = new vec2(0.5,1);
var freeSwim=false;


//river vars
var river = new field2D(resolution); // River field 
var riverIndex = random(river.width);
var topRowRiver = river.height - 1;
var newStream = true;

//food vars
var food = new field2D(resolution); // Food field 
var foodIndex = random(food.width);
var topRowFood = food.height - 1;
var newFood = true;
var foodCount = 5; // how often food appears, currently set at every 5 rows
var foodCounter = 0;

// fish vars
var schoolFishes = [];
var sensor_size = 0.5;
var base_speed = 0.1;
var min_speed = base_speed / 10;
var max_speed = 0.05;
var eyePosL = new vec2(-0.09, 0.1);
var eyePosR = new vec2(0.09, 0.1);
// initalizing array of fish
for (var i = 0; i < 15; i++) {
  var s = 0.1 + random(35) * 0.01;
  var colHue = map_range(s, 0.1, 0.45, 0, 0.08);
  schoolFishes.push({
    pos: new vec2(random(), random()),
    vel: (freeSwim)? vec2.random(0.1):new vec2(0, 0.05),
    size: s,
    bodyColour: [colHue, 1, 0.5],
  });
}

function mouse(e,p){
  if (e=="down"){ food.deposit(1,p);}
}
function key(event, key) {
 //   if (event="up" && key=="32"){freeSwim=!freeSwim}
}

// initalizing fields //
river.set(function(x, y) {
  if (y == topRowRiver && x == riverIndex) {
    return 1;
  }
});

food.set(function(x, y) {
  if (y == topRowFood && x == foodIndex) {
    return 1;
  }
});

// update methods for river field
function spawnRiver(x, y) {
  if (x == river.width - 1) {
    newStream = true;
    riverIndex = random(river.width);
  }
  //Because field wraps, clear the top row
  if (y == topRowRiver && x != riverIndex) {
    return 0;
  }

  // water gets generated at a random index in the top row
  if (y == topRowRiver && x == riverIndex && newStream) {
    newStream = false;
    return 1;
  }

  return river.get(x, y + 1);
}

// update method for Food field
function spawnFood(x, y) {
  if (x == food.width - 1) {
    newFood = true;
    foodIndex = map_range(random(food.width),0,food.width,food.width*wallMargin, food.width*(1-wallMargin)); // random food generation, avoiding within bounds
  }
  //Because field wraps, clear the top row!
  if (y == topRowFood && x != foodIndex) {
     // return 0;
  }
  if (y == topRowFood && x == foodIndex && newFood && foodCount != foodCounter) {
    foodCounter++;
    return 0;
  }
  if (y == topRowFood && x == foodIndex && newFood && foodCount == foodCounter) {
    newFood = false;
    foodCounter = 0;
    return 1;
  }
  return food.get(x, y + 1);
}


// MAIN UPDATE //
function update() {
  
  river.set(spawnRiver);
  river.diffuse(river.clone(), 0.25, 5);
  river.normalize();
  
  food.set(spawnFood);
  food.diffuse(food.clone(), 0.025, 3);
  food.normalize();

  for (var fish of schoolFishes) {

    dir = (freeSwim)?fish.vel.angle():fish.pos.anglebetween(midTop); // if free swim then direction is vel angle, else its the direction of the pos  vs the top mid point.
    
    // converting sensor locations from local agent space, to world space
    // scale it to size, rotate the axis, move it to the agent location
    scannerL = eyePosL.clone().mul(fish.size).rotate(dir).add(fish.pos);
    scannerR = eyePosR.clone().mul(fish.size).rotate(dir).add(fish.pos);

    
    console.log("ps",fish.pos);
    // sense 
    s1 = food.sample(scannerL) - 0.5;
    s2 = food.sample(scannerR) - 0.5;
    mouth = food.sample(fish.pos); // 

    if (mouth > 0.15) {
      food.deposit(-mouth, fish.pos);
      food.update(mouth, [random(), 0]);

    }

    var w1 = -s1;
    var w2 = -s2;

    //locomotion
    var turn = w2 - w1;
    var speed = (w1 + w2) / 2;
    speed = Math.max(0.1, speed);
    fish.vel.rotate(turn).len(0.025 * speed * (1 - fish.size));

  
   

    var futurePos = fish.pos.clone().add(fish.vel);
// wall bounces//
    if (!freeSwim){
    if (futurePos[0] < wallMargin && futurePos[0] > 0) {
       //reflection = direction-2(direction dot wallNormal)* wallNormal
      var reflection = fish.vel.clone().sub(wallNormalLeft.clone().mul(fish.vel.clone().dot(wallNormalLeft).mul2));
      fish.vel.add(reflection).limit(max_speed);
    } else if (futurePos[0] > 1 - wallMargin && futurePos[0] > 0) {
      var reflection = fish.vel.clone().sub(wallNormalRight.clone().mul(fish.vel.clone().dot(wallNormalRight).mul2));
      fish.vel.add(reflection).limit(max_speed);
    }
    }
    fish.pos.add(fish.vel).wrap(1);

    waterlevels = river.sample(fish.pos);
    river.deposit(-waterlevels, fish.pos);
    river.deposit(waterlevels, [random(), river.height / 2]);
  }

}

// MAIN DRAW //
function draw() {
  draw2D.blend(true);
  draw2D.color("red");
  food.draw();
  draw2D.blend(false);
  for (var fish of schoolFishes) {
    var angle=(freeSwim)?fish.vel:fish.pos.anglebetween(midTop);
    draw2D.push().translate(fish.pos).rotate(angle).scale(fish.size);

    draw2D.hsl(fish.bodyColour[0], fish.bodyColour[1], fish.bodyColour[2]).circle([0, 0], 0.25); // fish head
    draw2D.color("white").circle([eyePosL], 0.06).circle([eyePosR], 0.06);
    draw2D.push().translate([0, -0.055]).scale([0.65, 1]).rotate(Math.PI * .25);
    draw2D.color("gold").circle([-0.125, -0.125], 0.15) // fish 
      .circle([-0.125, 0.05], 0.125) // fin left
      .circle([0.075, -0.150], 0.125); //fin right
    draw2D.hsl(fish.bodyColour[0], fish.bodyColour[1], fish.bodyColour[2]).rect([0, 0], 0.25); // fish tail
    draw2D.pop();
    draw2D.pop();
  }
  draw2D.blend(true);
  draw2D.color(0,1,1,0.75);

  river.draw();
  draw2D.blend(false);
}

// util function
function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}