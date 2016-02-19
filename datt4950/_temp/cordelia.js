// create a field of sugar concentrations

var sugar = new field2D(128);
var sugar_old = sugar.clone();

var phero_green = sugar.clone();
var phero_green_old = phero_green.clone();
var phero_red = sugar.clone();
var phero_red_old = phero_red.clone();
var phero_blue = sugar.clone();
var phero_blue_old = phero_blue.clone();

var phero_diffuse = 0.01;
var phero_decay = 0.99;

var signal_decay = 0.01;

var sensor_size = 0.5;


var agents_green = [];
for (var i = 0; i < 50; i++) {
  agents_green.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    size: 0.02,
    // internal states:
    signal: 1,
    active: true,
  });
}
var agents_blue = [];
for (var i = 0; i < 90; i++) {
  agents_blue.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    size: 0.01,
    // internal states:
    signal: 0,
    active: false,
  });
}
var agents_red = [];
for (var i = 0; i < 90; i++) {
  agents_red.push({
    pos: new vec2(random(), random()),
    vel: vec2.random(0.001),
    size: 0.01,
    // internal states:
    signal: 0,
    active: false,
  });
}

function update() {
  // update green field:
  var tmp = phero_green_old;
  phero_green_old = phero_green;
  phero_green = tmp;
  // diffuse it:
  phero_green.diffuse(phero_green_old, phero_diffuse).mul(phero_decay);

  // update red field:
  var tmp = phero_red_old;
  phero_red_old = phero_red;
  phero_red = tmp;
  // diffuse it:
  phero_red.diffuse(phero_red_old, phero_diffuse).mul(phero_decay);

  
  // update blue field:
  var tmp = phero_blue_old;
  phero_blue_old = phero_blue;
  phero_blue = tmp;
  // diffuse it:
  phero_blue.diffuse(phero_blue_old, phero_diffuse).mul(phero_decay);

  for (var a of agents_green) {
    var dir = a.vel.angle();
    // get sensor location:
    var s1 = new vec2(sensor_size, sensor_size).mul(a.size).rotate(dir).add(a.pos);
    var s2 = new vec2(sensor_size, -sensor_size).mul(a.size).rotate(dir).add(a.pos);
   
    var steer = srandom() * 0.5;
    
    if (a.signal > 0) phero_green.deposit(a.signal, a.pos);
      for (var b of agents_blue){
        //check to see if a green agent touches a blue one
        var atnest = a.pos.distance(b.pos) < b.size;
        
        if (atnest) {
          a.signal = 1;
          a.vel.negate();
          a.active = true;
          
          b.vel.rotate(steer).len(0.005);
          b.pos.add(b.vel).wrap(1);
          console.log("blue.")
        }
      }

    
    // trail gradually weakens:
    a.signal -= signal_decay;
    //check to see if agent is still active
    if(a.signal <= 0){
      a.active = false;
    }
    
    // steering & locomotion
    if(a.active){
      a.vel.rotate(steer).len(0.005);
      a.pos.add(a.vel).wrap(1);
    } else {
      //stays in spot
    }
    
    
  }
  for (var a of agents_blue) {
    var dir = a.vel.angle();
    // get sensor location:
    var s1 = new vec2(sensor_size, sensor_size).mul(a.size).rotate(dir).add(a.pos);
    var s2 = new vec2(sensor_size, -sensor_size).mul(a.size).rotate(dir).add(a.pos);
   
    var steer = srandom() * 0.5;
    
    if (a.signal > 0) phero_blue.deposit(a.signal, a.pos);
      for (var b of agents_red){
        //check to see if a blue agent touches a red one
        var atnest = a.pos.distance(b.pos) < b.size;

        if (atnest) {
          a.signal = 1;
          a.vel.negate();
          a.active = true;
          
          b.vel.rotate(steer).len(0.005);
          b.pos.add(b.vel).wrap(1);
          console.log("blue.")
        }
      }

    
    // trail gradually weakens:
    a.signal -= signal_decay;
    //check to see if agent is still active
    if(a.signal <= 0){
      a.active = false;
    }
    
    // steering & locomotion
    if(a.active){
      a.vel.rotate(steer).len(0.005);
      a.pos.add(a.vel).wrap(1);
    } else {
      //stays in spot
    }
    
  }
  for (var a of agents_red) {
    var dir = a.vel.angle();
    // get sensor location:
    var s1 = new vec2(sensor_size, sensor_size).mul(a.size).rotate(dir).add(a.pos);
    var s2 = new vec2(sensor_size, -sensor_size).mul(a.size).rotate(dir).add(a.pos);
   
    var steer = srandom() * 0.5;
    
    if (a.signal > 0) phero_red.deposit(a.signal, a.pos);
      for (var b of agents_green){
        var atnest = a.pos.distance(b.pos) < b.size;
        
        if (atnest) {
          a.signal = 1;
          a.vel.negate();
          a.active = true;
          
          b.vel.rotate(steer).len(0.005);
          b.pos.add(b.vel).wrap(1);
        }
      }

    
    // trail gradually weakens:
    a.signal -= signal_decay;
    //check to see if agent is still active
    if(a.signal <= 0){
      a.active = false;
    }
    
    // steering & locomotion
    if(a.active){
      a.vel.rotate(steer).len(0.005);
      a.pos.add(a.vel).wrap(1);
    } else {
      //stays in spot
    }
    
  }
}

function draw() {
  // draw fields
  draw2D.blend(true);
  draw2D.color("green");
  phero_green.draw();
  draw2D.color("darkred");
  phero_red.draw();
  draw2D.color("blue");
  phero_blue.draw();
  
  // draw agents
  for (var a of agents_green) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // body
    draw2D.color("green")
      .circle([0.3, 0]).circle([-0.3, 0]);
    // sensor (shows current state by color)
    draw2D.color(a.active ? "orange" : "black");
    draw2D.circle([sensor_size, sensor_size], sensor_size);
    draw2D.circle([sensor_size,-sensor_size], sensor_size);
    draw2D.pop();
  }
  for (var a of agents_blue) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // body
    draw2D.color("blue")
      .circle([0.3, 0]).circle([-0.3, 0]);
    // sensor (shows current state by color)
    draw2D.color(a.active ? "orange" : "black");
    draw2D.circle([sensor_size, sensor_size], sensor_size);
    draw2D.circle([sensor_size,-sensor_size], sensor_size);
    draw2D.pop();
  }
  for (var a of agents_red) {
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // body
    draw2D.color("red")
      .circle([0.3, 0]).circle([-0.3, 0]);
    // sensor (shows current state by color)
    draw2D.color(a.active ? "orange" : "black");
    draw2D.circle([sensor_size, sensor_size], sensor_size);
    draw2D.circle([sensor_size,-sensor_size], sensor_size);
    draw2D.pop();
  }
}