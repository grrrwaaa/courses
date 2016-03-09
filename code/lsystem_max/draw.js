
var al = require("al");
// get some linear algebra!
// see documentation at http://glmatrix.net/docs/2.2.0/
var vec2 = al.vec2;
var vec3 = al.vec3;
var vec4 = al.vec4;
var mat2 = al.mat2;
var mat3 = al.mat3;
var mat4 = al.mat4;
var quat = al.quat;
var mat2d = al.mat2d;

var str = "F";
var lines = [];

var dir = mat4.create();
var orient = quat.create();

var turn = quat.create();
//quat.rotateZ(turn, turn, Math.PI/3);

quat.set(turn, Math.random(), Math.random(), Math.random(), Math.random());
quat.slerp(turn, turn, quat.create(), 0.5);
quat.normalize(turn, turn);
var iturn = quat.clone(turn);
quat.invert(iturn, iturn);

function forward_vector(q) {
	var v = vec3.fromValues(0, 1, 0);
	vec3.transformQuat(v, v, q);
	vec3.normalize(v, v);
	return v;
}

var scale = 1.3;

function make_turtle() {
	return {
		pos: vec3.create(),
		orient: quat.clone(orient),
		scale: 1,
	};
}
function turtle_copy(t) {
	return {
		pos: vec3.clone(t.pos),
		orient: quat.clone(t.orient),
		scale: t.scale,
	};
}

function turtle_interpret(t, str, lines) {
	var i=0;
	while (i<str.length) {
		var c = str.substr(i, 1);
		if (c == "F") {
			// move halfway:
			var fwd = forward_vector(t.orient);
			vec3.scale(fwd, fwd, t.scale*0.5);
			vec3.add(t.pos, t.pos, fwd);
			
			lines.push({ 
				position: vec3.clone(t.pos), 
				orient: quat.clone(t.orient),
				scale: t.scale,
			});
			
			// move the rest of the way:
			vec3.add(t.pos, t.pos, fwd);
		} else if (c == "+") {
			quat.multiply(t.orient, t.orient, turn);
			quat.normalize(t.orient, t.orient);
		} else if (c == "-") {
			quat.multiply(t.orient, t.orient, iturn);
			quat.normalize(t.orient, t.orient);
		} else if (c == "*") {
			t.scale *= scale;
		} else if (c == "/") {
			t.scale /= scale;
		} else if (c == "[") {
			var t1 = turtle_copy(t);
			i += turtle_interpret(t1, str.substr(i+1), lines);
		} else if (c == "]") {
			return i+1;
		}
		i++;
	}
}

turtle_interpret(make_turtle(), str, lines);

var rules = {
	"F": "F[+//F][-/F]",
};

function lsystem_interpret(str) {
	var res = "";
	for (var i=0; i<str.length; i++) {
		// assume by default that the next character will not be replaced:
		var replacement = str.substr(i, 1);
		// but try to match a rule:
		for (k in rules) {
			// does this match?
			if (k == str.substr(i, k.length)) {
				// then get the new replacement:
				replacement = rules[k];
				break;	// no need to check more rules
			}
		}
		res += replacement;
	}
	// convert result into a string:
	return res; 
}

function bang() {
	if (str.length > 500) {
		str = "F";
	} else {
		str = lsystem_interpret(str);
		post(str, "\n");
		lines = [];
		turtle_interpret(make_turtle(), str, lines);
	}
}

function draw() {
	for (var i=0; i<lines.length; i++) {
		var l = lines[i];
		var p = l.position;
		var o = l.orient;
		var s = l.scale;
		outlet(0, "position", p[0], p[1], p[2]);
		outlet(0, "quat", o[0], o[1], o[2], o[3]);
		outlet(0, "scale", 0.01, s*0.5, 0.01);
		outlet(0, "bang");
	}
}
