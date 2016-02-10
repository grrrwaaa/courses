/*
TODO:
- making it easier to embed in a page
*/

var glMatrix = require("gl-matrix");
var mat2 = glMatrix.mat2;
var mat2d = glMatrix.mat2d;
var mat3 = glMatrix.mat3;
var mat4 = glMatrix.mat4;
var glvec2 = glMatrix.vec2;
var glvec3 = glMatrix.vec3;
var glvec4 = glMatrix.vec4;
var chroma = require("chroma-js");
var seedrandom = require("seedrandom");

// return integer in 0..(n-1)
random = (function() {
	var seedrandom = require("seedrandom");
	var rng = new Math.seedrandom();
	return function (n) {
		if (n !== undefined) {
			return Math.floor(rng()*n);
		} else {
			return rng();
		}
	};
})();

srandom = function(n) { 
	if (typeof n == "number") {
		// integer in range -n to n-1
		return random(n*2) - n;
	} else {
		// float in range -1 to 1
		return random()*2-1; 
	}
};

// a modulo operation that handles negative n more appropriately
// e.g. wrap(-1, 3) returns 2
// see http://en.wikipedia.org/wiki/Modulo_operation
// see also http://jsperf.com/modulo-for-negative-numbers 
wrap = function (n, m) {
	return ((n%m)+m)%m;
};

var isarraylike = function(o) {
	return Array.isArray(o) || (o instanceof Float32Array);
};

/**
 * Wrapped logging function.
 * @param {string} msg The message to log.
 */
var log = function(msg) {
	if (window.console && window.console.log) {
		window.console.log(msg);
	}
};

/**
 * Wrapped logging function.
 * @param {string} msg The message to log.
 */
var error = function(msg) {
	if (window.console) {
		if (window.console.error) {
			window.console.error(msg);
		}
		else if (window.console.log) {
			window.console.log(msg);
		}
	}
};

/**
* Converts a WebGL enum to a string
* @param {!WebGLContext} gl The WebGLContext to use.
* @param {number} value The enum value.
* @return {string} The enum as a string.
*/
var glEnumToString = function(gl, value) {
	for (var p in gl) {
		if (gl[p] == value) {
			return p;
		}
	}
	return "0x" + value.toString(16);
};

/**
* Creates the HTML for a failure message
* @param {string} canvasContainerId id of container of th
*        canvas.
* @return {string} The html.
*/
var makeFailHTML = function(msg) {
	return '' +
	'<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
	'<td align="center">' +
	'<div style="display: table-cell; vertical-align: middle;">' +
	'<div style="">' + msg + '</div>' +
	'</div>' +
	'</td></tr></table>';
};

/**
* Mesasge for getting a webgl browser
* @type {string}
*/
var GET_A_WEBGL_BROWSER = '' +
	'This page requires a browser that supports WebGL.<br/>' +
	'<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
* Mesasge for need better hardware
* @type {string}
*/
var OTHER_PROBLEM = '' +
	"It doesn't appear your computer can support WebGL.<br/>" +
	'<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

/**
* Creates a webgl context. If creation fails it will
* change the contents of the container of the <canvas>
* tag to an error message with the correct links for WebGL.
* @param {Element} canvas. The canvas element to create a
*     context from.
* @param {WebGLContextCreationAttirbutes} opt_attribs Any
*     creation attributes you want to pass in.
* @return {WebGLRenderingContext} The created context.
*/
var setupWebGL = function(canvas, opt_attribs) {
	function showLink(str) {
		var container = canvas.parentNode;
		if (container) {
			container.innerHTML = makeFailHTML(str);
		}
	}
	if (!window.WebGLRenderingContext) {
		showLink(GET_A_WEBGL_BROWSER);
		return null;
	}
	var context = create3DContext(canvas, opt_attribs);
	if (!context) {
		showLink(OTHER_PROBLEM);
	}
	return context;
};

/**
* Creates a webgl context.
* @param {!Canvas} canvas The canvas tag to get context
*     from. If one is not passed in one will be created.
* @return {!WebGLContext} The created context.
*/
var create3DContext = function(canvas, opt_attribs) {
	var names = ["webgl", "experimental-webgl"];
	var context = null;
	for (var ii = 0; ii < names.length; ++ii) {
		try {
			context = canvas.getContext(names[ii], opt_attribs);
		} catch(e) {}
			if (context) {
			break;
		}
	}
	return context;
};

/**
* Gets a WebGL context.
* makes its backing store the size it is displayed.
*/
var getWebGLContext = function(canvas, opt_attribs) {
	if (window != window.top) { // isInIFrame()
		document.body.className = "iframe";
		// make the canvas backing store the size it's displayed.
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
	}
	var gl = setupWebGL(canvas, opt_attribs);
	return gl;
};

/**
* Loads a shader.
* @param {!WebGLContext} gl The WebGLContext to use.
* @param {string} shaderSource The shader source.
* @param {number} shaderType The type of shader.
* @param {function(string): void) opt_errorCallback callback for errors.
* @return {!WebGLShader} The created shader.
*/
var loadShader = function(gl, shaderSource, shaderType, opt_errorCallback) {
	var errFn = opt_errorCallback || error;
	// Create the shader object
	var shader = gl.createShader(shaderType);
	// Load the shader source
	gl.shaderSource(shader, shaderSource);
	// Compile the shader
	gl.compileShader(shader);
	// Check the compile status
	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!compiled) {
		// Something went wrong during compilation; get the error
		lastError = gl.getShaderInfoLog(shader);
		errFn("*** Error compiling shader '" + shader + "':" + lastError);
		gl.deleteShader(shader);
		return null;
	}
	return shader;
};

/**
* Creates a program, attaches shaders, binds attrib locations, links the
* program and calls useProgram.
* @param {!Array.<!WebGLShader>} shaders The shaders to attach
* @param {!Array.<string>} opt_attribs The attribs names.
* @param {!Array.<number>} opt_locations The locations for the attribs.
*/
var loadProgram = function(gl, shaders, opt_attribs, opt_locations) {
	var program = gl.createProgram();
	for (var i = 0; i < shaders.length; ++i) {
		gl.attachShader(program, shaders[i]);
	}
	if (opt_attribs) {
		for (var ii = 0; ii < opt_attribs.length; ++ii) {
			gl.bindAttribLocation(
			program,
			opt_locations ? opt_locations[ii] : ii,
			opt_attribs[ii]);
		}
	}
	gl.linkProgram(program);
	// Check the link status
	var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!linked) {
		// something went wrong with the link
		lastError = gl.getProgramInfoLog (program);
		error("Error in program linking:" + lastError);
		gl.deleteProgram(program);
		return null;
	}
	return program;
};

// Find the right method, call on correct element
var requestFullscreen = function(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

// Whack fullscreen
var exitFullscreen = function() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};


/**
* Provides requestAnimationFrame in a cross browser way.
*/
requestAnimationFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000/60);
		};
})();

/**
* Provides cancelRequestAnimationFrame in a cross browser way.
*/
cancelRequestAnimationFrame = (function() {
	return window.cancelCancelRequestAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		window.clearTimeout;
})();
  
var canvas = document.createElement('canvas');
var overlay = document.createElement("div");
var page_to_gl = mat3.create();
var updating = true;

