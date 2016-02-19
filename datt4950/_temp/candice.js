// initialize the field
var sugar = new field2D(64);
sugar.set(.5, sugar.width / 2, sugar.height / 2);
sugar.diffuse(sugar.clone(), 128, 80);
sugar.normalize();

var sugar_old = sugar.clone();
var signal_decay = .01;
var digest_rate = .01;

function srandom() {
  return 2 * (random() - 0.5);
}

var agent_speed = 0.001;
// create an array of agents
var agents = [];
for (var i = 0; i < 12; i++) {
  agents.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(agent_speed),
    size: 0.05,
    memory_sense: 0,
    has_food: false,
    signal: 0,
  });
}

function mouse(e, p) {
  if (e == "down") agents[0].pos.set(p);
  
  sugar.deposit(-1, p);
}

function update() {
  // diffuse field:
  sugar.diffuse(sugar.clone(), 0.009);
  // leak?
  sugar.mul(0.9999);
  
  // update each agent:
  for (var a of agents) {
    // sniff the sugar field:
    var sense = sugar.sample(a.pos);
    //console.log(sense);
    sugar.deposit(-sense, a.pos);

    var ds = (sense - a.memory_sense);
    //var rs = sense / a.memory_sense;
    if (ds > 0) {
      // move more or less ahead:
      a.vel.rotate(srandom() * 0.05).len(agent_speed);
    } else {
      // tumble about
      a.vel.rotate(srandom() * 0.5).len(agent_speed * 0.5);
    }
    
    // make trails, if full
    if (sense > 0.05) {
      a.signal = 1;
      if (a.signal > 0)       sugar.deposit(a.signal, a.pos);
      sugar.deposit(-.5, a.pos);
    }
    
    // trail gradually weakens:
    a.signal += signal_decay;
    sense -= digest_rate;
    
    // update my memory:
    a.memory_sense = sense;

    // locomotion:
    a.pos.add(a.vel).wrap(1);
  }
}

function draw() {
  // draw the field:
  draw2D.blend(true);
  draw2D.color("green");
  sugar.draw();
  
  draw2D.color("white");
  sugar.draw();
  
  draw2D.blend(false);
  // draw each agent:
  for (var a of agents) {
    draw2D.push()
      .translate(a.pos)
      .rotate(a.vel).scale(a.size);
    // body
    draw2D.color("pink")
      .circle([0.1, 0], 0.5)
      .circle([-0.1, 0], 0.5);
    // "eye"
    draw2D.color("red")
      .circle([0.1, 0], 0.4);
    draw2D.pop();
  }

}