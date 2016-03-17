title = "Aphid Farm";
author = "Rose Zhou";

// field for drawing plants
var plant = new field2D(128);
var center = new vec2(plant.width / 2, plant.height / 2);

// field of honeydew
var honeydew = new field2D(64);

var honeydew_deposit = 0.2; //0.1;

// an array of vines
var vines = [];
for (var i = 0; i < 10; i++) {
  vines.push({
    pos: new vec2(random(), 0),
    vel: vec2.random(),
    energy: 100,
  });
}

// local position of aphids body parts
var eyepos1 = new vec2(0.5, 0.2);
var eyepos2 = new vec2(0.5, -0.2);
var tailpos = new vec2(-0.52, 0);

// an array of aphids
var aphids = [];
for (var i = 0; i < 5; i++) {
  aphids.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(0.01),
    size: 0.035,
    energy: 10 + random() * 90,
    // energy: 10,
  });
}

function update_vines() {
  for (var i = vines.length - 1; i >= 0; i--) {
    var v = vines[i];
    plant.deposit(0.06, v.pos);
    v.vel.rotate(srandom() * 0.18).len(0.001);
    v.pos.add(v.vel); // forward intergration
    if (v.energy > 0) { // alive, consume energy for growth
      v.energy -= 0.1;
      // console.log("v.energy", v.energy);
    } else { // no energy, death
      vines.splice(i, 1);
    }
  }
}

// build some vines up first:
for (var i=0; i< 500; i++) {
  update_vines();
}

function update() {
  update_vines();

  // update aphids
  for (i = aphids.length - 1; i >= 0; i--) {
    var a = aphids[i];
    // world space location of body parts
    var dir = a.vel.angle(); // angle of vel
    var e1 = eyepos1.clone() // position of left eye
      .mul(a.size) // scale to agent's size
      .rotate(dir) // take account of velocity angle offset
      .add(a.pos); // move to agent's position
    var e2 = eyepos2.clone() // repeat for right eye
      .mul(a.size).rotate(dir).add(a.pos);

    // get plant intensity at eye locations
    var s1 = plant.sample(e1);
    var s2 = plant.sample(e2);

    // steering
    var w1 = -(s1 - 0.5);
    var w2 = -(s2 - 0.5);

    // locomotion
    var turn = w2 - w1;
    var speed = (w1 + w2) / 2;
    // limit speed
    speed = Math.max(0.01, speed);

    // update energy  TODO - organize logic
    //console.log("a.energy: ", a.energy);
    if (a.energy < 100) { // eat plant
      var sense = (s1 + s2) / 2;
      plant.deposit(-sense, a.pos);
      a.energy += sense;
      if (sense == 0 && a.energy > 0) { // alive and didn't find food, consume energy
        a.energy -= 0.1;
      }
    }

    if (a.energy < 70) { // hungry, look for food
      if (a.energy < 0) { // death?
        if (aphids.length == 1) { //unless I am the last one left
          // move slower to preserve energy
          a.vel.rotate(turn).len(0.0002 * speed);
        } else { // run out of energy, die :< 
          aphids.pop(a);
        }
      } else { // alive, move as usual
        a.vel.rotate(turn).len(0.002 * speed);
      }
    } else { // fullish, random walk and produce honey dew
      // world space location of tail
      var t = tailpos.clone().mul(a.size).rotate(dir).add(a.pos);

      a.vel.rotate(srandom() * 0.5).len(0.005 * speed);
      // produce honeydew at tail
      honeydew.deposit(honeydew_deposit, t);
      // consume energy
      a.energy -= 0.5;
    }

    a.pos.add(a.vel).wrap(1);
  } // end aphids loop

  // diffuse honeydew
  honeydew.diffuse(honeydew.clone(), 0.01, 3).mul(0.9999);
  var hmax = honeydew.max();
  
  // grow a new vine?
  // pick a point at random:
  var x = random(honeydew.width);
  var y = random(honeydew.height);
  // is it rich enough?
  var h = honeydew.get(x, y);
  if (h > 0.25 && vines.length < 10) {
    console.log("newvine");
    vines.push({
    pos: new vec2(x, y),
    vel: vec2.random(),
    energy: 100,
  });
  }
}

function draw() {
  draw2D.blend(true);
  // draw plant
  draw2D.color("DarkOliveGreen");
  plant.draw();
  // draw honeydew
  draw2D.color("#663300"); //#F5AD7A
  honeydew.draw();
  draw2D.blend(false);

  // draw aphids
  for (var a of aphids) {
    draw2D.push().translate(a.pos)
      .rotate(a.vel)
      .scale(a.size);
    // body
    // console.log("a.energy: ", a.energy);
    draw2D.color(0.2, a.energy / 100, 0.2).circle(0, 0, 1, 0.7); //YellowGreen

    // eyes
    draw2D.color("PaleGreen").circle(eyepos1, 0.15);
    draw2D.color("PaleGreen").circle(eyepos2, 0.15);
    // tail
    draw2D.color("#FACF96").circle(tailpos, 0.1);

    draw2D.pop();
  }
}

function reset() { // TODO
  plant.set(0);
  honeydew.set(0);
}

function mouse(e, p) {
  //console.log("mouse", e, p);
  plant.deposit(1, p);
  if (e == "down") {
    aphids.push({
      pos: new vec2(p[0], p[1]),
      vel: vec2.random(0.01),
      size: 0.035,
      energy: 10 + random() * 90,
    });
  }
}

function key(e, k) {
  //console.log("key", e, k);
  if (k == "r") {
    console.log("key", e, k);
    reset();
    r
  }
}