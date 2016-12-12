author = "Ben Silverman (Forked by Graham Wakefield)"
title = "Evolving Rules"

// the chance of mutating away from the desired rule set
var instability = 0.5;

// the desired set of rules for Conway's Game of Life:
var conways_rules = "2333";

// count of cells with an incorrect set of rules:
var incorrect = 0;

// the set of values to create the rules:
var rule_values = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// create a new field:
var dim = 256;
field = new field2D(dim);

colourfield = field.clone();

// initialize the field with noise
field.set(function() {
  return random(2);
})
future = field.clone();

// initialize an array of cells:
var cells = [];

// generate a random population of genotypes:
for (var i = 0; i < dim; i++) {
  cells[i] = [];
  for (var j = 0; j < dim; j++) {
    cells[i][j] = {
      geno: "",
    };
    var pheno_value = [];

    // generate a random set of rules:
    for (var d = 0; d < 4; d++) {
      pheno_value[d] = rule_values[random(9)];
    }

    // initialize the genotype of each cell to the random rule given:
    cells[i][j].geno = pheno_value;
  }
}

// function to evaluate and select a new phenotype to meet the desired set of rules for Conway's Game of Life: 
function evaluate(x, y, geno) {
  // create phenotype from the cells genotype:
  var pheno = geno.join("");
  var i = random(4);
  // true if the phenotype does not match the correct Game of Life rule:
  if (random() < instability || pheno.substr(i, 1) != conways_rules.substr(i, 1)) {
    //increment the incorrect rule counter:
    incorrect++;
    // inherit the rule of a random cell in the field:
    var x1 = Math.max(0, Math.min(dim - 1, x + random(3) - 1));
    var y1 = Math.max(0, Math.min(dim - 1, y + random(3) - 1));

    //if (field.get(x1, y1) > 0) {

      var random_cell = cells[x1][y1];
      // set the new genotype, reproduction mechanism:
      cells[x][y].geno[i] = random_cell.geno[i];
      // leave the for loop after a new genotype has been applyed:
    //}
  }
}

// function called when the mouse is clicked; used to start the evaluation and reproduction mechanisms:
function mouse(e, p) {
  if (e == "down") {
    // store the value of the current incorrect counter:
    var prevIncorrect = incorrect;
    // re-initialize the field with noise:
    //field.set(function() { return random(2); })
    // loop over all the cells in the field:
    for (var r = 0; r < dim; r++) {
      for (var c = 0; c < dim; c++) {
        // call the evaluation mechanism:
        evaluate(r, c, cells[r][c].geno);
      }
    }
    // true if all the cells rules have evolved to the correct set:
    if (incorrect == prevIncorrect) {
      // set the incorrect counter to a message stating that the rules have been fixed:
      incorrect = "All of the rules have been fixed!!!"
    }
  }
}

// update the simulation
function update() {
  future.set(function(r, c) {

    // get the cell at the given row, column position:  
    var cell = cells[r][c];

    // get the value of the cell at the given row, column position:
    var C = field.get(r, c);

    // check for alive neighbours:
    var near = field.get(r + 1, c) +
      field.get(r - 1, c) +
      field.get(r, c + 1) +
      field.get(r, c - 1) +
      field.get(r + 1, c + 1) +
      field.get(r - 1, c + 1) +
      field.get(r + 1, c - 1) +
      field.get(r - 1, c - 1);

    // true if the cell is alive:
    if (C == 1) {
      // check the cells 1st and 2nd genotype rule:
      if (near >= cell.geno[0] && near <= cell.geno[1]) {
        // stay alive:
        return 1;
      } else {
        // die by loneliness or by overcrowding:
        return 0;
      }
    } else {
      // check the cells 3rd and 4th genotype rule:
      if (near >= cell.geno[2] && near <= cell.geno[3]) {
        // become alive:
        return 1;
      } else {
        // stay dead:
        return 0;
      }
    }
  });
  // swap the buffers:
  var tmp = field;
  field = future;
  future = tmp;
  
  // set colourfield:
  colourfield.set(function(r, c) {
    var rule = cells[r][c].geno;
    var C = field.get(r, c);
    // encode rule into a colour:
    var la = (rule[0] + rule[1])*0.06125;
    var ld = (rule[1] - rule[0])*0.125;
    var da = (rule[2] + rule[3])*0.06125;
    var dd = (rule[3] - rule[2])*0.125;
    return [la+da, da, la];
  });

  for (var i = 0; i < dim*10; i++) {
    // mutate one cell:
    var r = random(dim);
    var c = random(dim);
    evaluate(r, c, cells[r][c].geno);
  }
}

// render the simulation and write out the incorrect counter:
function draw() {
  write(incorrect);
  colourfield.smooth = true;
  colourfield.draw();
  draw2D.blend(true);
  draw2D.alpha(0.75);
  field.draw();
}