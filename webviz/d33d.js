/*
	d33d glue
	
	With *D3* being one of the most acclaimed data visualization libraries for the web, and *three.js* being probably the widest-used programming interface to WebGL, it seems natural to combine them for 3D visualizations. 

	It's not so easy however. D3 operates on the HTML DOM (Document Object Model) itself, either by manipluating regular DOM elements such as ```<div>```, or by manipulating graphical DOM elements created using SVG (Scalable Vector Graphics). But WebGL is entirely contained within a single ```<canvas>``` tag, and its 3D objects are not part of the DOM. 

	Fortunately, with a bit of glue code, we can extend Three.js's ```Object3D``` prototype to "look like" a DOM node. The glue code provides ```Object3D``` with all the method names D3 expects to find in DOM nodes, but implements them in terms of changes to a 3D WebGL scene. Since ```Object3D``` is the base class of most of three.js's 3D objects, this means we can use D3's great data handling, data binding, and transitions work with 3D scenes.
	
	Derived from:
	http://jsdo.it/makc/8IVU
	https://makc3d.wordpress.com/2013/11/01/using-d3-js-with-three-js-part-i/
	https://makc3d.wordpress.com/2013/11/01/using-d3-js-with-three-js-part-ii/

*/

// to make D3's .append() work:
THREE.Object3D.prototype.appendChild = function(c) {
    this.add(c);
    c.parentNode = this; // needed for .remove() to work
    return c;
}

// to make D3's .selectAll() work:
THREE.Object3D.prototype.querySelectorAll = function(selector) {
	var matches = [];
	var type = eval(selector);
	// for recursive selection:
	var inner = function(obj) {
		for (var i = 0; i < obj.children.length; i++) {
			var child = obj.children[i];
			if (child instanceof type) {
				matches.push(child);
			}
			inner(child);
		}
	}
	inner(this);
	return matches;
}

// to make D3's remove work:
THREE.Object3D.prototype.removeChild = function(c) {
	this.remove(c);
}

// this one is to use D3's .attr() on THREE's objects
THREE.Object3D.prototype.setAttribute = function(name, value) {
    var chain = name.split('.');
    var object = this;
    for (var i = 0; i < chain.length - 1; i++) {
		object = object[chain[i]];
    }
    object[chain[chain.length - 1]] = value;
}

// and to work with D3's .transition
THREE.Object3D.prototype.getAttribute = function(name) {
	var chain = name.split('.');
	var object = this;
	for (var i = 0; i < chain.length - 1; i++) {
		object = object[chain[i]];
	}
	return object[chain[chain.length - 1]];
}