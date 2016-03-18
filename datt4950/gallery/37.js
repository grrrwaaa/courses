title = "Strange Attractor - Points"

author = "Rose Zhou";

var pop = [];
var dim = 400;
var rows = 8;
var gene_size = 11;

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXY";
var sample_gene = "QGGVSLMHHGCR";

// the bounds in which points are kept
var limit = 1.6;
var limit2 = limit*2;
var scale = 0.4/(rows*limit);
var circlesize = 0.002/scale;
var fail_limit = 1000;

function pick(arr) {
  return arr[random(arr.length)];
}

function geno_make() {
  var g = "";
  for (var i = 0; i < 12; i++) {
    g += pick(alphabet);
  }
  //  console.log(g);
  return g;
}

for (var i = 0; i < rows * rows; i++) {
  if (i == 0) {
    pop[i] = {
      geno: sample_gene,
      pos: new vec2(0.1, 0.1),
      fails: 0
    };
  } else {
    pop[i] = {
      geno: geno_make(),
      pos: new vec2(0.1, 0.1),
      fails: 0
    };
  }
}

function gene2coeff(gene) {
  var coeff = [];
  for (i = 0; i < gene.length; i++) {
    coeff[i] = (gene.charCodeAt(i) - 65 - 12) / 10;
    // console.log(coeff[i]);
  }
  return coeff;
}

var a = [];

function draw_pts(individual) {
  // console.log(individual);
  x = individual.pos[0];
  y = individual.pos[1];

  a = gene2coeff(individual.geno);
  for (var i = 0; i < 32; i++) {

    draw2D.circle(x, y, circlesize);
    // update next point
    var nx = a[0] + a[1] * x + a[2] * x * x +
      a[3] * x * y + a[4] * y + a[5] * y * y;
    var ny = a[6] + a[7] * x + a[8] * x * x +
      a[9] * x * y + a[10] * y + a[11] * y * y;

    // capture point attractors:
    if (Math.abs(x - nx) * Math.abs(y - ny) < 0.0001) {
      individual.fails++;
    }
    // capture divergents:
    if (nx > limit || nx < -limit || ny > limit || ny < -limit) {
      individual.fails++;
      // wrap in -1..1:
      x = wrap(nx + limit, limit2) - limit;
      y = wrap(ny + limit, limit2) - limit;
    } else {
      x = nx;
      y = ny;
    }

  }
  individual.pos[0] = x;
  individual.pos[1] = y;
}

function draw() {
  for (var i = 0; i < pop.length; i++) {
    var code = pop[i].geno;

    var col = i % rows;
    var row = Math.floor(i / rows);

   // write(col, row, code, pop[i].fails);

    draw2D.push()
      .translate((col + 0.5) / rows, (row + 0.5) / rows)
      .scale(scale);
    draw_pts(pop[i]);
    draw2D.pop();

    if (pop[i].fails > fail_limit) {
      // mutate?
      pop[i] = {
        geno: geno_make(),
        pos: new vec2(0.1, 0.1),
        fails: 0
      };
    }
  }
}

function reset() {
  for (var i = 0; i < rows * rows; i++) {
    pop[i].geno = geno_make();
    pop[i].pos = new vec2(0.1, 0.1);
  }
}

function mouse(e, p) {
  if (e == "down") {
    reset();
  }
}

function key(e, k) {
  if (k == "r") {
    reset();
  }
}