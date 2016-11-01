title = "Game of Flockers with Obstacles"
author = "Akeem Glasgow"

// changing these parameters can strongly affect emergent behaviour
var max_speed = 0.004;
//types of agents
var colors = ['DarkOrchid','DeepPink','red', 'green', 'blue', 'orange', 'yellow','Indigo','FireBrick','Crimson','DarkKhaki','DarkCyan'];
var max_force = 0.0002;
var centering_factor = 0.001;
var avoidance_factor = 0.2;
var agent_optimal_distance = 0.004;
var agent_range_of_view = 0.05;
var agent_field_of_view = 2.5;
var random_walk_variance = 1;
var circle_size = 0;
var toggle = 0;
var circle_growthrate = 0.0000001 ;
// our agents:
var agents = [];
// some obstacles:
var obstacles = [];
// make agent and place anywhere
function make_agent() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * max_speed),
    acceleration: new vec2(),
    size: (random() + 1)/160,
    alive: 10,
    color : colors[ Math.floor((Math.random() * colors.length) )]
  };
  agents.push(a);
  return a;
}
// make agent of a specif color and place anywhere
function make_agents(x) {
  var a = {
    pair : false,
    pairvalue: -1,
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * max_speed),
    acceleration: new vec2(),
    size: (random() + 1)/160,
    alive: 10,
    color : x
  };
  agents.push(a);
  return a;
}
// make a few agents:
for (var i=0; i<100; i++) make_agent();


// make obstacles at location:
function make_obstacles(pt,size) {
  var p = {
    pos: new vec2(pt[0],pt[1]),
    size: size *0.05,
    color : colors[ Math.floor((Math.random() * colors.length) )],
    growing : true
  };

  obstacles.push(p);
  obstacles.reverse();
  obstacles.pop();
  obstacles.reverse();
  return p;
}

// make obstacles:
function make_obstacle() {
  var p = {
    pos: new vec2(random(), random()),
    size: (random() + 1)*0.05,
    color : colors[ Math.floor((Math.random() * colors.length) )],
    growing: true
  };
  obstacles.push(p);
  return p;
}

for (var i=0; i<10; i++)make_obstacle();

function move_agent(a) {
  // forward Euler integration + constraints
  a.vel.add(a.acceleration).limit(max_speed);
  a.pos.add(a.vel).wrap(1);
}

