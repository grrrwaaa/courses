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
  
clamp = function(n, lo, hi) {
  return Math.min(Math.max(n, lo), hi);
}

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
let ctxpixelscale = 1;
let overlay = document.createElement("div");
document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.style.backgroundColor = "#000";
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
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.setTransform(ctxtransform[0], ctxtransform[1],
                 ctxtransform[2], ctxtransform[3], 
                 ctxtransform[4], ctxtransform[5]);
  ctxpixelscale = 1/ctxtransform[0];
  ctx.lineWidth = ctxpixelscale;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
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
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.setTransform(ctxtransform[0], ctxtransform[1],
                 ctxtransform[2], ctxtransform[3], 
                 ctxtransform[4], ctxtransform[5]);
    ctxpixelscale = 1/ctxtransform[0];
    ctx.lineWidth = ctxpixelscale;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
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
	let lo = Math.min(array[0], array[1], array[2]);
	let hi = Math.max(array[0], array[1], array[2]);
	for (let i = 4; i < l; i += 4) {
		lo = Math.min(lo, array[i], array[i + 1], array[i + 2]);
		hi = Math.max(hi, array[i], array[i + 1], array[i + 2]);
	}
	const range = hi - lo;
	if (range > 0) {
		const scale = 1 / range;
		for (let i = 0; i < l; i += 4) {
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
			array[i01 + c] = v01 + xa*yb*(v);
			array[i11 + c] = v11 + xb*yb*(v);
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
			array[i01 + c] = v01 + xa*yb*(v - v01);
			array[i11 + c] = v11 + xb*yb*(v - v11);
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
    this.data[i] = Math.floor(clamp(this.array[i], 0, 1) * 255); 
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
// vec2
////////////////////////////////////////////////////////////////////
 
vec2 = function vec2(x, y) {
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
  
vec2.oob = function(v, lo, hi) {
  if (hi === undefined) { 
		hi = lo;
		lo = 0; 
	}
  return v[0] < lo || v[0] >= hi || v[1] < lo || v[1] >= hi; 
}

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
  
let fold2 = function(f, def) {
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
  
vec2.floor = function(out, v) {
	out[0] = Math.floor(v[0]);
	out[1] = Math.floor(v[1]);
	return out;
};
  
vec2.ceil = function(out, v) {
	out[0] = Math.ceil(v[0]);
	out[1] = Math.ceil(v[1]);
	return out;
};
  
vec2.round = function(out, v) {
	out[0] = Math.round(v[0]);
	out[1] = Math.round(v[1]);
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
vec2.prototype.oob = function(lo, hi) { return vec2.oob(this, lo, hi); }
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
vec2.prototype.floor = function() { return vec2.floor(this, this); };
vec2.prototype.ceil = function() { return vec2.ceil(this, this); };
vec2.prototype.round = function() { return vec2.round(this, this); };
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
vec2.prototype.clamp = vec2.prototype.clip;
vec2.prototype.lerp = vec2.prototype.mix;

// utility constructors:
let make_vec2_fun = function (f) {	// hack because of JS scope annoyance
	return function() { return f.apply(new vec2(), arguments); };
};
let constructor_names = [ "random", "fromAngle", "fromPolar" ];
for (var i=0; i<constructor_names.length; i++) {
	var k = constructor_names[i];
	var f = vec2.prototype[k];
	vec2[constructor_names[i]] = make_vec2_fun(f);
}
  
////////////////////////////////////////////////////////////////////
// Draw2D wraps the canvas drawing API
////////////////////////////////////////////////////////////////////
 
draw2D = {
  
  push() {
    ctx.save();
    return this;
  },
  
  pop() {
    ctx.restore();
    return this;
  },
  
  scale(...args) {
    let x = 1, y = 1;
    let a = args[0];
    if (typeof a == "object") {
      x = a[0] != undefined ? a[0] : 1;
      y = a[1] != undefined ? a[1] : 1;
    } else if (typeof a == "number") {
      x = a;
      y = args[1] != undefined ? args[1] : x;
    }
    ctx.scale(x, y);
    return this;
  },
  
  rotate(...args) {
    let a = args[0];
    if (typeof a == "object") {
      ctx.rotate(vec2.angle(a));
    } else if (typeof a == "number") {
      ctx.rotate(a);
    }
    return this;
  },
  
  translate(...args) {
    let x = 0, y = 0;
    let a = args[0];
    if (typeof a == "object") {
      x = a[0] || 0;
      y = a[1] || 0;
    } else if (typeof a == "number") {
      x = a;
      y = args[1] || 0;
    }
    ctx.translate(x, y);
    return this;
  },
  
  // rect([x, y], dx, dy)
  // rect([x, y], d)
  // rect([x, y])
  // rect(dx, dy)
  // rect(d)
  // rect()
  rect(...args) {
    let x = 0, y = 0, w = 1, h = 1;
    let a = args[0];
    if (typeof a == "object") {
      w = args[1] != undefined ? args[1] : 1;
      h = args[2] != undefined ? args[2] : w;
      x = a[0] || 0;
      y = a[1] || 0;
    } else if (typeof a == "number") {
      w = a;
      h = args[1] != undefined ? args[1] : w;
    }
    ctx.fillRect(x-w*0.5, y-h*0.5, w, h);
    return this;
  },
  
  circle(...args) {
    let x = 0, y = 0, w = 1, h = 1;
    let a = args[0];
    if (typeof a == "object") {
      w = args[1] != undefined ? args[1] : 1;
      h = args[2] != undefined ? args[2] : w;
      x = a[0] || 0;
      y = a[1] || 0;
    } else if (typeof a == "number") {
      w = a;
      h = args[1] != undefined ? args[1] : w;
    }
    ctx.beginPath();
    ctx.ellipse(x, y, w*0.5, h*0.5, 0, -Math.PI, Math.PI);
    ctx.fill();
    return this;
  },
  
  triangle(...args) {
    let x = 0, y = 0, w = 1, h = 1;
    let a = args[0];
    if (typeof a == "object") {
      w = args[1] != undefined ? args[1] : 1;
      h = args[2] != undefined ? args[2] : w;
      x = a[0] || 0;
      y = a[1] || 0;
    } else if (typeof a == "number") {
      w = a;
      h = args[1] != undefined ? args[1] : w;
    }
    let w2 = w*0.5;
    let h2 = h*0.5;
    ctx.beginPath();
    ctx.moveTo(x-w2, y-h2);
    ctx.lineTo(x+w2, y);
    ctx.lineTo(x-w2, y+h2);
    ctx.fill();
    return this;
  },
  
  // line(p0, p1, thickness)
  // line(p0, p1)
  // line(p0, thickness)
  // line(p0)
  // line()
  line(...args) {
    let thickness = args[args.length-1];
    if (typeof thickness != "number") {
      thickness = 1;
    }
    let p1 = args[1];
    if (typeof p1 != "object") {
      p1 = [0, 0];
    }
    let p0 = args[0];
    if (typeof p0 != "object") {
      p0 = [0, 0];
    }
    ctx.lineWidth = thickness/ctxtransform[0];
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.lineTo(p1[0], p1[1]);
    ctx.stroke();
	},
  
  // line(p0, p1, thickness)
  // line(p0, p1)
  // line(p0, thickness)
  // line(p0)
  // line()
  lines(list, thickness=1) {
		ctx.lineWidth = thickness/ctxtransform[0];
		if (list.length < 2) return;
		ctx.beginPath();
		for (let i=0; i<list.length; i+=2) {
			ctx.moveTo(list[i][0], list[i][1]);
    	ctx.lineTo(list[i+1][0], list[i+1][1]);
		}
    ctx.stroke();
  },
  
  // color("red") 
  // color("#ff3399")
  // color(1, 1, 1, 0.5) // rgb+alpha
  // color(1, 1, 1) // rgb
  // color(1, 0.5) // greyscale+alpha
  // color(0.5);  // greyscale
  // color([1, 0, 1])
  color(...args) {
    let color = args[0];
    if (typeof color == "string") {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
    } else if (typeof color == "number") {
      let r = color*255;
      if (args.length >= 4) {
        color = `rgba(${r}, ${args[1]*255}, ${args[2]*255}, ${args[3]})`;
      } else if (args.length == 3) {
        color = `rgb(${r}, ${args[1]*255}, ${args[2]*255})`;
      } else if (args.length == 2) {
        color = `rgba(${r}, ${r}, ${r}, ${args[1]})`;
      } else {
        color = `rgb(${r}, ${r}, ${r})`;
      }
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
    } else if (typeof color == "object") {
      draw2D.color.apply(this, color);
    } else {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
    }
  },
  
  // hsl(0, 0.5, 0.5, 0.5) // hue, saturation, luma, alpha
  // hsl(0, 0.5, 0.5) // hue, saturation, luma
  // hsl(0, 0.5) // hue, alpha
  // hsl(0.5);  // hue
  hsl(...args) {
    let color = args[0];
    if (typeof color == "number") {
      let c = color*360;
      if (args.length >= 4) {
        color = `hsla(${c}, ${args[1]*100}%, ${args[2]*100}%, ${args[3]})`;
      } else if (args.length == 3) {
        color = `hsl(${c}, ${args[1]*100}%, ${args[2]*100}%)`;
      } else if (args.length == 2) {
        color = `hsla(${c}, 50%, 50%, ${args[1]})`;
      } else {
        color = `hsl(${c}, 50%, 50%)`;
      }
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
    } else if (typeof color == "object") {
      draw2D.hsl.apply(this, color);
    } else {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
    }
  },
  
};
  

  
////////////////////////////////////////////////////////////////////
// Space hash
////////////////////////////////////////////////////////////////////
  
/*

	let space = new SpaceHash({
		width: 1000,
		height: 1000,
		cellSize: 25
	});

	// first creation:
	for (let o of objs) {
		// assumes existince of
		// o.pos[0]
		// o.pos[1]
		space.insertPoint(o);

		// or, larger objects, whose size is > space.cellSize:
		// assumes existence of o.size
		space.insert(o);
	}

	// update:
	for (let o of objs) {
      	o.move();
		space.updatePoint(o);
		
		// or for larger objects:
		space.update(o);
	}
	
	// near is a list of nearest objs to pos = [x, y]
	let near = space.search(pos, radius);

*/

class hashspace2D {

  constructor(dim) {
    if (dim == undefined) dim = 16;
    this.numCellsH = Math.round(dim);
    this.numCellsV = Math.round(dim);
    this.rCellSize = dim;
    this.cellSize = 1/dim;
    // round up range to whole number of cells:
    this.width = this.numCellsH * this.cellSize;
    this.height = this.numCellsV * this.cellSize;
    this.maxRadius = Math.min(this.width, this.height) / 2;
    this.numCells = this.numCellsH * this.numCellsV;
    this.clear();

    // create a list of shells
    let shells = [];
    // compute the cell offsets for every cell with respect to a point at the center of the space:
    let cv = Math.floor(this.numCellsV/2);
    let ch = Math.floor(this.numCellsH/2);
    let maxRad2 = this.maxRadius*this.maxRadius;
    for (let v=0; v<this.numCellsV; v++) {
      for (let h=0; h<this.numCellsH; h++) {
        // squared radius of cell from cv,ch, in 'pixels':
        let radius2 = ((v-cv)*(v-cv) + (h-ch)*(h-ch)) * (this.cellSize*this.cellSize); 
        if (radius2 < maxRad2) {
          shells.push({
            // the offset:
            v: v-cv,
            h: h-ch,
            // squared radius of cell from cv,ch, in 'pixels':
            radius2: radius2
          });
        }
      }
    }
    shells.sort((a,b) => a.radius2-b.radius2);
    this.shells = shells;
  }

  clear() {
    this.cells = [];
    for (let i = 0; i < this.numCells; i++) this.cells[i] = [];
    return this;
  }

  insertPoint(item) {
    const px = item.pos[0], py = item.pos[1];
    const rCellSize = 1 / this.cellSize;
    var h = Math.max(Math.min(~~(px * rCellSize), this.numCellsH - 1), 0);
    var v = Math.max(Math.min(~~(py * rCellSize), this.numCellsV - 1), 0);
    item.__spacehash = { cellH: h, cellV: v };
    this.cells[v * this.numCellsH + h].push(item);
    return this;
  }

  removePoint(item) {
    if (!item.__spacehash) return;
    var v = item.__spacehash.cellV, h = item.__spacehash.cellH;
    var idx = v * this.numCellsH + h;
    var cell = this.cells[idx];
    var k = cell.indexOf(item);
    if (k !== -1) cell.splice(k, 1);
    return this;
  }

  updatePoint(item) {
    // old location
    var ov = item.__spacehash.cellV, oh = item.__spacehash.cellH;
    var oidx = ov * this.numCellsH + oh;
    // new location
    var nx = item.pos[0], ny = item.pos[1];
    var rCellSize = 1/this.cellSize;
    var nh = Math.max(Math.min(~~(nx * rCellSize), this.numCellsH - 1), 0);
    var nv = Math.max(Math.min(~~(ny * rCellSize), this.numCellsV - 1), 0);
    var idx = nv * this.numCellsH + nh;

    if (idx === oidx) return; // no need ot update, we're in the same cell
    // remove from old:
    var cell = this.cells[oidx];
    var k = cell.indexOf(item);
    if (k !== -1) cell.splice(k, 1);
    // update item:
    item.__spacehash.cellH = nh;
    item.__spacehash.cellV = nv;
    // add to new
    this.cells[idx].push(item);
    return this;
  }

  insert(item) {
    const bl = item.pos[0] - item.size;
    const br = item.pos[0] + item.size;
    const bt = item.pos[1] - item.size;
    const bb = item.pos[1] + item.size;
    const rCellSize = 1 / this.cellSize;
    // AABB bounding cells of this item:
    var cellH = Math.max(Math.min(~~(bl * rCellSize), this.numCellsH - 1), 0);
    var cellV = Math.max(Math.min(~~(bt * rCellSize), this.numCellsH - 1), 0);
    var cellH2 = Math.max(Math.min(~~(br * rCellSize), this.numCellsH - 1), 0);
    var cellV2 = Math.max(Math.min(~~(bb * rCellSize), this.numCellsH - 1), 0);
    item.__spacehash = {
      cellH: cellH, cellV: cellV,
      cellV2: cellV2, cellH2: cellH2
    };
    var v, h, idx;
    for (v = cellV; v <= cellV2; v++) {
      for (h = cellH; h <= cellH2; h++) {
        this.cells[v * this.numCellsH + h].push(item);
      }
    }
    return this;
  }

  remove(item) {
    if (!item.__spacehash) return;
    var cellH = item.__spacehash.cellH;
    var cellH2 = item.__spacehash.cellH2;
    var cellV = item.__spacehash.cellV;
    var cellV2 = item.__spacehash.cellV2;
    var v, h, k, idx;
    for (v = cellV; v <= cellV2; v++) {
      for (h = cellH; h <= cellH2; h++) {
        idx = v * this.numCellsH + h;
        k = this.cells[idx].indexOf(item);
        if (k !== -1) this.cells[idx].splice(k, 1);
      }
    }
    return this;
  }

  update(item) { 
    return this.remove(item).insert(item);
  }

  // searches for entries within 'radius' distance of 'pos' = [x, y]
  // returns a list of what it finds
  // list will be only approximately sorted by distance
  // pos = o.pos, the list will include o
  // the number of results is not clamped
  searchPosition(pos, dist) {
    const rCellSize = 1 / this.cellSize;
    const ch = (pos[0] * rCellSize);
    const cv = (pos[1] * rCellSize);
    const dist2 = dist * dist;
    var i, v, h, l, n, npos, shell, cell, relx, rely, d2;
    var res = [];
    for (i=0; i<this.shells.length; i++) {
      shell = this.shells[i];
      if (shell.radius2 > dist2) break;
      h = Math.max(Math.min(~~(ch + shell.h), this.numCellsH - 1), 0);
      v = Math.max(Math.min(~~(cv + shell.v), this.numCellsV - 1), 0);
      cell = this.cells[v * this.numCellsH + h];
      l = cell.length;
      for (n = 0; n < l; n++) {
        npos = cell[n].pos;
        relx = npos[0] - pos[0], rely = npos[1] - pos[1];
        d2 = relx * relx + rely * rely;
        if (d2 <= dist2) {
          res.push(cell[n]);
        }
      }
    }
    return res;
  }

  // searches for entries within 'radius' distance of 'self.pos' = [x, y]
  // returns a list of what it finds
  // list will be only approximately sorted by distance
  // pos = o.pos, the list will include o
  search(self, dist, limit=Infinity, res=[]) {
    if (self.pos == undefined) return this.searchPosition(self, dist);
    const pos = self.pos;
    if (dist==undefined) dist = self.size || 1;
    const rCellSize = 1 / this.cellSize;
    const ch = (pos[0] * rCellSize);
    const cv = (pos[1] * rCellSize);
    const dist2 = dist * dist;
    var i, v, h, l, n, neighbour, npos, shell, cell, relx, rely, d2;
    res.length = 0;
    for (i=0; i<this.shells.length; i++) {
      shell = this.shells[i];
      if (shell.radius2 > dist2) break;
      h = Math.max(Math.min(~~(ch + shell.h), this.numCellsH - 1), 0);
      v = Math.max(Math.min(~~(cv + shell.v), this.numCellsV - 1), 0);
      cell = this.cells[v * this.numCellsH + h];
      l = cell.length;
      for (n = 0; n < l; n++) {
        neighbour = cell[n];
        // skip self:
        if (self == neighbour) continue;
        // need this check, otherwise non-point objects 
        // and objects near borders can appear multiple times
        if (res.indexOf(neighbour) !== -1) continue;
        npos = neighbour.pos;
        relx = npos[0] - pos[0], rely = npos[1] - pos[1];
        d2 = relx * relx + rely * rely;
        if (d2 <= dist2) {
          res.push(neighbour);
          if (res.length >= limit) return res;
        }
      }
    }
    return res;
  }

  // searches the AABB box around a point
  searchSimpler(pos, dist) {
    const dist2 = dist * dist;
    // ideal search bounds:
    const bl = pos[0] - dist;
    const br = pos[0] + dist;
    const bt = pos[1] - dist;
    const bb = pos[1] + dist;
    // limited cell search bounds:
    const rCellSize = 1 / this.cellSize;
    const cellH = Math.max(~~(bl * rCellSize), 0);
    const cellH2 = Math.min(~~(br * rCellSize), this.numCellsH - 1);
    const cellV = Math.max(~~(bt * rCellSize), 0);
    const cellV2 = Math.min(~~(bb * rCellSize), this.numCellsV - 1);
    // apparently faster to name variables outside the loops
    let v, h, cell, l, n, npos, relx, rely, d2;
    let res = [];
    // might be able to speed this up by caching the set of cell offests to search for a given radius
    // (which, if arranged as a spiral, could also do a pseudo distance sort for free)
    for (v = cellV; v <= cellV2; v++) {
      for (h = cellH; h <= cellH2; h++) {
        cell = this.cells[v * this.numCellsH + h];
        l = cell.length;
        for (n = 0; n < l; n++) {
          npos = cell[n].pos;
          (relx = npos[0] - pos[0]), (rely = npos[1] - pos[1]);
          d2 = relx * relx + rely * rely;
          if (d2 <= dist2) {
            res.push(cell[n]);
          }
        }
      }
    }
    return res;
  }
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