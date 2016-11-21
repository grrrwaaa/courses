

/*


function update_sensing() {
  // sensing (of other agents)
  for (var a of agents) {
    // reset sensing state:
    a.neighbours_count = 0;
    a.attractions.set(0, 0);
    a.flows.set(0, 0);
    a.avoidances.set(0, 0);
    
    // check each possible obstacle:
    for (var o of obstacles) {
      // compute relative vector from our future position to obstacle:
      var lookahead = a.vel.clone().scale(4); // ahead 4 frames
      var lookahead_point = lookahead.add(a.pos);
      // get relative vector from lookahead point to obstacle
      var rel = o.pos.clone().sub(lookahead_point);
      // wrap in toroidal space
      rel.relativewrap(1);
      // compute distance, taking into account object sizes:
      var distance = Math.max(rel.len() - a.size - o.size, 0);
      // if collision likely:
      if (distance < personal_space) {
        // add an avoidance force:
        var mag = 1 - (distance / personal_space);
        var avoid = rel.clone().scale(-mag);
        a.avoidances.add(avoid);
      }
    }
    
    // check each possible agent neighbour:
    for (var n of agents) {
      if (a == n) continue; // don't count self as a neighbour
      
      // get relative vector from a to n:
      var rel = n.pos.clone().sub(a.pos);
      // pick the shortest vector in toroidal space
      rel.relativewrap(1); 
      // get distance between bodies (never be negative)
      var distance = Math.max(rel.len() - a.size - n.size, 0);
      // skip neighbours that are too far away:
      if (distance > agent_range_of_view) continue;
      // we can sense a neighbour:
      a.neighbours_count++; // add a neighbour to our sensed count
      // accumulate neighbour (relative) positions to attractions:
      a.attractions.add(rel);
      // accumulate neighbour velocities:
      a.flows.add(n.vel);
      // accumulate avoidances:
      // base this on where we are going to be next:
      var future_rel = n.pos.clone().add(n.vel)
        .sub(a.pos.clone().add(a.vel));
      future_rel.relativewrap(1); // because toroidal space
      var future_distance = Math.max(future_rel.len() - a.size - n.size, 0);
      // if likely to collide:
      if (future_distance < personal_space) {
        // add an avoidance force:
        var mag = 1 - (future_distance / personal_space);
        var avoid = future_rel.clone().scale(-mag);
        a.avoidances.add(avoid);
      }
    }
  }
}

function update_steering() {
  // thinking (i.e. calculate steering force)
  for (var a of agents) {
    var desired_velocity = a.vel.clone();
    
    // wander (random walk)
    // by slightly changing current velocity
    desired_velocity.rotate(srandom() * 0.3);
    
    // apply factors due to neighbours:
    if (a.neighbours_count > 0) {
      // cohesion (move to center)
      // compute the average relative vector to all neighbours:
      a.attractions.div(a.neighbours_count).scale(centering_factor);
      // alignment (move in same direction)
      // compute average velocity of all neighbours:
      a.flows.div(a.neighbours_count).scale(flow_factor);
      
      desired_velocity
        .add(a.attractions)
        .add(a.flows);
    }
    
    // apply avoidances (obstacles and neighbours)
    a.avoidances.scale(avoidance_factor);
    desired_velocity.add(a.avoidances);
    
    // finally, use the desired velocity to compute the steering force:
    // (i.e. the acceleration)
    // and also constrain it
    a.acc = desired_velocity.sub(a.vel)
      .limit(max_acceleration);
  }
}

function update_locomotion() {
  // action (moving)
  for (var a of agents) {
    // increment velocity by acceleration
    // and constrain to limits:
    a.vel.add(a.acc).limit(max_speed);
    // increment position by velocity
    // and constrain to world
    a.pos.add(a.vel).wrap(1);
  }
}

 */

#include "cinder/app/App.h"
#include "cinder/app/RendererGl.h"
#include "cinder/gl/gl.h"
#include "cinder/Rand.h"

