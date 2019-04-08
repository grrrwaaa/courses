let dim = 128; //Other sizes work , but are less  sustanable than this

//Constructors for each grid level
let grid = new field2D(dim); //The "natural" grid
let gridnext = new field2D(dim);

let undergrid = new field2D(dim); // The "resources" grid
let undergridnext = new field2D(dim);

let overgrid = new field2D(dim); //The "settlement" grid
let overgridnext = new field2D(dim);

let drawgrid = new field2D(dim);

//"Caravan" agent
var agents = [];
var population_size = 5;

var tumblespeed = 0.9;
var tumbleturn = 0.2;
var swimspeed = 0.5;
var swimturn = 0.5;



//Va;lues for "settlement" grid
var empty = 0;
var settled = 0.5;
var civ = 0.7;
var active = 1;

var growth_probability = 1 / 10;
var spore_probability = 1 / 10000;
var lightning_probability = 1 / 40;
var fire_probability = 1 / 5;
var chance_of_rain = 1 / 5;

var tumblespeed = 0.4;
var tumbleturn = 0.1;
var swimspeed = 0.1;
var swimturn = 0.5;



//Tracks which grid is being drawn. Press "c" to cycle between all 3.
let viewcount = 3;

// called at start, and whenever Enter key is pressed:
function reset() {
 grid.clear();
  undergrid.set(function() {return random(2); });
    for (let i=0; i<dim*dim*10; i++) {
    // pick a random cell:
    let x0 = random(dim);
    let y0 = random(dim);
    let v0 = undergrid.get(x0, y0);
    // pick a random neighbor:
    let x1 = x0 + random(3)-1;
    let y1 = y0 + random(3)-1;
    let v1 = undergrid.get(x1, y1);
    // average them:
    let v2 = (v0 + v1)*0.4;
    // and update cell with this new value
    undergrid.set(v2, x0, y0);
  }
   
  
  
  overgrid.clear();


   population_size = 5;
  agents =[];
  
  for (let i = 0; i < population_size; i++) {
    // create a randomized agent:
    let agent = {
      pos: new vec2(0.5, 0.5), // position, x and y components
      vel: new vec2.random(0.1), // velocity, x and y components
      size: 0.01
      
    };
    // store in population array:
    
    agents[i] = agent;
  }
}

