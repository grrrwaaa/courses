title = "Monster in Different World";
author = "Lu Li";

var dimx = 350;
var dimy = dimx;
 var boundaries = new field2D(350);
var field = new field2D(dimx, dimy);
var past = new field2D(dimx, dimy);
var rsqrts2 = 0.2;
// three possible states:
var empty = 0;
var tree = 1;//TODO Interesting to change
var burning = 0.5;//TODO Interesting to change
// the chance of an empty cell regrowing trees by expansion:
var growth_probability = 1/10;
// the chance of an empty cell regrowing trees by random sporing:
var spore_probability = 1/1000;
// the chance of lighting striking a cell:
var lightning_probability = 1/10000;

var burn_probability = 1;
// how to r}er the scene

//set up the ant as monster
var ants = [
  { x: 130, y: 30, direction: 2, spin: 1 },
 // another ant { x: 130, y: 200, direction: 2, spin: 1 },
];
boundaries.set(function(x, y) {
  if(y<dimy*2/3&&y>dimy/3)
  return x ==1 ? 1 : 0;//||y==x-1///TODO Interesting to change
});
function draw()	{
	// draw the field (by default it fills the canvas):
	field.draw();
}


// the rule for an individual cell (at position x, y) in the field:
function transition(x, y) {
  //set boundary
  var B = boundaries.get(x, y);
  if (B) return 1;
 // Genetate four squre of forest
  //Upper Left
if((x>dimx*1/9&&x<dimx*2/9&&y>dimy*1/9&&y<dimy*2/9)||
  //upper right
   (x>dimx*1/9&&x<dimx*2/9&&y>dimy*7/9&&y<dimy*8/9)||
  //lower left
   (x>dimx*7/9&&x<dimx*8/9&&y>dimy*7/9&&y<dimy*8/9)||
   //lower right
   (x>dimx*7/9&&x<dimx*8/9&&y>dimy*1/9&&y<dimy*2/9)
  ){
	// check out the neighbors' previous states:
	var N  = past.get(x  , y+1);
	var NE = past.get(x+1, y+1);
	var E  = past.get(x+1, y  );
	var SE = past.get(x+1, y-1);
	var S  = past.get(x  , y-1);
	var SW = past.get(x-1, y-1);
	var W  = past.get(x-1, y  );
	var NW = past.get(x-1, y+1);
	
	// true if (any neighb|| is a tree:
	var neartree = N == tree || E == tree 
				|| W == tree || S == tree 
				|| NE == tree || SE == tree 
				|| NW == tree || SW == tree;
	
	// true if (any neighb|| is burning:
	var nearburning = N == burning || E == burning 
				|| W == burning || S == burning 
		|| (NE == burning &&random()<rsqrts2)
    || (SE == burning &&random()<rsqrts2)
  	|| (NW == burning&&random()<rsqrts2)     || (SW == burning&&random()<rsqrts2);
	
	// check my own previous state:
	var C = past.get(x, y);
	
	if (C == empty) {
		// are any neighbors trees?
		if (neartree) {			
			// chance of regrowing:
			if (random() < growth_probability) {
				C = tree;
			}
		} else if  (random() < spore_probability) {
			// smaller chance of propagation by seeding:
			C = tree;
		}
	} else if  (C == tree) {
		// are any neighbors burning?
		if (nearburning) {
			// if (any neighbors are burning, start burning too:
      if(random()<burn_probability)
			C = burning;
		
		} else if  (random() < lightning_probability) {		
			// otherwise, there's a small chance of catching fire due to atmostpheric conditions:
			C = burning;
		}
	} else if  (C == burning) {
		// a burning tree cell becomes an empty cell
		C = empty;
	} 
	
	// return the new state:
	return C;
}
  
// The rule for lower part
if(y < dimy*1/3){  
  var N = past.get(x, y + 1);
  var E = past.get(x + 1, y);
  var S = past.get(x, y - 1);
  var W = past.get(x - 1, y);
  var NE = past.get(x + 1, y + 1);
  var SE = past.get(x + 1, y - 1);
  var SW = past.get(x - 1, y - 1);
  var NW = past.get(x - 1, y + 1);
  var near = N + S + E + W + NW + SW + NE + SE
  // current state:
  var C = past.get(x, y);
  // transition rule:
  // if alive:
  if (C == 1) {
    if (near < 2) {
      // die by loneliness:
      return 0;//1//TODO Interesting to change
    } else if (near > 3) {
      // die by overcrowding:
      return 0;//2//TODO Interesting to change
    }
  } else if (C == 0) {
    // if dead, rebirth by three neighbours:
    if (near == 3) {
      return 1;//3//TODO Interesting to change
    }
  }
  // else remain the same:
  return C;//c/2//TODO Interesting to change
  }else if(y < dimy*2/3){ var N = past.get(x, y + 1);//rule for middle part
  var E = past.get(x + 1, y);
  var S = past.get(x, y - 1);
  var W = past.get(x - 1, y);
  var NE = past.get(x + 1, y + 1);
  var SE = past.get(x + 1, y - 1);
  var SW = past.get(x - 1, y - 1);
  var NW = past.get(x - 1, y + 1);
  var near = N + S + E + W + S + S + E + W
  // current state:
  var C = past.get(x, y);
  // transition rule:
  // if alive:
  if (C == 1) {
    if (near < 2) {
      // die by loneliness:
      return 0;
    } else if (near > 3) {
      // die by overcrowding:
      return 0;
    }
  } else if (C == 0) {
    // if dead, rebirth by three neighbours:
    if (near == 3) {
      return 1;
    }
  }
  // else remain the same:
  return C;}else{//rules for upper part
    var N = past.get(x, y + 1);
  var E = past.get(x + 1, y);
  var S = past.get(x, y - 1);
  var W = past.get(x - 1, y);
  var NE = past.get(x + 1, y + 1);
  var SE = past.get(x + 1, y - 1);
  var SW = past.get(x - 1, y - 1);
  var NW = past.get(x - 1, y + 1);
 var near = N + S + E + W + NW + SW + NE + SE
  // current state:
  var C = past.get(x, y);
  // transition rule:
  // if alive:
  if (C == 1) {
    if (near < 2) {
      // die by loneliness:
      return 0;
    } else if (near > 3) {
      // die by overcrowding:
      return 1;
    }
  } else if (C == 0) {
    // if dead, rebirth by three neighbours:
    if (near == 3) {
      return 2;
    }
  }
  // else remain the same:
  return C/2;
  }
  
}

