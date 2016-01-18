title: Agent-Based Systems
importance: 6

---

# Agent-based models, multi-agent systems

![Fish school](http://underthecblog.files.wordpress.com/2014/02/fishschool.gif)

Some of the most beautiful, fascinating or strange phenomena of nature can be understood as emerging from the behaviors of interacting agents. Widely acknowledged examples include the murmuration of birds (or swarming insects, schools of fish), and the societal 'superorganisms' of ant colonies. We have come to understand that despite the obvious organization that we see at the macro-scale, there is no hierarchical center of coordination, but rather the whole emerges from simple interactions at local levels. These have been suggested as examples of emergence, or of self-organization. Which is to say, the whole is greater than a naive sum of its parts. 

<iframe src="https://player.vimeo.com/video/118573865" width="720" height="400" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Agent-based models, or multi-agent systems, attempt to understand how non-trivial organized macro-behavior emerges from typically mobile individuals that interact primarily at a local-level. These individuals are called **agents**. Besides modeling flocks and colonies, agent-based modeling has applications from microbiology to sociology, as well as video games and computer graphics. As a biological approximation, an agent could refer to anything from an individual protein, virus, cell, bacterium, organism, or deme (a population group). Agent systems also share many features with particle systems, and the two are sometimes conflated.

## What is an agent?

The agent abstraction has arisen somewhat independently in different fields, thus the definition of an agent can vary widely. However, in most cases, **an autonomous agent interacts within an environment populated by other agents, but behaves independently without taking direct commands from other agents nor a global planner or leader.** Agent-based models typically operate in parallel within a spatial environment, in which interactions are usually limited to local distances, rather like cellular automata. But unlike CA, which roots a program in a particular spatial location (the cell), an agent-based program is typically mobile. The following components are usually present:

- **Properties**: Persistent but variable features of an agent, such as size, color, speed, direction, energy level, and so on. 
- **Input**: Limited capabilities of sensing (or receiving messages from) the environment
- **Output**: Limited capabilities of performing actions on (or sending messages to) the environment, or its own properties. Typically this includes the ability to move through space.
- **Processing**: An information processing capacity to select actions in response to inputs. This capacity may also include information storage (memory).
- **Motivations**: The agent may also incorporate explicit goals or purposes in the form of self-evaluation and self-adaptation; or these may be implict in the design of the processing algorithm.

Just like CA, at times, the self-organizing behavior of systems of even relatively simple agents can be unpredictable, complex, and generate new emergent structures of order. 

## Tortoises and Vehicles

![Machina Speculatrix](http://www.rutherfordjournal.org/images/020101-05.jpg) 

In the late 1940's and early 1950's, Cyberneticist Grey Walter pioneered the engineering of autonomous agents, as early examples of self-directed robots, with his series of *"tortoises"*. 

<iframe width="720" height="540" src="https://www.youtube.com/embed/lLULRlmXkKo?rel=0" frameborder="0" allowfullscreen></iframe>

Remarkably, this direction of research was largely forgotten as efforts in artificial intelligence concentrated on symbolic thinking. A brief history [can be read here](http://www.rutherfordjournal.org/article020101.html) -- but the story of Walter and other British Cyberneticians is truly fascinating; I highly recommend Andrew Pickering's account in [The Cybernetic Brain](http://press.uchicago.edu/ucp/books/book/chicago/C/bo8169881.html). Walter's tortoises have inspired many great research products of the last century, including the turtle graphics of Logo, the situated robotics of Rodney Brooks, the flocking behaviors of Craig Reynolds, and Valentino Braitenberg's Vehicles.

## Vehicles

![Vehicle](http://www.ini.uzh.ch/~conradt/research/BraitenbergVehicle/Braitenberg%20Vehikels_files/BVinh.jpg)

> A Braitenberg vehicle is an agent that can autonomously move around. It has primitive sensors (measuring some stimulus at a point) and wheels (each driven by its own motor) that function as actuators or effectors. A sensor, in the simplest configuration, is directly connected to an effector, so that a sensed signal immediately produces a movement of the wheel. Depending on how sensors and wheels are connected, the vehicle exhibits different behaviors (which can be goal-oriented).  [wikipedia](http://en.wikipedia.org/wiki/Braitenberg_vehicle)

[Braitenberg, V. (1984). Vehicles: Experiments in synthetic psychology. Cambridge, MA: MIT Press.](https://mitpress.mit.edu/books/vehicles)

Cyberneticist Valentino Braitenberg argues that his extraordinarily simple mechanical vehicles manifest behaviors that appear identifiable as fear, aggression, love, foresight, and optimism. The vehicle idea was a thought experiment conceived to show that complex, apparently purposive behaviour did not need to depend on complex representations of the environment inside a creature or agents brain. In fact simply by reacting to the environment in a consistent manner was more than enough to explain the low level reactive behaviours exhibited by many animals.

---

Casey Reas (co-author of the Processing creative coding environment), Yanni Loukissas, and many others have used populations of Braitenberg-inspired vehicles to create artworks based on their combined paths.

![Reas' Tissue](http://reas.com/tissue_p/reas_tissue_p_13.jpg)

Vehicles have also been constructed in hardware of course // see examples [here](http://www.ini.uzh.ch/~conradt/research/BraitenbergVehicle/), [here](http://blog.electricbricks.com/en/2010/05/vehiculos-braitenberg-nxt-g/), [here](http://tinkerlog.com/2009/06/07/mini-braitenberg-vehicle/).

## Steering Behaviors

Craig Reynolds' work with robotics is strongly inspired by Braitenberg's and Walter's vehicles. In the late 1980s Reynolds proposed a model of animal motion to model flocks, herds and schools, which he named *boids*. Reynolds' paper [Steering Behaviors for Autonomous Characters](http://www.red3d.com/cwr/steer/gdc99/) covers boids as an aggregate of other steering behaviours. The paper has been very influential in robotics, game design, special effects and simulation, and remains well worth exploring as a collection of patterns for autonomous agent movements, so we will work through it in more detail. 

[His paper](http://www.red3d.com/cwr/steer/gdc99/) breaks agent movement in general into three layers:

- **Action Selection**: selecting actions to perform according to environmental input and goals to achieve. 
- **Steering**: path determination according to the action selected. Many different behaviors can be used; the essential strategy is ```steering force = desired_velocity - current_velocity```.
- **Locomotion**: mechanisms of conversion of steering into actual movement.


### Random walks in nature

One of the simplest strategies, which he calls *wander*, is based on the *random walk*. Random walks are a well-established model in mathematics, with a physical interpretation as [Brownian motion](https://en.wikipedia.org/wiki/Brownian_motion). Essentially, for an agent a **random walk** involves small random deviations to steering. This form of movement is widely utilized by nature, whether purposefully or simply through environmental interactions. 

[See the random walker example here](http://codepen.io/grrrwaaa/pen/mVBBPQ?editors=001)

[And here are many walkers](http://codepen.io/grrrwaaa/pen/mVBBPQ?editors=001)

<!--

### Boids, flocking, swarms

[Flockers](http://codepen.io/grrrwaaa/pen/LGzgpO?editors=001)

In the late 1980s Reynolds proposed a model of animal motion to model flocks, herds and schools, which he named *boids*. Each boid follows a set of rules based on simple principles:

- **Avoidance**: Move away from other boids that are too close (avoid collision)
- **Copy**: Fly in the same general direction as other nearby boids
- **Center**: Move toward the center of the flock (avoid exposure)

In addition, if none of the conditions above apply, i.e. the boid cannot perceive any others, it may move by random walk. 

To make this more realistic, we can consider that each boid can only perceive other boids within a certain distance and viewing angle. We should also restrict how quickly boids can change direction and speed (to account for momentum). Additionally, the avoidance rule may carry greater *weight* or take precedence over the other rules. Gary Flake also recommends adding an influence for *View*: to move laterally away from any boid blocking the view.

Evidently the *properties* of a boid (apart from location) include direction and speed. It could be assumed that viewing angle and range are shared by all boids, or these could also vary per individual. The *sensors* of a boid include an ability to detect the density of boids in different directions (to detect the center of the flock), as well as the average speed and direction of boids, within a viewable area. The *actions* of a boid principally are to alter the direction and speed of flight. 

#### Implementation

The behavior of an agent depends on the other agents that it can perceive (the *neighborhood*). The simplest way to detect nearby agents is to simply iterate all agents and apply a distance condition (being careful to exclude the agent itself!). We can also include a view angle condition (easily calculated using vector dot product).

```javascript
view_range = 0.1; 	// how far an agent can see

function agent_update_sensors(self) {
	// create a list of nearby agents:
	var neighbors = [];
	// test all agents:
	for (var i=0; i<agents.length; i++) {
		var near = agents[i];
		// don't compare with ourself!
		if (near != self) {		
			// near enough?
			var rel = near.location.subnew(self.location);
			if (rel.length() < view_range) {
				// is the neighbor in front of us?
				// (use dot product of my velocity to determine this)
				if (self.velocity.dot(rel) > 0) {
					// add this to the set of neighbors:
					neighbors.push(near);
				}
			}
		}
	}
	
	if (neighbors.length > 0) {
		// now calculate steering influence according to visible neighbors:
		// ...
	} else {
		// no visible neighbors, so we can explore freely...
		// ...
	}
}
```

> This isn't especially efficient, but for small populations it is quite reasonable.

Once a set of visible neighbors is calculated, it can be used to derive the steering influences of the agent. The center force depends on the average location of neighbors, relative to the agent. The copy force depends on the average velocity of neighbors. The avoidance force applies if a neighbor is too close.

> Note that since the agents are dependent on each other, it also makes sense to perform movements and information processing in separate steps. Otherwise, the order in which the agent list is iterated may cause unwanted side-effects on the behavior. (This multi-pass approach is similar in motivation to the double buffering required in many cellular automata).

See the example of [Flocking Boids](http://codepen.io/anon/pen/gpeLaK?/right/editors=001) in the editor.

----

## Environmental interaction

### Chemotaxis

When we look at microbiology, we find even simpler modes of steering behavior.

> Chemotaxis is the phenomenon whereby somatic cells, bacteria, and other single-cell or multicellular organisms direct their movements according to certain chemicals in their environment. This is important for bacteria to find food (for example, glucose) by swimming towards the highest concentration of food molecules, or to flee from poisons (for example, phenol). In multicellular organisms, chemotaxis is critical to early development (e.g. movement of sperm towards the egg during fertilization) and subsequent phases of development (e.g. migration of neurons or lymphocytes) as well as in normal function. [wikipedia](https://en.wikipedia.org/wiki/Chemotaxis)

A [video example of chemotaxis in E. coli](http://www.youtube.com/watch?v=ZV5CfOkV6ek).

E. coli can use its flagella to move in just two modes (*locomotion*): 

- Move forward more or less straight
- Tumble about randomly

The *goal* is to find the highest sugar concentration. It can sense the local sugar concentration at its current location. However it cannot sense at a distance, and has no sense of direction, never mind which direction is best. 

Instead it uses chemical memory to detect sugar concentration *gradient*, that is, the differential of concentration at the current location compared to how it was just a few moments ago. This gradient tells the E. coli whether things are getting better or worse, which can be used to select between the swimming or tumbling patterns. 

With just a few tuning parameters, this can lead to a very rapid success in finding the higher concentrations of sugar (assuming the environment is smoothly varying). 

#### Implementation

The first thing we need is an environment of varying sugar concentrations for the agents to explore. We can use the ```field2D``` module for this purpose. The behavior of the agents will depend on the spatial distribution of sugar in the field; a totally random space is both unrealistic and will defeat chemotactic strategies; a smoothly distributed landscape is needed. For example, we can use the distance from the center:

```javascript
var dim = 128;
var sugar = new field2D(dim, dim);
var center = new vec2(0.5, 0.5);

sugar.set(function(x, y) {
	// convert x, y in to 0..1 range:
	var p = new vec2(x / dim, y / dim);
	// get distance from center:
	var d = p.copy().sub(center).length();
	// make concentration higher at center, lower with increasing distance:
	return 1 - d;
})
```

Agents can then sample the local field during their update routine as follows:

```javascript
	// in agent_update:
	var sugar_concentration = sugar.sample(self.location.x, self.location.y)
```

Here's an implementation of [Chemotaxis](http://codepen.io/anon/pen/pJLNgM/right/?editors=001) in the editor.

A variety of other *taxes* worth exploring can be found on the [wikipedia page](http://en.wikipedia.org/wiki/Taxis#Aerotaxis). Note how chemotaxis (and other taxes) can be divided into positive (attractive) and negative (repulsive) characters, just like forces (directly seen in steering forces). This is closely related to the concepts of positive and negative feedback and the explorations of cybernetics.

### Stigmergy

*Stigmergy* is a mechanism of indirect coordination between agents by leaving traces in the environment as a mode of stimulating future action by agents in the same location. For example, ants (and some other social insects) lay down a trace of pheromones when returning to the nest while carrying food. Future ants are attracted to follow these trails, increasing the likelihood of encountering food. This environmental marking constitutes a shared external memory (without needing a map). However if the food source is exhausted, the pheromone trails will gradually fade away, leading to new foraging behavior. 

Traces evidently lead to self-reinforcement and self-organization: complex and seeminly intelligent structures without global planning or control. Since the term stigmergy focuses on self-reinforcing, task-oriented signaling, E. O. Wilson suggested a more general term *sematectonic communication* for environmental communication that is not necessarily task-oriented.

Stigmergy has become a key concept in the field of [swarm intelligence](http://en.wikipedia.org/wiki/Swarm_intelligence), and the method of *ant colony optimization* in particular. In ACO, the landscape is a parameter space (possibly much larger than two or three dimensions) in which populations of virtual agents leave pheromone trails to high-scoring solutions.

Related environmental communication strategies include social nest construction (e.g. termites) and territory marking.

#### Implementation

Being able to leave pheromones behind depends on the ability to write into as well as read from fields. This can be achieved using the ```splat``` method of the field:

```javascript
	// in agent update:
	pheromone_field.splat(intensity, self.location.x, self.location.y)
```

To store different pheromones we might want to use different fields. These fields should also probably decay over time (using the ```field.decay()``` method), and possibly diffuse slightly (using the ```field.diffuse()``` method).

To detect field intensites in different directions, we might want to sample with sensors further from the body center (similar to the sensors in the Vehicles model) and compare their results. 

---

-->