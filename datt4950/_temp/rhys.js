var nest = {
  pos: new vec2(0.5, 0.5),
  radius: 0.05,
};

var phero_food = new field2D(200);
var phero_nest = new field2D(200);
var food = new field2D(128);

for (var i = 0; i < 50; i++) {
  var p = vec2.random(0.2 + 0.2*random())
  .add(nest.pos);
  food.deposit(1, p);
}
food.diffuse(food.clone(), 100, 100);
food.normalize();
food.set(function(x, y) {
  var v = food.get(x, y);
  if (v < 0.4) return 0;
});

// position of sensor in agent-local space:
var eyepos1 = new vec2(0.4, 0.3);
var eyepos2 = new vec2(0.4, -0.3);
var agents = [];
for (var i = 0; i < 10; i++) {
  agents.push({
    pos: nest.pos.clone(),
    vel: vec2.random(0.001),
    size: 0.02,
    has_food: false,
    food: 0,
    excitement: 1,
  });
}


function update() { 
  // field dynamics:
  phero_food.mul(0.999);
  phero_nest.mul(0.999);
  
  phero_nest.diffuse(phero_nest.clone, 100, 100);
  // phero_nest.normalize();
  phero_food.diffuse(phero_nest.clone, 100, 100);
  // phero_food.normalize();
  
  for (var a of agents) {
    
    // is there food here?
    var f = food.sample(a.pos);
    if (f > 0.06 && !a.has_food) {
      // console.log(f);
      a.has_food = true;
      a.food = f;
      food.update(0, a.pos); //deposit didn't seem to be doing anything
      a.excitement = 1;
      a.vel.negate();
    } else if (f > 0.05 && a.has_food){
      a.vel.negate(); //stop wasting time if you already have food
    }
    
    var d = a.pos.distance(nest.pos);
    if (d < nest.radius && a.has_food) {
      a.has_food = false;
      a.excitement = 1;
      a.vel.negate();
      nest.radius = nest.radius+(a.food*0.0001);
      a.food = 0;
    } //this doesn't work
    /*else if (d < nest.radius && !a.has_food){
      a.vel.negate(); //go get food!
    }*/
    
    if (a.has_food) {
      phero_food.deposit(a.excitement, a.pos);
    } else {
      phero_nest.deposit(a.excitement, a.pos);
    }
    a.excitement *= 0.9999; //slower trail fading = higher chance of returning to the nest
    
    var rotamount = (a.has_food)?(random()-0.5)*0.3:(random()-0.5);
    a.vel.rotate(rotamount); //reduce random turning radius for smoother flight
    
    // get world-space locations of my eyes:
    var dir = a.vel.angle();
    var e1 = eyepos1.clone()
      .mul(a.size)
      .rotate(dir)
      .add(a.pos);
    var e2 = eyepos2.clone()
      .mul(a.size)
      .rotate(dir)
      .add(a.pos);
    // get light intensity at these locations:
    // (relative to expected intensity)
    
    //change which trail to follow based on food carry status
    if(a.has_food){
    var s1 = phero_food.sample(e1.pos);// - 0.5;
    var s2 = phero_food.sample(e2.pos);// - 0.5;
    }else{
    var s1 = phero_nest.sample(e1.pos);// - 0.5;
    var s2 = phero_nest.sample(e2.pos);// - 0.5;
  }
    // steering:
    var w1 = s2;
    var w2 = s1;

    // locomotion:
    var turn = w2 - w1;
    var speed = (w1 + w2) / 2;
    // sanity limit:
    // speed = 0.15; //a little bit quicker
    
    //a.vel.rotate(turn).len(0.01 * speed);
    a.pos.add(a.vel).wrap(1);
  }
}

function draw() {
  
  draw2D.blend(true);
    draw2D.color("LightGoldenRodYellow");
    food.draw();
    draw2D.color("white"); //easier on the eyes
    phero_food.draw();
    draw2D.color("crimson");
    phero_nest.draw();
  draw2D.blend(false);

  for (var a of agents) {
    draw2D.push()
      .translate(a.pos)
      .rotate(a.vel)
      .scale(a.size);
    // wheels:
    draw2D.color("grey").rect([-0.4, 0.3], 0.2);
    draw2D.color("grey").rect([-0.4, -0.3], 0.2);
    // eyes:
    draw2D.color("white").circle(eyepos1, 0.3);
    draw2D.color("white").circle(eyepos2, 0.3);
    // body
    draw2D.color(a.has_food ? "brown" : "yellow") //look more like bees
      .rect(0, 0, 1, 0.7);
    draw2D.color("black").rect(0, 0, 0.3, 1);
    draw2D.pop();
     
    //draw the nest last so the bees appear to come out of it
    draw2D.color("crimson");
  draw2D.circle(nest.pos, nest.radius*2);
  }
}