author = "Evolving Biomorphs"

var lexicon = "FFFFF+-<>=^".split("");
var angle1 = Math.PI / 12;
var angle2 = 0;
var t = 0;

function pick(arr) {
  return arr[random(arr.length)];
}

function geno_make() {
  var g = "";
  for (var i = 0; i < 25; i++) {
    g += pick(lexicon);
  }
  return g;
}

var pop = [];
for (var i = 0; i < 9; i++) {
  pop[i] = geno_make();
}

code = geno_make();

turtle = {
  pos: new vec2(),
  dir: new vec2(0, 1),
  spin: 1,
};

function turtle_draw(turtle, code, limit) {
  for (var i = 0; i < code.length && i < limit; i++) {
    var c = code.substr(i, 1);
    if (c == "F") {
      var p2 = turtle.dir.clone().add(turtle.pos);
      draw2D.line(turtle.pos, p2);
      turtle.pos = p2;
    } else if (c == "+") {
      turtle.dir.rotate(angle1 * turtle.spin);
    } else if (c == "-") {
      turtle.dir.rotate(-angle1 * turtle.spin);
    } else if (c == "<") {
      turtle.dir.rotate(angle2 * turtle.spin);
    } else if (c == ">") {
      turtle.dir.rotate(-angle2 * turtle.spin);
    } else if (c == "=") {
      var t2 = {
        pos: turtle.pos.clone(),
        dir: turtle.dir.clone().negate(),
        spin: turtle.spin
      };
      turtle_draw(t2, code.substr(i + 1), limit - i - 1);
    } else if (c == "^") {
      var t2 = {
        pos: turtle.pos.clone(),
        dir: turtle.dir.clone(),
        spin: -turtle.spin
      };
      turtle_draw(t2, code.substr(i + 1), limit - i - 1);
    }
  }
}

function regenerate(choice) {
  t = 0;
    // convert mouse position p to choice of biomorph:
    var parent = pop[choice];

    // make a new population:
    var newpop = [];
    for (var i=0; i<9; i++) {
      var child = parent;
      
      // TODO: mutations;
      var cut = random(child.length);
      var a = child.slice(0, cut);
      var cut = random(child.length);
      var b = child.slice(cut);
      var c = pick(lexicon);
      child = b+c+a;
      
      if (child.length > 20) {
        child = child.slice(0, 20);
      } else  {
        while (child.length < 10) {
          child = child + pick(lexicon);
        }
      }
      
      newpop.push(child);
    }
    pop = newpop;
}

function mouse(e, p) {
  if (e == "down") {
    
    var col = Math.floor(p[0]*3);
    var row = Math.floor(p[1]*3);
    var choice = row*3 + col;
    regenerate(choice);
  }
}

function draw() {
  for (var i = 0; i < pop.length; i++) {
    var code = pop[i];
    
    var col = i % 3;
    var row = Math.floor(i/3);
    
    write(col, row, code);
    draw2D.push()
      .translate((col + 0.5)/3, (row + 0.5)/3)
      .scale(0.01);

    turtle.pos.set(0, 0);
    turtle.dir.set(0, 1);
    turtle_draw(turtle, code, Math.floor(t * 8));

    draw2D.pop();
  }
}

var t0 = now;

function update() {
  
  if (now - t0 > 5) {
    regenerate(random(9));
    t0 += 5;
  }
  
  t += dt;
  angle1 = Math.sin(now);
  angle2 = 0.25 * Math.sin(now * Math.PI * 4);
}