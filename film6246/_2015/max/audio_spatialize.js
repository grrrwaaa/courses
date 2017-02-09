var campos = { x:0., y:0., z:0 };
var camquat = { x:0., y:0., z:0, w:1. };

outlets = 4;

function camera_worldpos(x, y, z) {
	campos.x = x;
	campos.y = y;
	campos.z = z;	
}

function camera_worldquat(x, y, z, w) {
	camquat.x = x;
	camquat.y = y;
	camquat.z = z;	
	camquat.w = w;	
}

function H(a, b) {
	return {
		w: a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z,
		x: a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y,
		y: a.w*b.y - a.x*b.z + a.y*b.w + a.z*b.x,
		z: a.w*b.z + a.x*b.y - a.y*b.x + a.z*b.w
	};
}

function list(ox, oy, oz) {
	var dist = 0;
	// convert to relative vector:
	var x = ox - campos.x;
	var y = oy - campos.y;
	var z = oz - campos.z;
	// compute distance:
	var dist = Math.sqrt(x*x + y*y + z*z);
	var scale = 1/dist;	
	// normalized relative vector:
	var v = {
		x: x*scale,
		y: y*scale,
		z: z*scale,
		w: 0
	}
	// rotate into worldview:
	var q = camquat;
	var p = {
		w: q.w,
		x: -q.x,
		y: -q.y,
		z: -q.z
	};
	
	// v1 = qv(q1)
	
	//var o = H(H(q, v), q^-1); // rotate
	//var o = H(q^-1, H(v, q)); // unrotate
	
	var t = {
		w: /*v.w*q.w*/ - v.x*q.x - v.y*q.y - v.z*q.z,
		x: /*v.w*q.x*/ + v.x*q.w + v.y*q.z - v.z*q.y,
		y: /*v.w*q.y*/ - v.x*q.z + v.y*q.w + v.z*q.x,
		z: /*v.w*q.z*/ + v.x*q.y - v.y*q.x + v.z*q.w
	};
	var o = {
		//w: q.w*t.w + q.x*t.x + q.y*t.y + q.z*t.z, // unused
		x: q.w*t.x - q.x*t.w - q.y*t.z + q.z*t.y,
		y: q.w*t.y + q.x*t.z - q.y*t.w - q.z*t.x,
		z: q.w*t.z - q.x*t.y + q.y*t.x - q.z*t.w
	};
	
	/*
	var p = {
		x: q.w*v.x + q.y*v.z - q.z*v.y,	// x
		y: q.w*v.y + q.z*v.x - q.x*v.z,	// y
		z: q.w*v.z + q.x*v.y - q.y*v.x,	// z
		w: q.x*v.x + q.y*v.y + q.z*v.z	// -w
	};	
	// compute camera-local vector:
	var o = {
		x: p.w*q.x + p.x*q.w + p.y*q.z - p.z*q.y,  // x
		y: p.w*q.y + p.y*q.w + p.z*q.x - p.x*q.z,  // y
		z: p.w*q.z + p.z*q.w + p.x*q.y - p.y*q.x   // z
	};
	*/
	outlet(0, o.x, o.y, o.z);
	outlet(1, dist);
}
