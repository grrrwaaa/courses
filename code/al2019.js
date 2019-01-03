/*
A collection of utilities for prototyping artificial life experiments in the browser

Courtesy of the [Alice Lab](http://worldmaking.github.io/)
*/
  
////////////////////////////////////////////////////////////////////
// Global utilities
////////////////////////////////////////////////////////////////////
  
if (!document) document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
  
// return integer in 0..(n-1)
random = (function() {
	return function (n) {
		if (n !== undefined) {
			return Math.floor(Math.random()*n);
		} else {
			return Math.random();
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

shuffle = function (a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}
  
isarraylike = function(o) {
  return Array.isArray(o) || (o instanceof Float32Array);
};

// a modulo operation that handles negative n more appropriately
// e.g. wrap(-1, 3) returns 2
// see http://en.wikipedia.org/wiki/Modulo_operation
// see also http://jsperf.com/modulo-for-negative-numbers 
wrap = function (n, m) {
	return ((n%m)+m)%m;
};

class FPS {
  constructor() {
    this.t0 = 0.001*performance.now();
    this.t = 0;
    this.fps = 60;
    this.dt = 1/this.fps;
    this.dtavg = this.dt;
    this.fpsavg = this.fps;
  }
  
  reset() {
    this.t0 = this.t;
    this.t = 0;
  }

  tick() {
    let t1 = 0.001*performance.now() - this.t0;
    this.dt = (t1-this.t);
    this.fps = (1/this.dt);
    let alpha = Math.min(1, Math.max(0.001, this.dtavg));
    this.dtavg += alpha*(this.dt-this.dtavg);
    this.fpsavg += alpha*(this.fps-this.fpsavg);
    this.t = t1;
  }
};

////////////////////////////////////////////////////////////////////
// Basic page rendering & UI elements
////////////////////////////////////////////////////////////////////
  
let canvas = document.createElement('canvas');
let ctx = canvas.getContext("2d");  
let ctxtransform = [1, 0, 
                    0, 1, 
                    0, 0];
let overlay = document.createElement("div");
document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.style.backgroundColor = "#111";
document.body.appendChild(canvas);
document.body.appendChild(overlay);
let pretext = "";
let fps = new FPS();
now = 0;
updating = true;
  
// save the contents of a <canvas> to a PNG file
saveCanvasToPNG = function(filename="canvas_image") {
  function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], {type:mime});
  }
  let link = document.createElement("a");
  let imgData = canvas.toDataURL({ format:'png', multiplier:4});
  let strDataURI = imgData.substr(22, imgData.length);
  let blob = dataURLtoBlob(imgData);
  let objurl = URL.createObjectURL(blob);
  link.download = filename + ".png";
  link.href = objurl;
  link.target = '_blank';
  link.click();
}
  
write = function() {
	for(let i = 0, total = 0; i < arguments.length; i++) {
        let term = arguments[i];
        if (typeof term == "string") {
        	pretext += term + "\t";
        } else {
        	pretext += JSON.stringify(term) + "\t";
        }
    }
    pretext += "\n";
};

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
  
cancelRequestAnimationFrame = (function() {
	return window.cancelCancelRequestAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		window.clearTimeout;
})();

onresize = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  canvas.style.width = canvas.width + 'px';
	canvas.style.height = canvas.height + 'px';
  canvas.style.position = "absolute";
	canvas.style.top = 0 + "px";
	canvas.style.bottom = 0 + "px";
	canvas.style.left = 0 + "px";
	canvas.style.right = 0 + "px";
	canvas.style.margin = "auto";
	canvas.style.cursor = "crosshair";
  // emable 
  canvas.tabindex="0";
  canvas.contentEditable = true;
  
  overlay.width = window.innerWidth;
	overlay.height = window.innerHeight;
	overlay.style.width = canvas.width + 'px';
	overlay.style.height = canvas.height + 'px';
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
    
  // set the transform such that 0..1 spans the smaller dimension:
  let w = Math.min(canvas.width, canvas.height);
  let x = Math.max(0, (canvas.width-w)/2);
  let y = Math.max(0, (canvas.height-w)/2);
  ctxtransform = [w, 0, 
                  0, w, 
                  x, y];
  
  ctx.resetTransform();
  ctx.transform(ctxtransform[0], ctxtransform[1],
                 ctxtransform[2], ctxtransform[3], 
                 ctxtransform[4], ctxtransform[5]);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
  
function render() {
  
  if (fps.t == 0) {
		if (typeof(reset) === "function") reset();
  }
  fps.tick();
  now = fps.t;
  
  if (updating) {
    if (typeof(update) === "function") update(fps.dt);
  }
  
  if (typeof(draw) === "function") {
    ctx.resetTransform();
    ctx.transform(ctxtransform[0], ctxtransform[1],
                 ctxtransform[2], ctxtransform[3], 
                 ctxtransform[4], ctxtransform[5]);
    draw(ctx);
  }
  
  if (pretext !== "") {
		overlay.innerText = pretext;
		pretext = "";
	}
  
  // doing this at the end so that any errors don't spew every single frame
  requestAnimationFrame(render);
}
  
function requestFullscreen() {
  const elem = document.documentElement;  
  let request = elem.requestFullscreen;
  if (!request) request = elem.mozRequestFullScreen;
  if (!request) request = elem.webkitRequestFullscreen;
  if (!request) request = elem.webkitRequestFullScreen;
  if (!request) request = elem.msRequestFullscreen;
  // Work around Safari 5.1 bug: reports support for
  // keyboard in fullscreen even though it doesn't.
  // Browser sniffing, since the alternative with
  // setTimeout is even worse.
  if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
    request.apply(elem);
  } else {
    request.apply(elem, Element.ALLOW_KEYBOARD_INPUT);
  }
}
  