let frame = 0
// called before rendering each frame
function updategrids(dt) {
  gridnext.set(function(x, y) {
  
    
    let C =grid.get(x, y);
    let underTotal = undergrid.get(x,y);
    let overTotal = overgrid.get(x,y);
    
    let check = 1;
    let N = grid.get(x, y - check);
    let NE = grid.get(x + check, y - check);
    let E = grid.get(x + check, y);
    let SE = grid.get(x + check, y + check);
    let S = grid.get(x, y + check);
    let SW = grid.get(x - check, y + check);
    let W = grid.get(x - check, y);
    let NW = grid.get(x - check, y - check);
    let total =N + NE + E + SE + S + SW + W + NW;

    if (C == 1) {
      // alive
       if ((total < 3)&&(random()<1/100)) {
       undergrid.set(underTotal+0.1,x,y); //death by loneliness
      }
      
       
      
      if (total < 2) {
        return 0; //death by loneliness
      } else if (total > 3) {
        return 0; // death by overcrowding
      } else if (overTotal > 1) {
        return 0; // death by "oversettling"
      } else if (underTotal >20) {
        return 0; // death by "Forest Fire"
      }

    } else if (C == 0) {
      // dead, cannot be revitalized if area is "oversettled"
      if (total == 3) {
        return 1; // reproduction
      }
      if ((underTotal >= 0.7 && overTotal < 0.5)&&(random()<1/5)){
        return 1; // reproduction from "natural resources"
      }
    }
    // else state remains same:
    return C;
  }); //Slightly modified "Game of life", interacts with both other grids and has random elmenets to ensure it is sustainable to some degree.

  undergridnext.set(function(x, y) {
   
    let C = undergrid.get(x, y);
     let midTotal = grid.get(x,y);
    let overTotal = overgrid.get(x,y);
    
    let check = 1;
    let N = undergrid.get(x, y - check);
    let NE = undergrid.get(x + check, y - check);
    let E = undergrid.get(x + check, y);
    let SE = undergrid.get(x + check, y + check);
    let S = undergrid.get(x, y + check);
    let SW = undergrid.get(x - check, y + check);
    let W = undergrid.get(x - check, y);
    let NW = undergrid.get(x - check, y - check);
   let total = N + NE + E + SE + S + SW + W + NW;
    
    var nearBurning = N>100 || E >100
				||W >100|| S >100 
				||NE >100 || SE >100
				||NW >100 || SW >100;
	
	// true if (any neighb|| is burning:
	var nearFull = N >0.5 || E >0.5
				|| W >0.5 || S >0.5
				|| NE >0.5 || SE >0.5
				|| NW >0.5 || SW >0.5;
  
     if(C>99)
      return 0;
    
   if((C >= 0.4)) {
     if (nearBurning) {
			// if (any neighbors are burning, start burning too:
	 	return C+100;
		
		} else if  (random() < 1/10000) {		
			// otherwise, there's a small chance of catching fire due to atmostpheric conditions:
			return C+100;
		} }
    
    if ((C >= 0.7)) {

      // alive
      if (total < 0.5) {
        return C-1; //Is empty if not surrounded
      }else if ((total > 2)&&(random()<1/10)) {
        return C-0.1; //grows back if there is no "life" nearby
      }
    
    }else{
		// are any neighbors trees?
		if (nearFull) {			
			// chance of regrowing:
			if (random() < 1/50) {
				return C+0.5;
			}
     
		} else if  (random() < 1/1000000) {
			// smaller chance of propagation by seeding:
			return 1;}
    }
      
      // alive
      
      if (overTotal >=1) {
        return 0; //degrades if few neighbours
      }  
      if (midTotal >= 1.5) {
        return C + 0.1; // degrades if too many neighbours
      } 
      if (total > 2 && midTotal > 1) {
        return C+0.5; //grows back if there is no "life" nearby
      }
	


    
	// return the new state:
	return C;
  }); //Heavily modifed game of life, change is largely driven by the other two grids.

  
  overgridnext.set(function(x, y) {
      
    // check out the neighbors' previous states:
    var N = overgrid.get(x, y + 1);
    var NE = overgrid.get(x + 1, y + 1);
    var E = overgrid.get(x + 1, y);
    var SE = overgrid.get(x + 1, y - 1);
    var S = overgrid.get(x, y - 1);
    var SW = overgrid.get(x - 1, y - 1);
    var W = overgrid.get(x - 1, y);
    var NW = overgrid.get(x - 1, y + 1);
    let total = N + NE + E + SE + S + SW + W + NW;
    
    

    // true if any neighbour has "people" in it
    var nearsettled =
     (N == settled) || (N == civ) ||
      (S == settled) || (S == civ) ||
      (E == settled) || (E == civ) ||
     (W == settled) || (W == civ) ||
      (NE == settled) || (NE == civ) ||
      (NW == settled) || (NW == civ) ||
     (SE == settled) || (SE == civ) ||
     (SW == settled) || (SW == civ);

    // true if any neighbour has "actvity" in it
    var nearactive =
      N == active ||
      E == active ||
      W == active ||
      S == active ||
      NE == active ||
      SE == active ||
      NW == active ||
      SW == active;

    // check my own previous state:
    var C = overgrid.get(x, y);
     var midTotal = grid.get(x,y);
    var underTotal = undergrid.get(x,y);

    if (C == empty) {
      // are any neighbors settled?
      if (nearsettled) {
        // settle further if there is "life" nearby
        if ((midTotal > 0.3)&&(underTotal ==1)&& (random() < growth_probability)) {
          C = settled;
        }else if ((midTotal > 0.8)&& (random() < growth_probability) ){
          C = settled;
        }

        //Settle randomly  if "life" is plentiful
      }
    } else if (C == settled) {
      // achecks if neighbours are active and if there is enough "life" nearby
      if (nearactive && random() < fire_probability && midTotal < 1) {
        // if (any neighbors are active, become  active too:
        C = active;
      } else if (random() < lightning_probability && midTotal < 1) {
        // otherwise, there's a small chance of catching fire due to atmostpheric conditions:
        C = active;
      }
    } else if (C == active && random() < chance_of_rain) {
      // a active settled cell becomes an empty cell
      C = empty;
    } else if (C == civ) {
      // are any neighbors active?
      if (nearactive && midTotal <0.5) {
        // if (any neighbors are active, and there is not eonugh "life":
        C = empty;
      } else if (nearactive && underTotal < 0.9) {
        // if (any neighbors are active, start active too:
        C = settled;
      }

      if (midTotal < 0.7) {
        // obecomes empty  if "Life" is scarce
        C = empty;
      } else if (C == civ && midTotal < 0.7) {
        // a civilized cell becomes an empty cell
        C = empty;
      } else if (C == active && underTotal > 0.5) {
        // an active settled cell becomes an empty cell if there are enough "resources"
        C = settled;
      }
    }
    if ((total > random(4) + 4)&&(midTotal>0.7)) {
      C = civ;
    }
    
    if((total > 4)&&(C==civ)&&(underTotal>0)) {
       agents.push(
      {pos: new vec2(x/grid.width, y/grid.height), // position, x and y components
      vel: new vec2.random(0.01), // velocity, x and y components
      size: 0.01})
    // store in population array:
    }

    // return the new state:
    return C;
  }); // Fairly heavily modifed "Forest Fire" example, features fourth grid state manipulated heavly by the states of the other grids that produces "towns".


  
  let temp = grid;
  let temp1 = undergrid;
  let temp2 = overgrid;

  grid = gridnext;
  undergrid = undergridnext;
  overgrid = overgridnext;

  gridnext = temp;
  undergridnext = temp1;
  overgridnext = temp2; 
  
  // draws each grid in a channel of this grid to be displayed all at once
  drawgrid.set(function(x, y) {
  
    let C= drawgrid.get(x,y);
    let midTotal =grid.get(x, y);
    let underTotal = undergrid.get(x,y);
    let overTotal = overgrid.get(x,y);
   
    
   
    // else state remains same:
    return [midTotal, underTotal, overTotal];
  });

}

