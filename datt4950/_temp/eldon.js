// changing these parameters can strongly affect emergent behaviour
var max_speed = 0.004;
var max_force = 0.0006;
var centering_factor = 0.01;
var alignment_factor = 1;
var avoidance_factor = 1;
var agent_optimal_distance = 0.004;
var agent_range_of_view = 0.04;
var agent_field_of_view = 1.5;
var random_walk_variance = 1;
// our agents:
var agents = [];

var timer = 0;
var ran = 0;

var sugar = new field2D(150);
sugar.set(1, sugar.width / 2, sugar.height / 2);
sugar.diffuse(sugar.clone(), 128, 80);
sugar.normalize();
var sugar_old = sugar.clone();

var col = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

function make_agent() {
  var a = {
    pos: new vec2(random(), random()),
    vel: vec2.random(random() * max_speed),
    acceleration: new vec2(),
    size: (random() + 1) / 160
  };
  agents.push(a);
  return a;
}
// make a few agents:
for (var i = 0; i < 75; i++) make_agent();

function move_agent(a) {
  // forward Euler integration + constraints
  a.vel.add(a.acceleration).limit(max_speed);
  a.pos.add(a.vel).wrap(1);
}

function update_agent(a) {
  // we will compute a desired velocity
  // intially, a simple random walker
  // (take current velocity and rotate it slightly)
  var desired_velocity = a.vel.clone()
    .rotate(random_walk_variance * (random() - 0.5))
    .setmag(max_speed * random());

  // useful to know our direction:
  var dir = a.vel.angle();

  // information to gather about visible neighbors:
  var neighbours = 0;
  // these are for the three steering forces:
  var neighbour_locations = new vec2();
  var neighbour_velocities = new vec2();
  var neighbour_avoidances = new vec2();

  // check for visible neighbours:
  // (might not be the most optimal, but it is simple):
  for (var n of agents) {
    if (n == a) continue; // don't count yourself!

    // get the (relative) vector to the neighbor from the agent:
    // (clone() so that we don't modify n.pos)
    var rel = n.pos.clone().sub(a.pos);
    // because we are in toroidal space, spanning borders,
    // there can be more than one relative vector
    // this call makes sure we get the shortest one:
    rel.relativewrap(1); // 1 is the size of our world    
    // to get the view distance, subtract sizes, 
    // (want distance between bodies, not between centers)
    var distance = Math.max(rel.len() - a.size - n.size, 0);
    // is the neighbour close enough to be seen?
    var in_visible_range = distance < agent_range_of_view;
    // now rotate this into the view of the agent (global-to-local):
    // (i.e. directly in front of the agent is an angle of zero)
    var viewrel = rel.clone().rotate(-dir);
    // is the neighbor within the agent's field of view?
    // use absolute value to capture left & right sides:
    var in_visible_angle = Math.abs(viewrel.angle()) < agent_field_of_view;
    // neighbour seen if within range & field of view:
    if (in_visible_range && in_visible_angle) {
      // yes -- add to count of neighbours
      neighbours++;
      // accumulate relative locations for centering force
      neighbour_locations.add(rel);
      // rotate neighbour velocity into agent's perspective,
      // accumulate for aligning force
      var relative_velocity = n.vel.clone().rotate(-dir);
      neighbour_velocities.add(n.vel);
      // feel uncomfortable if the neighbour is too close:
      // e.g. closer than optimal distance
      var negative_feeling = Math.min(0, distance - agent_optimal_distance);
      if (negative_feeling < 0) {
        var normalized = negative_feeling / agent_optimal_distance;
        neighbour_avoidances.add(rel.clone().setmag(normalized));
      }
    }
  }

  // did we see anyone?
  a.sees_neighbours = neighbours > 0;
  if (a.sees_neighbours) {
    // convert accumulated information into averages:
    neighbour_locations.div(neighbours);
    neighbour_velocities.div(neighbours);
    // change factors:
    neighbour_locations.mul(centering_factor);
    neighbour_velocities.mul(alignment_factor);
    neighbour_avoidances.mul(avoidance_factor);
    // apply to desired velocity
    // (note avoidance is subtracted, as a repulsion):
    desired_velocity
      .add(neighbour_locations)
      .add(neighbour_velocities)
      .add(neighbour_avoidances);
  }

  // to convert desired_velocity into a steering force,
  // need to subtract current velocity
  a.acceleration = desired_velocity.sub(a.vel);
  // apply constraints:
  a.acceleration.limit(max_force);
}

function update() {

  // to separate passes to prevent artefacts 
  // (similar to double-buffering)
  var tmp = sugar_old;
  sugar_old = sugar;
  sugar = tmp;
  timer++;
  if (timer % 50 == 0) {
    ran = random(col.length);
  }
  if (timer < 1000) {
    sugar.diffuse(sugar_old, 0.02);
  } else if (timer > 1000 && timer < 2000) {
    sugar.diffuse(sugar_old, 0.0001);
  } else if (timer > 2000 && timer < 4000) {
    sugar.diffuse(sugar_old, 1);
  } else {
    sugar.clear();
    timer = 0;

  }

  for (var a of agents) {
    update_agent(a);
    sugar.deposit(0.05, a.pos);
  }
  for (var a of agents) {
    sugar.deposit(0.05, a.pos);
    move_agent(a);
  }
}

function draw() {
  draw2D.color(col[ran]);
  sugar.draw();
  for (var a of agents) {
    // push into agent's local coordinate system
    draw2D.push().translate(a.pos).rotate(a.vel).scale(a.size);
    // draw agent body:
    draw2D.color(a.sees_neighbours ? "blue" : "purple");
    draw2D.rect();
    // draw agent eyes:
    draw2D.color("green");
    draw2D.circle([0.5, 0.5], 0.5);
    draw2D.circle([0.5, -0.5], 0.5);
    // done drawing agent:
    draw2D.pop();
  }
}

// click to add more agents:
function mouse(e, pt) {
  if (e == "down") {
    sugar.clear();
    timer = 0;
    for (var a of agents) {
     a.pos =  new vec2(random(), random());

    }

  }
}