var water = new field2D(256);
var water_old = water.clone();

var sensor_size = 0.5; 
var fish_sensor = 0.25;
var fish_max_speed = 0.015;
var shark_max_speed = 0.003;
var max_force = 0.0004;
var centering_factor = 0.001;
var avoidance_factor = 1;
var fish_optimal_distance = 0.0004;
//var shark_optiaml_distance = 0.03; // for shark sensing fish
var fish_range_of_view = 0.1;
//var shark_range_of_view = 0.05; // for shark sensing fish
var fish_field_of_view = 2;
var shark_field_of_view = 3.5; // for shark sensing fish
var random_walk_variance = 1;

var fish = [];
var sharks = [];

function make_fish() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * fish_max_speed),
    acceleration: new vec2(),
    size: (random() + 1)/160,
  };
  fish.push(a);
  return a;
}
for (var i=0; i<200; i++) make_fish();


//make the sharks
function make_shark() {
  var b = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * shark_max_speed),
    acceleration: new vec2(),
    size: (random() + 1)/55,
  };
  sharks.push(b);
  return b;
}
for (var i=0; i<10; i++) make_shark();


//this function gives the fish an initial movement
function move_fish(a) {
  a.vel.add(a.acceleeration).limit(fish_max_speed);
  a.pos.add(a.vel).wrap(1);
}

//this function gives the sharks an initial movement
function move_sharks(b) {
  b.vel.add(b.acceleeration).limit(shark_max_speed);
  b.pos.add(b.vel).wrap(1);
}


//creates the fish behaviour
function update_fish(a) {
  
  //compute an inital velocity
  var fish_desired_velocity = a.vel.clone()
    .rotate(random_walk_variance*(random()-0.5))
    .setmag(fish_max_speed * random);
  
  var fish_dir = a.vel.angle();
  
  var fish_neighbors = 0;
  
  //three steering forces
  var fish_neighbor_locations = new vec2();
  var fish_neighbor_velocities = new vec2();
  var fish_neighbor_avoidances = new vec2();
  
  //check for nearby fish
  for (var n of fish) {
      if (n == a) continue;
    
      //get the relative vector to the closet fish
      var fish_rel = n.pos.clone().sub(a.pos);
      fish_rel.relativewrap(1);
    
      //subtract sizes to get view distance
      var fish_distance = Math.max(fish_rel.len() - a.size - n.size, 0);
      var fish_in_visible_range = fish_distance < fish_range_of_view;
      var fish_viewrel = fish_rel.clone().rotate(-fish_dir);
      
      //is the fish_neighbor in the fishs field of view
      var fish_in_visible_angle = Math.abs(fish_viewrel.angle()) < fish_field_of_view;
    
      if (fish_in_visible_range && fish_in_visible_angle) {
        fish_neighbors++;
        fish_neighbor_locations.add(fish_rel);
        var fish_relative_velocity = n.vel.clone().rotate(-fish_dir);
        fish_neighbor_velocities.add(n.vel);
        var npos1 = n.pos.clone().add(n.vel);
        var apos1 = a.pos.clone().add(a.vel);
        var fish_rel1 = npos1.sub(apos1);
        fish_rel1.relativewrap(1);
        var fish_distance1 = Math.max(fish_rel1.len() - a.size - n.size, 0);
        
        //removed the negative feeling and uncomfortable parts from the code. I didn't find it necessary and I was also trying to debug why the fish weren't avoiding the sharks
        
        /*var fish_negative_feeling = Math.min(0, fish_distance1 - fish_optimal_distance);
        if (fish_negative_feeling < 0) {
          var fish_normalized = fish_negative_feeling / fish_optimal_distance;
          fish_neighbor_avoidances.add(fish_rel1.clone().setmag(fish_normalized));
        }*/
      } 
   }
  
  for (var p of sharks) {
    
    var shark_rel = p.pos.clone().sub(a.pos);
    shark_rel.relativewrap(1);
    var shark_distance = Math.max(shark_rel.len() - a.size - p.size, 0);
    var shark_in_visible_range = shark_distance < fish_range_of_view;
    var shark_viewrel = shark_rel.clone().rotate(-fish_dir);    
    var shark_in_visible_angle = Math.abs(shark_viewrel.angle()) < fish_field_of_view;
    
    //removed the negative feeling and uncomfortable parts from the code. I didn't find it necessary and I was also trying to debug why the fish weren't avoiding the sharks
    
    /*if (shark_in_visible_angle && shark_in_visible_range) {
      
      var shark_negative_feeling = Math.min(0, shark_distance -fish_optimal_distance);
      
      if (shark_negative_feeling < 0) {
        var shark_normalized = shark_negative_feeling / fish_optimal_distance;
        fish_neighbor_avoidances.add(shark_rel.clone().setmag(shark_normalized));
      }
    }*/
  }
  
  
  a.fish_sees_neighbors = fish_neighbors > 0.5; // I messed with this to see if it was the cause of the fish not acting the way that I wanted. I reverted to the flocker code and was still unable to get it to work
  if (a.fish_sees_neighbors) {
    fish_neighbor_locations.div(fish_neighbors);
    fish_neighbor_velocities.div(fish_neighbors);
    fish_neighbor_locations.mul(centering_factor);
    fish_desired_velocity
      .add(fish_neighbor_locations)
      .add(fish_neighbor_velocities)
  } 
  
  fish_neighbor_avoidances.mul(avoidance_factor);
  fish_desired_velocity.add(fish_neighbor_avoidances);
  
  a.acceleration = fish_desired_velocity.sub(a.vel);
  a.acceleration.limit(max_force);
  
}


function update() {
  
  //moves the sharks
  for (var b of sharks) {
    move_sharks(b);
  }
  
  //moves and give the fish behaviour
  for (var a of fish) {
    move_fish(a);
    update_fish(a);
  }
  
  // gives the fish behavoiur
  // I combined this with the above for loop
  //for (var c of fish) {
  //  update_fish(c);
  //}
}

//draws the fish, sharks and sets the field
function draw() {
  
  // draw field
  water.draw();
  water.set(0); //changed the color of the field to white (1)
  
  // draw sharks
  for (var s of sharks) {
    draw2D.push().translate(s.pos).rotate(s.vel).scale(s.size);
    // eyes
    draw2D.color("white")
      .circle([1, sensor_size], 0.5)
      .circle([1, -sensor_size], 0.5);
    // body
    draw2D.color("gray")
      .rect([0, 0], 3, .75) // body
      .rotate(300)
      .rect([0, 0], 2, .5) // pectoral fin
      .rotate(300)
      .rect([1.75, 0], 2, .25); // caudal fin

    draw2D.pop();
  }
  //draw the fish
  for (var f of fish) {
    draw2D.push().translate(f.pos).rotate(f.vel).scale(f.size);
    //eyes
    draw2D.color("white")
      .circle([.75, fish_sensor], 0.25)
      .circle([.75, -fish_sensor], 0.25);
    // body
    draw2D.color("blue")
      .rect([0, 0], 2, .5) // body length
      .rotate(300)
      .rect([0, 0], 1, .5)
      .rotate(300)
      .rect([.75, 0], 1, .25);

    draw2D.pop();
  }
}