// no. of instructions in genome:
var genome_size = 15;
var mutation_rate = 1/genome_size;
// image resolution:
var dim = 100;

var ops = ["constant", 
		"translate", "scale", "rotate",
		"average", 
		"rotor", "sample1", "sample2"];

function random(n) { 
	return Math.floor(Math.random()*n); 
}

function wrap(n, m) {
	return ((n%m)+m)%m;
};

function make_random_gene() {
	return [
      ops[random(ops.length)],
      random(5),
      random(5)
    ];
}

// generate a random genome:
function generate(len) {
  var geno = [];
  for (var i = 0; i < len; i++) {
    // generate a random instruction-gene:
    geno.push(make_random_gene());
  }
  return geno;
}

// the "big switch statement" interpeter
// takes a genome (array of instructions)
// converts it to a string of JavaScript code
// (to be used as the body of a new function)
function interpret(list) {
  // the growing list of statements in the function:
  var stats = ["rotate(v, r) { a = atan2(r.y,r.x); c = cos(a); s = sin(a); return vec(v.x*c-v.y*s,v.x*s+v.y*c); }",
		"Param time(0);",
		"res = in1*0.01;"];
  // the growing list of available register names:
  var vars = ["snorm"];
  
  // now the big per instruction switch:
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    // pull out the operator & arguments
    var op = item[0];
    var i1 = item[1];
    var i2 = item[2];
    // get the nth most recent register, counting backward
    var v1 = vars[vars.length-1 - wrap(i1, vars.length)];
    var v2 = vars[vars.length-1 - wrap(i2, vars.length)];
    // get the expression:
    var val;
    switch (op) {
      case "constant":
        // generate a constant vector:
        val = "vec(" + ((i1-3) * 0.1) + "," + ((i2-3) * 0.1) + ")";
        break;
      case "rotor":
        // create a vector as a function of time:
        val = "vec(sin(time * 0.1 * " + (i1-3) + "), cos(time * 0.1 * " + (i1-3) + "))";
        break;
      case "average":
        // get average of two registers:
        val = "mix(" + v1 + "," + v2 + ",0.5)";
        break;
      case "translate":
        // add one register to another:
        val = v1 + " + " + v2;
        break;
      case "scale":
        // scale one register:
        val = v1 + " * (" + v2 + ")";
        break;
      case "rotate":
        // rotate a register by the angle of another:		
        val = "rotate("+v1+","+v2+")";
        break;
      case "sample1":
        // sample the image at a coordinate
        // determined by a register:
        //val = "sample(in2, wrap(norm+"+v1+",0,1))";
		stats.push("res = mix(res, sample(in2, clamp(norm+"+v1+"*0.1,0,1)), 0.5);");
		val = "res.xy";
		break;
      case "sample2":
        // sample the image at a coordinate
        // determined by a register:
        //val = "sample(in2, wrap(norm+"+v1+",0,1))";
		stats.push("res = mix(res, sample(in2, wrap(norm+"+v1+"*0.1,0,1)), 0.5);");
		val = "res.xy";
		break;
    }
	if (val) {
	    // create the output name:
	    var name = "r" + vars.length;
	    // remember this as a possible register:
	    vars.push(name);
	    // now build & add the full statement:
	    stats.push(name + " = " + val + ";");
	}
  }
  // build the return value (the last created register)
  var name = vars[vars.length-1];
  stats.push("res = mix(res, sample(in2, clamp(norm+"+name+"*0.1,0,1)), 0.5);");
  //stats.push("o2 = sample(in2, wrap(norm+"+name+",0,1));");
  stats.push("out1 = mix(in1, wrap(res,0,1), 0.98);");
  // join up all the statements into a single string:
  return stats.join("\n");
}

function bang() {
	g = generate(genome_size);
	var c = interpret(g);
	outlet(0, "expr", c);
}

function mutate() {
	for (var i = 0; i < g.length; i++) {
		var gene = g[i];
		
		if (Math.random() < mutation_rate) {
			g[i] = make_random_gene();
		}
	}
	var c = interpret(g);
	outlet(0, "expr", c);
}