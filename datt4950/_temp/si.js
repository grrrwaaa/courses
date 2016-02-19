// create a dirt field
var dirt = new field2D(80);
var dirt_old = dirt.clone();
dirt.set(0.3);

// create mines
var mine = new field2D(80);
var mine_old = mine.clone();

// create forests
var forest = new field2D(80);
var forest_old = forest.clone();

var phero_food = mine.clone();
var phero_food_old = phero_food.clone();

var phero_food_two = forest.clone();
var phero_food_old_two = phero_food_two.clone();

var phero_nest = mine.clone();
var phero_nest_old = phero_nest.clone();

var phero_nest_two = forest.clone();
var phero_nest_old_two = phero_nest_two.clone();

var phero_diffuse = 0.01;
var phero_decay = 0.99;
var signal_decay = 0.01;

var phero_diffuse_two = 0.01;
var phero_decay_two = 0.99;
var signal_decay_two = 0.01;

// metal nest
var nest = new vec2(random(), 0.75);
var nest_radius = 0.04;

// wood nest
var nest_two = new vec2(random(), 0.25);
var nest_radius_two = 0.04;

var sensor_size = 0.5;
var sensor_noise = 0.01;
var sensor_size_two = 0.9;
var sensor_noise_two = 0.01;

// fill it:
function reset_mine() {
  // clear it:
  mine.set(0);
  // add some randomized points:
  for (var i = 0; i < 10; i++) {
    var p = vec2.random(0.3).sub(1).div(0.5);
    mine.deposit(random(3), p);
  }
  // blur it
  mine.diffuse(mine.clone(), mine.width, 150);
  // fit to 0..1 range
  mine.normalize();
  // threshold it:
  mine.map(function(v) {
    return v > 0.1 ? 1 : 0;
  });
}
reset_mine();

// fill it:
function reset_forest() {
  // clear it:
  forest.set(0);
  // add some randomized points:
  for (var i = 0; i < 10; i++) {
    var p = vec2.random(0.7).add(1).mul(0.5);
    forest.deposit(random(3), p);
  }
  // blur it
  forest.diffuse(forest.clone(), forest.width, 150);
  // fit to 0..1 range
  forest.normalize();
  // threshold it:
  forest.map(function(v) {
    return v > 0.1 ? 1 : 0;
  });
}
reset_forest();

var agents = [];
for (var i = 0; i < 30; i++) {
  agents.push({
    pos: nest.clone(),
    vel: vec2.random(0.001),
    size: 0.01,
    // internal states:
    has_food: false,
    signal: 1,
  });
}

var agents_two = [];
for (var i = 0; i < 30; i++) {
  agents_two.push({
    pos: nest_two.clone(),
    vel: vec2.random(0.001),
    size: 0.01,
    // internal states:
    has_food: false,
    signal: 1,
  });
}

