// create a field of sugar concentrations
var sugar = new field2D(256);
var sugar_old = sugar.clone();

// Max Capacity an agent can hold
// try 100 for a bigger explosion (and greater territorial behaviour)
// try 10 for a quicker farts (and more united behaviour)
// default = 30
var maxCap = 30;

// Ammount of capacity to be farted
// (The rest would be used by the body)
var fartFraction = 4 / 5;

// fill it:
function reset_sugar() {
  // fill with uniform noise
  sugar.set(0);
}
reset_sugar();

// mouse adds sugar:
function mouse(e, pt) {
  sugar.deposit(10, pt);
}

var agents = [];
for (var i = 0; i < 20; i++) {
  agents.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    size: 0.02,
    // stored recollection of previous sense
    sense_memory: 0.5,
    // capacity of the agent to store sugar
    capacity: 0.0,
  });
}

var source = {
  pos: new vec2(0.5, 0.5),
  vel: vec2.random(),
};

function update() {
  // update field:
  var tmp = sugar_old;
  sugar_old = sugar;
  sugar = tmp;
  sugar.mul(0.8);
  // diffuse it:
  sugar.diffuse(sugar_old, 0.2);
  // small background noise:
  //sugar.map(function(v) { return v + 0.01*srandom(); });

  // apply source agent to sugar:
  sugar.deposit(2, source.pos);
  // and then move it (random walk):
  source.vel.rotate(random() - 0.5).len(random() * 0.003);
  source.pos.add(source.vel).wrap(1);

  for (var a of agents) {
    // get the sugar level at this location:
    var sense = sugar.sample(a.pos);
    // sanity: no such thing as a negative intensity:
    sense = Math.max(0, sense);
    // update the field to show that we removed sugar here:
    sugar.deposit(-sense, a.pos);
    // add to the capacity of the agent
    a.capacity = a.capacity + sense;

    // if capacity exceeds maximum capacity
    if (a.capacity > maxCap) {
      // agent farts
      sugar.deposit(a.capacity * fartFraction, a.pos);
      // agent capacity reset to zero
      a.capacity = 0.0;
    }

    // compare to the previous one:
    var change = sense / a.sense_memory;
    if (change > 1) {
      // getting better
      // forward swimming behavior:
      a.vel
        .rotate(srandom() * 0.1)
        .len(0.005);
    } else {
      // getting worse
      // tumbling behavior:
      a.vel
        .rotate(srandom())
        .len(0.0005);
    }
    // remember for the next time:
    a.sense_memory = sense;

    // locomotion
    a.pos.add(a.vel).wrap(1);
  }
}

function draw() {
  // draw field
  sugar.draw();
  // draw agents
  for (var a of agents) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // body
    draw2D.color("darkred")
      .circle([0.3, 0]).circle([-0.3, 0]);
    // sensor (shows current state by color)
    draw2D.color(1 - a.sense_memory, a.sense_memory, 0.5)
      .circle([0.3, 0.], 0.7);
    draw2D.pop();
  }
}