// field for drawing plants
var plant = new field2D(128);

// an array of vines
var vines = [];
for (var i = 0; i < 10; i++) {
  vines.push({
    pos: new vec2(random(), 0),
    vel: new vec2(random(), random()),
    energy: random(35, 50),
  });
}

// local position of aphids body parts
var eyepos1 = new vec2(0.5, 0.2);
var eyepos2 = new vec2(0.5, -0.2);
var tailpos = new vec2(-0.52, 0);

// an array of aphids
var aphids = [];
for (var i = 0; i < 2; i++) {
  aphids.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(0.01),
    size: 0.035,
    energy: 10 + random() * 60,
  });
}

function update() { //  loop backwards TODO

  // update aphids
  for (i = aphids.length - 1; i >= 0; i--) {
    var a = aphids[i];
    // console.log("a.energy", a.energy);

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
    // update energy
    // console.log("a.energy: ", a.energy);

    if (a.energy <= 0) { // death?
      if (aphids.length == 1) { //unless I am the last one left
        a.energy = 0.1;
        // drift slow to preserve energy - doesn't consume energy
        a.vel.rotate(turn).len(0.000025 * speed);
      } else { // run out of energy, die :< 
        var index = aphids.indexOf(a);

        // console.log("potential death: ", index);
        if (index > -1) {
          aphids.splice(index, 1);
        }
      } // end manage death
    } else if (a.energy > 0 && a.energy < 80) { // alive, move
      // hungry, look for food
      a.vel.rotate(turn).len(0.002 * speed);

      // eat all that I can sense
      var sense = (s1 + s2) / 2;
      sense = Math.max(sense, 0); // sanity check
      plant.deposit(-sense, a.pos);
      a.energy += sense;

      // consume energy by moving
      a.energy -= 0.1;
    } else if (a.energy >= 80 && a.energy < 100) { // full, random walk
      // console.log(">80! ", a.energy);
      a.vel.rotate(srandom() * 0.5).len(0.005 * speed);
      // consume energy by moving
      a.energy -= 0.1;

      if (a.size == 0.025) { // if I am child, grow in size
        a.size = 0.035;
        a.energy -= 30;
      } else { // I am adult
        // make a copy of self based on probability
        var reproduce_probability = 0.00025;
        if (random() > reproduce_probability && aphids.length < 25) {
          var energy_consumed = 50 + random() * 20;
          var child = {
            pos: new vec2(a.pos[0] + 1, a.pos[1] + 1), // near parent's position
            vel: new vec2(-a.vel[0], -a.vel[1]), // opposite vel
            size: 0.025,
            energy: energy_consumed * 0.8,
          };
          // console.log("child!");
          aphids.push(child);
          a.energy -= energy_consumed; // reduce parent's energy
          a.energy *= 0.9;
        }

      }
    } // end full, random walk

    a.pos.add(a.vel).wrap(1);
  } // end aphids loop

  // plant.mul(0.99999);
  // update vines ----------------------
  for (var i = vines.length - 1; i >= 0; i--) {
    var v = vines[i];
    plant.deposit(0.06, v.pos);
    v.vel.rotate(srandom() * 0.15).len(0.002);
    v.pos.add(v.vel);
    if (v.energy > 0) { // alive, consume energy for growth
      v.energy -= 0.01;
      // console.log("v.energy", v.energy);
    } else { // add little more energy
      v.energy += 5;
    }
    //console.log("here!!");

  } // end vines loop ----------------------
  
} // end update

function draw() {
  draw2D.blend(true);
  // draw plant
  draw2D.color("DarkOliveGreen");
  plant.draw();
  draw2D.blend(false);

  // draw aphids
  for (var a of aphids) {
    draw2D.push().translate(a.pos)
      .rotate(a.vel)
      .scale(a.size);
    // body
    draw2D.color(0.3 - a.energy * 0.3 / 100, a.energy / 100, 0.15).circle(0, 0, 1, 0.7); //YellowGreen

    // eyes
    draw2D.color("PaleGreen").circle(eyepos1, 0.15);
    draw2D.color("PaleGreen").circle(eyepos2, 0.15);
    // tail
    draw2D.color("#FACF96").circle(tailpos, 0.1);

    draw2D.pop();
  }
}

function reset() { 
  plant.set(0);
  for (var a of aphids) {
    a.energy = 10 + random() * 60
  }
}

function mouse(e, p) {
  //console.log("mouse", e, p);
  plant.deposit(0.2, p);
  if (e == "down") {
    aphids.push({
      pos: new vec2(p[0], p[1]),
      vel: vec2.random(0.01),
      size: 0.025,
      energy: 10 + random() * 60,
    });
  }
}

function key(e, k) {
  //console.log("key", e, k);
  if (k == "r") {
    reset();
  } else if (k == "f") {
    // uniform noise in plant field
    plant.set(function(x, y) { return random() * 1; } )
      // smoothen out by diffusion:
    plant.diffuse(plant.clone(), plant.width / 30, 10);
  }
}