function update() {
  // update field:
  var tmp = phero_food_old;
  phero_food_old = phero_food;
  phero_food = tmp;
  var tmp2 = phero_food_old_two;
  phero_food_old_two = phero_food_two;
  phero_food_two = tmp2;
  // diffuse it:
  phero_food.diffuse(phero_food_old, phero_diffuse).mul(phero_decay);
  phero_food_two.diffuse(phero_food_old_two, phero_diffuse_two).mul(phero_decay_two);
  // small background noise:
  //phero_food.map(function(v) { return v + 0.01*srandom(); });

  // update field:
  var tmp = phero_nest_old;
  phero_nest_old = phero_nest;
  phero_nest = tmp;
  var tmp2 = phero_nest_old_two;
  phero_nest_old_two = phero_nest_two;
  phero_nest_two = tmp2;
  // diffuse it:
  phero_nest.diffuse(phero_nest_old, phero_diffuse).mul(phero_decay);
  phero_nest_two.diffuse(phero_nest_old_two, phero_diffuse_two).mul(phero_decay_two);
  // small background noise:
  //phero_food.map(function(v) { return v + 0.01*srandom(); });

  for (var a of agents) {
    var dir = a.vel.angle();
    // get sensor location:
    var s1 = new vec2(sensor_size, sensor_size).mul(a.size).rotate(dir).add(a.pos);
    var s2 = new vec2(sensor_size, -sensor_size).mul(a.size).rotate(dir).add(a.pos);

    var steer = srandom() * 0.5;
    if (a.has_food) {
      // trail:
      if (a.signal > 0) phero_food.deposit(a.signal, a.pos);

      // arrive?
      var atnest = a.pos.distance(nest) < nest_radius;
      if (atnest) {
        a.signal = 1;
        a.has_food = false;
        a.vel.negate();
      }

      var v1 = phero_nest.sample(s1);
      var v2 = phero_nest.sample(s2);
      if (v1 + v2 > sensor_noise) {
        steer = v1 - v2;
      }
    } else {
      // trail:
      if (a.signal > 0) phero_nest.deposit(a.signal, a.pos);

      // arrive?
      var food = Math.max(0, mine.sample(a.pos));
      if (food > 0) {
        a.signal = 1;
        mine.deposit(-food, a.pos);
        a.has_food = true;
        a.vel.negate();

      }

      var v1 = phero_food.sample(s1);
      var v2 = phero_food.sample(s2);
      if (v1 + v2 > sensor_noise) {
        steer = v1 - v2;
      }
    }
    
    // trail gradually weakens:
    a.signal -= signal_decay;
    
    // steering & locomotion
    a.vel.rotate(steer).len(0.007);
    a.pos.add(a.vel).wrap(1);
  }

  for (var b of agents_two) {
    var dir = b.vel.angle();
    // get sensor location:
    var s3 = new vec2(sensor_size_two, sensor_size_two).mul(b.size).rotate(dir).add(b.pos);
    var s4 = new vec2(sensor_size_two, -sensor_size_two).mul(b.size).rotate(dir).add(b.pos);

    var steer = srandom() * 0.5;
    if (b.has_food) {
      // trail:
      if (b.signal > 0) phero_food_two.deposit(b.signal, b.pos);

      // arrive?
      var atnest = b.pos.distance(nest_two) < nest_radius_two;
      if (atnest) {
        b.signal = 1;
        b.has_food = false;
        b.vel.negate();
      }

      var v3 = phero_nest_two.sample(s3);
      var v4 = phero_nest_two.sample(s4);
      if (v3 + v2 > sensor_noise_two) {
        steer = v3 - v4;
      }
    } else {
      // trail:
      if (b.signal > 0) phero_nest_two.deposit(b.signal, b.pos);

      // arrive?
      var food = Math.max(0, forest.sample(b.pos));
      if (food > 0) {
        b.signal = 1;
        forest.deposit(-food, b.pos);
        b.has_food = true;
        b.vel.negate();

      }

      var v3 = phero_food_two.sample(s3);
      var v4 = phero_food_two.sample(s4);
      if (v3 + v4 > sensor_noise_two) {
        steer = v3 - v4;
      }
    }

    // trail gradually weakens:
    b.signal -= signal_decay_two;

    // steering & locomotion
    b.vel.rotate(steer).len(0.003);
    b.pos.add(b.vel).wrap(1);
  }
}

function draw() {
  // draw fields
  draw2D.blend(true);
  // color of trail to nest
  draw2D.color("dimgray");
  phero_food.draw();
  draw2D.color("saddlebrown");
  phero_food_two.draw();

  // color of trail to food
  draw2D.color("gray");
  phero_nest.draw();
  draw2D.color("sienna");
  phero_nest_two.draw();

  // color of dirt
  draw2D.color("tan");
  dirt.draw();
  // color of forest
  draw2D.color("darkgreen");
  forest.draw();
  // color of mine
  draw2D.color("slategray");
  mine.draw();

  draw2D.blend(false);
  // draw metal nest
  draw2D.color("grey");
  draw2D.circle(nest, nest_radius * 2);
  // draw wood nest
  draw2D.color("darkgreen");
  draw2D.circle(nest_two, nest_radius_two * 2);

  // draw agents
  for (var a of agents) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // body
    draw2D.color("slategray")
      .rect([0, 0], 2, 1);
    // sensor (shows current state by color)
    draw2D.color(a.has_food ? "black" : "slategray");
    draw2D.rect([0, 0], sensor_size + 0.5, sensor_size);
    draw2D.pop();
  }

  for (var b of agents_two) {
    draw2D.push().translate(b.pos).rotate(b.vel).scale(b.size);
    // body
    draw2D.color("peru")
      .rect([0, 0], 2, 1);
    // sensor (shows current state by color)
    draw2D.color(b.has_food ? "green" : "peru");
    draw2D.rect([0, 0], sensor_size_two + 0.5, sensor_size_two);
    draw2D.pop();
  }

}