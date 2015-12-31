/*
TODO:
- making it easier to embed in a page
*/

var glMatrix = require("gl-matrix");
var mat2 = glMatrix.mat2;
var mat3 = glMatrix.mat3;
var mat4 = glMatrix.mat4;
var vec2 = glMatrix.vec2;
var vec3 = glMatrix.vec3;
var vec4 = glMatrix.vec4;
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

// a modulo operation that handles negative n more appropriately
// e.g. wrap(-1, 3) returns 2
// see http://en.wikipedia.org/wiki/Modulo_operation
// see also http://jsperf.com/modulo-for-negative-numbers 
wrap = function (n, m) {
	return ((n%m)+m)%m;
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
var page_to_gl = mat3.create();


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
onresize();

var mouseevent = function(event, name) {
	if (typeof(mouse) === "function") {
		var m = [event.pageX, event.pageY];
		vec2.transformMat3(m, m, page_to_gl);
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
		vec2.transformMat3(m, m, page_to_gl);
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
	if (c !== "" && typeof(key) === "function") key("press",c);
	if (c !== "" && typeof(keypress) === "function") keypress(c);
}, true);

var gl = getWebGLContext(canvas, { alpha: false });
var floatTextures = gl.getExtension('OES_texture_float');
if (!floatTextures) {
	alert('no floating point texture support');
}

// GLSL programs
var field2D_vertexshader = loadShader(gl, [
	"attribute vec2 a_position;",
	"uniform mat3 u_modelView;",
	"varying vec2 texCoord;",
	"void main() { ",
	//"gl_Position = vec4(a_position, 0, 1);",
	"vec3 p = u_modelView * vec3(a_position, 1.);",
	"gl_Position = vec4(p, 1);",
	"texCoord = a_position;",
	"}"
].join("\n"), gl.VERTEX_SHADER);

var field2D_fragmentshader = loadShader(gl, [
	"precision mediump float;",
	"uniform sampler2D u_tex;",
	"varying vec2 texCoord;",
	"void main() { ",
	"gl_FragColor = texture2D(u_tex, texCoord);",
	"}"
].join("\n"), gl.FRAGMENT_SHADER);

var draw2D_vertexshader = loadShader(gl, [
	"attribute vec2 a_position;",
	"uniform mat3 u_modelView;",
	"void main() { ",
	"vec3 p = u_modelView * vec3(a_position, 1.);",
	"gl_Position = vec4(p, 1);",
	"}"
].join("\n"), gl.VERTEX_SHADER);

var draw2D_fragmentshader = loadShader(gl, [
	"precision mediump float;",
	"uniform vec4 u_color;",
	"void main() { ",
	"gl_FragColor = u_color;",
	"}"
].join("\n"), gl.FRAGMENT_SHADER);


var field2D_program = loadProgram(gl, [field2D_vertexshader, field2D_fragmentshader]);
// look up where the vertex data needs to go.
var field2D_positionLocation = gl.getAttribLocation(field2D_program, "a_position");
var field2D_modelViewLocation = gl.getUniformLocation(field2D_program, "u_modelView");
var field2D_texLocation = gl.getUniformLocation(field2D_program, "u_tex");

// Create a buffer and put a single clipspace rectangle in
// it (2 triangles)
var field2D_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, field2D_buffer);
gl.bufferData(
gl.ARRAY_BUFFER,
new Float32Array([
	0.0, 0.0,
	1.0, 0.0, 
	0.0, 1.0, 
	0.0, 1.0,
	1.0, 0.0,
	1.0, 1.0
]),
gl.STATIC_DRAW);



var draw2D_program = loadProgram(gl, [draw2D_vertexshader, draw2D_fragmentshader]);
// look up where the vertex data needs to go.
var draw2D_positionLocation = gl.getAttribLocation(draw2D_program, "a_position");
var draw2D_colorLocation = gl.getUniformLocation(draw2D_program, "u_color");
var draw2D_offsetscaleLocation = gl.getUniformLocation(draw2D_program, "u_offsetscale");
var draw2D_modelViewLocation = gl.getUniformLocation(draw2D_program, "u_modelView");