function exitFullscreen() {
  const elem = document.documentElement;  
  let request = elem.exitFullscreen;
  if (!request) request = elem.webkitExitFullscreen;
  if (!request) request = elem.webkitCancelFullScreen;
  if (!request) request = elem.mozCancelFullScreen;
  if (!request) request = elem.msExitFullscreen;
  request.apply(elem);
}
  
let mouseevent = function(event, name) {
	if (typeof(mouse) !== "function") return;

	// stop browser from processing this further (incl stopping mouse events)
	event.preventDefault();
  
  // convert the x,y position to normalized coordinate:
  let p = [
    (event.offsetX - ctxtransform[4])/ctxtransform[0],
    (event.offsetY - ctxtransform[5])/ctxtransform[3],
  ];

	var id = 0;
	if ("buttons" in event) {
		id = event.buttons;
	} else {
		id = event.which || event.button;
	}
	mouse(name, p, id, event);
};
  
let keyevent = function(event, name, callback) {
	let k = event.key || event.keyCode;
	if (typeof(key) === "function") key(name, k);
	if (typeof(callback) === "function") callback(k);
	// only printable characters:
	let c = String.fromCharCode(k).replace(/[^ -~]+/g, "");	
	if (c !== "") {
		if (typeof(key) === "function") key(name, c);
		if (typeof(callback) === "function") callback(c);
		// combos like "shift-A", "ctrl-alt-R" etc. 
		let prefix = "";
		if (event.ctrlKey) prefix += "ctrl-";
		if (event.altKey) prefix += "alt-";
		if (event.shiftKey) prefix += "shift-";
		if (prefix !== "") {	
			if (typeof(key) === "function") key(name, prefix+c);
			if (typeof(callback) === "function") callback(prefix+c);
		}
	}
};

  
////////////////////////////////////////////////////////////////////
// A 2D array suitable for cellular automata etc.
////////////////////////////////////////////////////////////////////
  
