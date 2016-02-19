//Quick Summary
//agents will lose size constantly if not eating enough
//agents in a rich enough field will eat the food and become larger
//if agents are small enough they will diw
//if agents are large enough they will spawn another child agent and grow smaller
//the food is distributed by an agent randomly and is diffused over an area of space
//all of these parameters can be edited but these keep the best equilibrium in terms of dying and spawning agents
//we can also assumemthat the "food" is dirt spread by an annoying housemate and the agents are self replicating cleaning robots (we can call them super roombas)
//enjoy watching

// create a field of sugar concentrations
var sugar = new field2D(200);
var sugar_old = sugar.clone();

// fill it:
function reset_sugar() 
{
	// fill with uniform noise
	sugar.set(0);
}
reset_sugar();

// mouse adds sugar:
// function mouse(e, pt) 
// {
// 	sugar.deposit(10, pt);
// }

//initialize agents with these parameters:
//spawns in a random position
//a size of 0..1 to start
var agents = [];
for (var i=0; i<20; i++) 
{
	agents.push({
		pos: new vec2(random(), random()),
		vel: vec2.random(0.001),
		size: 0.1,
    // stored recollection of previous sense
		sense_memory: 0.5,
	});
}

var source = 
{
  pos: new vec2(0.5, 0.5),
	vel: vec2.random(),
};

// *** UPDATE FUNCTION ***
function update() 
{
  // update field:
  var tmp = sugar_old;
  sugar_old = sugar;
  sugar = tmp;
  sugar.mul(0.999);
  // diffuse it:
  sugar.diffuse(sugar_old, 0.1);

  // apply source agent to sugar:
  sugar.deposit(3, source.pos);
  // and then move it (random walk):
  source.vel.rotate(random()-0.1).len(random()*0.003);
  source.pos.add(source.vel.clone().mul(3)).wrap(1);
  
	for (var a of agents) 
  {
    // get the sugar level at this location:
		var sense = sugar.sample(a.pos);
    // sanity: no such thing as a negative intensity:
    sense = Math.max(0, sense);
    
    //if the agent is eating it will grow larger
    //but only if it is substanial enough 
    //(0.3 or larger)
    if (sugar.sample(a.pos) > 0.3)
    {
      //larger by 0.0009 % of the value of the food
      a.size += (sugar.sample(a.pos) * 0.0009);
    }
    //if it is not eating enough it will grow smaller
    else
    {
      a.size -= 0.0002;   
    }
    
    //if the agents eats enough to grow to its maximum
    //size, then it has a child, who spawns with:
    //a initial position = to the parent 
    //a size of 0.1
    //the parent also shrinks to the size of 0.13
    if (a.size >= 0.2)
    {
      //babehs?
      var child = 
      {
        pos: a.pos.clone(),
        vel: vec2.random(0.001),
        size: 0.1,
      };
      //babhes!
      agents.push(child);
      //make the parent smaller after having a child
      a.size = 0.13
      console.log("birth");
      console.log("agents",agents);
    }
    //if the agents get to a size of 0.0 or less
    //then they should die
    //LETS KILL US SOME AGENTS
    if (a.size <= 0.05)
    {
      //get the index o the agent
      var index = agents.indexOf(a);
      //lets make sure its not null
      if (index > -1) 
      {
        // and then he was killed
        agents.splice(index, 1);
        console.log("death");
        console.log("agents",agents);
      }
    }
    // update the field to show that we removed sugar here:
	  sugar.deposit(-sense, a.pos);
    
    // compare to the previous one:
    var change = sense / a.sense_memory;
		if (change > 1) 
    {
      // getting better
      // forward swimming behavior:
			a.vel
        .rotate(srandom()*0.1)
        .len(0.005)
        .mul(1.0 + a.size);
		} 
    else 
    {
      // getting worse
      // tumbling behavior:
			a.vel
        .rotate(srandom())
        .len(0.0005)
        .mul(1.0 + a.size);
		}	
		// remember for the next time:
		a.sense_memory = sense;
		
		// locomotion of agents
		a.pos.add(a.vel.clone().mul(1)).wrap(1);
	}
}
  
function draw() 
{
  // draw field
  sugar.draw();
  // draw agents
  for (var a of agents) 
  {
  	draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
  	// body
    //draw2D.color("grey").circle([0, 0], 1.5);
    // sensor:
    // red = not eating
    // in between = eating a bit
    // green = eating a lot
    draw2D.color(1-a.sense_memory, a.sense_memory, 0).triangle([0, 0],a.size);
  	draw2D.pop();
  }
}