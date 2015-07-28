
# BRIDGING WEB-BASED VISUALIZATION AND 3D

[http://www.canvas2015.ca](http://www.canvas2015.ca/schedule/day-2-july-28/)

## Quick intro

[me](http://www.mat.ucsb.edu/~wakefield/), [Allosphere](http://www.allosphere.ucsb.edu)

<iframe width="853" height="480" src="https://www.youtube.com/embed/u-D-zEToJQ4?rel=0" frameborder="0" allowfullscreen></iframe>

This is large-scale immersive visualization on distributed systems, but it is almost possible to achieve this in a browser at home today. It is that exciting possibility that motivates this workshop. 

Among the rapidly developing technologies available in modern browsers today is WebGL, a mostly-compatible port of the standardized, GPU-accelerated 3D graphics library OpenGL to the HTML5 canvas. 

> Why 3D viz? Some data is naturally 3D (preponderance of sci viz in 3D), some data is more accessible plotted above a 2D surface (particularly geo data). Although most of our cognitive/perceptive pattern-finding capabilities operate in 2D, we can embed multiple 2D spaces in a 3D world. And we are biologically adapted to interact in a 3D world. There are affordances to be had in a dynamic 3D environment (spatial navigation, structure-from-motion). Stereoscopic cues can be particularly effective at short distances. 

Some fun examples:
- [Music viz](http://www.georgeandjonathan.com/#9)
- [I remember](http://i-remember.fr/en)
- [Brain browser](https://brainbrowser.cbrain.mcgill.ca)
- [Several examples here](http://philogb.github.io) -- and a [video tutorial](https://www.youtube.com/watch?v=VXiAMI69CZ4)
- [Some great articles & tutorials](http://acko.net)

An even more recent extension is WebVR, meaning that browser-based visualizations will be a URL away for owners of Oculus Rift, Leap Motion etc. Immersive live information visualization may suddenly be within reach of millions. Untrod land... an interesting research area!

> Firefox: ["VR a first class citizen on the Web"](http://mozvr.com/posts/webvr-lands-in-nightly/). Instructions: http://mozvr.com/downloads/

> Chrome: [Google has pushed Cardboard, but also supporting Oculus Rift](http://blog.tojicode.com/2014/07/bringing-vr-to-chrome.html). Go to chrome://flags, scroll down to webvr and enable

> Examples:
- [Infodive](http://mozvr.com/projects/infodive/)
- [Sechelt]( http://mozvr.com/projects/sechelt/)
- [See also](http://www.roadtovr.com/mozilla-research-vr-launches-mozvr-com-oculus-rift/)

## Overview of web-based technologies

- Super accessible, nothing to install
- Modern browsers support rich graphics, audio, high performance
- Modern synthesis: HTML + CSS + JS:
	- HTML the original markup language of the web. Static, tree-like document structure (DOM)
		- now also includes vector graphics (SVG, Canvas), video, etc.
	- CSS defines 'styles' we can apply to HTML, richer set of layout & appearance attributes
	- JavaScript is the dynamic part
		- A full-fledged high-level programming language, with incredibly fast implementations
		- *Masses of JS libraries out there*.
		- Can also write servers using JS (via Node.js)
		
----

## Data visualization on the web: D3.js

- Very widely used, mature data viz library.
- Core concept, let data drive the DOM. 
	- Can be basic HTML, but usually SVG graphics. Lines, rects, circles, text, beziers, etc. 2D
- utilities for reading data from external sources (e.g. open data APIs, CSV/JSON files)
- generate a selection from the data, and set its attributes to viz
- enter/update/exit for dynamic data selections
- [transitions](http://alignedleft.com/projects/2014/easy-as-pi/) for animated changes
- utilities for array analysis, scaling and quantizing, etc.
- force-driven graphs and many other classic viz examples
- 2D

D3 live example: [currency scatterplot](http://codepen.io/anon/pen/zGMBbG?editors=001)

Let's build that up:

<form action="http://codepen.io/pen/define" method="POST" target="_blank">
<input id="data-input" type="hidden" name="data" value="{&amp;quot;title&amp;quot;:&amp;quot;Canvas2015&amp;quot;,&amp;quot;description&amp;quot;:&amp;quot;D3 in 3D playground&amp;quot;,&amp;quot;css_external&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js_external&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;html&amp;quot;:&amp;quot;&lt;!-- bring in D3.js and some of its extension libraries: --&gt;\n&lt;script src=\&amp;quot;http://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js\&amp;quot;&gt;&lt;/script&gt;\n\n&lt;!-- load a sample data source: --&gt;\n&lt;script src=\&amp;quot;http://grrrwaaa.github.io/courses/webviz/currencies.js\&amp;quot;&gt;&lt;/script&gt;\n\n&lt;!-- bring in Three.js and some of its extension libraries: --&gt;\n&lt;script src=\&amp;quot;http://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js\&amp;quot;&gt;&lt;/script&gt;\n&lt;script src=\&amp;quot;http://threejs.org/examples/js/controls/OrbitControls.js\&amp;quot;&gt;&lt;/script&gt;\n&lt;script src=\&amp;quot;http://rawgit.com/mrdoob/stats.js/master/build/stats.min.js\&amp;quot;&gt;&lt;/script&gt;\n\n&lt;!-- bring in our D3/Three glue: --&gt;\n&lt;script src=\&amp;quot;http://grrrwaaa.github.io/courses/webviz/d33d.js\&amp;quot;&gt;&lt;/script&gt;&amp;quot;,&amp;quot;css&amp;quot;:&amp;quot;body {\n  margin: 0;\n}\n\ncanvas {\n  width: 100%;\n  height: 100%;\n}\n\nsvg {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n&amp;quot;,&amp;quot;js&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;html_pre_processor&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_pre_processor&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_starter&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;css_prefix&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;js_library&amp;quot;:&amp;quot;&amp;quot;}">
<input type="submit" value="Create a new Codepen editor">
</form>
  
- We'll use some data I prepared earlier, drawn from an open data resource (rather than hammering the servers every time we edit!)
- We'll use [Codepen.io](http://codepen.io) to build our demo. This is a live browser-based HTML/CSS/JS editor, which means we can work without needing to install anything.
- D3.js, currencies.json
- 

```javascript
	var canvas_width = window.innerWidth;
	var canvas_height = window.innerHeight;

	// create an SVG canvas:
	svg = d3.select('body')
			.append('svg')
			.attr('width', window.innerWidth)
			.attr('height', window.innerHeight);

	// get the basic data resource:
	var data = currencies;

	// create linear mappings from the data domain (min, max) to the canvas size:
	var xScale = d3.scale.linear()
			.domain([d3.min(data, function(d) {
					return d.rates.EUR;
			}), d3.max(data, function(d) {
					return d.rates.EUR;
			})])
			.range([0, canvas_width]);

	var yScale = d3.scale.linear()
			.domain([d3.min(data, function(d) {
					return d.rates.GBP;
			}), d3.max(data, function(d) {
					return d.rates.GBP;
			})])
			.range([canvas_height, 0]);	// note Y range is upside down

	// another linear mapping for circle radius:
	var rScale = d3.scale.linear()
			.domain([d3.min(data, function(d) {
					return d.rates.CAD;
			}), d3.max(data, function(d) {
					return d.rates.CAD;
			})])
			.range([1, 8]);

	// plot circles for each entity:
	svg.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
					return xScale(d.rates.EUR);
			})
			.attr("cy", function(d) {
					return yScale(d.rates.GBP);
			})
			.attr("r", function(d) {
					return rScale(d.rates.CAD);
			})
			.attr("fill", function(d, i) {
					h = 360 * i / data.length;
					return d3.hsl(h, 0.85, 0.65);
			})
			.attr("stroke", "black");
```


----

## WebGL

GL scenes are made out of geometry, often called &quot;meshes&quot;, which are buffers (arrays) of points in space (vertices), that may have other attributes such as color, normal, texture coordinates, etc. These meshes may be combined with image data (textures). Most of the art of OpenGL is taking these meshes and textures, and sending them to the GPU with "shader" programs written in another language (GLSL), that define the interesting journey of a vertex in object space into painted surfaces in screen space, passing through model space, world space, view space, clip space and fragment space along the way...

Introductory tutorial video:

<iframe width="853" height="480" src="https://www.youtube.com/embed/rfQ8rKGTVlg?rel=0" frameborder="0" allowfullscreen></iframe>

WebGL is often too close to original OpenGL, i.e. verbose, fiddly, and arcane API, including another required sub-language (GLSL).

Some of the significant [differences with OpenGL](https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#No_3D_Texture_support):

- Textures with non-power-of-two (NPOT) dimensions have limited support
- No GL_DOUBLE -- this may be a problem for high-precision visualizations
- No 3D Textures -- this *is* a problem for things like volume-rendering, common to sci-viz
	- There are workarounds by tiling 3D slices over a 2D texture [example](http://jsfiddle.net/greggman/gSnHZ/)
	
### Development tips

Use the WebGL inspector, for [Chrome](https://chrome.google.com/webstore/detail/webgl-inspector/ogkcjmbhnfmlnielkjhedpcjomeaghda?hl=en) or [Firefox](https://addons.mozilla.org/en-us/firefox/addon/webgl-inspector/)

More [debugging & development tools](http://www.realtimerendering.com/blog/webgl-debugging-and-profiling-tools)

### Optimization tips

Minimize updates to the GPU. Use the same shader for many objects -- set up the shader once, then draw each object. Similarly, only update the uniforms that differ between objects.

Do the least amount of work possible in the draw routines -- anything that is unchanged between frames move to a setup() function that runs once. 

Move work out of JavaScript and into GLSL, especially if it is the kind of thing GLSL is really good at (vector math!). That can even mean part of the behaviour of the object itself.

Never call glGet** anything while rendering.

Possibly also merge instances into a single mesh, by storing instance-specific parameters in additional attributes.

Don't attach render buffers while rendering -- just set up however many framebuffers you need before starting and swap them, rather than rebuilding a renderbuffer.

Don't use setInterval(), use requestAnimationFrame() (so it pauses when not visible)

The render resolution doesn't have to be the same as the canvas resolution. Large resolutions are expensive (especially for fragment shader operations), so it can be cheaper to render at a lower resolution and stretch up (though it will be blurrier). 

----

## [Three.js](http://threejs.org/)

Since WebGL is so fiddly and arcane, most people are using the [THREE.js](http://threejs.org) wrapper. It's a lot less code!

[See many examples]([https://stemkoski.github.io/Three.js/](https://stemkoski.github.io/Three.js/))

[Also many extensions](http://www.threejsgames.com/extensions)

> But watch out: an annoying thing about three.js is that, despite being very widely used, it is still officially in alpha and there have been many API changes -- there's a good chance that code you find on the web won't work with newer versions of the library.

Here's a [basic sample](http://codepen.io/anon/pen/NqERxo?editors=001):

```javascript
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({
	  color: 0x00ff00
	});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	camera.position.z = 5;

	var render = function() {
	  requestAnimationFrame(render);

	  cube.rotation.x += 0.1;
	  cube.rotation.y += 0.1;

	  renderer.render(scene, camera);
	};

	render();
```

---

The high-level view: a renderer needs a scene and a camera to paint a canvas, at up to 60 frames per second, where a scene is made of meshes that combine geometry and materials.

> Note the use of ```requestAnimationFrame()``` rather than ```SetInterval``` to do most of the work -- including modifications to the data set that drive scene changes. This makes sure the animation is not using resources when not being viewed. 

### Camera

The camera handles the perspective, including depth cues of foreshortening (unless an orthographic camera is used). An orthographic camera may be more appropriate to data visualization, as it preserves the meaning of screen-space distance regardless of depth. Conversely, a perspective camera may be preferable for stereoscopic and immersive visualizations, or any visualization intended to be 'navigable', where perspective grants focus and context. A scene may be better understood by utilizing multiple cameras, whether side-by-side or picture-in-picture.

Typically we want some kind of navigation control (world-in-hand or flying/walking) to move and orient the camera. For now we'll use the OrbitControls example supplied by Three.js, which is a kind of world-in-hand navigation.

A scene is a a hierarchical tree of nodes, the leaves of which are "meshes". A mesh is a geometry plus a material. We'll inject D3 into the process of managing the scene of meshes, via some [glue code](http://codepen.io/anon/pen/BNGaeP?editors=011). 

Geometry: primitive cubes, spheres, planes etc., geometry loaded from 3D model assets, geometry extruded from text, arbitrary geometry from data/algorithms, etc. Geometry is basically an array of 3D vertex positions with other attributes (normals, texture coordinates, etc.)  These are pushed through a shader program (written in GLSL) to define how the intermediate surfaces are painted. With Three.js we don't have to think about shader programs much, we can just use the built-in *materials*, where MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial are the most common cases.

Most materials require that we add some lights to our scene. For 3D info viz top left/top right lights are the most appropriate. Lights might also need to track the camera.

-----

## D3 in 3D

With *D3* being one of the most acclaimed data visualization libraries for the web, and *three.js* being probably the widest-used programming interface to WebGL, it seems natural to combine them for 3D visualizations. 

It's not so easy however. D3 operates on the HTML DOM (Document Object Model) itself, either by manipluating regular DOM elements such as ```<div>```, or by manipulating graphical DOM elements created using SVG (Scalable Vector Graphics). But WebGL is entirely contained within a single ```<canvas>``` tag, and its 3D objects are not part of the DOM. 

**Glue:** Fortunately, [with a bit of glue code](http://grrrwaaa.github.io/courses/webviz/d33d.js), we can extend Three.js's ```Object3D``` prototype to "look like" a DOM node. 

> The glue code provides ```Object3D``` with all the method names D3 expects to find in DOM nodes, but implements them in terms of changes to a 3D WebGL scene. Since ```Object3D``` is the base class of most of three.js's 3D objects, this means we can use D3's great data handling, data binding, and transitions work with 3D scenes.

Here are some examples that show the D3 and 3D versions side by side:

- [A simple bar chart](http://codepen.io/anon/pen/rVqqOp?editors=001)
- [A variation of D3's General Update Pattern example](http://codepen.io/anon/pen/dommMg?editors=001)

----

## [Currency scatterplot in 3D](http://codepen.io/anon/pen/pJQEEz?editors=001)

Our scene will look like this:

- scene
	- lights
	- chart3d
		- grid lines
		- box nodes (the data entities)
	

We'll generate grid lines as another kind of mesh, using D3's ```scale``` mapping generators to simplify and automate the process, and to reposition the chart into the center of the world, etc.

Rather than adding text labels into the 3D world, we'll demonstrate a head-up-display using SVG overlaid on top of the WebGL canvas. We create an array of labels and let D3 render them, after Three.js projects the 3D world position into a 2D pixel position.

We also show how to go the other way, to take a mouse pixel coordinate and select the 3D object underneath it, to add another text overlay.

We demonstrate the classic D3 enter/update/exit cycle for dynamically showing subsets of points, and animating transitions. 

We also show a few other niceties along the way.

### Using the glue

Whereas with SVG we have a set of predefined shape nodes, such as ```rect```, ```circle```, etc., for our 3D graphs we are going to need to define new node type constructors. To do this, we wrap our our object creation code in a function that takes data (and data-index) parameters. Here's an example using a red box of unit size, whose color depends on a data element:

```javascript
	function makeBox(data, index) {
	  return new THREE.Mesh(
		new THREE.BoxGeometry(0.5, 0.5, 0.5),	// 0.5 "radius"
		new THREE.MeshLambertMaterial({ color: data.color });
	  );
	}
```

Creating new geometry and materials for each node is wasteful if they are all the same. For example, if all nodes are cubes, we can define the geometry once and re-use it. Similarly, we can define a default material, and clone it per instance. (If we didn't clone it, then changing the colour of one box would change the colours of all boxes. The same would hold true for geometry, if this was data-driven.) So our constructor is more likely to look like this:

```javascript
	var box_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
	var default_material = new THREE.MeshLambertMaterial();

	function makeBox(data, index) {
		var material = default_material.clone();
		material.color.setHex(data.color);
	 	return new THREE.Mesh(box_geometry, material);
	}
```

We may want to group data-driven objects under a container node, so that they can be transformed en-masse, rather than adding them directly to the ```scene``` root:

```javascript
	// create container node for our data-driven objects:
	var chart3d = new THREE.Object3D();
	scene.add(chart3d);
```

### Filling the chart

Rather than adding objects to ```chart3d``` directly with ```chart3d.add(myobject)```, we're going to use D3's update pattern to do this automatically.

Now we can use D3's typical commands to add 3D boxes to our chart, with only a few small variations:

- ```select(chart3d)``` instead of ```select(svgelement)```
- ```selectAll("THREE.Mesh")``` instead of ```select("rect")``` etc. 
- after binding data, append using our constructor function defined above instead of appending ```"rect"``` etc. 
- the set of attributes we can set are different for 3D objects

```javascript
	d3.select(chart3d)							// instead of svg	
	  .selectAll("THREE.Mesh")					// instead of "rect" etc.
	  .data(data)								
	  .enter()
		  .append(makeBox)						// instead of "rect" etc.
		  .attr("position.x", function(d, i) {	// instead of "x"
		  	return d.x;
		  })
```

## Setting and animating attributes, calling methods

The attributes we can set on a data-driven element depend on the type of the element. In SVG rendering, "rect" gives us "x", "y", "width", "height", "fill", "stroke", etc.  For ```"THREE.Mesh"``` objects we have:

- "position.x", "position.y", "position.z"
- "rotation.x", "rotation.y", "rotation.z" (Euler angles; can also set "quaternion.x" etc.)
- "scale.x", "scale.y", "scale.z"
- "visible" (true/false)

Material properties can also be changed -- but be sure that the constructor creates a unique or cloned material per instance:

- "material.color.r", "material.color.g", "material.color.b" (all 0-1 range)
- "material.transparent" (true/false)
- "material.opacity" (0-1, only if material.transparent == true)
- [see also](http://threejs.org/docs/#Reference/Materials/Material)

The great thing about setting selection attributes is that they can be animated by D3's transitions. 

To call methods of Object3D, use the ```.each()``` method of the selection. Unlike attribute modification, this won't interpolate during transitions.

```javascript
	.each(function(d, i) {
		// 'this' refers to the THREE.Mesh	
		this.translateZ(-1);
	})
```

## Grids & labels

For grid lines we can generate line based geometry by directly specifying the vertices. We'll use Three's ```LineBasicMaterial``` to do this, and D3's scale objects to make the markings intelligently spaced. 

There are several ways to incorporate text into WebGL, depending on how 3D we really want them.

- As 3D geometry, where fonts are extruded into 3D shapes. This is not usually relevant to data visualizations.
- As text 'sprites' actually placed in the 3D world: plane geometries on which the text is textured, which always face the camera, and which are embedded in the 3D scene. The text itself can be rendered by using an off-screen HTML5 Canvas2D, and brought into THREE.js with a bit of extra code. Should be faster than option 1 because of the simpler geometry; and more readable.
- As a 2D text overlaid above the 3D scene (like a HUD: head-up display). This is relatively easily done via HTML, SVG, or Canvas2D. HTML/SVG means we can also use D3 to do this. However there is no occlusion or distance-scaling here. It requires a bit of code to extract the 2D pixel location of a 3D object.

For our scatterplot demo we chose the 3rd option.

### Interaction

Mouse interaction is trickier in 3D. A 3D scene is not a simple pixel space like in D3. We need to push the mouse coordinates through the inverse transform of the renderer, by projecting it as a ray from the camera, to see what it hits.

THREE.js makes this fairly easy with a RayCaster object.

For our scatterplot demo, we show this with a simple text overlay when the mouse hovers over a data point.

We also show some variations of animating the data (kinetic cues), shaking the camera (toward structure-from-motion), and animating the dataset (extending D3's update/enter/exit cycle).

Thanks!