var onresize = function() {
	w = Math.min(innerWidth, innerHeight);
	canvas.setAttribute("width", w);
	canvas.setAttribute("height", w);
	canvas.style.width = w + 'px';
	canvas.style.height = w + 'px';
	canvas.style.position = "absolute";
	canvas.style.top = 0 + "px";
	canvas.style.bottom = 0 + "px";
	canvas.style.left = 0 + "px";
	canvas.style.right = 0 + "px";
	canvas.style.margin = "auto";
	
	overlay.setAttribute("width", w);
	overlay.setAttribute("height", w);
	overlay.style.width = w + 'px';
	overlay.style.height = w + 'px';
	overlay.style.position = "absolute";
	overlay.style.top = 0 + "px";
	overlay.style.bottom = 0 + "px";
	overlay.style.left = 0 + "px";
	overlay.style.right = 0 + "px";
	overlay.style.margin = "auto";
	overlay.style.color = "grey";
	overlay.style["pointer-events"] = "none";
	overlay.style["font-family"] = "monospace";
	overlay.style["white-space"] = "pre-wrap";
	
	var canvas_rect = canvas.getBoundingClientRect();
	
	mat3.identity(page_to_gl);
	mat3.scale(page_to_gl, page_to_gl, [
		1/(canvas_rect.right - canvas_rect.left), 		
		1/(canvas_rect.top - canvas_rect.bottom)
	]);
	mat3.translate(page_to_gl, page_to_gl, [
		-canvas_rect.left, 
		-canvas_rect.bottom
	]);
};

// TODO: http://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
window.addEventListener('resize', onresize, false);

document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.style.backgroundColor = "#888888";
document.body.appendChild(canvas); // or document.getElementById('someBox').appendChild(canvas);
document.body.appendChild(overlay);
onresize();

var mouseevent = function(event, name) {
	if (typeof(mouse) === "function") {
		var m = [event.pageX, event.pageY];
		glvec2.transformMat3(m, m, page_to_gl);
		mouse(name, m);
	}
};

canvas.addEventListener("mousedown", function(event) {
	mouseevent(event, "down");
}, false);

canvas.addEventListener("mouseup", function(event) {
	mouseevent(event, "up");
}, false);

canvas.addEventListener("mousemove", function(event) {
	mouseevent(event, "move");
}, false);

canvas.addEventListener("mouseout", function(event) {
	mouseevent(event, "out");
}, false);

canvas.addEventListener("mouseover", function(event) {
	mouseevent(event, "in");
}, false);

// TODO: refine Touch events
// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events#Example

var touchevent = function(event, name) {
	if (typeof(touch) === "function") {
		event.preventDefault();
		var m = [event.targetTouches[0].pageX, targetTouches[0].pageY];
		glvec2.transformMat3(m, m, page_to_gl);
		touch(name, m);
	}
};

canvas.addEventListener("touchstart", function(event) {
	touchevent(event, "start");
}, false);

canvas.addEventListener("touchend", function(event) {
	touchevent(event, "end");
}, false);

canvas.addEventListener("touchcancel", function(event) {
	touchevent(event, "cancel");
}, false);

canvas.addEventListener("touchmove", function(event) {
	touchevent(event, "move");
}, false);

var keyevent = function(event, name, callback) {
	var k = event.key || event.keyCode;
	if (typeof(key) === "function") key(name, k);
	if (typeof(callback) === "function") callback(k);
	// only printable characters:
	var c = String.fromCharCode(k).replace(/[^ -~]+/g, "");	
	if (c !== "") {
		if (typeof(key) === "function") key(name, c);
		if (typeof(callback) === "function") callback(c);
		// combos like "shift-A", "ctrl-alt-R" etc. 
		var prefix = "";
		if (event.ctrlKey) prefix += "ctrl-";
		if (event.altKey) prefix += "alt-";
		if (event.shiftKey) prefix += "shift-";
		if (prefix !== "") {	
			if (typeof(key) === "function") key(name, prefix+c);
			if (typeof(callback) === "function") callback(prefix+c);
		}
	}
};

window.addEventListener( "keydown", function(event) {
	var k = event.key || event.keyCode;
	
	if (k == 27) requestFullscreen(canvas.parentElement);
	
	//if (k == 27) requestFullscreen(document.body);
	//if (k == 27) requestFullscreen(canvas);
	//if (k == 27) requestFullscreen(canvas.parentNode);
	
	if (typeof(key) === "function") key("down", k);
	if (typeof(keydown) === "function") keydown(k);
	// only printable characters:
	var c = String.fromCharCode(k).replace(/[^ -~]+/g, "");	
	if (c !== "") {
		if (typeof(key) === "function") key("down", c);
		if (typeof(keydown) === "function") keydown(c);
		// combos like "shift-A", "ctrl-alt-R" etc. 
		var prefix = "";
		if (event.ctrlKey) prefix += "ctrl-";
		if (event.altKey) prefix += "alt-";
		if (event.shiftKey) prefix += "shift-";
		if (prefix !== "") {	
			if (typeof(key) === "function") key("down", prefix+c);
			if (typeof(keydown) === "function") keydown(prefix+c);
		}
	}
}, true);

window.addEventListener( "keyup", function(event) {
	var k = event.key || event.keyCode;
	if (typeof(key) === "function") key("up", k);
	if (typeof(keyup) === "function") keyup(k);
	// only printable characters:
	var c = String.fromCharCode(k).replace(/[^ -~]+/g, "");	
	if (c !== "") {
		if (typeof(key) === "function") key("up", c);
		if (typeof(keyup) === "function") keyup(c);
		// combos like "shift-A", "ctrl-alt-R" etc. 
		var prefix = "";
		if (event.ctrlKey) prefix += "ctrl-";
		if (event.altKey) prefix += "alt-";
		if (event.shiftKey) prefix += "shift-";
		if (prefix !== "") {	
			if (typeof(key) === "function") key("up", prefix+c);
			if (typeof(keyup) === "function") keyup(prefix+c);
		}
	}
}, true);

window.addEventListener( "keypress", function(event) {
	var c = String.fromCharCode(event.which).replace(/[^ -~]+/g, "");	
	if (c == " ") updating = !updating;
	if (c !== "" && typeof(key) === "function") key("press",c);
	if (c !== "" && typeof(keypress) === "function") keypress(c);
}, true);

var gl = getWebGLContext(canvas, { alpha: false });
var floatTextures = gl.getExtension('OES_texture_float');
if (!floatTextures) {
	alert('no floating point texture support');
}

gl.vec2 = glvec2;
gl.vec3 = glvec3;
gl.vec4 = glvec4;
gl.mat2 = mat2;
gl.mat3 = mat3;
gl.mat4 = mat4;
gl.mat2d = mat2d;

vec2 = function(x, y) {
	this[0] = x || 0;
	this[1] = (y !== undefined) ? y : this[0];
};

vec2.create = function(x, y) { return new vec2(x, y); };

vec2.clone = function(b) {
	var out = new vec2();
	if (typeof(b) == "object") {
		out[0] = b[0];
		out[1] = b[1];
	} else if (typeof(b) == "number") {
		out[0] = b;
		out[1] = b;
	} 
	return out;
};

// 'static' methods:
vec2.len = function(v) { return Math.sqrt(v[0]*v[0] + v[1]*v[1]); };
vec2.angle = function(v) { return Math.atan2(v[1], v[0]); };
vec2.dot = function(a, b) { return a[0]*b[0] + a[1]*b[1]; };
vec2.distance = function(a, b) { 
	var v = [ a[0]-b[0], a[1]-b[1] ];
	return Math.sqrt(v[0]*v[0] + v[1]*v[1]);
};
vec2.anglebetween = function(a, b) {
	var m = vec2.len(a)*vec2.len(b);
	if (m > 0) {
		return Math.acos(vec2.dot(a, b) / (vec2.len(a)*vec2.len(b)));
	} else {
		return 0; // not mathematically accurate, but more useful than NaN
	}
};

vec2.equals = function(a, b) { return a[0] == b[0] && a[1] == b[1]; };

// static methods with out args
vec2.set = function(out, x, y) {
	if (typeof x == "object") {
		out[0] = x[0];
		out[1] = x[1];
	} else if (typeof x == "number") {
		out[0] = x;
		out[1] = (y !== undefined) ? y : x;
	}
	return out;
};

vec2.setmag = function(out, v, m) {
	var d = vec2.len(v); 
	if (d > 0) {
		var r = m / d;
		out[0] = v[0] * r;
		out[1] = v[1] * r;
	} 
	return out;
};