field2D = function field2D(width, height) {
  if (typeof width == "undefined") width = 64;
	if (typeof height == "undefined") height = width;
	this.width = width;
	this.height = height;
  this.length = this.width * this.height;
	this.smooth = false;
  
  this.canvas = document.createElement('canvas');
  this.canvas.width = width;
  this.canvas.height = height;
  this.ctx = this.canvas.getContext("2d");
  this.imgdata = this.ctx.getImageData(0, 0, width, height); 
  this.data = this.imgdata.data;
  
  this.array = new Float32Array(this.width * this.height * 4);
  this.clear(); // necessary to set alphas to 1
}
  
field2D.prototype.clone = function() {
	let result = new field2D(this.width, this.height);
	// now copy data:
	for (var i = 0, l = this.array.length; i < l; i++) {
		result.array[i] = this.array[i];
	}
	return result;
};
  
field2D.prototype.copy = function(other) {
  if (this.width != other.width || this.height != other.height) {
    console.error("fields must have same dimensions to copy");
    return;
  }
  for (var i = 0, l = this.array.length; i < l; i++) {
		this.array[i] = other.array[i];
	}
	return this;
};
  
field2D.prototype.clear = function() {
	const array = this.array;
	for (let i = 0, l = array.length; i < l; i += 4) {
		array[i] = 0;
		array[i + 1] = 0;
		array[i + 2] = 0;
		array[i + 3] = 1;
	}
	return this;
};
  
field2D.prototype.get = function(x, y) {
	/*if (typeof x !== "number" || typeof y !== "number") {
	error("attempt to get field cell with invalid coordinate type");
	return 0; 
	}*/
	const x1 = (wrap(x, this.width));
	const y1 = (wrap(y, this.height));
	return this.array[(y1*this.width + x1)*4];
};
  
field2D.prototype.cell = function(x, y) {
	/*if (typeof x !== "number" || typeof y !== "number") {
	error("attempt to get field cell with invalid coordinate type");
	return 0; 
	}*/
	x = (wrap(x, this.width));
	y = (wrap(y, this.height));
	const offset = (y * this.width + x) * 4;
	return this.array.subarray(offset, offset + 4);
};
  
// doesn't check bounds or for absence of x, y
// assumes value is number or arraylike
field2D.prototype.rawset = function(value, x, y) {
  if (typeof value === "number") {
		// the "normal" case:
		let offset = (y*this.width + x)*4;
		this.array[offset] = value;
		this.array[offset + 1] = value;
		this.array[offset + 2] = value;
		this.array[offset + 3] = 1;
	} else if (isarraylike(value)) {
		// the "normal" case:
		let offset = (y * this.width + x) * 4;
		if (typeof value[0] === "number") this.array[offset] = value[0];
		if (typeof value[1] === "number") this.array[offset + 1] = value[1];
		if (typeof value[2] === "number") this.array[offset + 2] = value[2];
		if (typeof value[3] === "number") this.array[offset + 3] = value[3];
	}
	return this;
};
  
