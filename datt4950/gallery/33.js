author = "String Thing Particle Automata"

var dimx = 256;
var dimy = dimx;
var field = new field2D(dimx, dimy);
var past = new field2D(dimx, dimy);


function reset() {
	field.set(function() {
		if (random() < 0.001) {
			return 1;
		} else {
			return 0;
		}
	});
}
reset();

// how to render the scene
function draw(ctx)	{
	// draw the field (by default it fills the canvas):
	field.draw();
}

// many dif (ferent block rule possibilities:

function bbm (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 8:
		return [0, 0, 1, 0];
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 4:
		return [0, 0, 0, 1 ];
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 2:
		return [0, 1, 0, 0 ];
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 6 -> state 9:
		return [1, 0, 1, 0 ];
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 1:
		return [1, 0, 0, 0 ];
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 9 -> state 6:
		return [0, 1, 0, 1 ];
	} else {		// no change:
		return [NW, NE, SE, SW ];
	}
}

function bouncegas (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 2:
		return [0, 1, 0, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 6 -> state 9:
		return [1, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 7 -> state 14:
		return [0, 1, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 1:
		return [1, 0, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 9 -> state 6:
		return [0, 1, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 11 -> state 13:
		return [1, 0, 1, 1]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 13 -> state 11:
		return [1, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 14 -> state 7:
		return [1, 1, 0, 1]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function bouncegas2 (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 2:
		return [0, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 10:
		return [0, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 6 -> state 9:
		return [1, 0, 1, 0]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 1:
		return [1, 0, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 9 -> state 6:
		return [0, 1, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 5:
		return [1, 0, 0, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 12 -> state 3:
		return [1, 1, 0, 0]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function critters (NW, NE, SE, SW) {
	if ( NW == 0 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 0 -> state 15:
		return [1, 1, 1, 1]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 14:
		return [0, 1, 1, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 13:
		return [1, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 11:
		return [1, 1, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 7 -> state 1:
		return [1, 0, 0, 0]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 7:
		return [1, 1, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 11 -> state 2:
		return [0, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 13 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 14 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 15 -> state 0:
		return [0, 0, 0, 0]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function hppgas (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 2:
		return [0, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 10:
		return [0, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 6 -> state 9:
		return [1, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 7 -> state 14:
		return [0, 1, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 1:
		return [1, 0, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 9 -> state 6:
		return [0, 1, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 5:
		return [1, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 11 -> state 13:
		return [1, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 12 -> state 3:
		return [1, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 13 -> state 11:
		return [1, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 14 -> state 7:
		return [1, 1, 0, 1]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function rotations (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 2:
		return [0, 1, 0, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 1:
		return [1, 0, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 10:
		return [0, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 6 -> state 9:
		return [1, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 7 -> state 11:
		return [1, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 9 -> state 6:
		return [0, 1, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 5:
		return [1, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 11 -> state 14:
		return [0, 1, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 12 -> state 3:
		return [1, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 13 -> state 7:
		return [1, 1, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 14 -> state 13:
		return [1, 0, 1, 1]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function rotations2 (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 2:
		return [0, 1, 0, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 1:
		return [1, 0, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 10:
		return [0, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 6 -> state 9:
		return [1, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 7 -> state 13:
		return [1, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 9 -> state 6:
		return [0, 1, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 5:
		return [1, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 11 -> state 7:
		return [1, 1, 0, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 12 -> state 3:
		return [1, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 13 -> state 14:
		return [0, 1, 1, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 14 -> state 11:
		return [1, 1, 1, 0]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function rotations3 (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 1:
		return [1, 0, 0, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 10:
		return [0, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 3:
		return [1, 1, 0, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 6 -> state 9:
		return [1, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 7 -> state 11:
		return [1, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 2:
		return [0, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 9 -> state 6:
		return [0, 1, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 11 -> state 14:
		return [0, 1, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 12 -> state 5:
		return [1, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 13 -> state 7:
		return [1, 1, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 14 -> state 13:
		return [1, 0, 1, 1]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function rotations4 (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 1:
		return [1, 0, 0, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 10:
		return [0, 1, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 7 -> state 14:
		return [0, 1, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 2:
		return [0, 1, 0, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 5:
		return [1, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 11 -> state 13:
		return [1, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 12 -> state 3:
		return [1, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 13 -> state 11:
		return [1, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 14 -> state 7:
		return [1, 1, 0, 1]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function sand (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 6 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 7 -> state 13:
		return [1, 0, 1, 1]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 9 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 11 -> state 14:
		return [0, 1, 1, 1]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function stringthing (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 10:
		return [0, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 6 -> state 9:
		return [1, 0, 1, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 9 -> state 6:
		return [0, 1, 0, 1]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 5:
		return [1, 0, 0, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 12 -> state 3:
		return [1, 1, 0, 0]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function stringthing2 (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 10:
		return [0, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 5:
		return [1, 0, 0, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 12 -> state 3:
		return [1, 1, 0, 0]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function swapondialog (NW, NE, SE, SW) {
	if ( NW == 1 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 1 -> state 8:
		return [0, 0, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 2 -> state 4:
		return [0, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 0  ) { 
		// state 3 -> state 12:
		return [0, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 4 -> state 2:
		return [0, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 0 && SW == 1  ) { 
		// state 5 -> state 10:
		return [0, 1, 1, 0]; 
	} else if ( NW == 1 && NE == 1 && SE == 0 && SW == 1  ) { 
		// state 7 -> state 14:
		return [0, 1, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 0  ) { 
		// state 8 -> state 1:
		return [1, 0, 0, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 10 -> state 5:
		return [1, 0, 0, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 0  ) { 
		// state 11 -> state 13:
		return [1, 0, 1, 1]; 
	} else if ( NW == 0 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 12 -> state 3:
		return [1, 1, 0, 0]; 
	} else if ( NW == 1 && NE == 0 && SE == 1 && SW == 1  ) { 
		// state 13 -> state 11:
		return [1, 1, 1, 0]; 
	} else if ( NW == 0 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 14 -> state 7:
		return [1, 1, 0, 1]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

function tron (NW, NE, SE, SW) {
	if ( NW == 0 && NE == 0 && SE == 0 && SW == 0  ) { 
		// state 0 -> state 15:
		return [1, 1, 1, 1]; 
	} else if ( NW == 1 && NE == 1 && SE == 1 && SW == 1  ) { 
		// state 15 -> state 0:
		return [0, 0, 0, 0]; 
	} else {		// no change:
		return [NW, NE, SE, SW]; 
	}
}

//rule = bbm; boundaryvalue = 1;
//rule = critters; boundaryvalue = 1;
//rule = stringthing; boundaryvalue = 1;
rule = stringthing2; boundaryvalue = 1;
//rule = tron; boundaryvalue = 1;

function update() {
	// perform even-index blocks:
	for (var y = 0; y < field.height; y += 2 ) {
		for (var x = 0; x < field.width; x += 2 ) {
			var NW = field.get(x  , y  ) 
			var NE = field.get(x+1, y  ) 
			var SE = field.get(x+1, y+1) 
			var SW = field.get(x  , y+1) 
			
			var result = rule(NW, NE, SE, SW)
			
			field.set(result[0], x  , y  ) 
			field.set(result[1], x+1, y  ) 
			field.set(result[2], x+1, y+1) 
			field.set(result[3], x  , y+1)
		}
	}
	
	// perform odd-index blocks:
	for (var y = 1; y < field.height; y += 2 ) {
		for (var x = 1; x < field.width; x += 2 ) {
			var NW = field.get(x  , y  ) 
			var NE = field.get(x+1, y  ) 
			var SE = field.get(x+1, y+1) 
			var SW = field.get(x  , y+1) 
			
			var result = rule(NW, NE, SE, SW)
			
			field.set(result[0], x  , y  ) 
			field.set(result[1], x+1, y  ) 
			field.set(result[2], x+1, y+1) 
			field.set(result[3], x  , y+1)
		}
	}
	
	// apply boundary:
	for (var x = 0; x < field.width; x++ ) {
		field.set(boundaryvalue, x, 0)
		field.set(boundaryvalue, x, field.height-1)
	}
	for (var y = 0; y < field.height; y++ ) {
		field.set(boundaryvalue, 0, y)
		field.set(boundaryvalue, field.width - 1, y)
	}
} 