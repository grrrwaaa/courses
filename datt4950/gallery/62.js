title = "Forest Fire with Freezing Snow"
author = "Meng Nan Yang"

var dimx = 512;
var dimy = dimx;

var field = new field2D(dimx, dimy);
var past = new field2D(dimx, dimy);




// Four possible states:
var empty = 0;
var tree = 1;
var burning = 2;
var snowing = 3;

// the chance of an empty cell regrowing trees by expansion:
var growth_probability =  1/6;
// the chance of an empty cell regrowing trees by random sporing:
var spore_probability = 1/100000;
// the chance of lighting striking a cell:
var lightning_probability = 1/2000;
// chance of fire spreading:
var fire_probability = 1;
// chance of fire going out
var chance_of_rain = 1/2;

//snow will cause bacground frozen
var chance_of_snow = 1/1000;


function reset() {
  field.set(tree, 128, 128);
  
  
}
reset();

function key() { reset(); }

// how to r}er the scene
function draw(ctx)	{
	// draw the field (by default it fills the canvas):
	field.draw();
   
}

// the rule for an individual cell (at position x, y) in the field:
function transition(x, y) {

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
				|| NE == burning || SE == burning 
				|| NW == burning || SW == burning;
  
 // true if the neighbours from 6 directions are snowing;
  var nearsnowing = N == snowing  || E == snowing 
				|| W == snowing || S == snowing || NW == snowing || SW == snowing; 
				
	
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
		if (nearburning && (random() < fire_probability)) {
			// if (any neighbors are burning, start burning too:
			C = burning;
		
		} else if  (random() < lightning_probability) {		
			// otherwise, there's a small chance of catching fire due to atmostpheric conditions:
			C = burning;
		}
	} else if (C == burning && random() < chance_of_rain) {
		// a burning tree cell becomes an empty cell
		C = empty;
	} 
  
  
  else if (C == nearsnowing && random() < chance_of_snow) {
		// if any are snowing, keep snowing 
		C = snowing;
	} 
  
  else if (C == burning && random() < chance_of_snow) {
		// a burning tree cell becomes an snowing cell
		C = snowing;
	} 
  
	
	// return the new state:
	return C;
}

function update() {
	var tmp = past;
	past = field;
	field = tmp;
	
	field.set(transition);
  
   
} 