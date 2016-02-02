
importance: 3

---

# Labs

[![Labs of the paleofuture](img/collaborative_coding.jpg)](http://paleofuture.com/blog/2011/8/24/the-push-button-school-of-tomorrow-1958.html)

Most of the examples we will work though in the labs will use the JavaScript programming language, embedded in web browsers. To make this easier, I have prepared a starter-kit template, from which all our in-lab examples will be written, and which students can easily fork and extend via Codepen.io's online editor. (I am happy however to also demonstrate taking these ideas into different environments, such as Max/MSP, Cinder, GLSL, Unreal, etc., and we may spend more time doing this in the later parts of the course.)

---

To start a new script, [open the following link and then press the "Fork" button to create a new copy](http://codepen.io/grrrwaaa/pen/qObgdb?editors=001)

Alternatively, click the button below, then close the CSS and HTML tabs:

<form action="http://codepen.io/pen/define" method="POST" target="_blank">
<input id="data-input" type="hidden" name="data" value="{&amp;quot;title&amp;quot;:&amp;quot;DATT4950&amp;quot;,&amp;quot;description&amp;quot;:&amp;quot;Artificial Life&amp;quot;,&amp;quot;css_external&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js_external&amp;quot;:&amp;quot;https://grrrwaaa.github.io/courses/code/al.min.js&amp;quot;,&amp;quot;html&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js&amp;quot;:&amp;quot;// see https://grrrwaaa.github.io/courses/datt4950/labs.html for available methods\n\n// initialization code here\n\nfunction update() {\n  // simulation code here\n}\n\nfunction draw() {\n  // rendering code here\n}&amp;quot;,&amp;quot;html_pre_processor&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_pre_processor&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_starter&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_prefix&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js_library&amp;quot;:&amp;quot;&amp;quot;}">
<input type="submit" value="Create a new Codepen editor">
</form> 

Alternatively, if you want to edit offline, download the library from [here](http://grrrwaaa.github.io/courses/code/al.min.js), saving it as "al.min.js" in a local folder, and put your code into an ```html``` file in the same folder starting from this template:

```
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="al.min.js"></script>
</head>
<body>
<script>

// Your code goes here
// see http://grrrwaaa.github.io/courses/datt4950/labs.html for available methods

// initialization code here

function update() {
	// simulation code here
}
  
function draw() {
	// rendering code here
}

</script>
</body>
</html>
```

---

> If you haven't used JavaScript before, I've provided a [quick introduction here](js.html)

Here's an example:

<p data-height="480" data-theme-id="0" data-slug-hash="EVPGOB" data-preview ="true" data-default-tab="result" data-user="grrrwaaa" class='codepen'>See the Pen <a href='http://codepen.io/grrrwaaa/pen/EVPGOB/'>Game of Life</a> by Graham (<a href='http://codepen.io/grrrwaaa'>@grrrwaaa</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="http://assets.codepen.io/assets/embed/ei.js"></script>

If the example above doesn't work, it might be that you are among the [~10% of users](http://webglstats.com) whose browsers don't yet support WebGL. You can check support [here](http://www.doesmybrowsersupportwebgl.com), and compare browser support [here](http://caniuse.com/#feat=webgl). Note that IE users need to have version 11, or use Edge. Chrome has had good support for a long time. Safari has supported WebGL since version 8. Firefox has partial support. 

## Overview

Graphics rendering uses the HTML5 Canvas and WebGL, which is supported on most computers with recent versions of Chrome, Firefox or Safari. The starter-kit uses WebGL technology for performance, but for simplicity's sake examples will be confined to a 2D world, and coded through simplified abstractions. This world has coordinates ranging from (0,0) in the bottom-left corner to (1,1) in the top right corner -- i.e. it assumes the world to be square shaped and unit length. 

## Callbacks

The kit provides an event-based callback system, in which you implement specially-named functions to handle specific events.

For simulation updates, implement a function called ```update()```. 

<!-- delta time argument -->

To define how the canvas renders, implement a function called ```draw()```. All graphics code should go into this callback.

### Interaction

Two additional callbacks exist to detect mouse and keyboard interaction respectively. 

```javascript
function mouse(event, point) {
	console.log(event, point);
}

function key(event, key) {
	console.log(event, key);
}
```

## Globals

The starter-kit provides a few extra global functions that are frequently needed:

```random()``` can be used to generate random numbers. Without an argument it returns rational numbers between 0 and 1; with a numeric argument it returns integers in the given range (e.g. useful for picking within an array).

```wrap()``` applies a Euclidean modulo (remainder after division) in such a way that the result is always positive and without reflections.

```javascript
random(); 		// a floating-point number between 0 and 1
random(6);		// an integer between 0 and 5
wrap(-1, 4);	// returns 3 (whereas -1 % 4 would return -1)
```

The ```write()``` function will output text above the main canvas. It can be more useful than calling ```console.log()``` in certain situations, since the text will reset on each frame. 

## field2D

The ```field2D``` type represents a dense grids of cells of floating point numbers (typically but not necessarily in the range of zero to one). You can create a field like this:

```javascript
var field = new field2D(width, height);
```

Typically we will render a field in the ```draw()``` callback by calling the field's draw method:

```javascript
function draw() {
	field.draw();
}
```

By default field cells will be zero, which looks black. You can get and set individual field cells this way:

```javascript
var value = field.get(x, y);
field.set(value, x, y);
```

Note that if x or y is out of bounds for the field, it will wrap around from the other side. So you are always guaranteed it will return or set a value. 

To set the value of all cells at once, omit the x and y:

```javascript
// set all field cells to 1 (white):
field.set(1);
```

A more powerful feature of ```field2D.set()``` is that it can take a function instead of a number. When x and y are omitted, this function is called to update each cell in the field. The function receives as arguments the x and y position of the cell, so for example, this code initializes the field with a horizontal gradient:

```javascript
field.set(function(x, y) {
	return x / this.width;
});
```

Note that ```field.set``` returns the field itself, so it can be chained.`

More useful methods:

```javascript
field.clear(); 		// set all field cells to zero, faster than field.set(0)
field.normalize();	 // re-scales the field into a 0..1 range

field.clone(); 	// create a duplicate copy of the field

field.min();	// returns the lowest cell value in the array
field.max();	// returns the highest cell value in the array
field.sum();	// adds up all cell values and returns the total

field.scale(n); // multiply all cells by n
```

### Normalized sampling

There are some methods for interpolated reading/writing/modifying fields. These methods use x and y indices in a normalized 0..1 floating-point range rather than 0..width or 0..height integer range:

```javascript
// returns interpolated value at the normalized position x,y
var value = field.sample(x, y);		
// or, using a vec2:
var value = field.sample(agent.position);	

// adds v to a field at position x, y
// (interpolated addition to nearest four cells)
field.deposit(v, x, y);	
// also accepts vec2
// a negative deposit is a debit (subtraction from field)
field.deposit(-v, agent.position);

// set the field at position x,y to value v 
// (the four nearest cells will be interpolated)
field.update(v, x, y);
```

The field2D type also includes a diffusion method, which can be used to smoothly distribute values over time. It requires a second (previous) copy of the field to diffuse from. This method more than just a general blur -- it very accurately preserves mass before and after. So, for example, taking the ```.sum()``` of the input and output fields results in almost exactly the same quantity. 


```javascript
// field_previous is another field2D of equal dimensions
// diffusion_rate is a value between 0 and 1; a rate of 0 means no diffusion.
// accuracy is an optional integer for the number of diffusion steps; the default is 10.
field.diffuse(field_previous, diffusion_rate, accuracy);
```

There are also a couple of classic functional programming methods. The ```map(function)``` method applies a function to each cell of the field in turn. The function arguments will be the current value of the cell and the x and y position, and the return value should be the new value of the cell (or nil to indicate no change). 

The ```reduce(function, initial)``` method is used to reduce a field to a single value, such as calculating the total of all cells. This value is defined by the ```initial``` argument, passed to the function for each cell, and updated by its return value. Easier to explain by example:

```javascript
// multiply all cells by 2: 
field.map(function(value, x, y) { return value * 2; });

// find the sum total of all cell values:
var total = field.reduce(function(sum, value, x, y) {
	return sum + value;
}, 0);
```

### Multi-channel fields

Field cells are in fact 4-channel vectors, mapping to red, green, blue and alpha channels when rendered; however the methods described above are designed to simulate single-channel (greyscale) semantics.

Whereas ```field.get``` returns a single number (the red-channel value), ```field.cell``` returns the entire 4-plane vector as an array, which you can modify in-place to set a particular color:

```javascript
// turn a cell red:
var cell = field.cell(x, y);
cell[0] = 1;
cell[1] = 0;
cell[2] = 0;
```

Alternatively, you can pass an array to ```field.set```:

```javascript
// turn a cell red:
field.set([1, 0, 0], x, y);
```

The normalized indexing and updating also supports multiple channels:

```javascript
// to sample a specific channel (0, 1, 2 or 3):
field.sample(agent.position, channel);	

// to update a single channel):
field.deposit(0.1, agent.position, channel);
// to update several channels:
field.deposit([1, 0.5, 0.1], agent.position);
```

## vec2

The ```vec2``` type gives us a useful abstraction of two-component vectors. Here are some ways of creating a vec2:

```javascript
var v0 = new vec2(x, y);
var v1 = new vec2(); 	// x and y components default to zero

v0 = vec2.create(x, y); // equivalent to above
v1 = vec2.create();

var v2 = v0.clone();	// remember, v2 = v0 would not make a new copy

var v3 = vec2.random(); // a vector with unit length but random direction
var v4 = vec2.random(0.1); // as above, but length is 0.1

var v5 = vec2.fromPolar(len, angle_in_radians);
var v6 = vec2.fromPolar(angle_in_radians);	// length is 1
```

Getting some useful properties:

```javascript
var d = v0.len();		// get the magnitude of the vector
var a = v0.angle(); 	// get the direction of the vector (in radians)
var d = v0.distance(v1);	// distance between two vectors
var a = v0.anglebetween(v1);	// angle between two vectors
var b = v0.equals(v1);  // true if both components are equal
var n = v0.dot(v1);		// dot product of two vectors (related to similarity)
```

There are many methods available to call on a vec2. Some basic setters:

```javascript
v0.set(x, y);	// update a vector's values
v0.set(v1);		// update by copying from another vector

// changing the length (magnitude) of a vector:
v0.len(n);	// update a vector's length
v0.limit(n);	// shortens a vector to length n if it was longer
v0.normalize(); // set's a vector's length to 1

// changing the orientation of a vector:
v0.negate(); // reverses a vector
v0.angle(a); // set a vector's direction (in radians)
v0.rotate(a); // rotates a vector's direction (by radians)
```

Almost all methods have both an in-place version and a standalone version. The in-place version is a method called on a vec2 object, which it will probably modify as a result. The standalone version is a method called on ```vec2``` itself, and requires an argument for the result.

```javascript
// standalone:
// vout is modified; v0 and v1 are not changed
vout = new vec2();
vec2.add(vout, v0, v1);	

// in-place:
// v0 is modified; like the scalar equivalent s0 += s1
v0.add(v1); 

// Since in-place methods return themselves, they can be chained:
v0.add(v1).sub(v1).mul(v1).div(v1); // etc.
```

Note that most method arguments will accept a number (i.e. a scalar), or an array, in place of a vector: So you can say ```v0.pow(2)``` rather than ```v0.pow(new vec2(2, 2))```. 

```javascript
// These are all equivalent:
v0.pow(new vec2(2, 2));
v0.pow([2, 2]);
v0.pow(2);
```

Here are some basic algebraic methods, which operate on each component of a vector:

```javascript
// component-wise math:
v0.add(v1);
v0.sub(v1); 	// aka v0.subtract(v1)
v0.absdiff(v1); // the absolute difference between two vectors (always positive)
v0.mul(v1); 	// aka v0.multiply(v1)
v0.div(v1); 	// aka v0.divide(v1)
v0.pow(v1);		// raise v0 to the power of v1
```

There is a utility to perform linear interpolation between two vectors:

```javascript
// a linear interpolation between v0 and v1
// if t == 0, result is v0; 
// if t == 1, result is v1; 
// if t == 0.5, result is the average of v0 and v1; 
// etc. for other values of t
vec2.mix(vout, v0, v1, t);
```

There are also several useful methods for keeping vectors within bounds:

```javascript
// max retains the values that are closer to Infinity
vec2.max(vout, v0, v1);
// min retains the values that are closer to -Infinity
vec2.min(vout, v0, v1);

// lesser retains the values that are closer to zero
vec2.lesser(vout, v0, v1);
// greater retains the values that are further from zero	
vec2.greater(vout, v0, v1);

// aka clip: keeps v0 within the bounds of vlo and vhi
v0.clamp(vlo, vhi);	

// like wrap(), it gives the remainder after division
// it uses Euclidean modulo, which handles negative numbers well for toroidal space
v0.wrap(d);	

// applies wrap in a relative range, up to +d/2 and down to -d/2
// this can be useful e.g. for calculating the shortest distance between two points in toroidal space
vec2.relativewrap(vout, v0, v1);	
```

## draw2D

The ```draw2D``` namespace provides a very simple interface for drawing 2D primitives.

It uses a stack-based coordinate transform system. Push the context, apply transforms, then return back to the previous coordinate system by popping the context again:

```javascript
// create a local coordinate system:
draw2D.push();
	draw2D.translate(x, y);
	draw2D.rotate(angle_in_radians);  // or a direction vector
	draw2D.scale(sizex, sizey);
	
	// draw in local coordinate system
	//...
	
// return to global coordinate system:
draw2D.pop();
```

Most calls to draw2D can be chained together, since they return the ```draw2D``` object itself. Now typically, to move into an agent's coordinate system, operate in the order "translate, rotate, scale". So since most draw2D methods can also accept vec2 arguments, a common idiom is:

```javascript
// push into agent's local coordinate system:
draw2D.push()	
	.translate(agent.position)
	.rotate(agent.direction)
	.scale(agent.size);
	
	// draw agent body -- the X axis is agent's forward direction
	draw2D.rect();
	draw2D.circle([0.5,  0.5], 0.5);
	draw2D.circle([0.5, -0.5], 0.5);

draw2D.pop();  // done drawing agent
```

Basic shapes are as follows:

```javascript
draw2D.circle([center_x, center_y], diameter);
draw2D.circle(center_x, center_y, diameter);
draw2D.circle([center_x, center_y], diameter_x, diameter_y);
draw2D.circle(center_x, center_y, diameter_x, diameter_y);

draw2D.rect([center_x, center_y], diameter);
draw2D.rect(center_x, center_y, diameter);
draw2D.rect([center_x, center_y], diameter_x, diameter_y);
draw2D.rect(center_x, center_y, diameter_x, diameter_y);

draw2D.triangle([center_x, center_y], diameter);
draw2D.triangle(center_x, center_y, diameter);
draw2D.triangle([center_x, center_y], diameter_x, diameter_y);
draw2D.triangle(center_x, center_y, diameter_x, diameter_y);
```

If you really need a different shape, there's a method for adding new ones. But this is expensive -- don't call this in ```draw()``` or ```update()```! Create an array of vertices (they could be arrays or vec2's) and pass them to the ```draw2D.shape()``` constructor; it will return a function you can use to draw your specific shape.

```javascript
// in the main body of the script (not in update() or draw()!)
// construct a new shape
// normally vertices range between -1 and 1
var rightangletriangle = draw2D.shape([ 
	new vec2(-1, -1), new vec2(1, -1), new vec2(1, 1)
]);

// use it in draw()
function draw() {
	draw2D.color("red");
	rightangletriangle();
	
	// it takes position/size arguments just like circle, rect, triangle:
	draw2D.color("yellow");
	rightangletriangle([0.5, 0.5], 0.25);
}
```

Graphics are drawn using whatever color is currently set, via ```draw2D.color()```. 

```javascript
draw2D.color(1, 0, 0); // red
draw2D.color(0, 1, 0); // green
draw2D.color(0, 0, 1); // blue
draw2D.color(1, 1, 1, 0.5); // semi-transparent white

// set via hue, saturation, and lightness (instead of red, green, blue)
draw2D.hsl(0.5, 0.5, 0.5);
draw2D.hsl(0.5, 0.5, 0.5, 0.5);	// semi-opaque

// you can also use standard CSS colors:
draw2D.color("#ff3399"); 
draw2D.color("red");
```

The full list of named colors is [here](http://www.w3schools.com/colors/colors_hex.asp). More color methods modify the current color:

```javascript
// set opacity (0..1):
draw2D.alpha(0.5);
draw2D.opacity(0.5);

// set hue, saturation, lightness individually:
draw2D.hue(0.5);
draw2D.saturation(0.5); 
draw2D.lightness(0.5); 

// other modulations:
draw2D.darken();
draw2D.brighten();
draw2D.saturate();
draw2D.desaturate();
```

> Note that colors are also managed by push() and pop().

It is also possible to cover the shape with a field2D, by setting it as a texture. To stop using the texture, call ```draw2D.texture()``` (with no arguments), or wrap the use of textures with ```draw2D.push()``` and ```draw2D.pop()```:

```javascript
var field = field2D(16);
field.set(function() { return random(); });

// in draw():
draw2D.push();
	draw2D.texture(field);
	draw2D.rect();
draw2D.pop();
```

Finally, we can choose whether to mix drawings additively to each other, or simply replace previous drawings, by setting the blend option:

```
draw2D.blend(true);	// mix with previous drawings
draw2D.blend(false); // replace previous drawings
```

> Note: The draw2D transform and color are reset before each ```draw()``` call.


<!--

Shape API

-->

----

## Under the hood

The library code is in [GitHub here](http://github.com/grrrwaaa/courses/blob/master/code/al.js).

----

## Random intereresting links

[Math as code](https://github.com/Jam3/math-as-code/blob/master/README.md). "This is a reference to ease developers into mathematical notation by showing comparisons with JavaScript code. Motivation: Academic papers can be intimidating for self-taught game and graphics programmers." It also includes helpful links to various JavaScript libraries we can use for mathematics.