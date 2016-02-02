title = "Cellular Automata";
author = "Rick Demeester";

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

function game (x, y) {
    // get all neighbors:
    // I changed which cells that the variables would be looking at.
    var E = past.get(x+1, y);
    var W = past.get(x-1, y);
    var N = past.get(x, y+2);
    var S = past.get(x, y-2);
    var NE = past.get(x+1, y+1);
    var NW = past.get(x-1, y+1);
    var SE = past.get(x+2, y-2);
    var SW = past.get(x-1, y-1); 
    
    var noEastTotal = N + W + S + NW + SW; //remove all the easts to make a self eating system.
    var vonTotal = N + S + W + E;          //The total of the von Neumann neighborhood
    var mooreTotal = NE + NW + SE + SW;    // The total of the Moore neighborhood - the von Neumann neighborhood 
    var total = NE + NW + SE + SW + N + E + S + W;
    
    // THESE VARIABLES WERE CREATED AND TESTED, TO ATTEMPT TO BALANCE THE SYSTEM OUT. I WAS TRYING TO ESTABLISH                  VARIABLES THAT WOULD AVERAGE.
    // var boardTotal = N + S + E + W + NE + SE + SW + NW;
    // var totalAllHigh = (Math.ceil(N + S + E + W + NE + SE + SW + NW)/2);
    // var totalAllLow = (Math.floor(N + S + E + W + NE + SE + SW + NW)/2);
    
    // current cell value:
    var C = past.get(x, y);
    
    // if the current cell is alive: C==1 
    if (C == 1) {
      if ((noEastTotal + vonTotal == 4) || (noEastTotal + vonTotal == 3)) { 
        return 0; 
      } else if (noEastTotal + mooreTotal == 8) { 
        return 0;
      } else {
        return C;
      }
    // the cell is dead: C==0
    } else { 
      if (mooreTotal + noEastTotal > 4) { 
        return 1; 
      } else if (noEastTotal + mooreTotal > 6 && noEastTotal + mooreTotal != 5) {  
        return 1; //1
      } else if (total == 8) {
        future.set(function (x, y) { 
           if (random() < x/future.width) {
              return 1;
              }
           });    
      }else {
        return C;
      }
    }
  }

function update() {
  
  future.set(game);  
      
  // swap the fields (double buffering):
  var tmp = future;
  future = past;
  past = tmp;
  
}
  
function draw() {
  past.draw();
}