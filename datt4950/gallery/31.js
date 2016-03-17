author = "Chemotactic Vehicles"

var sensor_size = 0.5;
var base_speed = 0.01;
var min_speed = base_speed/10;

// create a field of sugar concentrations
var light = new field2D(256);
var light_old = light.clone();

// mouse adds sugar:
function mouse(e, pt) {
	light.deposit(10, pt);
}

var agents = [];
for (var i=0; i<40; i++) {
	agents.push({
		pos: new vec2(random(), random()),
		vel: vec2.random(0.001),
		size: 0.02,
    // stored recollection of previous sense
		sense_memory: 0.5,
	});
}

var source = {
  pos: new vec2(0.5, 0.5),
	vel: vec2.random(),
};

function update() {
  // update field:
  var tmp = light_old;
  light_old = light;
  light = tmp;
  light.mul(0.999);
  // diffuse it:
  light.diffuse(light_old, 0.1);
  // small background noise:
  //sugar.map(function(v) { return v + 0.01*srandom(); });

  // apply source agent to sugar:
  light.deposit(2, source.pos);
  // and then move it (random walk):
  source.vel.rotate(random()-0.5).len(random()*0.003);
  source.pos.add(source.vel).wrap(1);
  
	for (var a of agents) {
    // get agent heading:
    var dir = a.vel.angle();
    // get sensor locations:
    var sensor1 = new vec2(sensor_size, sensor_size).mul(a.size).rotate(dir).add(a.pos);
    var sensor2 = new vec2(sensor_size, -sensor_size).mul(a.size).rotate(dir).add(a.pos);
    
    // get the sugar levels at these locations:
		var sense1 = light.sample(sensor1);
		var sense2 = light.sample(sensor2);
    
    // convert to locomotion:
    var wheel1 = sense2;
    var wheel2 = sense1;
    // as a vector:
    var speed = (wheel1 + wheel2)/2;
    var steer = wheel2 - speed;  // for turn
    if (speed > min_speed) {
      a.vel.rotate(steer).len(speed * base_speed);		
    } else {
      // minimum wander:
      a.vel.rotate((random()-0.5)*0.05).len(min_speed);
    }
		// locomotion
		a.pos.add(a.vel).wrap(1);
	}
}
  
function draw() {
  // draw field
  light.draw();
  // draw agents
  for (var a of agents) {
  	draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // sensor (shows current state by color)
    draw2D.color(1-a.sense_memory, a.sense_memory, 0.5)
  	  .circle([sensor_size, sensor_size], 0.5)
  	  .circle([sensor_size,-sensor_size], 0.5);
  	// body
    draw2D.color("darkred")
  		.rect([0., 0], 1.5, 1);
  	draw2D.pop();
  }
}