field2D.prototype.set = function(value, x, y) {
	// handle absent x,y case:
	if (typeof x === "undefined" || typeof y === "undefined") {
    if (typeof value === "function") {
      for (let y = 0; y < this.height; ++y) {
        for (let x = 0; x < this.width; ++x) {
          // redirects to slightly simpler case
          // to avoid unnecessary x,y processing:
          this.rawset(value.call(this, x, y), x, y);
        }
      }
    } else if (typeof value === "number") {
      for (let y = 0; y < this.height; ++y) {
        for (let x = 0; x < this.width; ++x) {
          let offset = (y * this.width + x) * 4;
          this.array[offset] = value;
          this.array[offset + 1] = value;
          this.array[offset + 2] = value;
          this.array[offset + 3] = 1;
        }
      }
	  } else if (isarraylike(value)) {
      for (let y = 0; y < this.height; ++y) {
        for (let x = 0; x < this.width; ++x) {
          // the "normal" case:
          const offset = (y * this.width + x) * 4;
          const v0 = value.length > 0 ? +value[0] : 0;
          if (typeof value[0] === "number") this.array[offset] = value[0];
          if (typeof value[1] === "number") this.array[offset + 1] = value[1];
          if (typeof value[2] === "number") this.array[offset + 2] = value[2];
          if (typeof value[3] === "number") this.array[offset + 3] = value[3];
        }
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
    value = value.call(this, x, y);
	} 
	return this.rawset(value, x, y);
};
  
  
//- Apply a function to each cell of the field in turn
// The function arguments will be the current value of the cell and the x and y position, and the return value should be the new value of the cell (or nil to indicate no change). E.g. to multiply all cells by 2: field:map(function(value, x, y) return value * 2 })
// @param func the function to apply
// @return this
field2D.prototype.map = function(func) {
	const array = this.array;
	const w = this.width;
	const h = this.height;
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			let old = array[(y * w + x) * 4];
			let v = func(old, x, y);
			if (typeof v !== "undefined") {
				this.rawset(v, x, y);
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
	let offset = (y * this.width + x) * 4;
	return this.array.subarray(offset, offset + 4);
};
  
field2D.prototype.reduce = function(func, result) {
	const array = this.array;
	const w = this.width;
	const h = this.height;
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
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
	let data = this.array;
	for (let i = 0, l = data.length; i < l; i+=4) {
		data[i  ] *= n;
		data[i+1] *= n;
		data[i+2] *= n;
	}
	return this;
};
field2D.prototype.mul = field2D.prototype.scale;

field2D.prototype.offset = function(n) {
	let data = this.array;
	for (let i = 0, l = data.length; i < l; i+=4) {
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
	let array = this.array;
	const w = this.width, h = this.height, l = array.length;
	const lo = Math.min(array[0], array[1], array[2]);
	const hi = Math.max(array[0], array[1], array[2]);
	for (let i = 4; i < l; i += 4) {
		lo = Math.min(lo, array[i], array[i + 1], array[i + 2]);
		hi = Math.max(hi, array[i], array[i + 1], array[i + 2]);
	}
	const range = hi - lo;
	if (range > 0) {
		const scale = 1 / range;
		for (i = 0; i < l; i += 4) {
			array[i    ] = scale * (array[i    ] - lo);
			array[i + 1] = scale * (array[i + 1] - lo);
			array[i + 2] = scale * (array[i + 2] - lo);
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
	const array = this.array;
	x = wrap(((x * this.width) - 0.5), this.width);
	y = wrap(((y * this.height) - 0.5), this.height);
	const x0 = Math.floor(x);
	const y0 = Math.floor(y);
	const x1 = wrap(x0 + 1, this.width);
	const y1 = wrap(y0 + 1, this.height);
	const xb = x - x0;
	const yb = y - y0;
	const xa = 1 - xb;
	const ya = 1 - yb;
	const v00 = array[(y0 * this.width + x0) * 4 + channel];
	const v10 = array[(y0 * this.width + x1) * 4 + channel];
	const v01 = array[(y1 * this.width + x0) * 4 + channel];
	const v11 = array[(y1 * this.width + x1) * 4 + channel];
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
	const array = this.array;
	x = wrap(((x * this.width) - 0.5), this.width);
	y = wrap(((y * this.height) - 0.5), this.height);
	const x0 = Math.floor(x);
	const y0 = Math.floor(y);
	const x1 = wrap(x0 + 1, this.width);
	const y1 = wrap(y0 + 1, this.height);
	// as array indices:
	const i00 = (y0 * this.width + x0) * 4;
	const i10 = (y0 * this.width + x1) * 4;
	const i01 = (y1 * this.width + x0) * 4;
	const i11 = (y1 * this.width + x1) * 4;
	const xb = x - x0;
	const yb = y - y0;
	const xa = 1 - xb;
	const ya = 1 - yb;
	// channel range:
	let c0 = 0, c1 = 4;
	if (typeof channel == "number") {
		// single-channel only:
		c0 = (typeof channel !== "number") ? 0 : wrap(channel, 4);
		c1 = c0+1;
	} else {
		if (isarraylike(value) && value.length !== undefined) c1 = value.length;
	}
	for (var c = c0; c < c1; c++) {
		const v = value; 
		if (isarraylike(value)) v = v[c];
		if (v !== undefined) {
			// old value
			const v00 = array[i00 + c];
			const v10 = array[i10 + c];
			const v01 = array[i01 + c];
			const v11 = array[i11 + c];
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
	const array = this.array;
	if (typeof x == "object") {
		channel = y;
		y = x[1];
		x = x[0];
	}
	if (typeof x !== "number" || typeof y !== "number") {
		// or deposit to all cells?
		
		if (typeof(value) == "function") {
			// normalized-sampling mapper:
			const func = value;
			const h = this.height;
			const w = this.width;
			const dw = 1/w;
			const dh = 1/h;
			const p = new vec2();
			for (var yi = 0; yi < h; yi++) {
				for (var xi = 0; xi < w; xi++) {
					p[0] = (xi + 0.5)*dw;
					p[1] = (yi + 0.5)*dh;
					const idx = (yi * w + xi) * 4;
					const old = array.subarray(idx, idx + 4);
					this.rawset(func(old, p), xi, yi);
				}
			}
			return this;
			
		} else {
			return this.set(value);
		}
	}
	x = wrap(((x * this.width) - 0.5), this.width);
	y = wrap(((y * this.height) - 0.5), this.height);
	const x0 = Math.floor(x);
	const y0 = Math.floor(y);
	const x1 = wrap(x0 + 1, this.width);
	const y1 = wrap(y0 + 1, this.height);
	// as array indices:
	const i00 = (y0 * this.width + x0) * 4;
	const i10 = (y0 * this.width + x1) * 4;
	const i01 = (y1 * this.width + x0) * 4;
	const i11 = (y1 * this.width + x1) * 4;
	const xb = x - x0;
	const yb = y - y0;
	const xa = 1 - xb;
	const ya = 1 - yb;
	// channel range:
	let c0 = 0, c1 = 4;
	if (typeof channel == "number") {
		// single-channel only:
		c0 = (typeof channel !== "number") ? 0 : wrap(channel, 4);
		c1 = c0+1;
	}
	for (var c = c0; c < c1; c++) {
		const v = value; 
		if (isarraylike(value)) v = v[channel];
		if (v !== undefined) {
			// old value
			const v00 = array[i00 + c];
			const v10 = array[i10 + c];
			const v01 = array[i01 + c];
			const v11 = array[i11 + c];
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
  
//- fill the field with a diffused (blurred) copy of another
// @param sourcefield the field to be diffused
// @param diffusion the rate of diffusion
// @param passes ?int the number of iterations to improve numerical accuracy (default 10)
field2D.prototype.diffuse = function(sourcefield, diffusion, passes) {
	const array = this.array;
	diffusion = typeof diffusion == "number" ? diffusion : 0.1;
	passes = typeof passes == "number" ? passes : 10;
	const input = sourcefield.array;
	const div = 1.0/((1+4*diffusion));
	const w = sourcefield.width, h = sourcefield.height;	
	if (w != this.width || h != this.height) {
		console.log("field2D.diffuse(): field dims do not match.");
		return this;
	}
	// Gauss-Seidel relaxation scheme:
	for (var n = 1; n < passes; n++) {
		for (var y = 0; y < h; y++) {
			for (var x = 0; x < w; x++) {
				const C = (y * w + x) * 4;
				const S = (wrap(y-1,h) * w + x) * 4;
				const W = (y * w + wrap(x-1,w)) * 4;
				const N = (wrap(y+1,h) * w + x) * 4;
				const E = (y * w + wrap(x+1,w)) * 4;
				for (let i=0; i<4; i++) {
					const old = input[C+i];
					const near = array[W+i] + array[E+i] + array[S+i] + array[N+i];
					array[C+i] = div * (old + diffusion * near);
				}
			}
		}
	}
	return this;
};

  
field2D.prototype.draw = function() {
  for (let i = 0, l = this.array.length; i < l; i++) {   
    this.data[i] = Math.floor(this.array[i] * 255) & 0xff;
  }
  this.ctx.putImageData(this.imgdata, 0, 0);
  
  const w = Math.max(this.canvas.width, this.canvas.height);
  
  ctx.imageSmoothingEnabled = this.smooth;
  ctx.mozImageSmoothingEnabled = ctx.imageSmoothingEnabled;
  ctx.webkitImageSmoothingEnabled = ctx.imageSmoothingEnabled;
  ctx.msImageSmoothingEnabled = ctx.imageSmoothingEnabled;
  ctx.drawImage(this.canvas, 
                0, 0, w, w, 
                0, 0, 1, 1);
  
	// this.bindtexture();
	// draw2D.rect(0.5, 0.5, 1);
	// gl.bindTexture(gl.TEXTURE_2D, texture_default);
  return this;
};
  
// load image at `path` 
// call `callback` when complete
// loading can take some time
// image path must be CORS-friendly
field2D.prototype.loadImage = function(path, callback) {
  let self = this;
  let img = new Image();   
  img.crossOrigin = ""; 
  img.onload = function() {
    // draw image into my canvas:
    self.ctx.drawImage(img,
                      0, 0, this.width, this.height,
                      0, 0, self.width, self.height);
    // copy it back:
    self.imgdata = self.ctx.getImageData(0, 0, self.width, self.height); 
    self.data = self.imgdata.data;
    for (let i = 0, l = self.array.length; i < l; i++) {   
      self.array[i] = self.data[i]/255;
    }
    // continue:
    if (callback) callback.apply(self);
  }
  // trigger the load:
  img.src = path; 
}

  
////////////////////////////////////////////////////////////////////
// Event handler registration
////////////////////////////////////////////////////////////////////
  
window.addEventListener( "keydown", function(event) {
	//console.log("keydown", event.key, event.keyCode);
	let k = event.key || event.keyCode;
	if (k === "Escape" || k === 27) requestFullscreen(canvas.parentElement);
	if (k === "Enter") fps.reset();
	
	//if (k == 27) requestFullscreen(document.body);
	//if (k == 27) requestFullscreen(canvas);
	//if (k == 27) requestFullscreen(canvas.parentNode);
	
	if (typeof(key) === "function") key("down", k);
	if (typeof(keydown) === "function") keydown(k);
	// only printable characters:
	let c = String.fromCharCode(k).replace(/[^ -~]+/g, "");	
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

canvas.addEventListener( "keyup", function(event) {
	let k = event.key || event.keyCode;
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

canvas.addEventListener("keypress", function(event) {
  let c = String.fromCharCode(event.which).replace(/[^ -~]+/g, "");	
	if (c == " ") updating = !updating;
	if (c !== "" && typeof(key) === "function") key("press",c);
	if (c !== "" && typeof(keypress) === "function") keypress(c);
  event.preventDefault();
}, true);
  
canvas.addEventListener("pointerdown", function(event) {
  canvas.focus();
	mouseevent(event, "down");
}, false);
  
canvas.addEventListener("pointerup", function(event) {
	mouseevent(event, "up");
}, false);

canvas.addEventListener("pointermove", function(event) {
	mouseevent(event, "move");
}, false);

canvas.addEventListener("pointerout", function(event) {
	mouseevent(event, "out");
}, false);

canvas.addEventListener("pointerenter", function(event) {
	canvas.focus();
  mouseevent(event, "in");
}, false);

window.addEventListener('resize', onresize, false);
onresize();
requestAnimationFrame(render);