vec2.setangle = function(out, v, a) {
	var r = vec2.len(v); 
	out[0] = r * Math.cos(a);
	out[1] = r * Math.sin(a);
	return out;
};

vec2.add = function(out, a, b) {
	if (typeof(b) == "object") {
		out[0] = a[0] + (b[0]);
		out[1] = a[1] + (b[1]);
	} else if (typeof(b) == "number") {
		out[0] = a[0] + b;
		out[1] = a[1] + b;
	}
	return out;
};

vec2.sub = function(out, a, b) {
	if (typeof(b) == "object") {
		out[0] = a[0] - (b[0]);
		out[1] = a[1] - (b[1]);
	} else if (typeof(b) == "number") {
		out[0] = a[0] - b;
		out[1] = a[1] - b;
	}
	return out;
};

vec2.absdiff = function(out, a, b) {
	if (typeof(b) == "object") {
		out[0] = Math.abs(a[0] - (b[0]));
		out[1] = Math.abs(a[1] - (b[1]));
	} else if (typeof(b) == "number") {
		out[0] = Math.abs(a[0] - b);
		out[1] = Math.abs(a[1] - b);
	}
	return out;
};

vec2.mul = function(out, a, b) {
	if (typeof(b) == "object") {
		out[0] = a[0] * (b[0]);
		out[1] = a[1] * (b[1]);
	} else if (typeof(b) == "number") {
		out[0] = a[0] * b;
		out[1] = a[1] * b;
	}
	return out;
};

vec2.div = function(out, a, b) {
	if (typeof(b) == "object") {
		out[0] = a[0] / (b[0]);
		out[1] = a[1] / (b[1]);
	} else if (typeof(b) == "number") {
		out[0] = a[0] / b;
		out[1] = a[1] / b;
	}
	return out;
};

vec2.wrap = function(out, v, xr, yr) {
	var x = 1, y = 1;
	if (typeof xr == "object") {
		x = xr[0];
		y = xr[1];
	} else if (typeof xr == "number") {
		x = xr;
		y = (typeof yr == "number") ? yr : x;
	}
	out[0] = wrap(v[0], x);
	out[1] = wrap(v[1], y);
	return out;
};

vec2.lesser = function(out, a, b) {
	if (typeof b == "object") {
		out[0] = (Math.abs(a[0]) < Math.abs(b[0])) ? a[0] : b[0];
		out[1] = (Math.abs(a[1]) < Math.abs(b[1])) ? a[1] : b[1];
	} else if (typeof b == "number") {
		out[0] = (Math.abs(a[0]) < Math.abs(b)) ? a[0] : b;
		out[1] = (Math.abs(a[1]) < Math.abs(b)) ? a[1] : b;
	}
	return out;
};

vec2.greater = function(out, a, b) {
	if (typeof b == "object") {
		out[0] = (Math.abs(a[0]) >= Math.abs(b[0])) ? a[0] : b[0];
		out[1] = (Math.abs(a[1]) >= Math.abs(b[1])) ? a[1] : b[1];
	} else if (typeof b == "number") {
		out[0] = (Math.abs(a[0]) >= Math.abs(b)) ? a[0] : b;
		out[1] = (Math.abs(a[1]) >= Math.abs(b)) ? a[1] : b;
	}
	return out;
};

var fold2 = function(f, def) {
	def = def || 0;
	return function(out, v, o) {
		if (typeof o == "object") {
			out[0] = f(v[0], o[0]);
			out[1] = f(v[1], o[1]);
		} else if (typeof o == "number") {
			out[0] = f(v[0], o);
			out[1] = f(v[1], o);
		} else {
			out[0] = f(v[0], def);
			out[1] = f(v[1], def);
		}
		return out;
	};
};

vec2.pow = fold2(Math.pow, 1);
vec2.min = fold2(Math.min, 1);
vec2.max = fold2(Math.max, 0);

vec2.clip = function(out, v, lo, hi) {
	if (hi === undefined) { 
		hi = lo;
		lo = 0; 
	}
	return vec2.max(out, vec2.min(out, v, hi), lo);
};
vec2.clamp = vec2.clip;

vec2.mix = function(out, a, b, t) {
	if (typeof t == "object") {
		var tb = [ t[0], t[1] ];
		out[0] = a[0]*(1-t[0]) + b[0]*t[0];
		out[1] = a[1]*(1-t[1]) + b[1]*t[1];
		return out;
	} else {
		t = (typeof t == "number") ? t : 0.5;
		var ta = 1-t;
		out[0] = a[0]*ta + b[0]*t;
		out[1] = a[1]*ta + b[1]*t;
		return out;
	}
};

vec2.relativewrap = function(out, v, xr, yr) {
	var x = 1, y = 1;
	if (typeof xr == "object") {
		x = xr[0];
		y = xr[1];
	} else if (typeof xr == "number") {
		x = xr;
		y = (typeof yr == "number") ? yr : x;
	}
	var halfx = x * 0.5;
	var halfy = y * 0.5;
	out[0] = wrap(v[0] + halfx, x) - halfx;
	out[1] = wrap(v[1] + halfy, y) - halfy;
	return out;
};

vec2.normalize = function(out, v) {
	var r = vec2.len(v);
	if (r > 0) {
		out[0] /= r;
		out[1] /= r;
		return out;
	} else {
		return out.random();
	}
};

vec2.negate = function(out, v) {
	out[0] = -v[0];
	out[1] = -v[1];
	return out;
};

vec2.limit = function(out, v, m) {
	var r2 = vec2.dot(v, v);
	if (r2 > m*m) {
		var s = m / Math.sqrt(r2);
		out[0] *= s;
		out[1] *= s;
	}
	return out;
};

vec2.rotate = function(out, v, angle) {
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	var x = v[0], y = v[1];
	out[0] = x * c - y * s;
	out[1] = y * c + x * s;
	return out;
};

// aliases:
vec2.mag = vec2.len;
vec2.magnitude = vec2.len;
vec2.setlen = vec2.setmag;
vec2.setlength = vec2.setmag;
vec2.setmagnitude = vec2.setmag;
vec2.dist = vec2.distance;
vec2.copy = vec2.clone;
vec2.translate = vec2.add;
vec2.scale = vec2.mul;
vec2.subtract = vec2.sub;
vec2.multiply = vec2.mul;
vec2.divide = vec2.div;
vec2.clamp = vec2.clip;
vec2.lerp = vec2.mix;

// instance methods:
vec2.prototype.fromAngle = function(a) {
	a = (a !== undefined) ? a : 0;
	this[0] = Math.cos(a);
	this[1] = Math.sin(a);
	return this;
};

vec2.prototype.fromPolar = function(r, a) {
	// TODO: allow [r, a] input?
	r = (r !== undefined) ? r : 1;
	a = (a !== undefined) ? a : 0;
	this[0] = r*Math.cos(a);
	this[1] = r*Math.sin(a);
	return this;
};

vec2.prototype.random = function(r) {
	r = (r !== undefined) ? r : 1;
	var a = random() * Math.PI * 2;
	this[0] = Math.cos(a) * r;
	this[1] = Math.sin(a) * r;
	return this;
};

vec2.prototype.len = function(a) { 
	if (a !== undefined) return vec2.setmag(this, this, a); 
	return vec2.len(this); 
};
vec2.prototype.angle = function(a) { 
	if (a !== undefined) return vec2.setangle(this, this, a); 
	return vec2.angle(this);
};
vec2.prototype.distance = function(v) { return vec2.distance(this, v); };
vec2.prototype.anglebetween = function(v) { return vec2.anglebetween(this, v); };
vec2.prototype.dot = function(v) { return vec2.dot(this, v); };
vec2.prototype.equals = function(v) { return vec2.equals(this, v); };
vec2.prototype.set = function(x, y) { return vec2.set(this, x, y); };
vec2.prototype.clone = function() { return vec2.clone(this); };

