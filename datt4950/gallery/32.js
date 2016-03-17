author = "Rule 30"

var field = new field2D(256);

var toprow = field.height - 1;

field.set(function(x, y) {
  if (y == toprow) {
    return random(2);
  }
});

function draw() {
  field.draw();
}

// several possible transition rules
// return new state in terms of Current, East and West states:

// AKA the 'traffic' rule
function transition_rule_184(C, E, W) {
  if (C == 1 && E == 0) {
    return 0;
  } else if (C == 0 && W == 1) {
    return 1;
  }
  return C;
}

function transition_rule_110(C, E, W) {
  if (C == 1 && W == 1 && E == 1) {
    return 0;
  } else if (C == 0 && E == 1) {
    return 1;
  }
  return C;
}

function transition_rule_30(C, E, W) {
  if (C == 1 && W == 1) {
    return 0;
  } else if (C == 0) {
    if (W == 1 && E == 0) {
      return 1;
    } else if (W == 0 && E == 1) {
      return 1;
    }
  }
  return C;
}

function update_cell(x, y) {
  if (y == toprow) {
    var E = field.get(x + 1, y - 1);
    var W = field.get(x - 1, y - 1);
    var C = field.get(x, y - 1);
    //return transition_rule_184(C, E, W);
    //return transition_rule_110(C, E, W);
    return transition_rule_30(C, E, W);
  }
  return field.get(x, y + 1);
}

function update() {
  field.set(update_cell);
}