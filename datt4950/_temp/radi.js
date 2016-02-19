
var lightFood = new field2D(18);
var lightFood_old = lightFood.clone();

var light_food = lightFood.clone();
var light_food_old = light_food.clone();
var light_nest = lightFood.clone();
var light_nest_old = light_nest.clone();

var light_diffuse = 0.01;
var light_decay = 0.99;

var signal_decay = 0.001;

var nest = new vec2(.1, .1);
var nest_radius = 0.03;

var sensor_size = 0.5;
var sensor_noise = 0.01;

var fireFlySpeed = 0.002;

var target = new vec2();

var chase_threshold = 0.2;
var kill_threshold = 0.001; 


function reset_lightFood() {
  
  lightFood.set(0);
 
  for (var i = 0; i < 10; i++) {
    var p = vec2.random(0.5).add(1).mul(0.5);
    lightFood.deposit(random(), p);
  }
   lightFood.diffuse(lightFood.clone(), lightFood.width, 13);
  
  lightFood.normalize();

  lightFood.map(function(v) {
    return v > 0.8 ? 8 : 0;
  });
}
reset_lightFood();

var agents = [];
for (var i = 0; i < 50; i++) {
  agents.push({
    pos: nest.clone(),
    vel: vec2.random(0.001),
    size: 0.01,
  });
}

var bird = {

  pos: new vec2(0.5, 0.5),
  
  chase: false, 
  vel: vec2.random(0.001),
  size: 0.02,
  steering: new vec2(),
   wander: vec2.random(),  
  max_force: 1/2000,
  max_speed: 1/300,
  chase_speed: 1/100,
  chase_meter: 1,
};

function locomotion(bird) {
  var force = bird.steering.limit(bird.max_force);
  var acceleration = force; 
  bird.vel.add(acceleration);
  bird.pos.add(bird.vel);
  bird.pos.wrap(1);
}

function steering_hunt(bird) {  bird.wander.add(vec2.random(0.5)).len(0.5);
 
  var desired_velocity = bird.vel.clone().len(0.5).add(bird.wander);
  desired_velocity.limit(bird.max_speed);
  bird.steering = desired_velocity.sub(bird.vel);
}

function steering_chase(bird, target) {
  var rel = target.clone().sub(bird.pos);

  var desired_velocity = rel.limit(bird.chase_speed);
  bird.steering = desired_velocity.sub(bird.vel);
  
}

function update() {
  
 
  var tmp = light_food_old;
  light_food_old = light_food;
  light_food = tmp;
  
  light_food.diffuse(light_food_old, light_diffuse).mul(light_decay);
 

 
  for (var a of agents) {
    var dir = a.vel.angle();
    
   
    var s1 = new vec2(sensor_size, sensor_size).mul(a.size).rotate(dir).add(a.pos);
    var s2 = new vec2(sensor_size, -sensor_size).mul(a.size).rotate(dir).add(a.pos);
   
    var steer = srandom() * 0.5;
    
    if(a.flee){
       console.log(steer);  
    } else {
        if (a.has_food) {
        
        if (a.signal > 0) light_food.deposit(a.signal, a.pos);

      
        var atnest = a.pos.distance(nest) < nest_radius;
        if (atnest) {
          a.signal = 1;
          a.has_food = false;
          a.vel.negate();
        }

        var v1 = light_nest.sample(s1);
        var v2 = light_nest.sample(s2);
        if (v1 + v2 > sensor_noise) {
          steer = v1-v2;
        }
      } else if (!a.has_food) {
       
        if (a.signal > 3) light_nest.deposit(a.signal, a.pos);

       
        var food = Math.max(0, lightFood.sample(a.pos));
        if (food > 0) {
          a.signal = 1;
          lightFood.deposit(-food, a.pos);
          a.has_food = true;
          a.vel.negate();

        }

        var v1 = light_food.sample(s1);
        var v2 = light_food.sample(s2);
        if (v1 + v2 > sensor_noise) {
          steer = v1-v2;
        }
      }  
    }
   
    
   
     a.signal -= signal_decay;
       a.vel.rotate(steer).len(fireFlySpeed);
    a.pos.add(a.vel).wrap(1);
    
    var d = a.pos.distance(bird.pos)
    if(d < chase_threshold){
      target = a.pos;
      bird.chase = true;
      a.flee = true;
      if(d <= kill_threshold){
        var index = agents.indexOf(a);
        if(index > -1){
           agents.splice(index, 1);
        }
      }
    }
  }
  
  if(bird.chase){
      steering_chase(bird, target);
      bird.chase_meter -= 0.01;
      if(bird.chase_meter < 0){
        bird.chase = false;
        bird.chase_meter = 1; 
      }
    } else {
      steering_hunt(bird);
      console.log("hunting");
    }
  locomotion(bird);
}

function draw() {
  draw2D.blend(true);
  draw2D.color("yellow");
    lightFood.draw();
  draw2D.blend(false);

  for (var a of agents) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
      // body
          // draw agent tail:
    draw2D.color("lime").circle([-1, 0], 1);
    // draw agent body:
    draw2D.color("pink").rect([0, 0], [1.8, 1]);
    // draw agent eyes:
   draw2D.color("white").circle([0.9, 0.3], 0.5).circle([0.9, -0.3], 0.5);
    //eyes:
    draw2D.color("red").circle([0.9, 0.3], 0.25).circle([0.9, -0.3], 0.25);
    // wings:
    draw2D.color("gray", 1.7).circle([-0.1, 0.5], [0.8, 3]).circle([0, -0.5], [0.8, 3]);
      // sensor (shows current state by color)
      
      draw2D.circle([sensor_size, sensor_size], sensor_size);
      draw2D.circle([sensor_size,-sensor_size], sensor_size);
    draw2D.pop();
  }
  
  // draw bird
  draw2D.push().translate(bird.pos).rotate(bird.vel).scale(bird.size);
  draw2D.color("red").circle([0.7, 0], 1.5).triangle([0, 0], 1, 6).triangle([0, 0], 6, 1).circle([-0.5, 0], [3, 1.5]);
  draw2D.color("yellow").triangle([1.5, 0], 1);
  draw2D.color("black").circle([0.9, 0.3], 0.6).circle([0.9, -0.3], 0.6);
  draw2D.color("white").circle([0.9, 0.3], 0.2).circle([0.9, -0.3], 0.2);
  draw2D.pop()
    
}