using namespace ci;
using namespace ci::app;
using namespace std;

// if vector v is longer than max, reduce it to length == max
vec3 limit(vec3 v, float max) {
	float magnitude = length(v);
	if (magnitude > max) {
		v = normalize(v) * max;
	}
	return v;
}

vec3 wrap(vec3 v, float limit) {
	if (v.x < 0) { v.x += limit; }
	else if (v.x > limit) { v.x -= limit; }
	if (v.y < 0) { v.y += limit; }
	else if (v.y > limit) { v.y -= limit; }
	if (v.z < 0) { v.z += limit; }
	else if (v.z > limit) { v.z -= limit; }
	return v;
}

const int num_obstacles = 20;
const int num_agents = 400;

float max_speed = 0.002;
float max_acceleration = 0.0002;
float agent_range_of_view = 0.02;
float personal_space = 0.005;
// strengths of the three flocking forces:
float centering_factor = 0.01;
float flow_factor = 0.1;
float avoidance_factor = 1;

vec3 world_center = vec3(0.5, 0.5, 0.5);


class Obstacle {
public:
	
	vec3 pos;
	float size;
};

class Agent {
public:
	vec3 pos;
	vec3 vel;
	vec3 acc;
	float size;
	
	int neighbours_count;
	vec3 attractions;
	vec3 flows;
	vec3 avoidances;
};

class FlockingCinderApp : public App {
public:
	
	Obstacle obstacles[num_obstacles];
	Agent agents[num_agents];
	
	CameraPersp cam;
	gl::GlslProgRef shader;
	
	FlockingCinderApp() {
		for (int i=0; i<num_obstacles; i++) {
			// each one has a position and size
			obstacles[i].pos = vec3(Rand::randFloat(), Rand::randFloat(), Rand::randFloat());
			obstacles[i].size = 0.05 * (Rand::randFloat() + 0.5);
		}
		
		// create a few randomized agents
		for (int i=0; i<num_agents; i++) {
			// agent:
			Agent& a = agents[i];
			a.pos = vec3(Rand::randFloat(), Rand::randFloat(), Rand::randFloat());
			a.vel = Rand::randVec3() * max_speed;
			a.size = 0.01 * (Rand::randFloat() + 0.8);
			a.neighbours_count = 0;
		}
	}
	
	void setup() override {
		// GPU setup here:
		shader = gl::getStockShader( gl::ShaderDef().lambert().color() );
		
	}
	
	void mouseDown( MouseEvent event ) override {
		
	}
	
	void keyDown( KeyEvent event ) override {
		
		if (event.getChar() == 'f') {
			setFullScreen(!isFullScreen());
		}
	}
	
