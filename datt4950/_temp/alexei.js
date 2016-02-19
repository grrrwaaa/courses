var agents = [];

function make_agent() {
var a = {
  pos: new vec2(random(), random()),
  vel: vec2.random(0.001),
  size: 0.03,
  max_force: 1/1000,
  max_speed: 1/100,
  color: "green",
  hungry: 0,
};
  agents.push(a);
}
for (var i=0; i<20; i++) make_agent();

var target = {
  pos: new vec2(random(), random()),
  vel: vec2.random(0.001),
  max_force: 1/400,
  max_speed: 1/90,
  size: 0.2,
  color: "yellow",
  retaliation: 0,
};


function update() {
 
 //target movement
    // forward Euler integration
  var steering2 = vec2.random(0.001);
  var acceleration2 = steering2.limit(target.max_force);
 target.vel.add(acceleration2).limit(target.max_speed);
  target.pos.add(target.vel).wrap(1);
   
 for (var a of agents) {
   //agent movement
  // given the position of the light (target.pos)
  // how do I compute the required steering?
  // target from the agent's point of view
  var rel = target.pos.clone().sub(a.pos);
  rel.relativewrap(1);
   if (a.hungry == 0) {
  rel.rotate(-a.vel.angle()+Math.random()*4-2);  
   a.hungry=1;     
   }
  
  // limit this to our top speed
  var desired_velocity = rel.limit(a.max_speed);
  // subtract our current velocity
  var steering = desired_velocity.sub(a.vel);
  
  // forward Euler integration
  //var steering = vec2.random(0.001);
  var acceleration = steering.limit(a.max_force);
  a.vel.add(acceleration).limit(a.max_speed);
  a.pos.add(a.vel).wrap(1);
   
   //keep track of the direction for the retaliation push
   var xdir;
   var ydir;
   if(steering2[0] < 0) {
     xdir = steering2[0]-1;
   }
   else {
     xdir = steering2[0]+1;
   }
   
   if(steering2[1] < 0) {
     ydir = steering2[1]-1;
   }
   else {
     ydir = steering2[1]+1;
   }   
   
   //activate retaliation, regen and push back the mosquitoes
   if (target.retaliation==1) {
     target.size=0.2;
     target.color="red";  
     for (var a of agents) {
       var ran1 = ((Math.random()) * 2 - 1)/10;
     var ran2 = ((Math.random()) * 2 - 1)/10; 
     //a.pos = new vec2(random(), random());
       a.pos = new vec2((a.pos[0]-0.3-ran1)*xdir, (a.pos[1]-0.3-ran2)*ydir);
     a.size = 0.03;
     }
     target.retaliation = 0;
   }
   
   //check for collisions and decrease/increase size
  if ((a.pos.distance(target.pos)) < (target.size/1.5))   {
    a.hungry = 0;
     if (target.size > 0) {
       target.color="yellow";
    target.size=target.size-0.000005;
    a.size=a.size+0.00005;
    a.color="red";
       if (target.size <0.1) {
         target.retaliation=1;
       }
    }  
  }
  else {
    a.color="green";
  }
}
  
}

function draw() {
  draw2D.color(target.color);
  draw2D.circle(target.pos, target.size);
   for (var a of agents) {
  draw2D.push()
    .translate(a.pos)
    .rotate(a.vel)
    .scale(a.size);
    draw2D.color(a.color);
    draw2D.triangle();
    draw2D.color("white");
    draw2D.circle([0.25, 0.20], 0.15);
    draw2D.circle([0.25,-0.20], 0.15);
  draw2D.pop();
   }
}