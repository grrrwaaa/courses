// 
// Behaviour of the fish are as follows:
// blue fish --> Like green fish, but avoid sharks and rocks
// green fish --> Avoid blue fish, sharks and rocks
// sharks --> just glide through the field

var max_force = 0.0002;
var centering_factor = 0.001;
var avoidance_factor = .5;
var random_walk_variance = 1;

var blue_fish_max_speed = 0.004;
var blue_fish_optimal_distance = 0.004;
var blue_fish_range_of_view = 0.1;
var blue_fish_field_of_view = 2.5;

var green_fish_max_speed = 0.003;
var green_fish_optimal_distance = 0.004;
var green_fish_range_of_view = 0.3;
var green_fish_field_of_view = 3;

var shark_max_speed = 0.002;
var shark_optimal_distance = 0.4;
var shark_range_of_view = 10;
var shark_field_of_view = 10;

var shark_eye = 0.5; 
var fish_eye = 0.25;

// our fish:
var blue_fish = [];
var green_fish = [];

// some dangers:
var sharks = [];
var rocks = [];

function make_blue_fish() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * blue_fish_max_speed),
    acceleration: new vec2(),
    size: (random() + 1)/120
  };
  blue_fish.push(a);
  return a;
}
for (var i=0; i<60; i++) make_blue_fish();


function make_green_fish() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * green_fish_max_speed),
    acceleration: new vec2(),
    size: (random() + 1)/80
  };
  green_fish.push(a);
  return a;
}
for (var i=0; i<60; i++) make_green_fish();

// make sharks:
function make_sharks() {
  var p = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * shark_max_speed),
    acceleration: new vec2(),
    size: (random() + 1)/50
  };
  sharks.push(p);
  return p;
}
for (var i=0; i<5; i++)make_sharks();

//make rocks
function make_rocks() {
  var p = {
    pos: new vec2(random(), random()),
    size: (random() + 1)*0.05
  };
  rocks.push(p);
  return p;
}
for (var i=0; i<7; i++)make_rocks();


//generates the initial movement of the fish
function move_blue_fish(a) {
	a.vel.add(a.acceleration).limit(blue_fish_max_speed);
	a.pos.add(a.vel).wrap(1);
}

function move_green_fish(a) {
	a.vel.add(a.acceleration).limit(green_fish_max_speed);
	a.pos.add(a.vel).wrap(1);
}

//generates the initial movement of the sharks
function move_sharks(b) {
  b.vel.add(b.acceleeration).limit(shark_max_speed);
  b.pos.add(b.vel).wrap(1);
}

// Wanted to use this function to have the sharks avoid the rock only

