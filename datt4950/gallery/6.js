title = "Traffic Fluid 2";
author = "Jennifer Wu";

var dimx = 256;
var dimy = dimx;
var field = new field2D(dimx, dimy);
var past = new field2D(dimx, dimy);


function reset() {
	field.set(function() {
		if (random() < 0.01) {
			return 1;
		} else if (random() <0.1) { //or 0.1
      
      return 0.5;
    }
      else {
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



function traffic (NW, NE, SE, SW) {
  if (NW == 1 && SW == 0) {
    return [0, NE, SE, 1];
  } else if (NW == 0.5 && NE == 0) {
    // move cell to the right
    return [0, 0.5, SE, SW];
  } else if (SW == 1 && SE == 0) {
    return [ NW, NE, 1, 0];
  } else if (NE == 1 && SE == 0) {
    return [NW, 0, 1, SW];
  } else {
    return [NW, NE, SE, SW];
  }
}


rule = traffic; boundaryvalue = 1;

function update() {
	// perform even-index blocks:
	for (var y = 0; y < field.height; y += 2 ) {
		for (var x = 0; x < field.width; x += 2 ) {
      if(random()<0.01) {
    field.set(0, x, y);
  }
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
       if(random()<0.01) {
    field.set(0, x, y);
  }
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