function makeshape(vertices, indices) {
	var vertices_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertices_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	var indices_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	return {
		vertices: vertices_buffer,
		indices: indices_buffer,
		length: indices.length,
	}; 
}

var draw2D_circle = (function() {
	var vertices = [0, 0, 1, 0];
	var indices = [];
	var incr = (2 * Math.PI) / 32;
	for (var i = 1; i < 32; i++) {
		var index = i+1;
		var angle = incr * (i + 1);
		vertices[index*2  ] = Math.cos(angle);
		vertices[index*2+1] = Math.sin(angle);
		// add triangle:
		indices.push(0);
		indices.push(index);
		indices.push(index-1);
	}
	return makeshape(vertices, indices);
})();

var draw2D_rect = (function() {
	var vertices = [
		-1.0, -1.0,
		1.0, -1.0, 
		-1.0, 1.0,
		1.0, 1.0
	];
	var indices = [0, 1, 2, 2, 1, 3];
	return makeshape(vertices, indices);
})();

// Create a buffer and put a single clipspace rectangle in
// it (2 triangles)
var draw2Drect_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, draw2Drect_buffer);
gl.bufferData(
gl.ARRAY_BUFFER,
new Float32Array([
	-1.0, -1.0,
	1.0, -1.0, 
	-1.0, 1.0,
	1.0, 1.0
]),
gl.STATIC_DRAW);
var draw2Drect_index_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, draw2Drect_index_buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 2, 1, 3]), gl.STATIC_DRAW);

var circledata = [0, 0, 1, 0];
var incr = (2 * Math.PI) / 32;
for (var i = 1; i < 32; i++) {
	var index = i * 2 + 2;
	var angle = incr * (i + 1);
	circledata[index] = Math.cos(angle);
	circledata[index + 1] = Math.sin(angle);
}
var draw2Dcircle_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, draw2Dcircle_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circledata), gl.STATIC_DRAW);
/*
var draw2D_circle = {
buffer: draw2Dcircle_buffer,
primitive: gl.TRIANGLE_FAN,
length: 33,
};
*/

draw2D = {
	chroma: chroma,
	gl: gl,
};

// https://github.com/gka/chroma.js/blob/gh-pages/src/index.md
// http://vis4.net/blog/posts/avoid-equidistant-hsv-colors/
var draw2D_chroma = chroma("white");
// http://glmatrix.net/docs/2.2.0/
var modelView = mat3.create();
var modelView_default = mat3.create();
mat3.identity(modelView_default);
mat3.scale(modelView_default, modelView_default, [2, 2]);
mat3.translate(modelView_default, modelView_default, [-0.5, -0.5]);
draw2D_modelView_stack = [];


draw2D.color = function(r, g, b, a) {
	if (typeof r == "string" || typeof r == "object") {
		draw2D_chroma = chroma(r); // "pink", '#ff3399', etc.
		return this;
	}
	if (typeof r == "undefined") r = 0;
	if (typeof g == "undefined") g = 0;
	if (typeof b == "undefined") b = 0;
	if (typeof a == "undefined") a = 1;
	draw2D_chroma = chroma.gl(r, g, b, a);
	return this;
};

draw2D.push = function() {
	draw2D_modelView_stack.push(modelView);
	modelView = mat3.clone(modelView);
	return this;
};

draw2D.pop = function() {
	if (draw2D_modelView_stack.length > 0) {
		modelView = draw2D_modelView_stack.pop();
	}
	return this;
};

draw2D.translate = function(x, y) {
	if (typeof y == "undefined") y = 0;
	mat3.translate(modelView, modelView, [x, y]);
	return this;
};

draw2D.scale = function(x, y) {
	if (typeof y == "undefined") y = x;
	mat3.scale(modelView, modelView, [x, y]);
	return this;
};

draw2D.rotate = function(radians) {
	mat3.rotate(modelView, modelView, radians);
	return this;
};

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

