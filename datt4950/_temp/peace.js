var agents = [];
var speed = 0.001;

for (var i = 0; i < 2; i++) {
  agents.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(speed),
    size: 0.04,
    energy: random(),
  });
}

var food = new field2D(128);
food.set(function() {
  return random();
});

function update() {

  // rain very small food
  food.deposit(random()*0.2, random(), random());

  //var i = agents.length;
  for (var i = 0; i < agents.length; i++) {
    var a = agents[i];
    var f = food.sample(a.pos);
    // sanity check
    f = Math.max(f, 0);
    // remove from field
    food.deposit(-f, a.pos);

    // gain energy from food:
    a.energy += f * 0.2;

    // if energy is low, the velocity is reduced
    if (a.energy <= 0.1) {
      speed = 0.005;
      a.vel.rotate(0.4 * (random() - 0.5));
      a.pos.add(a.vel).wrap(1);
    } else { // if energy is in a mid range, they will give back food
      if (a.energy > 0.2 && a.energy < 1.) {
        a.vel.rotate(0.9 * (random() - 0.5));
        a.pos.add(a.vel).wrap(1);
        food.deposit(f, a.pos);

      } else if (a.energy > 1.2) { // if energy is high, they reproduce:
        var child = {
          pos: a.pos.clone(),
          vel: vec2.random(0.001),
          size: 0.04,
          energy: a.energy * 0.4
        };

        agents.push(child);
        a.vel.rotate(0.4 * (random() - 0.5));
        a.pos.add(a.vel).wrap(1);

        a.energy *= 0.4;
      }

      a.energy *= 0.95;
    }
  }
}

function draw() {
  draw2D.color("darkgreen");
  food.draw();

  for (var a of agents) {
    draw2D.color("yellow").circle(a.pos, a.size);
    draw2D.color("royalblue").circle(a.pos, a.size * a.energy);
  }
}
// Assignment 2 
//Modified by Peace Ayorinde 