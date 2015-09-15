
# JavaScript for the tutorial

## HTML/JavaScript starter

To start a new script, [open the following link and then press the "Fork" button to create a new copy](http://codepen.io/anon/pen/jPzMjJ/right/?editors=001)

Alternatively, click the button below, then close the CSS and HTML tabs:

<form action="http://codepen.io/pen/define" method="POST" target="_blank">
<input id="data-input" type="hidden" name="data" value="{&amp;quot;title&amp;quot;:&amp;quot;Artificial Life&amp;quot;,&amp;quot;description&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_external&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js_external&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;html&amp;quot;:&amp;quot;<script src=\&amp;quot;http://grrrwaaa.github.io/courses/alife/al.min.js\&amp;quot;></script>&amp;quot;,&amp;quot;css&amp;quot;:&amp;quot;body {\n    background: #aaa;\n    width: 512px;\n    min-height: 100%;\n    margin: 50px auto 50px auto;\n}&amp;quot;,&amp;quot;js&amp;quot;:&amp;quot;al.init();\n/// put your JavaScript code here //////////////////////////////////////////////\n\n// put your variables here\n\nfunction reset() {\n\t// re-initialize the simulation here\n}\n\nfunction update() {\n\t// animate your scene here\n}\n\nfunction draw(ctx) {\n\t// put your drawing calls here\n}\n\nfunction mouse(event, button, x, y) {\n\t// handle mouse events here\n}\n\nfunction key(event, k) {\n\t// handle key events here\n}\n\n/// end of user code ///////////////////////////////////////////////////////////\nreset();\nal.start();&amp;quot;,&amp;quot;html_pre_processor&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_pre_processor&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_starter&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_prefix&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js_library&amp;quot;:&amp;quot;&amp;quot;}">
<input type="submit" value="Create a new Codepen editor">
</form>
  
Or, if you prefer to edit a file locally, download and edit [this template](template.html) (right-click and 'download file as').

# Starter library

The al.js library we provide adds several powerful helpers to make it faster to prototype ideas. 

## Callbacks

To define how the canvas renders, implement a function called ```draw()```. The ```draw``` function receives the canvas context as its first argument, so any [HTML5 canvas API](http://www.w3schools.com/tags/ref_canvas.asp) calls can be used. For simulation updates, implement a function called ```update()```. This function will receive a delta-time argument, representing the time in seconds since the last time it was called. The ```reset()``` function is used to re-initialize variables, when the "reset" button on the HTML page is pressed.

For example:

```javascript
var x = 0;

function reset() {
	x = 0;
}

function draw (ctx) {
	ctx.fillStyle = "green";
	ctx.fillRect(x, 0.5, 0.1, 0.1);
}

function update(dt) {
	x = x + dt*0.1;
}
```

### Interaction

Two additional callbacks exist to detect mouse and keyboard interaction respectively. 

```javascript
// event can be "down" or "up" for clicks,
// or "drag" when moving with a mouse button pressed,
// or "move" when moving with no button pressed,
// event is "enter" when the mouse enters the canvas, and "exit" when the mouse goes outside it
// button is the mouse button pressed (0 for left, 1 for right...)
// in all the above cases, 
// x and y are the mouse position from 0,0 (top left) to 1,1 (bottom right)

function mouse(event, button, x, y) {
	console.log(event, button, x, y);
}

// if event is "press", key is a single character string
// if event is "down" or "up", key is a numeric code
function key(event, key) {
	console.log(event, key);
}
```

## Globals

The ```random()``` function can be used to generate random numbers. The ```wrap()``` applies a Euclidean modulo (remainder after division) in such a way that the result is always positive and without reflections:

```javascript
random(); 		// a floating-point number between 0 and 1
random(6);		// an integer between 0 and 5
wrap(-1, 4);	// returns 3 (whereas -1 % 4 would return -1)
```

## Draw2D

The Draw2D library is a light wrapper of HTML5 canvas.

It uses a stack-based coordinate transform system. Push the context, apply transforms, then return back to the previous coordinate system by popping the context again:

```javascript
// create a local coordinate system:
draw2D.push();
	draw2D.translate(x, y);
	draw2D.rotate(angle_in_radians);
	draw2D.scale(sizex, sizey);
	
	// draw in local coordinate system
	//...
	
// return to global coordinate system:
draw2D.pop();
```
Graphics are drawn using whatever color is currently set, via ```draw2D.color()```. The current color is set in terms of red, green, and blue components (from 0 to 1). The color also applies to fields. 

Basic shapes are as follows:

```javascript
	draw2D.color(1, 0, 0);	// red
	field.draw();
	draw2D.color(0, 1, 0);	// green
	draw2D.circle(center_x, center_y, diameter);
	draw2D.color(1, 1, 0);	// yellow
	draw2D.rect(center_x, center_y, width, height);
```

## field2D

We have a ```field2D``` type to represent grids of cells, where each cell holds a floating point number (typically but not necessarily in the range of zero to one). You can create a field like this:

```javascript
var field = new field2D(width, height);
```

By default field cells will be zero. You can get and set individual field cells this way:

```javascript
var value = field.get(x, y);
field.set(value, x, y);
```

Note that if x or y is out of bounds for the field, it will wrap around from the other side. So you are always guaranteed it will return or set a value. 

To set the value of all cells at once, omit the x and y:

```javascript
// set all field cells to 1:
field.set(1);
```

A more powerful feature of ```field2D.set()``` is that it can take a function instead of a number. It calls this function to derive a new value for each cell in the field. The function receives as arguments the x and y position of the cell (and the variable ```this``` maps to the field itself), so for example, this code initializes the field with a horizontal gradient:

```javascript
field.set(function(x, y) {
	return x / this.width;
});
```

Typically we will render a field in the ```draw()``` callback by calling the field's draw method:

```javascript
function draw() {
	field.draw();
}
```

More useful methods:

```javascript
field.min();	// returns the lowest cell value in the array
field.max();	// returns the highest cell value in the array
field.sum();	// adds up all cell values and returns the total

field.clear(); 		// set all field cells to zero
field.normalize();	 // re-scales the field into a 0..1 range
```

There are some methods for interpolated reading/writing/modifying fields. These methods use x and y indices in a normalized 0..1 floating-point range rather than 0..width or 0..height integer range:

```javascript
// returns interpolated value at the normalized position x,y
field.sample(x, y);			

// set the field at position x,y to value v 
// (the four nearest cells will be interpolated)
// if v is a function, it is evaluated for each cell. The function arguments are cellvalue, x, y.
field.update(v, x, y);

// adds v to a field at position x, y
// (interpolated addition to nearest four cells)
field.splat(v, x, y);

// scale a field at x,y by factor v
// (interpolated scale over nearest four cells)
field.scale(v, x, y);
// if x and y are ommitted, the scale factor is applied to the whole field:
field.scale(v);
```

The field2D type also includes a diffusion method, which can be used to smoothly distribute values over time. It requires a second (previous) copy of the field to diffuse from:

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

## vec2

The library also includes support for 2D [vectors](vectors.html). 

```javascript

// create a new vector of zero magnitude
p = new vec2(0, 0);

// create a new vector of unit magnitude, pointing in a random direction:
p = new vec2.random(1);

// create a copy of it:
p2 = p.copy();

// make it point into the X axis:
p.set(1, 0);

// create a vector from polar coordinates:
p = vec2.fromPolar(length, angle);

```

Operations on vectors can either modify the object in place, or create a new vector:

```javascript
p.add(p1);	// modifies p
p.sub(p1);	// modifies p

p2 = p.addnew(p1); // creates a new vector
p2 = p.subnew(p1); // creates a new vector
```

Here are all the vec2 methods:

- ```p.add (v)```	Add a vector (or number) to self (in-place)
- ```vec2.addnew (a, b)```	Add two vectors (or numbers) to create a new vector
- ```p.sub (v)	Subtract a vector (or number) to self (in-place)
- ```vec2.subnew (a, b)```	Subtract two vectors (or numbers) to create a new vector
- ```p.mul (v)	Multiply a vector (or number) to self (in-place)
- ```vec2.mulnew (a, b)```	Multiply two vectors (or numbers) to create a new vector
- ```p.div (v)	Divide a vector (or number) to self (in-place)
- ```vec2.divnew (a, b)```	Divide two vectors (or numbers) to create a new vector
- ```p.pow (v)	Raise to power a vector (or number) to self (in-place)
- ```vec2.pownew (a, b)```	Raise to power two vectors (or numbers) to create a new vector
- ```p.mod (v)	Calculate modulo a vector (or number) to self (in-place)
- ```vec2.modnew (a, b)```	Calculate modulo two vectors (or numbers) to create a new vector
- ```p.min (v)	Calculate minimum of elements (in-place)
- ```vec2.minnew (a, b)```	Calculate minimum of elements to create a new vector
- ```p.max (v)```	Calculate maximum of elements (in-place)
- ```vec2.maxnew (a, b)```	Calculate maximum of elements to create a new vector
- ```p.clip (lo, hi)```	Constrain vector to range (in-place)
- ```p.clip (lo, hi)```	Constrain vector to range to create a new vector
- ```p.relativewrap (dimx, dimy)```	Determine shortest relative vector in a toroidal space
- ```p.relativewrapnew (dimx, dimy)```	Create new vector as shortest relative vector in a toroidal space
- ```p.lerp (v, f)```	interpolate from self to v by factor of f
- ```vec2.lerpnew (a, b, f)```	create a vector from the linear interpolation of two vectors:
- ```p.normalize ()```	set the length of the vector to 1 (unit vector) (randomized direction if self length was zero)
- ```p.normalizenew ()```	return a normalized copy of the vector (randomized direction if self length was zero)
- ```p.limit (maximum)```	Impose a maximum magnitude Rescales vector if greater than maximum
- ```p.limitnew (maximum)```	Create a copy of a vector, limited to a maximum magnitude Rescales vector if greater than maximum
- ```p.setangle (a)```	Rotate a vector to a specific angle:
- ```p.setanglenew (a)```	Return a copy rotated to a specific angle:
- ```p.setmag (m)```	Rescale a vector to a specific magnitude:
- ```p.setmagnew (m)```	Return a vector copy rescaled to a specific magnitude:
- ```p.rotate (angle)```	Rotate a vector by an angle
- ```p.rotatenew (angle)```	Create a vector by rotating a vector by an angle
- ```p.randomize (mag)```	Set to a vector of magnitude 1 in a uniformly random direction:
- ```p.length ()```	return the length of a vector (Can also use #vector)
- ```p.angle ()```	Return the angle to the vector (direction)
- ```p.polar ()```	Return the magnitude and angle (polar form):
- ```vec2.dot (a, b)```	return the dot product of two vectors:
- ```p.distance (p)```	The distance between two vectors (two points) (The relative distance from self to p)
- ```vec2.anglebetween (a, b)```	The angle between two vectors (two points) (The relative angle from self to v)

---

## Why JavaScript?

JavaScript (JS) is a language of growing importance at the intersection of media/culture technology. 

> Note: Despite the similarity of name, JavaScript has no particular relation to Java. JavaScript is however also known as [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), JScript, and ActionScript.

### JS is everywhere:

- It has become the de facto 'language of the web', having evolved from lightweight scripting roots to a full-fledged application language with powerful capabilities in HTML5. 
- Not only is it used pervasively in client browser-based applications, it is also used for high-performance server applications, particularly using the [node.js](http://nodejs.org/) system. 
- JS has also been used as an embedded scripting language for desktop applications by Google, Adobe, OpenOffice, Apple, MicroSoft, Qt, GNOME, etc., including many media-oriented applications such as Max/MSP/Jitter, [Processing](http://en.wikipedia.org/wiki/Processing.js), Logic Pro, Unity, DX Studio, Maxwell Render, Flash, etc., and many games/game engines.

### For media/culture technology purposes:

- A browser-based JS application will run on Windows, OSX, Linux, Android, iOS etc., so long as browser applications are up to date. In recent years this has meant that even low-level audio signal processing and 3D OpenGL are available for use. 
- Browser and server-based applications open up easy possibilities to reach out to vast audiences and connect to social and other media networks, to explore collaborative interfaces, to interact with the increasing number of devices supporting websocket APIs, etc.

### Flexible, fast, well-supported:

- JS is a primarily imperative, procedural language (just like C, Java, Python, etc.), however it also supports functional programming features such as first-class functions. It is dynamically-typed and object-based, but uses a more flexible, dynamic [prototype-based](http://en.wikipedia.org/wiki/Prototype-based_programming) rather than static class-based inheritance. 

- Although it is a dynamic language, JS virtual machines such as [Google's V8](http://en.wikipedia.org/wiki/V8_(JavaScript_engine)) can achieve remarkably high performance through implicit Just-In-Time compilation to machine code.  

- The JS community is vast, and the available libraries, modules, frameworks, extensions, etc. are correspondingly huge. For example [npm](https://www.npmjs.org/) lists almost 60,000 (at time of writing) libraries for node.js desktop/server-side applications. 

- JS has become the language of choice for several Introduction to Computer Science (CS101) courses, including at [Stanford University](http://www.stanford.edu/class/cs101/) (also [here](https://www.coursera.org/course/cs101)). The Khan Academy also offers [a free, online course](https://www.khanacademy.org/cs).

## Additional learning resources:

- [Eloquent JavaScript](http://eloquentjavascript.net/contents.html)
- [W3C JavaScript Guide](http://www.w3schools.com/js/)
- [Mozilla JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Codecadamy](http://www.codecademy.com/tracks/javascript)
- [Khan Academy](https://www.khanacademy.org/cs/programming)
- [Stanford CS101](https://www.coursera.org/course/cs101)
- [The Node handbook](http://www.nodebeginner.org/)
- [How to Node](http://howtonode.org/)