vec2.prototype.setmag = function(a) { return vec2.setmag(this, this, a); };
vec2.prototype.setangle = function(a) { return vec2.setangle(this, this, a); };
vec2.prototype.add = function(b) { return vec2.add(this, this, b); };
vec2.prototype.sub = function(b) { return vec2.sub(this, this, b); };
vec2.prototype.absdiff = function(b) { return vec2.absdiff(this, this, b); };
vec2.prototype.mul = function(b) { return vec2.mul(this, this, b); };
vec2.prototype.div = function(b) { return vec2.div(this, this, b); };
vec2.prototype.pow = function(x, y) { return vec2.pow(this, this, x, y); };
vec2.prototype.max = function(x, y) { return vec2.max(this, this, x, y); };
vec2.prototype.min = function(x, y) { return vec2.min(this, this, x, y); };
vec2.prototype.greater = function(b) { return vec2.greater(this, this, b); };
vec2.prototype.lesser = function(b) { return vec2.lesser(this, this, b); };
vec2.prototype.clip = function(lo, hi) { return vec2.clip(this, this, lo, hi); };
vec2.prototype.mix = function(b, t) { return vec2.mix(this, this, b, t); };
vec2.prototype.wrap = function(x, y) { return vec2.wrap(this, this, x, y); };
vec2.prototype.relativewrap = function(x, y) { return vec2.relativewrap(this, this, x, y); };
vec2.prototype.normalize = function() { return vec2.normalize(this, this); };
vec2.prototype.negate = function() { return vec2.negate(this, this); };
vec2.prototype.limit = function(m) { return vec2.limit(this, this, m); };
vec2.prototype.rotate = function(a) { return vec2.rotate(this, this, a); };

// aliases:
vec2.prototype.mag = vec2.prototype.len;
vec2.prototype.magnitude = vec2.prototype.len;
vec2.prototype.setlen = vec2.prototype.setmag;
vec2.prototype.setlength = vec2.prototype.setmag;
vec2.prototype.setmagnitude = vec2.prototype.setmag;
vec2.prototype.dist = vec2.prototype.distance;
vec2.prototype.copy = vec2.prototype.clone;
vec2.prototype.translate = vec2.prototype.add;
vec2.prototype.scale = vec2.prototype.mul;
vec2.prototype.subtract = vec2.prototype.sub;
vec2.prototype.multiply = vec2.prototype.mul;
vec2.prototype.divide = vec2.prototype.div;
vec2.prototype.clamp = vec2.prototype.clamp;
vec2.prototype.lerp = vec2.prototype.mix;

// utility constructors:
var make_vec2_fun = function (f) {	// hack because of JS scope annoyance
	return function() { return f.apply(new vec2(), arguments); };
};
var constructor_names = [ "random", "fromAngle", "fromPolar" ];
for (var i=0; i<constructor_names.length; i++) {
	var k = constructor_names[i];
	var f = vec2.prototype[k];
	vec2[constructor_names[i]] = make_vec2_fun(f);
}

////////////////////////////////////////////////////////////

// GLSL programs

/*
	The only significant difference between these now is the existence of a texture
	
	To eliminate this difference (and thus use only one shader), need to:
	
	- have a uniform to switch between (mix between) textured and untextured
		(or alternatively, have a default texture that is white)
	- have an extra argument to the draw2D functions to pass in a texture ID 
		or texture-like object, and update the shader uniform accordingly
	- generate texcoords within the geometry buffer, rather than relying on a_position
*/

var draw2D_vertexshader = loadShader(gl, [
	"attribute vec2 a_position;",
	"attribute vec2 a_texcoord;",
	"uniform mat3 u_modelView;",
	"varying vec2 texCoord;",
	"void main() { ",
	"vec3 p = u_modelView * vec3(a_position, 1.);",
	"gl_Position = vec4(p, 1);",
	"texCoord = a_position.xy + 0.5; //a_texcoord; //a_position;",
	"}"
].join("\n"), gl.VERTEX_SHADER);

var draw2D_fragmentshader = loadShader(gl, [
	"precision mediump float;",
	"uniform sampler2D u_tex;",
	"uniform vec4 u_color;",
	"varying vec2 texCoord;",
	"void main() { ",
	"//gl_FragColor = u_color;",
	"gl_FragColor = u_color * texture2D(u_tex, texCoord);",
	"gl_FragColor.rgb *= gl_FragColor.a; // premultiply alpha",
	"}"
].join("\n"), gl.FRAGMENT_SHADER);



var draw2D_program = loadProgram(gl, [draw2D_vertexshader, draw2D_fragmentshader]);
// look up where the vertex data needs to go.
var draw2D_positionLocation = gl.getAttribLocation(draw2D_program, "a_position");
var draw2D_texcoordLocation = gl.getAttribLocation(draw2D_program, "a_texcoord");
var draw2D_colorLocation = gl.getUniformLocation(draw2D_program, "u_color");
var draw2D_modelViewLocation = gl.getUniformLocation(draw2D_program, "u_modelView");
var draw2D_texLocation = gl.getUniformLocation(draw2D_program, "u_tex");


draw2D = {
	chroma: chroma,
	gl: gl,
};

// https://github.com/gka/chroma.js/blob/gh-pages/src/index.md
// http://vis4.net/blog/posts/avoid-equidistant-hsv-colors/
var draw2D_chroma = chroma("white");
var draw2D_chroma_default = chroma("white");
// http://glmatrix.net/docs/2.2.0/
var modelView = mat3.create();
var modelView_default = mat3.create();
mat3.identity(modelView_default);
mat3.scale(modelView_default, modelView_default, [2, 2]);
mat3.translate(modelView_default, modelView_default, [-0.5, -0.5]);
var draw2D_modelView_stack = [];
var draw2D_color_stack = [];

var draw2D_linethickness = 1;

var texture_default = (function() {
	var id = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, id);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	var b = new ArrayBuffer(2 * 2 * 4 * 4);
	var a = new Float32Array(b);
	for (var i=0; i<2*2*4; i++) {
		a[i] = 1;
	}
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.FLOAT, a);
	return id;
})();
var texture_current = texture_default;
var texture_current_stack = [];

draw2D.texture = function(t) {
	if (t !== undefined && t.tex !== undefined) {
		texture_current = t.tex;
		t.bindtexture();
	} else {
		texture_current = texture_default;
		gl.bindTexture(gl.TEXTURE_2D, texture_default);
	}
};

////////////////////////////////////////////////////////////////////////

draw2D.color = function(r, g, b, a) {
	if (typeof r == "string" || typeof r == "object") {
		draw2D_chroma = chroma(r); // "pink", '#ff3399', etc.
		if (typeof g == "number") {
			this.alpha(g);
		}
		return this;
	}
	if (typeof r == "undefined") r = 0;
	if (typeof g == "undefined") g = 0;
	if (typeof b == "undefined") b = 0;
	if (typeof a == "undefined") a = 1;
	draw2D_chroma = chroma.gl(r, g, b, a);
	return this;
};
draw2D.colour = draw2D.color;

draw2D.hsl = function(h, s, l, a) {
	if (typeof h == "undefined") h = 0;
	if (typeof s == "undefined") s = 0.5;
	if (typeof l == "undefined") l = 0.5;
	draw2D_chroma = chroma.hsl(h * 360, s, l);
	if (typeof a == "number") this.alpha(a);
	return this;
};

draw2D.alpha = function(n) {
	if (typeof n == "number") {
		draw2D_chroma.alpha(n);
	}
	return this;
};
draw2D.opacity = draw2D.alpha;

draw2D.hue = function(n) {
	if (typeof n == "number") {
		draw2D_chroma.set("hsl.h", n * 360);
	}
	return this;
};

draw2D.saturation = function(n) {
	if (typeof n == "number") {
		draw2D_chroma.set("hsl.s", n);
	}
	return this;
};

draw2D.lightness = function(n) {
	if (typeof n == "number") {
		draw2D_chroma.set("hsl.l", n);
	}
	return this;
};

