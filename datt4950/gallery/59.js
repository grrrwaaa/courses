title = "Grass Grown"
author = "Jackielou Tornato"

var dimx = 512;
var dimy = dimx;

var field = new field2D(dimx, dimy);
var past = new field2D(dimx, dimy);

// three possible states:
var empty = 0;
var water = 1;
var grass = 0.5;

// probability of the grass growing 
var growth_probability = 1/20;
// probability of the grass growing in different areas and spreading
var spread_probability = 1/1000000;
// maybe there's a sprinkler around watering the grass?
var sprinkler = 1/100;
//the sun is out
var sun_probability = 1/3;
// chance of a pool of water nearby
var pool_of_water = 1;
var dirt = 1;
//chance of fertilizer being planted
var fertilizer = 1/1000000;
var dead_grass_probability = 1/1000;

function reset() {
  field.set(grass, 128, 128);
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
	
    var neargrass = NE == grass || SE == grass
				|| NW == grass || SW == grass;
	
    var nearwater = N == water || E == water 
				|| W == water || S == water;
	
	// check my own previous state:
	var C = past.get(x, y);
	
	if (C == empty) {
		if (neargrass) {
      //cell becomes grass of near other grass
			if (random() < growth_probability) {
				C = grass;
			}
      //cell becomes grass due to the grass spreading
		} else if  (random() < spread_probability) {
			C = grass;
      //cell becomes grass if it's near water + fertilizer
		} else if (nearwater && random() < fertilizer){
      C = grass;
    }
	} else if  (C == grass) {
    //cell becomes overflowed with water
		if (nearwater && (random() < pool_of_water)) {
			C = water;
    //cell becomes overflowed with water
		} else if  (random() < sprinkler) {	
			C = water;
		}
    //the water get's soaked up by the soil/dirt making cell empty
	} else if (C == water && random() < dirt) {
		C = empty;
    //the water is evaporated due to the sun
	} else if (C == water && random() < sun_probability){
    C = empty;
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