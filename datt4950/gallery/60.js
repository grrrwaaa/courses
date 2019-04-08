title = ""
author = "Rostami Ravari Amirbahador"

var dimx = 256;
var dimy = dimx;

let grid = new field2D(dimx,dimy);
let gridNext = new field2D(dimx,dimy);
//let color = new field2D(dimx,dimy);

var speed = 10;
grid.smooth == true;
gridNext.smooth == true;

// starting position:
var antx = dimx/2;
var anty = dimy/2;
var direction = 0;

//initlize the ants
var ants =[ new ant(100,140,2,1),
            new ant(32, 20,3, 1),
            new ant(32, 21,4, 1),
            new ant(64, 40 + random(3),random(4) ,random(2) ? 1 : -1),
            new ant(64, 40 + random(3),random(4) ,random(2) ? 1 : -1),
            new ant(194 + random(3), 20,random(4) ,random(2) ? 1 : -1),
            new ant(74 + random(3), 20,random(4) ,random(2) ? 1 : -1),
          ]

function reset(){
  grid.clear();
}

function resetInit(){
  grid.set(function(){return random(2);});
}

function update(dt){  
  //waves
  gridNext.set(function(x,y){
    //get the one pixel
  let c = grid.get(x,y);

  var N = (grid.get(x, y + 1) == 1) ? 1 : 0;
  var S = (grid.get(x, y - 1) == 1) ? 1 : 0;
  var E = (grid.get(x + 1, y) == 1) ? 1 : 0;
  var W = (grid.get(x - 1, y) == 1) ? 1 : 0;
  var NE = (grid.get(x + 1, y + 1) == 1) ? 1 : 0;
  var NW = (grid.get(x - 1, y + 1) == 1) ? 1 : 0;
  var SE = (grid.get(x + 1, y - 1) == 1) ? 1 : 0;
  var SW = (grid.get(x - 1, y - 1) == 1) ? 1 : 0;
    
    
    
    let total = N + NE + E +SE + S + SW + W + NW;
    let topTotal = N + NE + NW;
    
    let sidePixel = E + S;
    
    let lowTotal = S + SE + SW;
      
    //add chance 
    lowTotal += random(2) * 0.01;
  
    if(c == 1){
      
      if(topTotal == 3) {
        // let CellCol = grid.cell(x,y);
        // CellCol[0] = 0;
        // CellCol[1] = 0;
        // CellCol[2] = 1;
        
        
        return 0;
      }
    
    }else {
      
      if( sidePixel == 2){
        return 1;
      }else if ( lowTotal == 3 ){
        return 1;
      }
      
    }    
    return c;
  });
  
 
  //agents
  for (var j = 0; j < ants.length; j++) {
    var ant = ants[j];

    // move the ant.
    if (ant.direction == 0) {
      // North
      ant.y = (ant.y + 1) % gridNext.height;
    } else if (ant.direction == 1) {
      // West
      ant.x = (ant.x - 1) % gridNext.width;
    } else if (ant.direction == 2) {
      // South
      ant.y = (ant.y - 1) % gridNext.height;
    } else {
      // East
      ant.x = (ant.x + 1) % gridNext.width;
    }

    // apply the rule.
    var state = gridNext.get(ant.x, ant.y);
     
    if (state == 1) {
      // change the cell state:
      gridNext.set(0, ant.x, ant.y);
      // turn in the preferred direction:
      ant.direction = wrap(ant.direction + ant.spin, 4);
    } else {
      // change the cell state:
      gridNext.set(1, ant.x, ant.y);
      // turn in the opposite direction:
      ant.direction = wrap(ant.direction - ant.spin, 4);
    }
  }
  

  
  let temp = grid;
  grid = gridNext;
  gridNext = temp;
  
  // let tempCol = gridNext;
  // gridNext = color;
  // color = tempCol;

}


function draw(ctx){
    grid.draw();
  
  // scale context to field pixel size:
  ctx.scale(1 / dimx, 1 / dimy);
  for (var j = 0; j < ants.length; j++) {
    var ant = ants[j];
    if (ant.spin == 1) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "green";
    }
    ctx.fillRect(ant.x, ant.y, 3, 3);
  }
  

}

function ant(x,y,direction,spin){
  this.x = x;
  this.y = y;
  this.spin = spin;
  this.direction = direction;
}

function key(kind, key) {
  // run one frame only if the "f" key is pressed:
  if (key == "b") {
    //update();
    resetInit();
  }else if( key == "v"){
    reset();
  }
}

