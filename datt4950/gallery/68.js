let dim = 500;
let art_world = new field2D(dim);
var past = new field2D(dim);
let population_size = 250;
let agents = [];

var object = 0;
var work_of_art = 0.5;
var freedom = 0.2;
var meaning = 1;
var human_activity = 0.25;

// the chance of objects as universal instances
var universal_instances = 1 / 1000000;
// the chance of lighting striking a cell:

// the chance of a work of art to be borrowed from the sensuous and addressed to man's sense
var sensuous = 0.99;

//the chance of an object to be significant
var significance = 1 / 10000;
//the chance of an object to be an individual
var individual = 0.02;
//chance of a work of art to be free
var oneself = 0.3;
// called at start, and whenever Enter key is pressed:
function reset() {
  for (let i = 0; i < population_size; i++) {
    let agent = {
      pos: vec2.create(random(), random()),
      vel: vec2.random(0.01),
      size: 0.01,
      memory: 0,
      inspiration: 0
    };
    agents[i] = agent;
  }
  art_world.set(0);
  // write("move your mouse to create a BEING");
  write("press enter to reset");
}

function draw(ctx) {
  art_world.draw();
  for (let agent of agents) {
    draw2D
      .push()
      .translate(agent.pos)
      .rotate(agent.vel)
      .scale(agent.size);
    draw2D.hsl(agent.witness);

    draw2D.triangle();
    draw2D.pop();
  }
}
function transition(x, y) {
  var N = past.get(x, y + 1);
  var NE = past.get(x + 1, y + 1);
  var E = past.get(x + 1, y);
  var SE = past.get(x + 1, y - 1);
  var S = past.get(x, y - 1);
  var SW = past.get(x - 1, y - 1);
  var W = past.get(x - 1, y);
  var NW = past.get(x - 1, y + 1);

  // true if (any neighb|| is a work_of_art:
  var nearworkofart =
    N == work_of_art ||
    E == work_of_art ||
    W == work_of_art ||
    S == work_of_art ||
    NE == work_of_art ||
    SE == work_of_art ||
    NW == work_of_art ||
    SW == work_of_art;

  // true if (any neighb|| is significant:
  var nearsignificance =
    N == significance ||
    E == significance ||
    W == significance ||
    S == significance ||
    NE == significance ||
    SE == significance ||
    NW == significance ||
    SW == significance;

  // true if (any neighb|| is an object):

  // check my own previous state:
  var C = past.get(x, y);

  if (C == object) {
    // are any neighbors work_of_art?
    if (nearworkofart) {
      // chance of spreading:
      if (random() < human_activity) {
        C = work_of_art;
      }
    } else if (random() < universal_instances) {
      // smaller chance of propagation by universality:

      C = work_of_art;
    }
    //if there is a chance to be determined only by oneself then become free
  } else if (random() < oneself) {
    C = freedom;
  } else if (C == meaning) {
    // do any of the neighbors have meaning?
    if (nearsignificance && random() < significance) {
      // if (any neighbors are significant, become free too:

      C = freedom;
    } else if (C == meaning && random() < individual) {
      // otherwise, there's a small chance of becoming a mere object due to particularity:
      C = object;
    }
  } else if (random() < sensuous) {
    // if meaning is received by the sensuous, then stay as meaning

    C = meaning;
  }

  // return the new state:
  return C;
}
function update(dt) {
  for (let agent of agents) {
    agent.witness = art_world.sample(agent.pos);

    //swimming
    if (agent.witness > agent.memory) {
      agent.vel.rotate(0.1 * (random() - 0.5)).len(0.005 * random());
    } else {
      //tumbling
      agent.vel.rotate(2 * (random() - 0.5)).len(0.001 * random());
    }
    agent.memory = agent.witness;
    //art_world.deposit(-0.1 * agent.witness, agent.pos);
    // if inspiration is positive, then grow
    agent.inspiration += agent.witness;
    if (agent.inspiration > 10 && agent.inspiration < 30) {
      art_world.set(
        work_of_art,
        Math.floor(agent.pos[0] * dim),
        Math.floor(agent.pos[1] * dim)
      );
      agent.size = 0.02;
      // if inpiration becomes consumerism, then become a shadow, disappear
    } else if (agent.inspiration > 30 && agent.inspiration < 35) {
      agent.size = 0;
      art_world.set(
        object,
        Math.floor(agent.pos[0] * dim),
        Math.floor(agent.pos[1] * dim)
      );
      //if inspiration is true, then come to life again
    } else if (agent.inspiration > 35) {
      agent.size = 0.01;
      art_world.set(
        object,
        Math.floor(agent.pos[0] * dim),
        Math.floor(agent.pos[1] * dim)
      );
      agent.inspiration = 0;
    }

    agent.pos.add(agent.vel).wrap(1);

    // let x = Math.floor(agent.pos[0] * art_world.width);
    // let y = Math.floor(agent.pos[1] * art_world.height);
  }

  var tmp = past;
  past = art_world;
  art_world = tmp;

  art_world.set(transition);
  // art_world.diffuse(past, 0.1);

  art_world.map(function(v) {
    return clamp(v, 0, 1);
  });
}

function mouse(kind, pt, id) {
  art_world.deposit(1, pt);
}

function key(kind, key) {}

title = "Art World"
author = "Hrysovalanti Maheras"