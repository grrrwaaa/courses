
autowatch = 1;

var maxdepth = 9;

// try a few different operators out, which ones work?
var trigfuns = ["sin", "cos", "sin", "cos", "tanh"]; //"sin", "cos", "tanh"
var binops = ["+", "-", "*", "/", "%"]; //, "+", "-", "*", "/", "%", "<", ">"];
var binfuns = []; //"rate", "triangle", "pow", "absdiff", "max", "min", "latch", "accum"];
var unfuns = []; //"fract", "log", "exp", "fract", "round", "sign", "change", "delta"];
var ops = trigfuns.concat(binops).concat(binfuns).concat(unfuns);
var terms = ["in1"];

function random(n) {
	return Math.floor(Math.random()*n);
}

function pick(arr) {
	return arr[random(arr.length)];
}

function is_in_list(list) {
	var set = {};
	for (var i=0; i<list.length; i++) {
		set[ list[i] ] = true;
	}
	return function(item) {
		return set[item];
	}
}

// shallow copy:
function list_clone(arr) {
	return arr.slice(0);
}

var is_operator_name = is_in_list(ops);
var is_trigfun = is_in_list(trigfuns);
var is_binop = is_in_list(binops);
var is_unfun = is_in_list(unfuns);

function pick_random_operator() {
	return pick(ops);
}

function make_random_terminal() {
	if (random(2)) {
		return Math.random()*10;
	} else {
		return pick(terms);
	}
}

function generate(arr, depth) {
	// forces use of terminal when depth == 1, randomized otherwise:
	if (random(depth) == 0) {
		arr.push( make_random_terminal() );
	} else {
		arr.push( pick_random_operator() );
		generate(arr, depth-1); 
		generate(arr, depth-1);
	}
	return arr;
}

function list_to_tree(a) {
	var item = a.shift();
	if (is_operator_name(item)) {
		return [item, list_to_tree(a), list_to_tree(a)];
	} else {
		return item;
	}
}

function translate_list(a) {
	var item = a.shift();
	if (is_operator_name(item)) {
		var op = item;
		var arg1 = translate_list(a);
		var arg2 = translate_list(a);
		if (is_trigfun(op)) {
			return op + "(twopi*" + arg1 + ")";
		} else if (is_binop(op)) {
			return "(" + arg1 + " " + op + " " + arg2 + ")";
		} else if (is_unfun(op)) {
			return op + "(" + arg1 + ")";
		} else {
			return op + "(" + arg1 + ", " + arg2 + ")";
		}
	} else {
		return item;
	}
}

function mutate_genome(a) {
	// pick a random node:
	var i = random(a.length);
	var item = a[i];
	if (is_operator_name(item)) {
		a[i] = pick_random_operator();
	} else {
		a[i] = make_random_terminal();
	}
	return a;
}

var pop = [];

function run(a) {
	for (var i=0; i<8; i++) {
		var a = pop[i];
		//post("flat:", a.join(" "), "\n");
		
		//var tree = list_to_tree(list_clone(a));
		//post(JSON.stringify(tree, null, "  "), "\n");
		
		var code = translate_list(list_clone(a));
		// put some safety on:
		code = "fold(dcblock(" + code + "), -1, 1)";
		
		outlet(0, i+1, "expr", code);
	}
}

function mutate1() {
	var a = random(8);
	var b = random(8);
	pop[a] = mutate_genome(pop[b]);
	
	var code = translate_list(list_clone(pop[a]));
	// put some safety on:
	code = "fold(dcblock(" + code + "), -1, 1)";
	outlet(0, a+1, "expr", code);
}

function mutate() {
	for (var i=0; i<8; i++) {
		pop[i] = mutate_genome(pop[i]);
	}
	run();
}

function create() {
	for (var i=0; i<8; i++) {
		pop[i] = generate([], maxdepth);
	}
	run();
}
