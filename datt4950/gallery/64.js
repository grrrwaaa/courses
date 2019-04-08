title = "Skyfire"
author =  "Zhouyang Lu"

let population_size = 30;
let agents = [];
let dim = 100;
let grid = new field2D(dim);
let gridnext = new field2D(dim);

let source = {
  pos: new vec2(0.5, 0.5),
  vel: vec2.random(0.003),
};
let sugar = new field2D(100);
let sugar_copy = sugar.clone();

function reset() {  
  grid.set(function() { return random(2); });
  //sugar.set(1);  
  for (let i=0; i<population_size; i++) {
    let agent = {
      pos: new vec2(random(), random(1)),
      vel: vec2.random(0.01),
      size: 0.03,
      
      memory: 0,
    };
    agents[i] = agent;
  }
}

function draw(ctx) {
  grid.draw();
  //sugar.draw();
  
  for (let a of agents) {
    draw2D.color(a.smell+0.3,0.2,0.1);
    
    draw2D.push()    
        .translate(a.pos)
        .rotate(a.vel)
        .scale(a.size);
    
    draw2D.circle();
    
    draw2D.pop();
  }
}

function update(dt) {
  for (let a of agents) {
    // sense the world:
    a.smell = grid.sample(a.pos);
    
    if (a.smell > a.memory) {
      a.size= a.size *0.99;
      // swimming:
      a.vel.rotate(0.1*(random()-0.5)).len(0.1*random());
    } else {
      // tumbling:
      a.vel.rotate(1*(random()-0.5)).len(0.001*random());
    }
    // remember this:
    a.memory = a.smell;
    a.size= a.size *1.0001;
    
    //grid.deposit(-0.2*a.smell, a.pos);
    
    
    // now move:
    a.pos.add(a.vel).wrap(1);
  }
  
  //sugar.map(function(v) { 
    //return Math.max(v-0.002, 0)
    //return Math.max(0, v-0.01); 
  //})
  
  // spread the sugar over space:
  let tmp = sugar_copy;
  sugar_copy = sugar;
  sugar = tmp;
  sugar.diffuse(sugar_copy, 0.1)
  
  // add more sugar back in:
  source.vel.rotate((random()-0.5))
  source.pos.add(source.vel);
  sugar.deposit(10, source.pos);
  
  gridnext.set(function(x, y) { 
    let C = grid.get(x, y);
    
    let N = grid.get(x, y-1);
    let NE = grid.get(x+1, y-1);
    let E = grid.get(x+1, y);
    let SE = grid.get(x+1, y+1);
    let S = grid.get(x, y+1);
    let SW = grid.get(x-1, y+1);
    let W = grid.get(x-1, y);
    let NW = grid.get(x-1, y-1);
    let total = E+SE+S+SW+W+N+NE+NW;
    
    if (C==1) { // alive
       if (total > 7) {
        return 0; // death by overcrowding
      }else if (SE*0.01+SW*0.01 < y/dim) {
        return random(2);
      }
    } else if (C==0) { 
      // dead
      if (SW*random(dim*0.9)+SE*random(dim*0.9)+S * dim-1 > y) {
        return random(2); // reproduction
      }
    }
    // else state remains same:
    return C;
  });
  
  let temp = grid;
  grid = gridnext;
  gridnext = temp;
}


function mouse(kind, pt, id) {
  //sugar.deposit(1, pt)
}

// called when any key events happen
// kind is the event type (down, up, etc.)
// key is the key (or keycode) pressed/released
function key(kind, key) {
  // run one frame only if the "f" key is pressed:
 
  
}

reset();