draw2D.darken = function(n) {
	draw2D_chroma.darken(n);
	return this;
};

draw2D.brighten = function(n) {
	draw2D_chroma.brighten(n);
	return this;
};

draw2D.saturate = function(n) {
	draw2D_chroma.saturate(n);
	return this;
};

draw2D.desaturate = function(n) {
	draw2D_chroma.desaturate(n);
	return this;
};

// chroma.mix('red', 'blue', 0.25);
//chroma.mix('red', 'blue', 0.5, 'hsl');
//chroma.mix('red', 'blue', 0.5, 'lab');
//chroma.mix('red', 'blue', 0.5, 'lch');

draw2D.blend = function(b) {
	if (b) {
		gl.enable(gl.BLEND);
	} else {
		gl.disable(gl.BLEND);
	}
};

draw2D.push = function(m) {
	draw2D_modelView_stack.push(modelView);
	modelView = mat3.clone(modelView);
	if (typeof m == "object") {
		mat3.multiply(modelView, modelView, m);
	}
	// also push/pop color:
	draw2D_color_stack.push(draw2D_chroma);
	draw2D_chroma = chroma.gl(draw2D_chroma.gl());
	texture_current_stack.push(texture_current);
	return this;
};

draw2D.pop = function() {
	if (draw2D_modelView_stack.length > 0) {
		modelView = draw2D_modelView_stack.pop();
	}
	if (draw2D_color_stack.length > 0) {
		draw2D_chroma = draw2D_color_stack.pop();
	}
	if (texture_current_stack.length > 0) {
		texture_current = texture_current_stack.pop();
	}
	return this;
};

draw2D.transform = function(m) {
	if (typeof m == "object") {
		mat3.multiply(modelView, modelView, m);
	}
	return this;
};

draw2D.translate = function() {
	if (arguments.length > 0) {
		var x = 0, y = 0;
		var a = arguments[0];
		if (typeof a == "number") {
			x = a;
			y = (arguments[1] !== undefined) ? arguments[1] : y;
		} else if (typeof a == "object") {
			x = a[0] || x;
			y = a[1] || y;
		}
		mat3.translate(modelView, modelView, [x, y]);
	}
	return this;
};

draw2D.scale = function() {
	if (arguments.length > 0) {
		var x = 0, y;
		var a = arguments[0];
		if (typeof a == "number") {
			x = a;
			y = (arguments[1] !== undefined) ? arguments[1] : x;
		} else if (typeof a == "object") {
			x = a[0] || x;
			y = (a[1] !== undefined) ? a[1] : x;
		}
		mat3.scale(modelView, modelView, [x, y]);
	}
	return this;
};

draw2D.rotate = function(radians) {
	if (typeof radians == "object") {
		// assume vec2:
		radians = vec2.angle(radians);
	}
	if (typeof radians == "number") {
		mat3.rotate(modelView, modelView, radians);
	}
	return this;
};


var makeshapedrawfunction = function(shapefunc) {
	// build an object with vertices, texcoords and indices buffers:
	var shape = shapefunc();
	
	// convert these to GPU buffers:
	var vertices_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertices_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.vertices), gl.STATIC_DRAW);
	
	//var texcoords_buffer = gl.createBuffer();
	//gl.bindBuffer(gl.ARRAY_BUFFER, texcoords_buffer);
	//gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.texcoords), gl.STATIC_DRAW);
	
	var indices_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);
	
	var shapelength = shape.indices.length;
	
	// those will all be upvalues of the actual draw function:
	return function() {
		var mat_local = modelView;
		// draw arguments can modify this local transform:
		if (arguments.length > 0) {
			// variants: 
			// circle(x, y, w, h)
			// circle(x, y, [w, h])
			// circle(x, y, r)
			// circle(x, y)
			// circle([x, y], w, h)
			// circle([x, y], [w, h])
			// circle([x, y], r)
			// circle([x, y])
			var x = 0, y = 0, w = 1, h;
			var a = arguments[0];
			if (typeof a == "number") {
				x = a;
				y = (arguments[1] !== undefined) ? arguments[1] : y;
				// continue at arguments[2]
				a = arguments[2];
				if (typeof a == "object") {
					w = (a[0] !== undefined) ? a[0] : w;
					h = (a[1] !== undefined) ? a[1] : w;
				} else if (typeof a == "number") {
					w = a;
					h = (arguments[3] !== undefined) ? arguments[3] : w;
				}
			} else if (typeof a == "object") {
				x = a[0] || x;
				y = a[1] || y;
				// continue at arguments[1]
				a = arguments[1];
				if (typeof a == "object") {
					w = (a[0] !== undefined) ? a[0] : w;
					h = (a[1] !== undefined) ? a[1] : w;
				} else if (typeof a == "number") {
					w = a;
					h = (arguments[2] !== undefined) ? arguments[2] : w;
				} else {
					h = w;
				}
			} 
	
			// create a local transformation matrix for these:
			mat_local = mat3.clone(modelView);
			mat3.translate(mat_local, mat_local, [x, y]);
			mat3.scale(mat_local, mat_local, [w, h]);
		}
		
		// apply uniforms:
		gl.uniform4fv(draw2D_colorLocation, draw2D_chroma.gl());
		gl.uniformMatrix3fv(draw2D_modelViewLocation, false, mat_local);

		// bind shape buffers:
		gl.bindBuffer(gl.ARRAY_BUFFER, vertices_buffer);
		gl.enableVertexAttribArray(draw2D_positionLocation);
		gl.vertexAttribPointer(draw2D_positionLocation, 2, gl.FLOAT, false, 0, 0);
	
		//gl.bindBuffer(gl.ARRAY_BUFFER, texcoords_buffer);
		//gl.enableVertexAttribArray(draw2D_texcoordLocation);
		//gl.vertexAttribPointer(draw2D_texcoordLocation, 2, gl.FLOAT, false, 0, 0);
	
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices_buffer);
		
		// draw shape:
		gl.drawElements(gl.TRIANGLES, shapelength, gl.UNSIGNED_SHORT, 0);

		// clean up:
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		return draw2D;
	};
};

// variants: 
// circle(x, y, w, h)
// circle(x, y, [w, h])
// circle(x, y, r)
// circle(x, y)
// circle([x, y], w, h)
// circle([x, y], [w, h])
// circle([x, y], r)
// circle([x, y])
draw2D.rect = makeshapedrawfunction(function() {
	return {
		vertices: [
			-0.5, -0.5,
			0.5, -0.5, 
			-0.5, 0.5,
			0.5, 0.5
		],
		texcoords: [
			0, 0,
			1, 0, 
			0, 1,
			1, 1
		],
		indices: [0, 1, 2, 2, 1, 3]
	};
});

draw2D.triangle = makeshapedrawfunction(function() {
	return {
		vertices: [
			-0.5, -0.5,
			0.5, 0.0, 
			-0.5, 0.5,
		],
		texcoords: [
			0, 0,
			1, 0.5, 
			0, 1,
		],
		indices: [0, 1, 2]
	};
});

draw2D.circle = makeshapedrawfunction(function() {
	var shape = {
		vertices: [0, 0, 0.5, 0],
		texcoords: [0.5, 0.5, 1, 0.5],
		indices: []
	};
	var incr = (2 * Math.PI) / 32;
	for (var i = 1; i < 32; i++) {
		var index = i+1;
		var angle = incr * (i + 1);
		shape.vertices[index*2  ] = 0.5 * Math.cos(angle);
		shape.vertices[index*2+1] = 0.5 * Math.sin(angle);
		
		// TODO: maybe map whole square onto disc (i.e. corners are at 45,45')?
		shape.texcoords[index*2  ] = shape.vertices[index*2  ]+0.5;
		shape.texcoords[index*2+1] = shape.vertices[index*2+1]+0.5;
		
		// add triangle:
		shape.indices.push(0);
		shape.indices.push(index);
		shape.indices.push(index-1);
	}
	return shape;
});

