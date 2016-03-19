title = "Malevich Generator";
author = "Sophie Roginsky";

var lexicon = "+-<>=^".split("");

var t = 0;
var x = 2;
var canvas = 30;

var t0 = now;

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

art = {
  center_x: 0,
  center_y: 0,
}

function create_art(art, code) {

  var a = 0;
  //rgb values modified through steps 
  var r = 0;
  var g = 0;
  var b = 0;

  for (var i = 0; i < code.length; i++) {
    var c = code.substr(i, 1)
    if (c == "=") {
      r += 0.1;
      draw2D.color(r, g, b);
      if ((i / 2) < canvas / 3)
        
        draw2D.rect([(0 + i) / canvas, (0 + i) / canvas], i / 2);

    } else if (c == "+") {
      g += 0.1;
       draw2D.color(r, g, b);
      //verticle lines
      draw2D.line([-(canvas / 2) + i, -(canvas / 2)], [-(canvas / 2) + i, (canvas / 2)], i / 4);

    } else if (c == "-") {
      b = 0;
      g = 0;
      r = 0;
      draw2D.color(r, g, b);
      //horizontal lines
      draw2D.line([-(canvas / 2), -(canvas / 2) + i], [(canvas / 2), -(canvas / 2) + i]);

    } else if (c == "<") {
      r += 0.2;
      g += 0.2;
      b += 0.5;
      draw2D.color(r, g, b);

      draw2D.circle([(0 - i) + i / 2, (0 - i) + i / 2], i / 4);
    } else if (c == ">") {
      draw2D.color(r, g, b);
      r -= 0.2;
      g -= 0.2;
      b -= 0.5;
      draw2D.color(r, g, b);
      draw2D.scale(0.5);
      draw2D.rect([(0 + i), 0 + i] , i);
    } else if (c == "^") {
      r += 0.3
      b += 0.2;
      draw2D.color(r, g, b);
      draw2D.rotate(20);
      //rest colour values
    } else if (r > 1) {
      r = 0;
    } else if (g > 1) {
      g = 0;
    } else if (b > 1) {
      b = 0;
    }

  }
}

function make(choice) {
    var parent = pop[choice];

    // make a new population:
    var newpop = [];
    for (var i = 0; i < 9; i++) {
      var child = parent;

      var cut = random(child.length);
      var cut2 = child.length / 2;

      var a = child.slice(0, cut - 1);
      var b = child.slice(cut + 2);
      var c = pick(lexicon);
      var d = pick(lexicon);
      var e = pick(lexicon);
      
      //replace random gene 
      child = a + c + b;
      newpop.push(child);
    }
    pop = newpop;
}

function mouse(e, p) {
  if (e == "down") {
    t = 0;

    // convert mouse position p to choice of canvas:
    var col = Math.floor(p[0] * 3);
    var row = Math.floor(p[1] * 3);
    var choice = row * 3 + col;
    
    make(choice);
  }
  t0 = now;
}

function update() {
  if (now - t0 > 5) {
    var choice = random(9);
    make(choice);
    pop[choice] = geno_make();
    t0 = now;
  }
}

function draw() {
  for (var i = 0; i < pop.length; i++) {

    var code = pop[i];

    var col = i % 3;
    var row = Math.floor(i / 3);

    //write(col, row, code);
  
    draw2D.push()
      .translate((col + 0.5) / 3, (row + 0.5) / 3)
      .scale(0.01);

    //draw white canvases 
    draw2D.rect([0, 0], canvas);
    create_art(art, code);
    draw2D.pop();

  }
  
  draw2D.color("black").line([1, 1], [1, 0], 8);
  draw2D.color("black").line([1 / 3, 1], [1 / 3, 0], 8);

  draw2D.color("black").line([2 / 3, 1], [2 / 3, 0], 8);
  draw2D.color("black").line([0, 0], [0, 1], 8);

  draw2D.color("black").line([0, 0], [1, 0], 8);
  draw2D.color("black").line([0, 1 / 3], [1, 1 / 3], 8);
  draw2D.color("black").line([0, 2 / 3], [1, 2 / 3], 8);
  draw2D.color("black").line([0, 1], [1, 1], 8);

}