function update() {
	var tmp = past;
	past = field;
	field = tmp;
	field.set(transition);
 //set up boundaries
    boundaries.set(function(x, y) {
    return boundaries.get(x+1, y);// boundary move speed
  });
//set up the ant 
   for (var i = 0; i < 300; i++) {
    // how many ants:
    for (var a = 0; a < ants.length; a++) {
      // get a reference to the current ant:
      var ant = ants[a];
      var sense = field.get(ant.x, ant.y);
      field.set(1-sense, ant.x, ant.y);
      if (sense == 1) {
        // At a white square, turn 90° right,
        ant.direction += ant.spin;
      } else {
        // At a black square, turn 90° left, 
        ant.direction -= ant.spin;
      }
      // keep directions sane:
      ant.direction = wrap(ant.direction, 4);
      // move forward one unit:
      if (ant.direction == 0) {
        ant.y += 2;//change to 1.5/1/0.5//TODO Interesting to change
      } else if (ant.direction == 1) {
        ant.x += 2;//change to 1.5/1/0.5//TODO Interesting to change
      } else if (ant.direction == 2) {
        ant.y -= 2;//change to 1.5/1/0.5//TODO Interesting to change
      } else if (ant.direction == 3) {
        ant.x -= 2;//change to 1.5/1/0.5//TODO Interesting to change
      }
      
    }
  }
}