function update_agent(a) {
  // we will compute a desired velocity
  // intially, a simple random walker
  // (take current velocity and rotate it slightly)
  var desired_velocity = a.vel.clone()
  .rotate(random_walk_variance*(random()-0.5))
  .setmag(max_speed * random());

  // useful to know our direction:
  var dir = a.vel.angle();

  // information to gather about visible neighbors:
  var neighbours = 0;
  // these are for the three steering forces:
  var neighbour_locations = new vec2();
  var neighbour_velocities = new vec2();
  var neighbour_avoidances = new vec2();
  var  likeness_attraction = new vec2();
  var finding_patner_probability =0;
  // check for visible neighbours:
  // (might not be the most optimal, but it is simple):
  for (var n of agents) {
    if (n == a) continue;	// don't count yourself!

    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = n.pos.clone().sub(a.pos);
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1);    // 1 is the size of our world    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - n.size, 0);
    // is the neighbour close enough to be seen?
    var in_visible_range = distance < agent_range_of_view;    
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < agent_field_of_view;   
    // neighbour seen if within range & field of view:
    if (in_visible_range && in_visible_angle) {
      // yes -- add to count of neighbours
      neighbours++;
      // accumulate relative locations for centering force
      neighbour_locations.add(rel);
      // accumulate relative locations for centering force of simular agents
      if(n.color==a.color){
        finding_patner_probability++;
        likeness_attraction.add(rel);

      }

      // rotate neighbour velocity into agent's perspective,
      // accumulate for aligning force
      var relative_velocity = n.vel.clone().rotate(-dir);
      neighbour_velocities.add(n.vel);   
      // are we likely to collide?
      // compute from where we are *going* to be
      var npos1 = n.pos.clone().add(n.vel);
      var apos1 = a.pos.clone().add(a.vel);
      var rel1 = npos1.sub(apos1);
      rel1.relativewrap(1);  
      var distance1 = Math.max(rel1.len() - a.size - n.size, 0);
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance1 - agent_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / agent_optimal_distance;
        neighbour_avoidances.add(rel1.clone().setmag(normalized));
      }
    }
  }

  for (var p of obstacles) {
    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = p.pos.clone().sub(a.pos);
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1);    // 1 is the size of our world    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - p.size, 0);
    // is the neighbour close enough to be seen?
    var in_visible_range = distance < agent_range_of_view;    
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < agent_field_of_view;   
    if (in_visible_range && in_visible_angle) {
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance - agent_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / agent_optimal_distance;
        neighbour_avoidances.add(rel.clone().setmag(normalized));

        // allow agents to eat if they are alive and allow them to eat more if they are the same color
        if(p.color==n.color && n.alive > 0){
          p.size-=0.0003; 
          p.growing = false;

        }
        // allow agents to eat if they are aliv
        if(p.color !=n.color && n.alive > 0){
          p.size-=0.00001; 
          p.growing = false;
        }

      }
    }else{
      p.growing = true;
      p.size+=circle_growthrate;
    }

    // did we see anyone?
    a.sees_neighbours = neighbours > 0;
    // reporduce if another simular agent is in the flock
    if(finding_patner_probability >= 2 && agents.length < 100 ){

      make_agents(a.color);

    }
  }


  if (a.sees_neighbours) {
    // convert accumulated information into averages:
    neighbour_locations.div(neighbours);
    neighbour_velocities.div(neighbours);
    likeness_attraction.mul(finding_patner_probability);
    // change factors:
    neighbour_locations.mul(centering_factor);
    // apply to desired velocity
    // (note avoidance is subtracted, as a repulsion):
    desired_velocity
      .add(neighbour_locations)
      .add(neighbour_velocities)
      .add(likeness_attraction)
    ;
  }else{
    // agent is alone , life fades
    a.alive -= 0.1;
  }

  // avoidances can happen even without neighbours (obstacles)
  neighbour_avoidances.mul(avoidance_factor); 
  desired_velocity.add(neighbour_avoidances);

  // to convert desired_velocity into a steering force,
  // need to subtract current velocity
  a.acceleration = desired_velocity.sub(a.vel);
  // apply constraints:
  a.acceleration.limit(max_force);
}

function update() {
  // to separate passes to prevent artefacts 
  // (similar to double-buffering)
  //kill agent if not alive
  for (var i = 0 ; i < agents.length;i++) {
    if(agents[i].alive < 0){ 
      agents.splice(i,1);
    }
  }

  for (var a of agents) {
    update_agent(a);
  }
  for (var a of agents) {
    move_agent(a);
  }
  // console.log(toggle);
  if(toggle == 1 && circle_size < 2 ){
    circle_size+=0.1;

  }

}


function move_agent(a) {

  // forward Euler integration + constraints
  a.vel.add(a.acceleration).limit(max_speed);
  a.pos.add(a.vel).wrap(1);
}

function draw() {
  draw2D.color("grey");
  for (var p of obstacles) {
    draw2D.color(p.growing ? p.color: "grey");
    draw2D.circle(p.pos, p.size);

  }

  for (var a of agents) {
    // push into agent's local coordinate system
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // draw agent body:
    draw2D.color(a.sees_neighbours ? a.color : "grey");
    draw2D.rect();
    // draw agent eyes:
    draw2D.color(a.sees_neighbours ? "white": "black");
    draw2D.circle([0.35, 0.5], 0.5);
    draw2D.circle([0.35,-0.5], 0.5);
    // done drawing agent:
    draw2D.pop();    
  }

}

// click to add more obsticles longer press is a bigger object up to size 2:
function mouse(e, p) {

  if (e == "down") {
    toggle = 1;
  }

  if (e == "up") {
    toggle=0;
    make_obstacles(p,circle_size);

    circle_size = 0;

  }
}