/*function update_sharks(a) {
  
  // we will compute a desired velocity
  var desired_velocity = a.vel.clone()
    .rotate(random_walk_variance*(random()-0.5))
    .setmag(shark_max_speed * random());
  
  // useful to know our direction:
	var dir = a.vel.angle();
	
  // information to gather about visible neighbors:
	var neighbours = 0;
  
  // these are for the three steering forces:
  var neighbour_locations = new vec2();
  var neighbour_velocities = new vec2();
  var neighbour_avoidances = new vec2();
	
  // check for visible neighbours:
  // (might not be the most optimal, but it is simple):
	for (var s of sharks) {
		if (s == a) continue;	// don't count yourself!
		
    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = s.pos.clone().sub(a.pos);
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1);    // 1 is the size of our world    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - s.size, 0);
    // is the neighbour close enough to be seen?
    var in_visible_range = distance < shark_range_of_view;    
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < shark_field_of_view;   
    // neighbour seen if within range & field of view:
    if (in_visible_range && in_visible_angle) {
      // yes -- add to count of neighbours
      neighbours++;
      // accumulate relative locations for centering force
      neighbour_locations.add(rel);
      // rotate neighbour velocity into agent's perspective,
      // accumulate for aligning force
      var relative_velocity = s.vel.clone().rotate(-dir);
      neighbour_velocities.add(s.vel);   
      // are we likely to collide?
      // compute from where we are *going* to be
      var npos1 = s.pos.clone().add(s.vel);
      var apos1 = a.pos.clone().add(a.vel);
      var rel1 = npos1.sub(apos1);
      rel1.relativewrap(1);  
      var distance1 = Math.max(rel1.len() - a.size - s.size, 0);
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance1 - shark_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / shark_optimal_distance;
        neighbour_avoidances.add(rel1.clone().setmag(normalized));
      }
    }
	}
  
   for (var r of rocks) {
    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = r.pos.clone().sub(a.pos);
    
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1);    // 1 is the size of our world   
    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - r.size, 0);
    
    // is the neighbour close enough to be seen?
    var in_visible_range = distance < shark_range_of_view;   
    
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < shark_field_of_view;   
    if (in_visible_range && in_visible_angle) {
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance - shark_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / shark_optimal_distance;
        neighbour_avoidances.add(rel.clone().setmag(normalized));
      }
    }
  }
  
  // did we see anyone?
	a.sees_neighbours = neighbours > 0;
	if (a.sees_neighbours) {
    // convert accumulated information into averages:
    neighbour_locations.div(neighbours);
    neighbour_velocities.div(neighbours);    
    // change factors:
    neighbour_locations.mul(centering_factor);
    // apply to desired velocity
    // (note avoidance is subtracted, as a repulsion):
    desired_velocity
      .add(neighbour_locations)
      .add(neighbour_velocities);
	}
  
  // avoidances can happen even without neighbours (obstacles)
  neighbour_avoidances.mul(avoidance_factor); 
  desired_velocity.add(neighbour_avoidances);
  
  // to convert desired_velocity into a steering force,
  // need to subtract current velocity
  a.acceleration = desired_velocity.sub(a.vel);
  // apply constraints:
  a.acceleration.limit(max_force);
  
}*/


//calculates the behaviour of the blue_fish
function update_blue_fish(a) {
  
  // we will compute a desired velocity
  var desired_velocity = a.vel.clone()
    .rotate(random_walk_variance*(random()-0.5))
    .setmag(blue_fish_max_speed * random());
  
	var dir = a.vel.angle();
	
	var fish_neighbours = 0;
  

  var fish_neighbour_locations = new vec2();
  var fish_neighbour_velocities = new vec2();
  var fish_neighbour_avoidances = new vec2();
	
  // check for visible fish:
	for (var b of blue_fish) {
		if (b == a) continue;	
		
  
    var rel = b.pos.clone().sub(a.pos);
  
    rel.relativewrap(1);   
    
    var distance = Math.max(rel.len() - a.size - b.size, 0);
    
    var in_visible_range = distance < blue_fish_range_of_view;    
    
    var viewrel = rel.clone().rotate(-dir);
    
    var in_visible_angle = Math.abs(viewrel.angle()) < blue_fish_field_of_view;   
    
    if (in_visible_range && in_visible_angle) {
      
      fish_neighbours++;
      
      fish_neighbour_locations.add(rel);
     
      var relative_velocity = b.vel.clone().rotate(-dir);
      fish_neighbour_velocities.add(b.vel);   
     
      var npos1 = b.pos.clone().add(b.vel);
      var apos1 = a.pos.clone().add(a.vel);
      var rel1 = npos1.sub(apos1);
      rel1.relativewrap(1);  
      var distance1 = Math.max(rel1.len() - a.size - b.size, 0);
     
      var negative_feeling = Math.min(0, distance1 - blue_fish_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / blue_fish_optimal_distance;
        fish_neighbour_avoidances.add(rel1.clone().setmag(normalized));
      }
    }
	}
  
  for (var s of sharks) {
   
    var rel = s.pos.clone().sub(a.pos);
    
    rel.relativewrap(1);    
    
    var distance = Math.max(rel.len() - a.size - s.size, 0);
    
    var in_visible_range = distance < blue_fish_range_of_view;

    var viewrel = rel.clone().rotate(-dir);
    
    var in_visible_angle = Math.abs(viewrel.angle()) < blue_fish_field_of_view;
    
    if (in_visible_range && in_visible_angle) {
      var negative_feeling = Math.min(0, distance - blue_fish_optimal_distance);
      
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / blue_fish_optimal_distance;
        fish_neighbour_avoidances.add(rel.clone().setmag(normalized));
      }
    }
  }
	
  for (var r of rocks) {
    
    var rel = r.pos.clone().sub(a.pos);
    
    rel.relativewrap(1);       
    
    var distance = Math.max(rel.len() - a.size - r.size, 0);
     
    var in_visible_range = distance < blue_fish_range_of_view;   
    
    var viewrel = rel.clone().rotate(-dir);
    
    var in_visible_angle = Math.abs(viewrel.angle()) < blue_fish_field_of_view;  
    
    if (in_visible_range && in_visible_angle) {
      var negative_feeling = Math.min(0, distance - blue_fish_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / blue_fish_optimal_distance;
        fish_neighbour_avoidances.add(rel.clone().setmag(normalized));
      }
    }
  }
  
	a.sees_neighbours = fish_neighbours > 0;
	if (a.sees_neighbours) {
    
    fish_neighbour_locations.div(fish_neighbours);
    fish_neighbour_velocities.div(fish_neighbours);    
    fish_neighbour_locations.mul(centering_factor);
    desired_velocity
      .add(fish_neighbour_locations)
      .add(fish_neighbour_velocities);
	}
  
  fish_neighbour_avoidances.mul(avoidance_factor); 
  desired_velocity.add(fish_neighbour_avoidances);

  a.acceleration = desired_velocity.sub(a.vel);

  a.acceleration.limit(max_force);
}
 
