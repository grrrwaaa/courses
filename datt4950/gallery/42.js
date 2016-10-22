author = "Yirui	Fu"
title = "The Game of Death"

// create a field:
var future = new field2D(256);

// initialize it randomly:
future.set(function (x, y) { 
  if (random() < x/future.width) {
    return 1;
  }
}); 

// make a copy of it:
var past = future.clone();

function update() {
   
  future.set(function (x, y) {
    // get all neighbors:
    var E = past.get(x+2, y);
    var W = past.get(x-1, y);
    var N = past.get(x, y+1);
    var S = past.get(x, y-2);
    var NE = past.get(x+2, y+1);
    var NW = past.get(x-1, y+2);
    var SE = past.get(x+1, y-1);
    var SW = past.get(x-1, y-1);
    // total number of neighbors that are alive:
    var total = N + E + S + W + NE +  SE + NW + SW;
    // current cell value:
    var C = past.get(x, y);
    // if the current cell is alive:
    if (C == 1) {
      if (total < 2) {
        return 0; // "death by loneliness"
      } else if (total > 3) {
        return 0; // death by overcrowding
     } else {
        return C; // remain the same
      }
    } else {
      // current cell is dead:
      if (total == 3) {
        return 1; // trisexual reproduction
      //} else if(total== 4){
      //  return C; // same as:
      }else{
        return 0;
      }
    }
     //field.set(C-1); // never reached
  });
 
 
  var tmp = future;
  future = past;
  past = tmp;
 

  
}
  
function draw() {
 
  past.draw();
  
}

function mouse(e,p){
  
  var r = 
     Math.floor(p[0]*future.width);
  var c = 
      Math.floor(p[1]*future.height);
  for (var i=0; i<150; i++){
    future.set(0,r+random(10)-5, c+ random(10)-5);
    past.set(0, r+random(10)-5,c+random(10)-5);
  }
}