// aliases:
draw2D.square = draw2D.rect;
draw2D.ellipse = draw2D.circle;

draw2D.shape = function(vertices) {
	if (!isarraylike(vertices) || vertices.length < 3) {
		console.error("draw2D.shape() requires an array of vertex positions");
		return;
	}
	return makeshapedrawfunction(function() {
		var shape = {
			vertices: [],
			texcoords: [],
			indices: []
		};
		for (var i=0; i<vertices.length; i++) {
			var v = vertices[i];
			if (isarraylike(v)) {
				shape.indices.push(shape.indices.length);
				shape.vertices.push(typeof v[0] == "number" ? v[0] * 0.5 : 0.0);
				shape.vertices.push(typeof v[1] == "number" ? v[1] * 0.5 : 0.0);
			}
		}
		return shape;
	});
};


// cheating a bit -- we're just going to draw a rect.
draw2D.line = (function() {
	// build an object with vertices, texcoords and indices buffers:	
	var shape = {
		vertices: [
			0, -1,
			1, -1, 
			0, 1,
			1, 1
		],
		texcoords: [
			0, 0,
			1, 0, 
			0, 1,
			1, 1
		],
		indices: [0, 1, 2, 2, 1, 3]
	};
	
	// convert these to GPU buffers:
	var vertices_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertices_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.vertices), gl.STATIC_DRAW);
	
	//var texcoords_buffer = gl.createBuffer();
	//gl.bindBuffer(gl.ARRAY_BUFFER, texcoords_buffer);
	//gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.texcoords), gl.STATIC_DRAW);
	
	var indices_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);
	
	var shapelength = shape.indices.length;
	
	// those will all be upvalues of the actual draw function:
	return function(A, B, thickness) {
		
		if (typeof A === "undefined") {
			A = [1, 1];
		}
		if (typeof B === "undefined") {
			B = [0, 0];
		}
		if (typeof thickness !== "number") {
			thickness = 1;
		}
		
		var AB = new vec2(B[0]-A[0], B[1]-A[1]);
		var len = AB.len();
		var radians = AB.angle();
		
		// make line thickness independent of current transform:
		var width = thickness * (page_to_gl[0]*2)/(modelView[0]+modelView[4]);
		
		// create a local transformation matrix for these:
		var mat_local = mat3.clone(modelView);
		mat3.translate(mat_local, mat_local, A);
		mat3.rotate(mat_local, mat_local, radians);
		mat3.scale(mat_local, mat_local, [len, width]);
		
		// apply uniforms:
		gl.uniform4fv(draw2D_colorLocation, draw2D_chroma.gl());
		gl.uniformMatrix3fv(draw2D_modelViewLocation, false, mat_local);

		// bind shape buffers:
		gl.bindBuffer(gl.ARRAY_BUFFER, vertices_buffer);
		gl.enableVertexAttribArray(draw2D_positionLocation);
		gl.vertexAttribPointer(draw2D_positionLocation, 2, gl.FLOAT, false, 0, 0);
	
		//gl.bindBuffer(gl.ARRAY_BUFFER, texcoords_buffer);
		//gl.enableVertexAttribArray(draw2D_texcoordLocation);
		//gl.vertexAttribPointer(draw2D_texcoordLocation, 2, gl.FLOAT, false, 0, 0);
	
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices_buffer);
		
		// draw shape:
		gl.drawElements(gl.TRIANGLES, shapelength, gl.UNSIGNED_SHORT, 0);

		// clean up:
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		return draw2D;
	};
})();


/*
draw2D.shape() should return a re-usable shape object that we can call similar methods on to extend its internal geometry

should be easier now we have everything as indexed TRIANGLES


function Shape() {
	this.vertices = [];
	this.indices = [];
}

Shape.prototype.rect = function(x, y, w, h) {
	var vertices = [
		-1.0, -1.0,
		1.0, -1.0, 
		-1.0, 1.0,
		1.0, 1.0
	];
	var indices = [0, 1, 2, 2, 1, 3];
};

draw2D.shape = function() {
	return new Shape();
};

var s = draw2D.shape().translate(0.25, 0.25)
.rotate(t)
.scale(0.125)
.color("red")
.circle(0., 0., 0.5, 0.5)
.push()
  .color("orange")
  .translate(0.2)
  .scale(0.25)
  .rect(0, 1, 0.5, 0.5)
  .rect(0, -1, 0.5, 0.5)
.pop()

s.draw();

var shape = function() {
this.vertices = [];
this.indices = [];
this.colors = [];
}

function draw2D.shape() {

}
*/

///////////////////

// assumes 4-plane currently
field2D = function(width, height) {
	if (typeof width == "undefined") width = 64;
	if (typeof height == "undefined") height = width;
	this.dim = [width, height];
	this.width = width;
	this.height = height;
	//this.array = zeros(this.dim);

	// 4 floats per cells, 4 bytes per float
	this.buffer = new ArrayBuffer(this.width * this.height * 4 * 4);

	this.array = new Float32Array(this.buffer);
	this.clear(); // necessary to set alphas to 1

	this.tex = gl.createTexture();
};

field2D.prototype.clone = function() {
	var result = new field2D(this.width, this.height);
	// now copy data:
	for (var i = 0, l = this.array.length; i < l; i++) {
		result.array[i] = this.array[i];
	}
	return result;
};

field2D.prototype.clear = function() {
	var array = this.array;
	for (var i = 0, l = array.length; i < l; i += 4) {
		array[i] = 0;
		array[i + 1] = 0;
		array[i + 2] = 0;
		array[i + 3] = 1;
	}
	return this;
};

field2D.prototype.bindtexture = function() {
	gl.bindTexture(gl.TEXTURE_2D, this.tex);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.FLOAT, this.array);
};

field2D.prototype.draw = function() {
	this.bindtexture();
	draw2D.rect(0.5, 0.5, 1);
	gl.bindTexture(gl.TEXTURE_2D, texture_default);
};

field2D.prototype.get = function(x, y) {
	/*if (typeof x !== "number" || typeof y !== "number") {
	error("attempt to get field cell with invalid coordinate type");
	return 0; 
	}*/
	x = (wrap(x, this.width));
	y = (wrap(y, this.height));
	var offset = (y * this.width + x) * 4;
	return this.array[offset];
};

field2D.prototype.moore = function(x, y) {
	var x0 = (wrap(x - 1, this.width));
	var x1 = (wrap(x, this.width));
	var x2 = (wrap(x + 1, this.width));
	var y0 = (wrap(y - 1, this.height));
	var y1 = (wrap(y, this.height));
	var y2 = (wrap(y + 1, this.height));
	var offset0 = (y0 * this.width);
	var offset1 = (y1 * this.width);
	var offset2 = (y2 * this.width);
	var array = this.array;
	return [
		array[(offset0 + x0) * 4],
		array[(offset0 + x1) * 4],
		array[(offset0 + x2) * 4],

		array[(offset1 + x0) * 4],
		array[(offset1 + x1) * 4],
		array[(offset1 + x2) * 4],

		array[(offset2 + x0) * 4],
		array[(offset2 + x1) * 4],
		array[(offset2 + x2) * 4]
	];
};

field2D.prototype.cell = function(x, y) {
	/*if (typeof x !== "number" || typeof y !== "number") {
	error("attempt to get field cell with invalid coordinate type");
	return 0; 
	}*/
	x = (wrap(x, this.width));
	y = (wrap(y, this.height));
	var offset = (y * this.width + x) * 4;
	return this.array.subarray(offset, offset + 4);
};

