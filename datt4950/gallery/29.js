author = "Swimming Biomorphs"

// the alphabet of possible symbols:
var alphabet = "FFFfff<>+-|=".split("");
var mutation_rate = 0.2;
var agent_scale = 1 / 200;

// now the population:
var pop = [];

var turtle = {};
var angle1 = Math.PI / 2;
var angle2 = Math.PI / 3;

function sign(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}

function turtle_reset(t) {
  t.pos = new vec2();
  t.dir = new vec2(1, 0);
  t.spin = 1;
}
turtle_reset(turtle);

function turtle_clone(t) {
  return {
    pos: t.pos.clone(),
    dir: t.dir.clone(),
    spin: t.spin,
  };
}

/*
  Another way.
  +FFF and FFF+ should show almost the same visual result
  each F should add a some weight to the total avg rotation
  the whole should be unrotated by this avg
  (maybe also take into account t.spin)
  clearly FFFF has no rotation
*/

// given a string of instructions, draw it:
function turtle_develop(t, code, lines) {
  for (var i = 0; i < code.length; i++) {
    var c = code.substr(i, 1);
    if (c == "F") {
      // drawline
      var p2 = t.dir.clone().add(t.pos);
      //draw2D.line(t.pos, p2);
      lines.push([t.pos.clone(), p2]);
      t.pos = p2;
    } else if (c == "f") {
      // drawline
      var p2 = t.dir.clone().mul(0.5).add(t.pos);
      //draw2D.line(t.pos, p2);
      lines.push([t.pos.clone(), p2]);
      t.pos = p2;
    } else if (c == "+") {
      // turn turtle:
      t.dir.rotate(t.spin * angle1);
    } else if (c == "-") {
      // turn turtle:
      t.dir.rotate(-t.spin * angle1);
    } else if (c == ">") {
      // turn turtle:
      t.dir.rotate(t.spin * angle2);
    } else if (c == "<") {
      // turn turtle:
      t.dir.rotate(-t.spin * angle2);
    } else if (c == "|") {
      // mirror turtle:
      var t1 = turtle_clone(t);
      // flip it around:
      t1.spin = -t1.spin;
      var code1 = code.substr(i + 1);
      turtle_develop(t1, code1, lines);
    } else if (c == "=") {
      // flip it around:
      var t1 = turtle_clone(t);
      t1.dir.negate();
      var code1 = code.substr(i + 1);
      turtle_develop(t1, code1, lines);
    }
  }
}

var demo = [
  "=FFF",
  "+FFFFFF",
  "F+FFFFFF",
  "FFFFFF+F",
  "=+FFFF+FF",
  "+=FFFF+FF",
  "|+FFFFFF",
  "F+F+F+F+F+F",
];

function reset() {
  var popsize = 20; //demo.length+6;
  pop = [];
  for (var i = 0; i < popsize; i++) {
    var g = demo[i];
    if (g == undefined) {
      g = "";
      for (var j = 0; j < 20; j++) {
        g += alphabet[random(alphabet.length)];
      }
    }
    var a = {
      // world-space:
      pos: new vec2(random(), random()),
      //pos: new vec2((i + 0.5) / popsize, 0.5),
      vel: new vec2(),
      acc: new vec2(),
      dir: Math.PI * 2 * random(),
      // object-space:
      lines: [], // all the segments
      // adaptive terms to keep the shape centered:
      recenter: new vec2(),
      realign: new vec2(1, 0),
      // non-physical:
      genome: g
    };
    pop.push(a);
    turtle_develop(turtle, a.genome, a.lines);
  }
}
reset();

function geno_child(parent) {
  var g = parent.genome;

  if (random() < 0.1) {
    // reshuffle:
    var cut0 = random(g.length);
    var cut1 = random(g.length);
    var a = g.slice(0, cut0);
    var b = g.slice(cut1);
    g = b + a;
  } else {
    // mutate one gene:
    var c = alphabet[random(alphabet.length)];
    var cut = random(g.length);
    g = g.substring(0, cut) + c + g.substring(cut + 1);
  }
  return g
}

function update() {
  angle1 = Math.PI / 2 * Math.sin(now);
  angle2 = Math.PI / 8 * (1 + Math.cos(4 * now));

  for (var a of pop) {
    var lines = [];
    turtle_reset(turtle);
    turtle.pos.set(a.recenter);
    turtle.dir.set(a.realign);
    turtle_develop(turtle, a.genome, lines);

    var recenter = new vec2();
    var realign = new vec2();
    var mass = 0;
    var rdiv = 0;
    for (var i = 0; i < lines.length; i++) {
      // get the line points:
      var next = lines[i];
      var n0 = next[0];
      var n1 = next[1];
      var n = n1.clone().sub(n0);
      var mn = n.len();

      
      // segments behind the center have opposing influence:
      if (n1[0] - a.recenter[0] < 0) {
        realign.sub(n);
      } else {
        realign.add(n);
      }
      // simplest center of mass
      recenter.add(
        n0.clone().add(n1).mul(mn*0.5)
      );
      mass += mn;
    }
    // adaptive recentering:
    recenter.mul(-0.25 / mass);
    a.recenter.add(recenter);
    // adaptive realignment:
    realign.div(mass);
    var turn = realign.angle();
    turn = sign(turn) * Math.min(Math.abs(turn), Math.PI / 8);
    a.realign.rotate(-0.25 * turn).normalize();

    // fake movement -- TODO replace with something physical:
    a.dir += 0.01;
    a.vel.fromPolar(agent_scale * 0.1, a.dir);

    // final update:
    a.pos.add(a.vel).wrap(1);
    a.vel.mul(0.9); // inertia
    a.lines = lines;
  }
}

function draw() {
  draw2D.blend(true);
  for (var i = 0; i < pop.length; i++) {
    var a = pop[i];
    //write(i, a.genome);

    draw2D.push()
      .translate(a.pos)
      .rotate(a.dir)
      .scale(agent_scale)

    // background:
    draw2D.color("white", 0.5).circle(0, 0, 10);
    // show direction:
    draw2D.color("red").line([0, 0], [10, 0]);

    //draw2D.color("green").line([0, 0], a.realign.clone().mul(10));

    draw2D.color("white");
    for (var l of a.lines) {
      draw2D.line(l[0], l[1]);
    }
    draw2D.pop();
  }
}

function mouse(e, p) {
  if (e == "down") reset();
}