	void update() override {
		// sensing:
		// sensing (of other agents)
		for (int i=0; i<num_agents; i++ ) {
			Agent& a = agents[i];
			
			// reset sensing state:
			a.neighbours_count = 0;
			a.attractions = vec3(0);
			a.flows = vec3(0);
			a.avoidances = vec3(0);
			
			// check each possible obstacle:
			for (int j=0; j<num_obstacles; j++ ) {
				Obstacle& o = obstacles[j];
				
				// compute relative vector from our future position to obstacle:
				vec3 lookahead_point = a.pos + (a.vel * 4.f);
				// get relative vector from lookahead point to obstacle
				vec3 rel = o.pos - lookahead_point;
				// wrap in toroidal space
				//rel.relativewrap(1);
				// compute distance, taking into account object sizes:
				float distance = length(rel) - a.size - o.size;
				if (distance < 0) distance = 0;
				// if collision likely:
				if (distance < personal_space) {
				  // add an avoidance force:
				  float mag = 1 - (distance / personal_space);
				  vec3 avoid = rel * -mag;
				  a.avoidances += avoid;
				}
			}
			
			// check each possible agent neighbour:
			for (int j=0; j<num_agents; j++ ) {
				Agent& n = agents[j];

				if (i == j) continue; // don't count self as a neighbour
			  
				// get relative vector from a to n:
				vec3 rel = n.pos - a.pos;
				// pick the shortest vector in toroidal space
				//rel.relativewrap(1);
				// get distance between bodies (never be negative)
				float distance = length(rel) - a.size - n.size;
				if (distance < 0) distance = 0;
				// skip neighbours that are too far away:
				if (distance > agent_range_of_view) continue;
				// we can sense a neighbour:
				a.neighbours_count++; // add a neighbour to our sensed count
									// accumulate neighbour (relative) positions to attractions:
				a.attractions += (rel);
				// accumulate neighbour velocities:
				a.flows += (n.vel);
				
				// accumulate avoidances:
				// base this on where we are going to be next:
				vec3 future_rel = (n.pos + n.vel) - (a.pos + a.vel);
				
				float future_distance = length(future_rel) - a.size - n.size;
				if (future_distance < 0) future_distance = 0;
				
				// if likely to collide:
				if (future_distance < personal_space) {
				  // add an avoidance force:
				  float mag = 1 - (future_distance / personal_space);
				  vec3 avoid = future_rel * -mag;
				  a.avoidances += (avoid);
				}
		  }
		}
		
		
		// thinking (i.e. calculate steering force)
		for (int i=0; i<num_agents; i++ ) {
			Agent& a = agents[i];
			vec3 desired_velocity = vec3(a.vel);
	  
			// wander (random walk)
			// by slightly changing current velocity
			// desired_velocity.rotate(srandom() * 0.3);
	  
			// apply factors due to neighbours:
			if (a.neighbours_count > 0) {
				// cohesion (move to center)
				// compute the average relative vector to all neighbours:
				a.attractions *= centering_factor / a.neighbours_count;
				// alignment (move in same direction)
				// compute average velocity of all neighbours:
				a.flows *= flow_factor / a.neighbours_count;
				
				desired_velocity += a.attractions + a.flows;
			}
	  
			// apply avoidances (obstacles and neighbours)
			a.avoidances *= avoidance_factor;
			desired_velocity += a.avoidances;

			// finally, use the desired velocity to compute the steering force:
			// (i.e. the acceleration)
			// and also constrain it
			a.acc = limit(desired_velocity - a.vel, max_acceleration);
		}
		
		// action (moving)
		for (int i=0; i<num_agents; i++ ) {
			Agent& a = agents[i];
			// increment velocity by acceleration
			// and constrain to limits:
			a.vel = limit(a.vel + a.acc, max_speed);
			
			// increment position by velocity
			// and constrain to world
			a.pos = wrap(a.pos + a.vel, 1);
		  }

	}
	
	void draw() override {
		gl::clear( Color( 0, 0, 0 ) );
		
		// set camera properties:
		cam.setPerspective(80, getWindowAspectRatio(), 0.1, 10);
		gl::enableDepthRead();
		gl::enableDepthWrite();
		
		float now = getElapsedSeconds();
		float angle = now * 0.3;
		float distance = 0.5;
		
		// set position of camera & position it looks at:
		cam.lookAt( world_center + vec3( distance*sin(angle), 0., distance*cos(angle) ), world_center );
		gl::setMatrices( cam );
		
		shader->bind();
		
		// draw all the obstacles:
		for (int i=0; i<num_obstacles; i++ ) {
			Obstacle& o = obstacles[i];
			
			gl::color(0, 0.5, 1);
			gl::drawSphere(o.pos, o.size);
			
		}
		
		// draw all the agents:
		for (int i=0; i<num_agents; i++ ) {
			Agent& a = agents[i];
			
			if (a.neighbours_count > 0) {
				gl::color(1, 0.5, 0.5);
			} else {
				gl::color(0.5, 0.5, 0.5);
			}
			gl::drawSphere(a.pos, a.size);
			
		}
		
	};
};


CINDER_APP( FlockingCinderApp, RendererGl )