field2D.prototype.each = function(func) {
	var array = this.array;
	var w = this.width;
	var h = this.height;
	for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
			var i = (y * w + x) * 4;
			var cell = this.array.subarray(i, i + 4);
			var v = func(cell, x, y);
			if (v !== undefined) {
				if (isarraylike(v)) {
					if (typeof v[0] === "number") cell[0] = v[0];
					if (typeof v[1] === "number") cell[1] = v[1];
					if (typeof v[2] === "number") cell[2] = v[2];
				} else if (typeof v == "number") {
					cell[0] = v;
					cell[1] = v;
					cell[2] = v;
				}
			}
		}
	}
	return this;
};

//- return the value at a normalized index (0..1 range maps to field dimensions)
// Uses linear interpolation between nearest cells.
// Indices out of range will wrap.
// @param x coordinate (0..1) to sample
// @param y coordinate (0..1) to sample
field2D.prototype.sample = function(x, y, channel) {
	if (typeof x == "object") {
		channel = y;
		y = x[1];
		x = x[0];
	}
	if (typeof x !== "number" || typeof y !== "number") {
		error("attempt to get field cell with invalid coordinate type");
		return 0;
	}
	channel = (typeof channel !== "number") ? 0 : wrap(channel, 4);
	var array = this.array;
	x = wrap(((x * this.width) - 0.5), this.width);
	y = wrap(((y * this.height) - 0.5), this.height);
	var x0 = Math.floor(x);
	var y0 = Math.floor(y);
	var x1 = wrap(x0 + 1, this.width);
	var y1 = wrap(y0 + 1, this.height);
	var xb = x - x0;
	var yb = y - y0;
	var xa = 1 - xb;
	var ya = 1 - yb;
	var v00 = array[(y0 * this.width + x0) * 4 + channel];
	var v10 = array[(y0 * this.width + x1) * 4 + channel];
	var v01 = array[(y1 * this.width + x0) * 4 + channel];
	var v11 = array[(y1 * this.width + x1) * 4 + channel];
	return v00 * xa * ya + v10 * xb * ya + v01 * xa * yb + v11 * xb * yb;
};

// add a new value
// value can be a number or an array
// if channel arg is given, only that channel will be updated
field2D.prototype.deposit = function(value, x, y, channel) {
	if (typeof x == "object") {
		channel = y;
		y = x[1];
		x = x[0];
	}
	if (typeof x !== "number" || typeof y !== "number") {
		// or deposit to all cells?
		error("attempt to get field cell with invalid coordinate type");
		return 0;
	}
	var array = this.array;
	x = wrap(((x * this.width) - 0.5), this.width);
	y = wrap(((y * this.height) - 0.5), this.height);
	var x0 = Math.floor(x);
	var y0 = Math.floor(y);
	var x1 = wrap(x0 + 1, this.width);
	var y1 = wrap(y0 + 1, this.height);
	// as array indices:
	var i00 = (y0 * this.width + x0) * 4;
	var i10 = (y0 * this.width + x1) * 4;
	var i01 = (y1 * this.width + x0) * 4;
	var i11 = (y1 * this.width + x1) * 4;
	var xb = x - x0;
	var yb = y - y0;
	var xa = 1 - xb;
	var ya = 1 - yb;
	// channel range:
	var c0 = 0, c1 = 4;
	if (typeof channel == "number") {
		// single-channel only:
		c0 = (typeof channel !== "number") ? 0 : wrap(channel, 4);
		c1 = c0+1;
	} else {
		if (isarraylike(value) && value.length !== undefined) c1 = value.length;
	}
	for (var c = c0; c < c1; c++) {
		var v = value; 
		if (isarraylike(value)) v = v[c];
		if (v !== undefined) {
			// old value
			var v00 = array[i00 + c];
			var v10 = array[i10 + c];
			var v01 = array[i01 + c];
			var v11 = array[i11 + c];
			// interpolated addition:
			array[i00 + c] = v00 + xa*ya*(v);
			array[i10 + c] = v10 + xb*ya*(v);
			array[i01 + c] = v01 + xa*ya*(v);
			array[i11 + c] = v11 + xb*ya*(v);
		}
	}
	// TODO: handle case of a function?
	return this;
};



// change to a new value (change is interpolated between nearest cells)
field2D.prototype.update = function(value, x, y, channel) {
	var array = this.array;
	if (typeof x == "object") {
		channel = y;
		y = x[1];
		x = x[0];
	}
	if (typeof x !== "number" || typeof y !== "number") {
		// or deposit to all cells?
		
		if (typeof(value) == "function") {
			// normalized-sampling mapper:
			var func = value;
			var h = this.height;
			var w = this.width;
			var dw = 1/w;
			var dh = 1/h;
			var p = new vec2();
			for (var yi = 0; yi < h; yi++) {
				for (var xi = 0; xi < w; xi++) {
					p[0] = (xi + 0.5)*dw;
					p[1] = (yi + 0.5)*dh;
					var idx = (yi * w + xi) * 4;
					var old = array.subarray(idx, idx + 4);
					this.setxy(func(old, p), xi, yi);
				}
			}
			return this;
			
		} else {
			return this.set(value);
		}
	}
	x = wrap(((x * this.width) - 0.5), this.width);
	y = wrap(((y * this.height) - 0.5), this.height);
	var x0 = Math.floor(x);
	var y0 = Math.floor(y);
	var x1 = wrap(x0 + 1, this.width);
	var y1 = wrap(y0 + 1, this.height);
	// as array indices:
	var i00 = (y0 * this.width + x0) * 4;
	var i10 = (y0 * this.width + x1) * 4;
	var i01 = (y1 * this.width + x0) * 4;
	var i11 = (y1 * this.width + x1) * 4;
	var xb = x - x0;
	var yb = y - y0;
	var xa = 1 - xb;
	var ya = 1 - yb;
	// channel range:
	var c0 = 0, c1 = 4;
	if (typeof channel == "number") {
		// single-channel only:
		c0 = (typeof channel !== "number") ? 0 : wrap(channel, 4);
		c1 = c0+1;
	}
	for (var c = c0; c < c1; c++) {
		var v = value; 
		if (isarraylike(value)) v = v[channel];
		if (v !== undefined) {
			// old value
			var v00 = array[i00 + c];
			var v10 = array[i10 + c];
			var v01 = array[i01 + c];
			var v11 = array[i11 + c];
			// interpolated addition:
			array[i00 + c] = v00 + xa*ya*(v - v00);
			array[i10 + c] = v10 + xb*ya*(v - v10);
			array[i01 + c] = v01 + xa*ya*(v - v01);
			array[i11 + c] = v11 + xb*ya*(v - v11);
		}
	}
	// TODO: handle case of a function?
	return this;
};


// this doesn't check bounds or for absence of x, y
field2D.prototype.setxy = function(value, x, y) {
	if (typeof value === "undefined") {
		return this; // just skip it.
	}
	if (typeof value === "number") {
		value = [value, value, value];
	}
	// handle value types:
	if (typeof value === "function") {
		// recursive call allows us to handle 
		// functions that return different types
		return this.setxy(value.call(this, x, y), x, y);
	} else if (isarraylike(value)) {
		// the "normal" case:
		var offset = (y * this.width + x) * 4;
		var v0 = value.length > 0 ? +value[0] : 0;
		if (typeof value[0] === "number") this.array[offset] = value[0];
		if (typeof value[1] === "number") this.array[offset + 1] = value[1];
		if (typeof value[2] === "number") this.array[offset + 2] = value[2];
		if (typeof value[3] === "number") this.array[offset + 3] = value[3];
	}
	return this;
};

