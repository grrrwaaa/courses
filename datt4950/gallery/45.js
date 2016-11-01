title = "Towards Commensalism"
author = "Raechel Kula"

max_speed = 0.005;
diffusion_rate = 0.05;
field_size = 100;

num_agents = 20;
num_pcoli = 0; //these are the poop eating version of the agents
population_factor = 1.4; //a value of 1 means that the ratio of poop:glucose matches exactly pcoli:ecoli
eating_efficiency = 0.05;
full_gut = 2;

// create environmental fields:
poop = new field2D(field_size);
glucose = new field2D(field_size);

// begin with empty fields
poop.clear();
glucose.clear();

//prepare for double buffering
glucose_past = glucose.clone();
poop_past = poop.clone();

//determine initial amount of glucose in the system, for conservation of glucose, turns out 10% of the full value of a full field is an interesting threshold
glucose_ideal = field_size * field_size * 0.1;

// create a few randomized agents
agents = [];
for (var i = 0; i < num_agents; i++) {
  // agent:
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(max_speed), // velocity
    size: 0.02, // not used 
    gut: 0, //gut stores amout of food consumed, determines need to poop
    id: i, //agend.id is used to determine whether the agent is a glucose or poop eater.
    // sensing:
    smell: 0.5,
    smell_memory: 0.5,
  };
  agents.push(a);
}

//source of glucose being reintroduced into the system as it is eaten by the ecoli agents and not fully replenished by the poop eaters
source = {
  pos: new vec2(0.5, 0.5)
}

function update() {
  // swap our fields:
  var tmp = glucose_past;
  glucose_past = glucose;
  glucose = tmp;
  // so we can diffuse:
  glucose.diffuse(glucose_past, diffusion_rate);
  //poop diffuses too, so swap to prepare
  tmp = poop_past
  poop_past = poop;
  poop = tmp;
  // poop diffuses slower than food (by a factor of 10)
  poop.diffuse(poop_past, diffusion_rate * 0.1);

  // keep the total energy in the world roughly constant:
  glucose.mul(0.999); // global drain
  var deficit = glucose_ideal - glucose.sum();
  if (deficit > 0) {
    glucose.deposit(deficit, source.pos);
  }
  // but move the glucose source around a bit for interest
  source.pos.add(vec2.random(0.006)).wrap(1);

  /*
  After updating the fields, now update the creatures.  This includes calculating the number of each type of agent.
  */
  poop2food = poop.sum() / glucose.sum(); //calculate ratio of poop to food
  num_ecoli = num_agents / (population_factor + poop2food); // use ratio to determine the number of food eaters
  num_pcoli = num_agents - num_ecoli; //update the number of poop eaters

  update_sensing();
  update_steering();
  update_locomotion();
}

function update_sensing() {
  for (var a of agents) {
    // put the previous smell into memory
    a.smell_memory = a.smell;
    // get a new smell value:
    if (a.id < num_pcoli) {
      a.smell = Math.max(poop.sample(a.pos), 0);
    } else
      a.smell = Math.max(glucose.sample(a.pos), 0);
  }
}

function update_steering() {
  for (var a of agents) {
    // is my world getting better?
    if (a.smell > a.smell_memory) {
      // yes, swimming forward:
      a.vel.rotate(srandom() * 0.1).len(max_speed);
    } else {
      // no, tumbling behaviour:
      a.vel.rotate(srandom()).len(max_speed * 0.2);
    }
  }
}

function update_locomotion() {
  for (var a of agents) {
    // remove energy here;
    if (a.gut < full_gut) {
      if (a.id < num_pcoli) {
        //for pcoli things are a little different
        poop.deposit(-a.smell * eating_efficiency * 10, a.pos);
        if (a.smell > 0.2) {
          //slow down if you are near poop (food for pcoli)
          a.vel.len(0.001);
        } //end if pcoli smells poop
      } //end if pcoli
      else {
        //eat glucose
        glucose.deposit(-a.smell * eating_efficiency, a.pos);
      } //end if ecoli

      //food goes into the gut (same for poop easters)
      a.gut += a.smell * eating_efficiency;
    }

    //if the gut is full, then run away and poop.
    if (a.gut > full_gut) {
      //need to poop
      a.vel.len(max_speed * 2); //run away from the food 
      if ((a.smell + a.smell_memory) < 1) { //make sure there's not a lot of food around
        if (a.id < num_pcoli) {
          //pcoli poop glucose 
          glucose.deposit(a.gut, a.pos);
        } else {
          // poop 
          poop.deposit(a.gut, a.pos);
        }
        // reset the gut (hungry again!)
        a.gut = 0;
      } //if safe to poop
    } //need to poop

    a.pos.add(a.vel).wrap(1);
  } //for each agent
} //end update_locomotion

function draw() {
  // draw the glucose and poop in the background
  draw2D.blend(true);

  draw2D.color(0, 1, 1, 0.5);
  poop.smooth = true;
  poop.draw();

  draw2D.color(1, 0, 0, 0.5);
  glucose.smooth = true;
  glucose.draw();

  draw2D.blend(false);

  // draw all the agents:
  for (var a of agents) {
    // go into agent's local coordinate system
    draw2D.push()
      .translate(a.pos)
      .rotate(a.vel.angle())
      .scale(a.size);
    // draw agent body
    draw2D.color("darkgreen");
    if (a.id < num_pcoli) {
      //pcoli are Gold, not Dark Green  
      draw2D.color("Gold");
    }
    draw2D.circle([0.25, 0]);
    draw2D.circle([-0.25, 0]);

    draw2D.color(1, a.smell, a.smell);
    draw2D.circle([0.25, 0], 0.6);

    // done with coordinate system
    draw2D.pop();
  }
}