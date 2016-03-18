author = "Rose Zhou"
title = "Strange Attractor - Select Out"

var pop = [];
var dim = 155;
var rows = 5;
var gene_size = 12;

// probability that an individual will make an approximate copy of itself at reproduction
var close_copy_probablity = 0.2;
// probability that an individual will xover gene with a random individual in population
var xover_probablity = 0.1;
// var random_child_probability = 1 - close_copy_probablity - xover_probablity;

var reproduce_thresh = 400;
var replace_thresh = 10;
var id_to_reproduce = 0; // a flag that marks the id of individual going to reproduce
var id_to_replace = 0; // a flag marks an individual to be replaced
// probability that a new individual will replace the one flaged by id_to_replace
var replace_probability = 0.8;
var do_write = false; // toggles genes display
var is_mono = false;  // toggles colouring
var is_auto = true; // toggles automatics breeding

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXY";
// var sample_gene = "QGGVSLMHHGCR";

function pick(arr) {
  return arr[random(arr.length)];
}

function geno_make() {
  var g = "";
  for (var i = 0; i < gene_size; i++) {
    g += pick(alphabet);
  }
  return g;
}

// make a population
function reset() {
  for (var i = 0; i < rows * rows; i++) {
    pop[i] = {
      geno: geno_make(),
      img: new field2D(dim),
      pos: new vec2(0.1, 0.1),
      ins_count: 0
    };
  }
}
reset();

function gene2coeff(gene) {
  var coeff = [];
  for (i = 0; i < gene.length; i++) {
    coeff[i] = (gene.charCodeAt(i) - 65 - 12) / 10;
  }
  return coeff;
}

function mutate(geno) {
  var result;
  var i = random(geno.length);
  var b = geno.substr(0, i);
  var r = random();
  if (r < close_copy_probablity) {
    // make a approximate copy by only changing on element in gene
    var a = geno.substr(i, geno.length);
    var alt = a.charCodeAt(0);
    //  console.log(i, b, a);
    var result = b + pick(alphabet);
    result = result.concat(a.substr(1, a.length));
    //  console.log("new: ", result);
  } else if (r < xover_probablity + close_copy_probablity) {
    // xover gene with some other individual
    var a = pop[random(pop.length)].geno.substr(i, geno.length);
    result = b.concat(a);
    //   console.log("xover!", result);
  } else { // generate a random copy
    result = geno_make();
  }
  return result;
}

function draw_pts(individual) {
  var a = gene2coeff(individual.geno);
  for (var i = 0; i < 15; i++) {
    var x = individual.pos[0];
    var y = individual.pos[1];
    // console.log(x, y);
    individual.img.deposit(1, x/3.5 + dim/4, y/3.5 + dim/2);
    // update next point
    var nx = a[0] + a[1] * x + a[2] * x * x +
      a[3] * x * y + a[4] * y + a[5] * y * y;
    var ny = a[6] + a[7] * x + a[8] * x * x +
      a[9] * x * y + a[10] * y + a[11] * y * y;

    if (nx < 2*dim && ny < 2*dim && nx > 0 && ny > 0)
      individual.ins_count++;

    individual.pos[0] = nx;
    individual.pos[1] = ny;
  }
  //individual.img.normalize();
}

function reproduce(parent) {
  var child;
  if (random() < replace_probability) {
    child = id_to_replace;
  } else {
    child = random(pop.length);
  }
  pop[child].img.set(0);
  pop[child].pos = new vec2(0.1, 0.1);
  pop[child].ins_count = 0;
  pop[child].geno = mutate(pop[parent].geno);
}

function replace(replace_id){
  pop[replace_id].img.set(0);
  pop[replace_id].pos = new vec2(0.1, 0.1);
  pop[replace_id].ins_count = 0;
  pop[replace_id].geno = geno_make();
}

function check_reproduce() {
  reproduce(id_to_reproduce);
}
is_auto && setInterval(check_reproduce, 70);

function draw() {
  draw2D.scale(1 / rows);
  for (var i = 0; i < pop.length; i++) {
    var code = pop[i].geno;
    var col = i % rows;
    var row = Math.floor(i / rows);

    do_write && write(col, row, code);

    if(is_mono==false){
      draw2D.hsl(1 - 1 / pop.length * i, 0.7, 0.45, 0.8);
    }else{
      draw2D.color("white");
    }
    draw_pts(pop[i]);

    draw2D.push()
      .translate(i % rows, Math.floor(i / rows));
    pop[i].img.draw();

    if (pop[i].ins_count > reproduce_thresh) {
      // this individual has reached reproduction stage
      id_to_reproduce = i;
    } else if (pop[i].ins_count < replace_thresh) {
      // this individual is probably diverging, flag to replace
      id_to_replace = i;
    }
    draw2D.pop();
  }
}

function mouse(e, p) {
  if (e == "down") {
    var row = Math.floor(p[1] * rows);
    var col = Math.floor(p[0] * rows);
    var src = row * rows + col;
    // console.log(pop[src]);
    replace(src);
  }
}

function key(e, k) {
  if (k == "r") {
    reset();
  } else if (k == "w") {
    // if don't write, write empty
    do_write && write();
    // toggle write
    do_write = !do_write;
  }else if(k == "c"){
    is_mono = !is_mono;
  }else if(k == "a"){
    is_auto = !is_auto;
  }
}