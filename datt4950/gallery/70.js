var speed = 1;

var dimx = 256, dimy = 256;
var field = new field2D(dimx, dimy);

field.set(1);

let mutation_rate = 0.2;

var antx_r = dimx/2;
var anty_r = dimy/2;
var direction_r = 0;

let step_r = random(21);
let directions_r = random(2);
let spin_r = 1;
if (directions_r == 0) {
  spin_r = 1;
} else {
  spin_r = 1 - 2;
}
let size_r = random(11);

let runtime_r = 0;
let time_r = 100;

let fittest_r = [];


var antx_b = dimx/2;
var anty_b = dimy/2;
var direction_b = 0;

let step_b = random(21);
let directions_b = random(2);
let spin_b = 1;
if (directions_b == 0) {
  spin_b = 1;
} else {
  spin_b = 1 - 2;
}
let size_b = random(11);

let runtime_b = 0;
let time_b = 100;

let fittest_b = [];

function sort_r() { //sort parent list according to runtime
  for (let i = 0; i < fittest_r.length - 1; i++) {
    let temp = fittest_r[i + 1];
    if (fittest_r[i][3] > fittest_r[i + 1][3]) {
      fittest_r[i + 1] = fittest_r[i];
      fittest_r[i] = temp;
    }
  }
}

function sort_b() {
  for (let i = 0; i < fittest_b.length - 1; i++) {
    let temp = fittest_b[i + 1];
    if (fittest_b[i][3] > fittest_b[i + 1][3]) {
      fittest_b[i + 1] = fittest_b[i];
      fittest_b[i] = temp;
    }
  }
}

function mutate_r() {
  if (fittest_r.length > 1) { 
    if (runtime_r >= fittest_r[0][3]) {
      //add new ant if it's runtime is greater than
      //the runtime of the first ant in the list
      if (fittest_r.length == 10) {
        //if there are more than 10 ants in list, replace
        //first ant in list with current ant
        fittest_r[0] = [step_r, directions_r, size_r, runtime_r];
        sort_r();
      } else {
        //add new ant at end of list
        fittest_r.push([step_r, directions_r, size_r, runtime_r]);
        sort_r();
      }
    } else {
      fittest_r = fittest_r;
    }
  } else { //add the first two ants to list
    fittest_r.push([step_r, directions_r, size_r, runtime_r]);
    sort_r();
  }
  
  if (random() > mutation_rate) {
    //create new ant based on parent ant
    step_r = fittest_r[random(fittest_r.length - 1)][0];
    directions_r = fittest_r[random(fittest_r.length - 1)][1];
    size_r = fittest_r[random(fittest_r.length - 1)][2];
  } else {
    //add new ant with random properties
    step_r = random(11);
    directions_r = random(2);
    size_r = random(11);
  }
  
  runtime_r = 0; //reset runtime
}

function mutate_b() {
   if (fittest_b.length > 1) {
    if (runtime_b >= fittest_b[0][3]) {
      if (fittest_b.length == 10) {
        fittest_b[0] = [step_b, directions_b, size_b, runtime_b];
        sort_b();
      } else {
        fittest_b.push([step_b, directions_b, size_b, runtime_b]);
        sort_b();
      }
    } else {
      fittest_b = fittest_b;
    }
  } else {
    fittest_b.push([step_b, directions_b, size_b, runtime_b]);
    sort_b();
  }
  
  if (random() > mutation_rate) {
    step_b = fittest_b[random(fittest_b.length - 1)][0];
    directions_b = fittest_b[random(fittest_b.length - 1)][1];
    size_b = fittest_b[random(fittest_b.length - 1)][2];
  } else {
    step_b = random(11);
    directions_b = random(2);
    size_b = random(11);
  }
  
  runtime_b = 0;
}

function draw()	{
	field.draw() 
}

function red() { 
  runtime_r++; //increment runtime each frame
  
	for (let i = 1; i <= speed; i++) {
		let state = field.get(antx_r + size_r/2, anty_r + size_r/2);
		if (state == 1) { //if the cell is white, colour it
			direction_r = wrap(direction_r + size_r * spin_r, 4);
			for (i = 0; i <= size_r; i ++) {
        for (let j = 0; j <=size_r; j++) {
          field.set([255, 0, 0], antx_r + j, anty_r+i);
        }
        for (let j = 0; j <=size_r; j++) {
          field.set([255, 0, 0], antx_r + i, anty_r+j);
        }
      }
		} else { //if the cell is not white, make it white
			direction_r = wrap(direction_r - size_r * spin_r, 4);
      for (let i = 0; i <= size_r; i ++) { 
        for (let j = 0; j <=size_r; j++) {
          field.set(1, antx_r + j, anty_r+i);
        }
        for (let j = 0; j <=size_r; j++) {
          field.set(1, antx_r + i, anty_r+j);
        }
      }
		}
		
		// move the ant.
		if (direction_r == 0) {
			// North
			anty_r = (anty_r + step_r) % field.height;
		} else if (direction_r == 1) {
			// West
			antx_r = (antx_r - step_r) % field.width;
		} else if (direction_r == 2) {
			// South
			anty_r = (anty_r - step_r) % field.height;
		} else {
			// East
			antx_r = (antx_r + step_r) % field.width;
		}
	}  
}

function blue() { 
  runtime_b++;
  
	for (let i = 1; i <= speed; i++) {
		let state = field.get(antx_b + size_b/2, anty_b + size_b/2);
		if (state == 1) {
			direction_b = wrap(direction_b + size_b * spin_b, 4);
			for (i = 0; i <= size_b; i ++) {
        for (let j = 0; j <=size_b; j++) {
          field.set([0, 0, 255], antx_b + j, anty_b+i);
        }
        for (let j = 0; j <=size_b; j++) {
          field.set([0, 0, 255], antx_b + i, anty_b+j);
        }
      }
		} else {
			direction_b = wrap(direction_b - size_b * spin_b, 4);
      for (let i = 0; i <= size_b; i ++) { 
        for (let j = 0; j <=size_b; j++) {
          field.set(1, antx_b + j, anty_b+i);
        }
        for (let j = 0; j <=size_b; j++) {
          field.set(1, antx_b + i, anty_b+j);
        }
      }
		}
		
		if (direction_b == 0) {
			anty_b = (anty_b + step_b) % field.height;
		} else if (direction_b == 1) {
			antx_b = (antx_b - step_b) % field.width;
		} else if (direction_b == 2) {
			anty_b = (anty_b - step_b) % field.height;
		} else {
			antx_b = (antx_b + step_b) % field.width;
		}
	}  
}

function update() {
  red();
  timer_r();
  blue();
  timer_b();
}

function timer_r() {
  //if more than 1 minute passes, evolve the ant
  //change time to 100 so ant will mutate every second
  if (runtime_r > time_r) {
    mutate_r();
    time_r = 100;
  }
}

function timer_b() {
  if (runtime_b > time_b) {
    mutate_b();
    time_b = 100;
  }
}

function key(kind, key) {
  //evolve ant when the key is pressed
  if (kind == "down" && key == "q") {
    time_r = 6000; //reset time
    mutate_r();
    sort_r(); //sort list
  }
  if (kind == "down" && key == "p") {
    time_b = 6000;
    mutate_b();
    sort_b();
  }
}


title = "Formica"
author = "June Yu and Milka Lijiam"
reset();