function update_green_fish(a) {
  
  // we will compute a desired velocity
  var desired_velocity = a.vel.clone()
    .rotate(random_walk_variance*(random()-0.5))
    .setmag(green_fish_max_speed * random());
  
	var dir = a.vel.angle();
	
	var fish_neighbours = 0;
  
  // these are for the three steering forces:
  var fish_neighbour_locations = new vec2();
  var fish_neighbour_velocities = new vec2();
  var fish_neighbour_avoidances = new vec2();
	
  // check for visible neighbours:
  // (might not be the most optimal, but it is simple):
	for (var g of green_fish) {
		if (g == a) continue;	// don't count yourself!
		
    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = g.pos.clone().sub(a.pos);
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1);    // 1 is the size of our world    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - g.size, 0);
    // is the neighbour close enough to be seen?
    var in_visible_range = distance < green_fish_range_of_view;    
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < green_fish_field_of_view;   
    // neighbour seen if within range & field of view:
    if (in_visible_range && in_visible_angle) {
      // yes -- add to count of neighbours
      fish_neighbours++;
      // accumulate relative locations for centering force
      fish_neighbour_locations.add(rel);
      // rotate neighbour velocity into agent's perspective,
      // accumulate for aligning force
      var relative_velocity = g.vel.clone().rotate(-dir);
      fish_neighbour_velocities.add(g.vel);   
      // are we likely to collide?
      // compute from where we are *going* to be
      var npos1 = g.pos.clone().add(g.vel);
      var apos1 = a.pos.clone().add(a.vel);
      var rel1 = npos1.sub(apos1);
      rel1.relativewrap(1);  
      var distance1 = Math.max(rel1.len() - a.size - g.size, 0);
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance1 - green_fish_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / green_fish_optimal_distance;
        fish_neighbour_avoidances.add(rel1.clone().setmag(normalized));
      }
    }
	}
  
  for (var s of sharks) {
    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = s.pos.clone().sub(a.pos);
    
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1);    // 1 is the size of our world 
    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - s.size, 0);
    
    // is the neighbour close enough to be seen?
    var in_visible_range = distance < green_fish_range_of_view;
    
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < green_fish_field_of_view;   
    if (in_visible_range && in_visible_angle) {
      
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance - green_fish_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / green_fish_optimal_distance;
        fish_neighbour_avoidances.add(rel.clone().setmag(normalized));
      }
    }
  }
	
  for (var b of blue_fish) {
    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = b.pos.clone().sub(a.pos);
    
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1);    // 1 is the size of our world 
    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - b.size, 0);
    
    // is the neighbour close enough to be seen?
    var in_visible_range = distance < green_fish_range_of_view;
    
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < green_fish_field_of_view;   
    if (in_visible_range && in_visible_angle) {
      
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance - green_fish_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / green_fish_optimal_distance;
        fish_neighbour_avoidances.add(rel.clone().setmag(normalized));
      }
    }
  }
  
  for (var p of rocks) {
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
    var in_visible_range = distance < green_fish_range_of_view;   
    
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < green_fish_field_of_view;   
    if (in_visible_range && in_visible_angle) {
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance - green_fish_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling  / green_fish_optimal_distance;
        fish_neighbour_avoidances.add(rel.clone().setmag(normalized));
      }
    }
  }
  
  // did we see anyone?
	a.sees_neighbours = fish_neighbours > 0;
	if (a.sees_neighbours) {
    // convert accumulated information into averages:
    fish_neighbour_locations.div(fish_neighbours);
    fish_neighbour_velocities.div(fish_neighbours);    
    // change factors:
    fish_neighbour_locations.mul(centering_factor);
    // apply to desired velocity
    // (note avoidance is subtracted, as a repulsion):
    desired_velocity
      .add(fish_neighbour_locations)
      .add(fish_neighbour_velocities);
	}
  
  // avoidances can happen even without neighbours (obstacles)
  fish_neighbour_avoidances.mul(avoidance_factor); 
  desired_velocity.add(fish_neighbour_avoidances);
  
  // to convert desired_velocity into a steering force,
  // need to subtract current velocity
  a.acceleration = desired_velocity.sub(a.vel);
  // apply constraints:
  a.acceleration.limit(max_force);
}


