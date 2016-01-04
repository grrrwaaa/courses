
importance: 8

---

# Labs

[![Labs of the paleofuture](img/collaborative_coding.jpg)](http://paleofuture.com/blog/2011/8/24/the-push-button-school-of-tomorrow-1958.html)

Most of the examples we will work though in the labs will use the JavaScript programming language, embedded in web browsers. To make this easier, I have prepared a starter-kit template, from which all our in-lab examples will be written, and which students can easily fork and extend via Codepen.io's online editor. 

To start a new script, [open the following link and then press the "Fork" button to create a new copy](http://codepen.io/grrrwaaa/pen/qObgdb?editors=001)

Alternatively, click the button below, then close the CSS and HTML tabs:

<form action="http://codepen.io/pen/define" method="POST" target="_blank">
<input id="data-input" type="hidden" name="data" value="{&amp;quot;title&amp;quot;:&amp;quot;DATT4950&amp;quot;,&amp;quot;description&amp;quot;:&amp;quot;Artificial Life&amp;quot;,&amp;quot;css_external&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js_external&amp;quot;:&amp;quot;http://grrrwaaa.github.io/courses/datt4950/code/al.min.js&amp;quot;,&amp;quot;html&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js&amp;quot;:&amp;quot;// see http://grrrwaaa.github.io/courses/datt4950/labs.html for available methods\n\n// initialization code here\n\nfunction update() {\n  // simulation code here\n}\n\nfunction draw() {\n  // rendering code here\n}&amp;quot;,&amp;quot;html_pre_processor&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_pre_processor&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_starter&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_prefix&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js_library&amp;quot;:&amp;quot;&amp;quot;}">
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

<!-- gl context argument -->

<!-- The ```reset()``` function is used to re-initialize variables, when the "reset" button on the HTML page is pressed.

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
-->

## Globals

The starter-kit provides a few extra global functions that are frequently needed:

```random()``` can be used to generate random numbers. Without an argument it returns rational numbers between 0 and 1; with a numeric argument it returns integers in the given range (e.g. useful for picking within an array).

```wrap()``` applies a Euclidean modulo (remainder after division) in such a way that the result is always positive and without reflections.

```javascript
random(); 		// a floating-point number between 0 and 1
random(6);		// an integer between 0 and 5
wrap(-1, 4);	// returns 3 (whereas -1 % 4 would return -1)
```

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
```

<!--

### Normalized sampling

There are some methods for interpolated reading/writing/modifying fields. These methods use x and y indices in a normalized 0..1 floating-point range rather than 0..width or 0..height integer range:

```javascript
// returns interpolated value at the normalized position x,y
field.sample(x, y);		
```


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

### Multi-plane fields

Field cells are in fact 4-plane vectors, mapping to red, green, blue and alpha channels when rendered; however the methods described above are designed to simulate single-plane (greyscale) semantics.

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




```javascript
// to interpolate a specific channel (0, 1, 2 or 3):
field.sample(x, y, channel);	
```
-->

## Draw2D

The Draw2D namespace provides a very simple interface for drawing 2D primitives.

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

Typically, to move into an agent's coordinate system, operate in the order "translate, rotate, scale".

Graphics are drawn using whatever color is currently set, via ```draw2D.color()```:

```javascript

draw2D.color(1, 0, 0); // red
draw2D.color(0, 1, 0); // green
draw2D.color(0, 0, 1); // blue
draw2D.color(1, 1, 1, 0.5); // semi-transparent white

// you can also use standard CSS color names:
draw2D.color("red");
```

Basic shapes are as follows:

```javascript
	draw2D.circle(center_x, center_y, diameter);
	draw2D.circle(center_x, center_y, diameter_x, diameter_y);
	
	draw2D.rect(center_x, center_y, size);
	draw2D.rect(center_x, center_y, width, height);
```

Most calls to draw2D can be chained:

```javascript
draw2D.push()
	.translate(x, y)
	.rotate(angle_in_radians)
	.scale(sizex, sizey)
	.rect()
	.pop();
```	

> Note: The draw2D transform and color are reset before each ```draw()``` call.


<!--

Shape API

----

# Turning research into code (and vice versa)

[Math as code](https://github.com/Jam3/math-as-code/blob/master/README.md). "This is a reference to ease developers into mathematical notation by showing comparisons with JavaScript code. Motivation: Academic papers can be intimidating for self-taught game and graphics programmers." It also includes helpful links to various JavaScript libraries we can use for mathematics.

-->

----

## Under the hood

The library code is in [GitHub here](http://www.github.com/grrrwaaa/courses/code/al.js).