function update(dt) {
  frame++;
  
  if (frame % 3 == 0) updategrids(dt)
   
 let i = agents.length;
   while (i--) {
    let agent = agents[i];
     
    let x = Math.floor(agent.pos[0] * grid.width);
    let y = Math.floor(agent.pos[1] * grid.height);
    
 
    agent.sense = undergrid.sample(agent.pos)+grid.sample(agent.pos);
     
    
    let onRoad = overgrid.get(agent.pos);
    
    // is life getting worse?
    if ((agent.sense < agent.memory) || (agent.sense < 0.5)) {
      // tumbling behaviour:
      agent.vel.rotate((random() - 0.5) * tumbleturn).len(agent.size *0.2 * tumblespeed);
    } else {
      // swimming behaviour:
      agent.vel.rotate((random() - 0.5) * swimturn).len(agent.size*0.2 * swimspeed);
    }
    
 
    
    agent.memory = agent.sense;
    agent.pos.add(agent.vel).wrap(1);

    if ((grid.get(x, y) ==1 && undergrid.get(x, y) >= 0.5) || (undergrid.get(x, y) >1.5)){
      overgrid.set(settled, x, y);
        agents.splice(i, 1);
         grid.set(0, x, y);
  

    }else if((grid.get(x, y) >0.5)){
       overgrid.set(settled, x, y);
      
    }
       undergrid.set(undergrid.get(x, y)-0.5, x, y);
  }

}

// called to render graphics
function draw(ctx) {
  // View Selector, press 'c' to change views.''
  
  if (viewcount % 4 == 0) grid.draw();
  else if (viewcount % 4 == 1) undergrid.draw();
  else if (viewcount % 4 == 2) overgrid.draw();
  else if (viewcount % 4 == 3) drawgrid.draw();

  for (let agent of agents) {
    draw2D.circle(agent.pos, agent.size);
    draw2D.circle(agent.pos, agent.size - 0.01);
    draw2D.circle(agent.pos, agent.size - 0.01);
  }
}

// called when any mouse (or touch) events happen
// kind is the event type (down, up, move, etc.)
// pt is a normalized mouse coordinate
// id refers to any button pressed/released
function mouse(kind, pt, id) {}

// called when any key events happen
// kind is the event type (down, up, etc.)
// key is the key (or keycode) pressed/released
function key(kind, key) {
  if (kind == "down" && key == "c") viewcount++;
}


title = "InterCon"
author = "Andrew Sidsworth"
reset();