function update() {

  for (var a of blue_fish) {
  	update_blue_fish(a);
  }
  for (var a of blue_fish) {
  	move_blue_fish(a);
  }
  
  for (var a of green_fish) {
  	update_green_fish(a);
  }
  for (var a of green_fish) {
  	move_green_fish(a);
  }
  
  /*for (var a of sharks) {
    update_sharks(a);
  }*/
  
  for (var a of sharks) {
  	move_sharks(a);
  }
  
}
  
function draw() {
  
  draw2D.color("peru");
  for (var p of rocks) {
    draw2D.circle(p.pos, p.size);
  }
  
  // draw field
  //water.draw();
  //water.set(0); 
  
  // draw sharks
  for (var s of sharks) {
    draw2D.push().translate(s.pos).rotate(s.vel).scale(s.size);
    // eyes
    draw2D.color("white")
     // .circle([1, shark_eye], 0.5)
     // .circle([1, -shark_eye], 0.5);
    // body
    draw2D.color("dimgray")
      .rect([0, 0], 3, .75) // body
      .rotate(300)
      .rect([0, 0], 2, .5) // pectoral fin
      .rotate(300) //.rotate(300)
      .rect([1.75, 0], 2, .25); // caudal fin

    draw2D.pop();
  }
  
  //draw the fish
  for (var f of blue_fish) {
    draw2D.push().translate(f.pos).rotate(f.vel).scale(f.size);
    //eyes
    draw2D.color("white")
      .circle([.75, fish_eye], 0.25)
      .circle([.75, -fish_eye], 0.25);
    // body
    draw2D.color("blue")
      .rect([0, 0], 2, .5) // body length
      .rotate(300)
      .rect([0, 0], 1, .5)
      .rotate(300)
      .rect([.75, 0], 1, .25);

    draw2D.pop();
  }
  
  for (var g of green_fish) {
    draw2D.push().translate(g.pos).rotate(g.vel).scale(g.size);
    //eyes
    draw2D.color("white")
      .circle([.75, fish_eye], 0.25)
      .circle([.75, -fish_eye], 0.25);
    // body
    draw2D.color("green")
      .rect([0, 0], 2, .5) // body length
      .rotate(300)
      .rect([0, 0], 1, .5)
      .rotate(300)
      .rect([.75, 0], 1, .25);

    draw2D.pop();
  }
}


