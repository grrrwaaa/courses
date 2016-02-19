var agents = [];

function make_agent() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    size: 1/30,
    max_force: 1/400,
    max_speed: 1/100,
    view_range: 0.3,
  };
  agents.push(a);
}
for (var i=0; i<3; i++) make_agent();

var target = {
  pos: new vec2(random(), random()),
  pos_prev: new vec2(),
  vel: new vec2(),
  size: 0.8,
};
function mouse(e, p) {
  if (e == "down") {
    var pos_prev = target.pos.clone();
    target.pos.set(p);
    target.vel = target.pos.clone().sub(pos_prev);
  }
}

function update() {
  var targetspd = target.vel.len();
  
  for (var a of agents) {

    var rel = target.pos.clone().sub(a.pos);
    rel.relativewrap(1);
        a.size +=0.0001; //Math.min(Math.max(parseInt(number), 0.0001), 0.0009); tried setting limits
 target.size -= 0.0003;
    //Math.min(Math.max(parseInt(number), 0.0001), 0.0009); tried setting limits
 

    // limit t3his to our top speed
    var desired_velocity = rel;
    desired_velocity.limit(a.max_speed);
       
    for (var n of agents) {
      // don't check self:
      if (a != n) {
        var rel = n.pos.clone().sub(a.pos);
        rel.relativewrap(1);
        
        // where is the target in the agent's field of view?
        var heading = a.vel.angle(); // our direction in radians
        var relview = rel.clone().rotate(-heading);
        // will we collide?
        var in_front = relview[0] > 0;
        var in_range = relview[0] < a.view_range;
        var in_path = Math.abs(relview[1]) < (a.size/2 + n.size/2);
        if (in_front && in_range && in_path) {
          // take evasive action!
          var avoid = new vec2(0, -relview[1]);
          avoid.rotate(heading);
          desired_velocity.add(avoid);
        }
      }
    }
    
    // subtract our current velocity
    var steering = desired_velocity.sub(a.vel);
    // forward Euler integration
    //var steering = vec2.random(0.001);
    var acceleration = steering.limit(a.max_force);
    a.vel.add(acceleration).limit(a.max_speed);
    a.pos.add(a.vel).wrap(1);
    
  }

}

function draw() {
  
  draw2D.color("red");
  draw2D.circle(target.pos, target.size);
  
  for (var a of agents) {
    draw2D.push()
     draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
  	// body
    draw2D.color("darkred")
  		.circle([0.3, 0]).circle([-0.3, 0]);
      draw2D.color("white");
      draw2D.circle([0.25, 0.25], 0.2);
      draw2D.circle([0.25,-0.25], 0.2);

    draw2D.pop();
  }
}