// this is probably not optimal:
field2D.prototype.set = function(value, x, y) {
	if (typeof value === "undefined") {
		return this; // just skip it.
	}
	if (typeof value === "number") {
		value = [value, value, value];
	}
	// handle absent x,y case:
	if (typeof x === "undefined" || typeof y === "undefined") {
		for (y = 0; y < this.height; ++y) {
			for (x = 0; x < this.width; ++x) {
				// redirects to slightly simpler case
				// to avoid unnecessary x,y processing:
				this.setxy(value, x, y);
			}
		}
		return this;
	}
	// make sure the location is safe:
	// (shouldn't be necessary for absent x,y case)
	x = (wrap(x, this.width));
	y = (wrap(y, this.height));
	// handle value types:
	if (typeof value === "function") {
		// recursive call allows us to handle 
		// functions that return different types
		return this.set(value.call(this, x, y), x, y);
	} else if (value instanceof Array) {
		// the "normal" case:
		var offset = (y * this.width + x) * 4;
		var v0 = value.length > 0 ? +value[0] : 0;
		if (typeof value[0] === "number") this.array[offset] = value[0];
		if (typeof value[1] === "number") this.array[offset + 1] = value[1];
		if (typeof value[2] === "number") this.array[offset + 2] = value[2];
		if (typeof value[3] === "number") this.array[offset + 3] = value[3];
	}
	return this;
};

//- Apply a function to each cell of the field in turn
// The function arguments will be the current value of the cell and the x and y position, and the return value should be the new value of the cell (or nil to indicate no change). E.g. to multiply all cells by 2: field:map(function(value, x, y) return value * 2 })
// @param func the function to apply
// @return this
field2D.prototype.map = function(func) {
	var array = this.array;
	var w = this.width;
	var h = this.height;
	for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
			var old = array[(y * w + x) * 4];
			var v = func(old, x, y);
			if (typeof v !== "undefined") {
				this.set(v, x, y);
			}
		}
	}
	return this;
};



field2D.prototype.cell = function(x, y) {
	/*if (typeof x !== "number" || typeof y !== "number") {
	error("attempt to get field cell with invalid coordinate type");
	return 0; 
	}*/
	x = (wrap(x, this.width));
	y = (wrap(y, this.height));
	var offset = (y * this.width + x) * 4;
	return this.array.subarray(offset, offset + 4);
};

field2D.prototype.reduce = function(func, result) {
	var array = this.array;
	var w = this.width;
	var h = this.height;
	for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
			result = func(result, array[(y * w + x) * 4]);
		}
	}
	return result;
};

//- return the sum of all cells
// @return sum
field2D.prototype.sum = function() {
	return this.reduce(function(total, cell) {
		return total + cell;
	}, 0);
};

//- return the maximum value of all cells
// @return max
field2D.prototype.max = function() {
	return this.reduce(Math.max, Number.NEGATIVE_INFINITY);
};

//- return the minimum value of all cells
// @return min
field2D.prototype.min = function() {
	return this.reduce(Math.min, Number.MAX_VALUE);
};

field2D.prototype.scale = function(n) {
	var data = this.array;
	for (var i = 0, l = data.length; i < l; i+=4) {
		data[i  ] *= n;
		data[i+1] *= n;
		data[i+2] *= n;
	}
	return this;
};
field2D.prototype.mul = field2D.prototype.scale;

field2D.prototype.offset = function(n) {
	var data = this.array;
	for (var i = 0, l = data.length; i < l; i+=4) {
		data[i  ] += n;
		data[i+1] += n;
		data[i+2] += n;
	}
	return this;
};
field2D.prototype.add = field2D.prototype.offset;

//- normalize the field values to a 0..1 range
// @return this
field2D.prototype.normalize = function() {
	var array = this.array;
	var w = this.width, h = this.height, l = array.length;
	var lo = Math.min(array[0], array[1], array[2]);
	var hi = Math.max(array[0], array[1], array[2]);
	for (var i = 4; i < l; i += 4) {
		lo = Math.min(lo, array[i], array[i + 1], array[i + 2]);
		hi = Math.max(hi, array[i], array[i + 1], array[i + 2]);
	}
	var range = hi - lo;
	if (range > 0) {
		var scale = 1 / range;
		for (i = 0; i < l; i += 4) {
			array[i    ] = scale * (array[i    ] - lo);
			array[i + 1] = scale * (array[i + 1] - lo);
			array[i + 2] = scale * (array[i + 2] - lo);
		}
	}
	return this;
};

field2D.prototype.clear = function() {
	var array = this.array;
	for (var i = 0, l = array.length; i < l; i += 4) {
		array[i] = 0;
		array[i + 1] = 0;
		array[i + 2] = 0;
		array[i + 3] = 1;
	}
	return this;
};

//- fill the field with a diffused (blurred) copy of another
// @param sourcefield the field to be diffused
// @param diffusion the rate of diffusion
// @param passes ?int the number of iterations to improve numerical accuracy (default 10)
field2D.prototype.diffuse = function(sourcefield, diffusion, passes) {
	var array = this.array;
	diffusion = typeof diffusion == "number" ? diffusion : 0.1;
	passes = typeof passes == "number" ? passes : 10;
	var input = sourcefield.array;
	var div = 1.0/((1+4*diffusion));
	var w = sourcefield.width, h = sourcefield.height;	
	if (w != this.width || h != this.height) {
		console.log("field2D.diffuse(): field dims do not match.");
		return this;
	}
	// Gauss-Seidel relaxation scheme:
	for (var n = 1; n < passes; n++) {
		for (var y = 0; y < h; y++) {
			for (var x = 0; x < w; x++) {
				var C = (y * w + x) * 4;
				var S = (wrap(y-1,h) * w + x) * 4;
				var W = (y * w + wrap(x-1,w)) * 4;
				var N = (wrap(y+1,h) * w + x) * 4;
				var E = (y * w + wrap(x+1,w)) * 4;
				for (var i=0; i<4; i++) {
					var old = input[C+i];
					var near = array[W+i] + array[E+i] + array[S+i] + array[N+i];
					array[C+i] = div * (old + diffusion * near);
				}
			}
		}
	}
	return this;
};

/*


var mat3 = draw2D.gl.mat3;
var glvec2 = draw2D.gl.vec2;
var glvec3 = draw2D.gl.vec3;

function pose() {
	this.mat = mat3.create();
	this.inverse = mat3.create();
	
	pose.prototype.update.apply(this, arguments);
}

pose.prototype.global = function(v) {
	return glvec2.transformMat3(new vec2(), v, this.mat);
}

pose.prototype.local = function(v) {
	return glvec2.transformMat3(new vec2(), v, this.inverse);
}

pose.prototype.update = function(translate, rotate, scale) {
	var m = this.mat;
	mat3.identity(m);
 	if (typeof translate == "object") {
 		mat3.translate(m, m, translate);
 	}
 	if (typeof rotate == "number") {
 		mat3.rotate(m, m, rotate);
 	} else if (typeof rotate == "object") {
 		mat3.rotate(m, m, vec2.angle(rotate));
 	} 	
	if (typeof scale == "number") {
		mat3.scale(m, m, [scale, scale]);
	} else if (typeof scale == "object") {
		mat3.scale(m, m, scale);
 	}
 	mat3.invert(this.inverse, this.mat);
	return this;
};

*/

//////////////////////////////////////////////////////////////////////////////////////////

var pretext = "";

write = function() {
	for(var i = 0, total = 0; i < arguments.length; i++) {
        pretext += JSON.stringify(arguments[i]) + "\t";
    }
    pretext += "\n";
};

//////////////////////////////////////////////////////////////////////////////////////////

var t0 = Date.now() / 1000;

now = 0;
dt = 1/60;

requestAnimationFrame(render);

function render() {
	requestAnimationFrame(render);

	mat3.copy(modelView, modelView_default);
	draw2D_chroma = draw2D_chroma_default;
	texture_current = texture_default;

	if (updating) {
		now += dt;
		if (typeof(update) === "function") {
			update(dt);
		}
	}
	
	// Set the viewport to match
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// regular blending:
//	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	draw2D.blend(false);
	
	// with uber shader, draw:
	gl.useProgram(draw2D_program);
	if (typeof(draw) === "function") draw();
	gl.useProgram(null);
	
	if (pretext !== "") {
		overlay.innerHTML = pretext;
		pretext = "";
	}
	
	var t1 = Date.now() / 1000;
	dt = t1 - t0;
	t0 = t1;
}