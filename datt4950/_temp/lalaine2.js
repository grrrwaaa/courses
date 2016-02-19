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
var midTop = new vec2(0.5, 1);
var freeSwim = false;
var fishMinimum=5;
var fishMaximum=20;

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
var foodCount = 3; // how often food appears, currently set at every 5 rows
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
for (var i = 0; i <5; i++) {
  var s = 0.05 + random(25) * 0.01;
  var colHue = map_range(s, 0.1, 0.3, 0, 0.20);
  schoolFishes.push({
    pos: new vec2(random(), random()),
    vel: (freeSwim) ? vec2.random(0.1) : new vec2(0, 0.05),
    size: s,
    bodyColour: [colHue, 1, 0.5],
    energy:1,
    age:map_range(s, 0.1, 0.3, 1,10),
  });
}

function mouse(e, p) {
  if (e == "down") {
    food.deposit(5, p);
  }
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
   // return 0;
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
  
  if (x == 0 && y== topRowFood) {
    newFood = true;
    foodIndex = map_range(random(food.width), 0, food.width, food.width * wallMargin, food.width * (1 - wallMargin)); // random food generation, avoiding within bounds
  }
   //Because field wraps, clear the top row
  if (y == topRowFood && x != foodIndex && !newFood) {
   // return 0;
  }
  
  if (y == topRowFood && x == foodIndex && newFood) {
    newFood = false;
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
  food.diffuse(food.clone(), 0.025,3);
  food.mul(0.9);
  food.normalize();
  
  var i= schoolFishes.length;

  while(i--) {

   var fish= schoolFishes[i];
    //dir = (freeSwim) ? fish.vel.angle() : fish.pos.anglebetween(midTop); // if free swim then direction is vel angle, else its the direction of the pos  vs the top mid point.
    
     dir =  fish.pos.anglebetween(midTop);
    // converting sensor locations from local agent space, to world space
    // scale it to size, rotate the axis, move it to the agent location
    scannerL = eyePosL.clone().mul(fish.size).rotate(dir).add(fish.pos);
    scannerR = eyePosR.clone().mul(fish.size).rotate(dir).add(fish.pos);

   
    // sense 
    s1 = food.sample(scannerL) - 0.5;
    s2 = food.sample(scannerR) - 0.5;
    mouth = food.sample(fish.pos); // food sample 
    mouth= Math.max(mouth, 0);
    stream = river.sample(fish.pos);// river sample
    stream= Math.max(stream,0);

    if (mouth > 0.15) {
      // eating food
      food.deposit(-mouth, fish.pos);
      fish.energy+=mouth*0.5;
    }

    var w1 = -s1;
    var w2 = -s2;

    //locomotion
    var turn = w2 - w1;
    var speed = (w1 + w2) / 2;
    speed = Math.max(0.1, speed);
    console.log("norm");
    // die?
    if (((fish.energy <= 0.1) ||(fish.age>10))&& (schoolFishes.length-1)>fishMinimum) {
      schoolFishes.splice(i, 1);
    } else {
      
      if (fish.energy > 1){
                           fish.size+=0.0005;
                           fish.size=(fish.size<0.3) ? fish.size: 0.3;
                           colHue=map_range(fish.age, 1,15, 0, 1);
                           fish.bodyColour=[colHue, 1, 0.5];
                          }
     if ((fish.energy > 1) && (fish.age>5) && (schoolFishes.length-1)< fishMaximum) {
        
        // reproduce:
      var child = {
          pos: fish.pos.clone(),
          vel: (freeSwim) ? vec2.random(0.1) : new vec2(0, 0.1),
          size: 0.05,
          energy: fish.energy * 0.5,
          bodyColour: [0.5, 1, 0.5],
          age:1,
        };
        schoolFishes.push(child);
        fish.energy *= 0.5;
      }
    }
    
    fish.vel.rotate(turn).len(0.025*speed * (1 - fish.size) );
    
    var futurePos = fish.pos.clone().add(fish.vel);
    // lose energy due to effort of moving:
      fish.energy *= 0.95;
    // wall bounces//
    if (!freeSwim) {
      if (futurePos[0] < wallMargin && futurePos[0] > 0) {
        //reflection = direction-2(direction dot wallNormal)* wallNormal
        var reflection = fish.vel.clone().sub(wallNormalLeft.clone().mul(fish.vel.clone().dot(wallNormalLeft).mul2));
        reflection.len(0.1);
        fish.vel.add(reflection).limit(max_speed);
      } else if (futurePos[0] > 1 - wallMargin && futurePos[0] > 0) {
        var reflection = fish.vel.clone().sub(wallNormalRight.clone().mul(fish.vel.clone().dot(wallNormalRight).mul2));
        fish.vel.add(reflection).limit(max_speed);
      }
    }
    fish.pos.add(fish.vel).wrap(1);
    waterlevels = river.sample(fish.pos);
    if (waterlevels>0.2){
    river.deposit(-waterlevels, fish.pos);
    river.deposit(waterlevels, [random(), random()]);
    }
    fish.age+=0.0005;
 
  }

}

// MAIN DRAW //
function draw() {
  draw2D.blend(true);
  draw2D.color("green");
  food.draw();
  draw2D.blend(false);
  for (var fish of schoolFishes) {
    var angle = (freeSwim) ? fish.vel : fish.pos.anglebetween(midTop);
    var eggSize= (fish.energy<1) ? fish.energy: 1;
    draw2D.push().translate(fish.pos).rotate(angle).scale(fish.size);

    draw2D.hsl(fish.bodyColour[0], fish.bodyColour[1], fish.bodyColour[2]).circle([0, 0], 0.25); // fish head
    draw2D.push().translate([0, -0.055]).scale([0.65, 1]).rotate(Math.PI * .25);
    draw2D.color("gold").circle([-0.125, -0.125], 0.15) // fish 
      .circle([-0.125, 0.05], 0.125) // fin left
      .circle([0.075, -0.150], 0.125); //fin right
    draw2D.hsl(fish.bodyColour[0], fish.bodyColour[1], fish.bodyColour[2]).rect([0, 0], 0.25); // fish tail
    draw2D.pop();
    draw2D.color("white").circle([0,0],0.2*eggSize);
    draw2D.pop();
  }
  draw2D.blend(true);
  draw2D.color(0, 0.75, 1, 0.5);

  river.draw();
  draw2D.blend(false);
}

// util function
function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}