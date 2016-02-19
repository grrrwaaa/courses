// initialize the field
var sugar = new field2D(64);
sugar.set(1, sugar.width / 2, sugar.height / 2);
sugar.diffuse(sugar.clone(), 128, 80);
sugar.normalize();

function srandom() {
  return 2 * (random() - 0.5);
}

var agent_speed = 0.002;
// create an array of agents
var agents = [];

function make_agent() {
  var a = {
  pos: new vec2(random(), random()),
    vel: vec2.random(agent_speed),
    size: 0.05,
    memory_sense: 0,
  };
  agents.push(a);
  return a;
}
for (var i=0; i<30; i++) make_agent();

function mouse(e, p) {
  sugar.deposit(0.3,p);
}

for (var i = 0; i < 50; i++) {
  var p = vec2.random(10 + 10 * random());
  sugar.deposit(2, p);
}

function update_agent(a) {
  var desired_velocity = a.vel.clone()
    .rotate(1*(random()-0.5))
    .setmag(0.004 * random());
  var dir = a.vel.angle();
  var neigh = 0;
  var neigh_loc = new vec2();
  var neigh_vel = new vec2();
  var neigh_avoid = new vec2();
  for (var n of agents) {
    if (n == a) continue;
    var rel = n.pos.clone().sub(a.pos);
    rel.relativewrap(1);
    var distance = Math.max(rel.len() - a.size - n.size, 0);
    var in_visible_range = distance < 0.05;
    var viewrel = rel.clone().rotate(-dir);
    var in_visible_angle = Math.abs(viewrel.angle()) < 1.5;
    if (in_visible_range && in_visible_angle) {
      neigh++;
      neigh_loc.add(rel);
      var relative_velocity = n.vel.clone().rotate(-dir);
      neigh_vel.add(n.vel);
      var negative_feeling = Math.min(0, distance - 0.004);
      if (negative_feeling < 0) {
        var normalized = negative_feeling / 0.004;
        neigh_avoid.add(rel.clone().setmag(normalized));
        	
	a.sees_neighbours = neigh > 0;
	if (a.sees_neighbours) {

    neigh_loc.div(neigh);
    neigh_vel.div(neigh);    
 
    neigh_loc.mul(0.01);
    neigh_vel.mul(1);
    neigh_avoid.mul(1);   
 
    desired_velocity
      .add(neigh_loc)
      .add(neigh_vel)
      .add(neigh_avoid)
    ;
	}
  
  a.acceleration = desired_velocity.sub(a.vel);
  a.acceleration.limit(0.0006);
        
      }
    }
  }
}

function sense(a) {
  // sniff the sugar field:
  var sense = sugar.sample(a.pos);
  //console.log(sense);
  sugar.deposit(-sense, a.pos);

  var ds = (sense - a.memory_sense);

  if (ds > 0) {
    // move more or less ahead:
    a.vel.rotate(srandom() * 0.1).len(agent_speed);
  } else {
    // tumble about
    a.vel.rotate(srandom() * 0.05).len(agent_speed * 0.1);
  }

  // update my memory:
  a.memory_sense = sense;

  // locomotion:
  a.pos.add(a.vel).wrap(1);
}

function update() {
  // diffuse field:
  sugar.diffuse(sugar.clone(), 0.0001);
  // leak
  sugar.mul(0.9999);

  sugar.set(function(x, y) {
    var C = sugar.get(x, y);
    return C + srandom() * 0.01;
  });

  // update each agent:
  for (var a of agents) {
  update_agent(a);
  }
  for(var a of agents){
    sense(a);
  }
}
  function draw() {
    // draw the field:
    draw2D.color("Aquamarine");
    sugar.draw();

    // draw each agent:
    for (var a of agents) {
      draw2D.push()
        .translate(a.pos)
        .rotate(a.vel).scale(a.size);
      // body

      draw2D.color("white")
        .circle([0.1, 0], 0.5)
        .circle([-0.2, 0], 0.6 + (a.memory_sense))
        .circle([0.4, 0.15], 0.2)
        .circle([0.4, -0.15], 0.2);
      // "eye"
      draw2D.color(0.1 - a.memory_sense, a.memory_sense, 0.5)
        .rect([0.1, 0], 0.2);
      draw2D.pop();
    }

  }