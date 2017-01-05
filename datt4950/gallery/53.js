title = "Mitosis"
author = "Daniel James"

max_speed = 0.005;
max_acceleration = 0.0002;
agent_range_of_view = 0.023;
personal_space = 0.0075;

centering_factor = 0.001;
flow_factor = 0.1;
avoidance_factor = 1;

var maxPopSize = 175;
var colorVariation = 0.023;

var agents = [];

function makeAgent() {
	var strength = 1;
	// make half of the agents remove from the background instead of adding to it
	if (random(10) > 5) strength = -strength;
	
	return {
		pos: new vec2(random(), random()),
		vel: vec2.random(max_speed),
		acc: new vec2(),
		size: 0.5,
		age: 0,
		ageLimit: random(1500) * 0.01,
		r: 0.3,
		g: 0.2,
		b: 0.7,
		strength: strength,
		avoidances: new vec2(),
		neighbour_count: 0,
		range_of_view: 0.025,
		personal_space: 0.00075,
		avoidance_factor: 0.1,
		time_without_collision: 0,
		colour_variance: 0.012,
		random_walk_amount: 0.2,
	}
}

var background = new field2D(128);
var background_past = background.clone();

function update() {
	
	// make the first agent
	if (agents.length == 0) {
		var firstAgent = makeAgent();
		firstAgent.pos = new vec2(0.5, 0.5);

		// if it's completely random, sometimes there will be black agents
		// so the range of r, g, and b is 0.4 - 1
		firstAgent.r = (4 + random(6)) * 0.1;
		firstAgent.g = (4 + random(6)) * 0.1;
		firstAgent.b = (4 + random(6)) * 0.1;

		agents.push(firstAgent);
	}
	
	// change agent attributes based on their colours
	for (var a of agents) {
		a.personal_space = a.size * 1.5;
		a.range_of_view = a.personal_space * 2;
		
		var red = a.r;
		var green = a.g;
		var blue = a.b;
		
		// use green to calculate how far around itself an agent can see
		a.range_of_view *= (0.5 + green);
		a.personal_space *= (0.5 + green);
		
		// use blue to modify the strength of the trail an agent leaves behind
		var mod = 0.05;
		if (random(10) < 5) mod = -mod;
		a.strength += (mod * blue);
		
		// use red to change how much an agent will rotate when wandering
		var change = 0.005 * red;
		if (a.age > a.ageLimit/2 && random(10) < 5 && a.random_walk_amount > 0) change = -change;
		if (a.random_walk_amount > 0 && a.random_walk_amount < 0.5) a.random_walk_amount += change;
	}
	
	// kill, grow, and split agents
	var i = agents.length;
	while (i--) {
		var a = agents[i];
		
		// set agent's age
		a.age += dt;
		
		// leave trail based on agent size and strength
		var amt = a.strength * a.size + 0.1;// + 0.3; //0.5;// * a.size;
		background.deposit([amt * a.r, amt * a.g, amt * a.b], a.pos);
		
		// agent's chance of dying if it doesn't meet a neighbour
		if (agents.length > 0 && a.time_without_collision > 50 && random(10) > 3) {
			agents.splice(i, 1);
		}
		
		// if it's been around long enough
		if (a.size > 0.02 && a.age > a.ageLimit && agents.length < maxPopSize) {
			
			// the chances of an agent splitting start at 100% and after the scene is 
			// half full, slowly descend to 50% as the population approaches maxPopSize
			if (random(maxPopSize) > agents.length - maxPopSize / 2) {
				agents.splice(i, 1);
				
				var childOne = makeAgent();
				var childTwo = makeAgent();
				
				// reset their age
				childOne.age = 0;
				childTwo.age = 0;
				
				// make the new agents three quarters the size of the original
				childOne.size = a.size * 0.75;
				childTwo.size = a.size * 0.75;
				
				// inhereit colours and modify them slightly
				childOne.r = a.r + (random(10) - 5) * a.colour_variance;
				childOne.g = a.g + (random(10) - 5) * a.colour_variance;
				childOne.b = a.b + (random(10) - 5) * a.colour_variance;
				
				childTwo.r = a.r + (random(10) - 5) * a.colour_variance;
				childTwo.g = a.g + (random(10) - 5) * a.colour_variance;
				childTwo.b = a.b + (random(10) - 5) * a.colour_variance;
				
				// have the new agents start in roughly the same position
				childOne.pos.set(a.pos.add(a.size/3, 0));
				childTwo.pos.set(a.pos.add(0, a.size/3));
				
				agents.push(childOne);
				agents.push(childTwo);
			} 
			// the chances of an agent growing bigger start at 0% and after the scene is 
			// half full, slowly climb to 50% as the population approaches maxPopSize
			else {
				a.size *= 1.25;
				a.age = 0;
				a.ageLimit = random(1500) * 0.01;
			}
		} 
	}
	
	// calculate agent neighbours/collisions
	for (var a of agents) {
		
		// if the agent has been wandering alone for long enough, make it grow to two times its size
		if (agents.length > maxPopSize/4 && a.time_without_collision > 50 && random(maxPopSize) < agents.length) {
			a.size *= 2;
			a.time_without_collision = 0;
			a.age = 0;
			a.ageLimit = random(1500) * 0.01;
		}
		
		for (var n of agents) {
			
			a.neighbour_count = 0;
			
			if (a == n) continue;
			
			var rel = n.pos.clone().sub(a.pos);
			rel.relativewrap(1);
			
			var distance = Math.max(rel.len() - a.size - n.size, 0);
			
			if (distance < ((a.personal_space + n.personal_space) / 2)) {
				a.time_without_collision = 0;
				n.time_without_collision = 0;
			} else {
				a.time_without_collision++;
				n.time_without_collision++;
			}

		  if (distance > a.range_of_view) continue;
			
			a.neighbour_count++;
		}
	}
	
	// calculate movement
	for (var a of agents) {
		var desired_velocity = a.vel.clone();
		desired_velocity.rotate(srandom() * a.random_walk_amount);
		
		a.acc = desired_velocity;
		
		a.vel.add(a.acc).limit(max_speed);
		a.pos.add(a.vel).wrap(1);
	}
	
	// blur background
	background.mul(0.996);
	var tmp = background;
	background = background_past;
	background_past = tmp;
	background.diffuse(background_past, 0.03);
}


function draw() {
	
	background.smooth = true;
	background.draw();
	
	for (var a of agents) {
		
		draw2D.push()
			.translate(a.pos)
			.rotate(a.vel.angle())
			.scale(a.size);

		// colour rings
		draw2D.color(a.r * 0.5, a.g * 0.5, a.b * 0.5);
    draw2D.circle([0.08, 0], a.size * 1.25);
		
		draw2D.color(a.r * 0.8, a.g * 0.8, a.b * 0.8);
    draw2D.circle([0.08, 0], a.size);

    draw2D.color(a.r, a.g, a.b);
    draw2D.circle([0.1, 0], a.size * 0.75);
		
		// white part of eye
		draw2D.color(1, 1, 1);
    draw2D.circle([0.1, 0], a.size * 0.5);
		
		// colour in eye
		draw2D.color(a.r * 0.6, a.g * 0.6, a.b * 0.5);
    draw2D.circle([0.123, 0], a.size * 0.3);
		
		// pupil
		if (a.neighbour_count > 0) {
			draw2D.color(0, 0, 0);
			draw2D.circle([0.123, 0], a.size * 0.2);
		} else {
			draw2D.color(0, 0, 0);
			draw2D.circle([0.123, 0], a.size * 0.1);
		}
		
   	draw2D.pop();
	}
}