function draw2D_drawshape(shape, mat_local) {
	gl.useProgram(draw2D_program);
	gl.uniform4fv(draw2D_colorLocation, draw2D_chroma.gl());
	gl.uniformMatrix3fv(draw2D_modelViewLocation, false, mat_local);

	gl.bindBuffer(gl.ARRAY_BUFFER, shape.vertices);
	gl.enableVertexAttribArray(draw2D_positionLocation);
	gl.vertexAttribPointer(draw2D_positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shape.indices);
	gl.drawElements(gl.TRIANGLES, shape.length, gl.UNSIGNED_SHORT, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	gl.useProgram(null);
	return draw2D;
}

draw2D.rect = function(x, y, w, h) {
	if (typeof x == "undefined") x = 0;
	if (typeof y == "undefined") y = 0;
	if (typeof w == "undefined") w = 1;
	if (typeof h == "undefined") h = w;
	var mat_local = mat3.clone(modelView);
	mat3.translate(mat_local, mat_local, [x, y]);
	mat3.scale(mat_local, mat_local, [w*0.5, h*0.5]);
	var shape = draw2D_rect;
	return draw2D_drawshape(shape, mat_local);
};

draw2D.circle = function(x, y, w, h) {
	if (typeof x == "undefined") x = 0;
	if (typeof y == "undefined") y = 0;
	if (typeof w == "undefined") w = 1;
	if (typeof h == "undefined") h = w;
	var mat_local = mat3.clone(modelView);
	mat3.translate(mat_local, mat_local, [x, y]);
	mat3.scale(mat_local, mat_local, [w*0.5, h*0.5]);
	var shape = draw2D_circle;
	return draw2D_drawshape(shape, mat_local);
};

draw2D.ellipse = draw2D.circle;

/*
draw2D.shape() should return a re-usable shape object that we can call similar methods on to extend its internal geometry

should be easier now we have everything as indexed TRIANGLES

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

field2D.prototype.draw = function() {
	gl.useProgram(field2D_program);
	gl.uniformMatrix3fv(field2D_modelViewLocation, false, modelView);

	gl.bindTexture(gl.TEXTURE_2D, this.tex);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.FLOAT, this.array);

	gl.bindBuffer(gl.ARRAY_BUFFER, field2D_buffer);
	gl.enableVertexAttribArray(field2D_positionLocation);
	gl.vertexAttribPointer(field2D_positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	gl.bindTexture(gl.TEXTURE_2D, null);
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

//- return the value at a normalized index (0..1 range maps to field dimensions)
// Uses linear interpolation between nearest cells.
// Indices out of range will wrap.
// @param x coordinate (0..1) to sample
// @param y coordinate (0..1) to sample
field2D.prototype.sample = function(x, y, channel) {
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
	var w = this.width,
	h = this.height;
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

field2D.prototype.reduce = function(func, result) {
	var array = this.array;
	var w = this.width,
	h = this.height;
	for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
			result = func(result, array[(y * w + x) * 4], x, y);
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

//- normalize the field values to a 0..1 range
// @return this
field2D.prototype.normalize = function() {
	var array = this.array;
	var w = this.width,
	h = this.height;
	var lo = Math.min(array[0], array[1], array[2]);
	var hi = Math.max(array[0], array[1], array[2]);
	for (var i = 1, l = array.length; i < l; i += 4) {
		lo = Math.min(lo, array[i], array[i + 1], array[i + 2]);
		hi = Math.max(hi, array[i], array[i + 1], array[i + 2]);
	}
	var range = hi - lo;
	if (range > 0) {
		var scale = 1 / range;
		for (i = 0, l = array.length; i < l; i += 4) {
			array[i] = scale * (array[i] - lo);
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

requestAnimationFrame(render);


function render() {
	requestAnimationFrame(render);

	// Set the viewport to match
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// regular blending:
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	mat3.copy(modelView, modelView_default);
	draw2D_chroma = chroma("white");

	if (typeof(update) === "function") update();
	if (typeof(draw) === "function") draw();
}