var agents = [];

var score = 0;
var score_text = 'Score: '

function make_agent() {

  var a = {
    pos: new vec2(precise_round(random()), round(random(), 2)),
    vel: new vec2(round(random(), 2)),
    size: 1 / 30,
    max_force: 1 / 100,
    max_speed: 1 / 100,
    view_range: 0.3,
    is_alive: true,
  }
  agents.push(a);
}
for (var i = 0; i < 10; i++) make_agent();

var target = {
  pos: new vec2(round(random(), 1), round(random(), 1)),
  pos_prev: new vec2(),
  vel: new vec2(),
  size: 0.1,
};

function mouse(e, p) {
  if (e == "down") {
    var pos_prev = target.pos.clone();
    target.pos.set(p);
    target.vel = target.pos.clone().sub(pos_prev);
  }
}
// Round Numbers
function precise_round(num) {
  var t = Math.pow(10, 2);
  return (Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2).toFixed(2))
}
// Round Numbers Another Way
function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function update() {
  
  var targetspd = target.vel.len();

  //Die If Collide With Target 
  for (var a of agents) {
    if ((target.pos[0] - 0.04 < a.pos[0] &&
        target.pos[0] + 0.04 > a.pos[0]) &&
      (target.pos[1] - 0.04 < a.pos[1] &&
        target.pos[1] + 0.04 > a.pos[1])) {
      a.is_alive = false;
    }
  }
  
  //Remove Dead Critters
  var i = agents.length;
   while (i--) {
    var a = agents[i];
    // remove safely:
    if (a.is_alive == false) {
      agents.splice(i, 1);
    }
  }
  
  //Print Taget Location
  //javascript: console.log(target.pos);
  //Print Creture Location 
  //javascript: console.log(a.pos);

  //Print Score:
  javascript: console.log(score);
  document.getElementById("ScoreText").innerHTML = score_text;
  document.getElementById("MyScore").innerHTML = score;
  
  
  for (var a of agents) {
    // given the position of the light (target.pos)
    // how do I compute the required steering?
    // target from the agent's point of view
    var rel = target.pos.clone().sub(a.pos);
    rel.relativewrap(1);

    // Limit this to our top speed
    var desired_velocity = rel;
    desired_velocity.limit(a.max_speed);

     //Score Keeping
        if (a.is_alive == true) {
          score = score + 1;
        }
    
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
        var in_path = Math.abs(relview[1]) < (a.size / 2 + n.size / 2);
        if (in_front && in_range && in_path) {
          // take evasive action!
          var avoid = new vec2(0, -relview[1]);
          avoid.rotate(heading);
          desired_velocity.add(avoid);
        }
      }
    }

    // locomotion:

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
  draw2D.color("green");
  draw2D.circle(target.pos, target.size);
  for (var a of agents) {
    draw2D.push()
      .translate(a.pos)
      .rotate(a.vel)
      .scale(a.size);
    draw2D.color(a.is_alive ? "blue" : "black");
    draw2D.circle();
    draw2D.color(a.is_alive ? "white" : "black");
    draw2D.circle([0.25, 0.25], 0.2);
    draw2D.circle([0.25, -0.25], 0.2);
    draw2D.pop();
  }
}