//create the pollen fields
var pollen = new field2D(128);
var pollen_old = pollen.clone();
//create the trail fields
var trail = pollen.clone();
var trail_old = trail.clone();
//create the return trail fields
var returnTrail = pollen.clone();
var returnTrail_old = returnTrail.clone();

/*VARIATIONS AREA*/
//the diffuse/decay of the trails
var trail_diffuse = 0.01;
var trail_decay = 0.99;
//signal decay
var signal_decay = 0.01;
//stat position of the hive
var hive_position = new vec2(0.5, 0.5);
//size of the hive
var hive_radius = 0.1;
//minimum hive size
var hive_min = 0.01;
//maximum hive size
var hive_max = 0.1;
//hive decay
var hive_decay = 0.001;
//hive grow
var hive_grow = 0.03;
//how long a bee has till death
var death = 300;
//size of the bees antenna sensors
var sensor_size = 0.4;
//amount of noise an antenna sensor has
var sensor_noise = 0.01;
//amount of pollen in the air
var pollen_count = 20;
//amount of bee's hard at work
var bee_count = 100;
//time it takes for the wind to gust, must be > 1
var wind_update = 10;
/*VARIATIONS AREA ENDS*/

//used to store the angle and the clock time of wind
var wind_angle = 0;
var wind_clock = 0;

//reset the pollen in the air
function reset_pollen() {
  // clear the pollen field
  pollen.set(0);
  //randomize pollen position
  for (var i = 0; i < pollen_count; i++) {
    var p = vec2.random(0.8).add(1).mul(0.5);
    pollen.deposit(random(8), p);
  }
  // blur pollen 
  pollen.diffuse(pollen.clone(), pollen.width, 150);
  // normalize and map to make crips pollen
  pollen.normalize();
  pollen.map(function(v) {
    return v > 0.1 ? 1 : 0;
  });
}
//first call to make pollen
reset_pollen();
//create bee's
var bees = [];
for (var i = 0; i < bee_count; i++) {
  bees.push({
    pos: hive_position.clone(),
    vel: vec2.random(0.001),
    size: 0.01,
    has_food: false,
    signal: 1,
    death_timer: death,
  });
}

function update() {
  // update trail
  var tmp = trail_old;
  trail_old = trail;
  trail = tmp;
  // diffuse trail
  trail.diffuse(trail_old, trail_diffuse).mul(trail_decay);
  // update return trail
  var tmp = returnTrail_old;
  returnTrail_old = returnTrail;
  returnTrail = tmp;
  // diffuse return trail
  returnTrail.diffuse(returnTrail_old, trail_diffuse).mul(trail_decay);
  //itterate over bee's
  var i = bees.length;
  while (i--) {
    var a = bees[i];
    var dir = a.vel.angle();
    // get sensor location:
    var s1 = new vec2(sensor_size, sensor_size).mul(a.size).rotate(dir).add(a.pos);
    var s2 = new vec2(sensor_size, -sensor_size).mul(a.size).rotate(dir).add(a.pos);

    var steer = srandom() * 0.5;
    //if bee has food
    if (a.has_food) {
      // drop trail
      if (a.signal > 0) trail.deposit(a.signal, a.pos);
      // check if the bee has arrived
      var athive_position = a.pos.distance(hive_position) < hive_radius/2;
      if (athive_position) {
        a.signal = 1;
        a.death_timer = death;
        hive_radius += hive_grow;
        if (hive_radius > hive_max) {
          hive_radius = hive_max;
        }
        console.log(hive_radius);
        a.has_food = false;
        a.vel.negate();
      }
      var v1 = returnTrail.sample(s1);
      var v2 = returnTrail.sample(s2);
      if (v1 + v2 > sensor_noise) {
        steer = v1 - v2;
      }
    }
    //if bee doesnt have food
    else {
      //drop trail
      if (a.signal > 0) returnTrail.deposit(a.signal, a.pos);
      // check if the bee has arrived
      var food = Math.max(0, pollen.sample(a.pos));
      if (food > 0) {
        a.signal = 1;
        pollen.deposit(-food, a.pos);
        a.has_food = true;
        a.vel.negate();
      }
      var v1 = trail.sample(s1);
      var v2 = trail.sample(s2);
      if (v1 + v2 > sensor_noise) {
        steer = v1 - v2;
      }
    }
    console.log(a.death_timer);
    //check if death timer is above zero
    if(a.death_timer > 0){
      a.death_timer --;
    }
    //if the death timer ran out
    else{
      bees.splice(i, 1);
    }
    //decay trail
    a.signal -= signal_decay;
    //move and rotate bee
    a.vel.rotate(steer).len(0.005);
    a.pos.add(a.vel).wrap(1);
  }
  //cap at hives min size
   if (hive_radius < hive_min) {
      hive_radius = hive_min;
    }
  //decay hive size
    hive_radius -= hive_decay;
  //add time to the wind clock
  wind_clock++;
  //if the windclock is past it's update point
  if (wind_clock > wind_update) {
    //apply the wind to the pollen fields
    pollen.set(wind);
    pollen_old.clone(pollen);
  }
}
//wind function
function wind(x, y) {
  //reset wind clock
  wind_clock = 0;
  //set wind_angle to a random number between 0-8
  wind_angle = random(9);
  //depending on the wind angle set the pollen to that around it
  if (wind_angle == 0) {
    return pollen.get(x + 1, y + 1);
  } else if (wind_angle == 1) {
    return pollen.get(x, y + 1);
  } else if (wind_angle == 2) {
    return pollen.get(x + 1, y);
  } else if (wind_angle == 3) {
    return pollen.get(x, y);
  } else if (wind_angle == 4) {
    return pollen.get(x, y - 1);
  } else if (wind_angle == 5) {
    return pollen.get(x - 1, y);
  } else if (wind_angle == 6) {
    return pollen.get(x - 1, y - 1);
  } else if (wind_angle == 7) {
    return pollen.get(x + 1, y - 1);
  } else if (wind_angle == 8) {
    return pollen.get(x - 1, y + 1);
  }
}
//if mouse is clicked move the hive to that position and reset pollen fields
function mouse(e, p) {
  if (e == "down") {
    hive_position = p;
    reset_pollen();
  }
}

function draw() {
  //create nuclear colours
  var ranColor = random() + 0.1;
  var ranColor1 = random() + 0.1;
  var ranColor2 = random() + 0.1;
  //draw the trail
  draw2D.blend(true);
  draw2D.color(ranColor, ranColor1, ranColor2);
  trail.draw();
  //draw the return trail
  draw2D.color("lime");
  returnTrail.draw();
  //draw nuclear pollen
  draw2D.color(ranColor, ranColor1, ranColor2);
  pollen.draw();
  draw2D.blend(false);
  //hive outline
   draw2D.color("white").circle(hive_position, hive_radius*1.2);
  //draw hive with nuclear center
  draw2D.color(ranColor, ranColor1, ranColor2).circle(hive_position, hive_radius);
  // draw bees
  for (var a of bees) {
 draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    //draw bee shape
    draw2D.color("grey").circle([-0.8, 0], 0.3)
    draw2D.color("yellow").circle([-0.3, 0]);
    //add bee stripe
    draw2D.color("black").circle([0.2, 0]);
    draw2D.color("yellow").circle([0.3, 0]);
    //change the sensor colour based on the if it has food or not
    draw2D.color(a.has_food ? "blue" : "fuchsia");
    draw2D.circle([sensor_size, sensor_size], sensor_size);
    draw2D.circle([sensor_size, -sensor_size], sensor_size);
    draw2D.pop();
  }
}