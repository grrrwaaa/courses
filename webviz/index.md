
# BRIDGING WEB-BASED VISUALIZATION AND 3D

[http://www.canvas2015.ca](http://www.canvas2015.ca)

Web-based technologies

- Super accessible, nothing to install
- Modern browsers support rich graphics, audio, high performance
- HTML, CSS, JS:
	- HTML the original markup language of the web. Static, tree-like document structure (DOM)
		- now also includes vector graphics (SVG, Canvas), video, etc.
	- CSS defines 'styles' we can apply to HTML, richer set of layout & appearance attributes
	- JavaScript is the dynamic part
		- A full-fledged high-level programming language, with incredibly fast implementations
		- Masses of JS libraries out there.
		- Can also write servers using JS (via Node.js)

An exciting recent development is WebGL, a mostly-compatible port of the standardized, GPU-accelerated 3D graphics library OpenGL to JavaScript/HTML5 canvas. An even more recent extension is WebVR, meaning that browser-based visualizations will be a URL away for owners of Oculus Rift etc. Immersive live information visualization may suddenly be within reach of millions. Untrod land... an interesting research area!

D3.js

- very widely used, mature data viz library.
- core concept, let data drive the DOM. 
	- Can be basic HTML, but usually SVG graphics. Lines, rects, circles, text, beziers, etc. 2D
- utilities for reading data from external sources (e.g. open data APIs, CSV/JSON files)
- generate a selection from the data, and set its attributes to viz
- enter/update/exit for dynamic data selections
- transitions for animated changes
- utilities for array analysis, scaling and quantizing, etc.
- force-driven graphs and many other classic viz examples
- 2D

D3 live example: currency scatterplot

- We'll use some data I prepared earlier, drawn from an open data resource (rather than hammering the servers every time we edit!)
- We'll use [Codepen.io](http://codepen.io) to build our demo. This is a live browser-based HTML/CSS/JS editor, which means we can work without needing to install anything.
- D3.js, currencies.json
- 

http://codepen.io/anon/pen/YXRXZb?editors=001

```javascript
	var canvas_width = window.innerWidth;
	var canvas_height = window.innerHeight;

	// create an SVG canvas:
	svg = d3.select('body')
			.append('svg')
			.attr('width', window.innerWidth)
			.attr('height', window.innerHeight);

	// get the basic data resource:
	var data = currencies.history;

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

WebGL

- geometry (buffers), images (textures), vertex transformation and pixel-coloring programs (shaders). Journey of a vertex from object space to screen space.
- close to original OpenGL, i.e. verbose, fiddly, and arcane API, including another required sub-language (GLSL).

Three.js

Most people are using the [THREE.js](http://threejs.org) wrapper, because raw WebGL involves a lot of repetitive fiddly work. 

[Three.js tutorial](http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene)

```html
	<html>
		<head>
			<title>My first Three.js app</title>
			<style>
				body { margin: 0; }
				canvas { width: 100%; height: 100% }
			</style>
		</head>
		<body>
			<script src="js/three.min.js"></script>
			<script>
				var scene = new THREE.Scene();
				var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

				var renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				var geometry = new THREE.BoxGeometry( 1, 1, 1 );
				var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
				var cube = new THREE.Mesh( geometry, material );
				scene.add( cube );

				camera.position.z = 5;

				var render = function () {
					requestAnimationFrame( render );

					cube.rotation.x += 0.1;
					cube.rotation.y += 0.1;

					renderer.render(scene, camera);
				};

				render();
			</script>
		</body>
	</html>
```

> Watch out: an annoying thing about three.js is that, despite being very widely used, it is still officially in alpha and there have been many API changes -- there's a good chance that code you find on the web won't work with newer versions of the library.

A renderer needs a scene and a camera to paint a canvas, at up to 60 frames per second.

The camera handles the perspective, including depth cues of foreshortening (unless an orthographic camera is used). Typically we want some kind of navigation control (world-in-hand or flying/walking) to move and orient the camera. For now we'll use the OrbitControls example supplied by Three.js, which is a kind of world-in-hand navigation.

A scene is a a hierarchical tree of nodes, the leaves of which are "meshes". A mesh is a geometry plus a material. We'll inject D3 into the process of managing the scene of meshes, via some [glue code](http://codepen.io/anon/pen/BNGaeP?editors=011). 

Our scene will look like this:

- scene
	- lights
	- chart3d
		- grid lines
		- box nodes (the data entities)
	
Geometry: primitive cubes, spheres, planes etc., geometry loaded from 3D model assets, geometry extruded from text, arbitrary geometry from data/algorithms, etc. Geometry is basically an array of 3D vertex positions with other attributes (normals, texture coordinates, etc.)  These are pushed through a shader program (written in GLSL) to define how the intermediate surfaces are painted. With Three.js we don't have to think about shader programs much, we can just use the built-in *materials*, where MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial are the most common cases.

Most materials require that we add some lights to our scene. For 3D info viz top left/top right lights are the most appropriate. Lights might also need to track the camera.

We'll generate grid lines as another kind of mesh, using D3's ```scale``` mapping generators to simplify and automate the process, and to reposition the chart into the center of the world, etc.

Rather than adding text labels into the 3D world, we'll demonstrate a head-up-display using SVG overlaid on top of the WebGL canvas. We create an array of labels and let D3 render them, after Three.js projects the 3D world position into a 2D pixel position.

We also show how to go the other way, to take a mouse pixel coordinate and select the 3D object underneath it, to add another text overlay.

We demonstrate the classic D3 enter/update/exit cycle for dynamically showing subsets of points, and animating transitions. 

We also show a few other niceties along the way.

[Here's the currency scatterplot in 3D](http://codepen.io/anon/pen/RPqwmj?editors=001)









# Bridging data viz and 3D web

[Currency demo](http://codepen.io/anon/pen/MwXNWm?editors=101)

## WebGL quickstart

Introductory tutorial video:

<iframe width="853" height="480" src="https://www.youtube.com/embed/rfQ8rKGTVlg?rel=0" frameborder="0" allowfullscreen></iframe>

GL scenes are made out of geometry, often called &quot;meshes&quot;, which are:

- collections of points in space (vertices), that may also have other attributes (such as color, normal, texture coordinate...), 
- with a method for how to connect them, as points, lines or polygons (usually triangles), and typically also an indexing array (since a particular vertex may be used more than once)

Most of the art of OpenGL is taking these meshes, together with textures, and sending them to the GPU with a pair of shaders to define how they will appear.

The general process of drawing an object is thus:

```
	script => uniforms + attributes => vertex shader => gl_Position, varyings
	uniforms + varyings => fragment shader => gl_FragColor 
	bind textures<span class="hljs-function">
	bind buffers
	draw mesh
```

In semi-psuedo-code:

```
	gl.UseProgram(shader_program)
	setupattributes()
	setupuniforms()
	bindtextures()
	gl.DrawElements(num_vertices)
```

Where typically:

- uniforms are properties shared by a whole *geometry*
- attributes are the properties that var</h3>y *per vertex*, passed from the script as *buffers*
- vertex shader runs *per vertex*
- varyings are properties that are interpolated *between vertices*
- fragment shader runs *per fragment* (similar to *per pixel*)

### Shaders

Shaders are written in GLSL. Usually a *shader program* is a vertex shader plus a fragment shader.

Simplest vertex shader:

```glsl
    <script id="vertex_shader" type="x-shader/x-vertex">
    attribute vec4 position;
    void main() {
        gl_Position = position;
    }
    </script>
```

Simplest fragment shader:

```glsl
    <script id="fragment_shader" type="x-shader/x-fragment">
    void main() {
        vec4 red = vec4(1., 0., 0., 1.);    // RGBA
        gl_Color = red;
    }
    </script>
```

### Coordinate systems

Vertex shaders typically transform the position in *model space* into *clip space* by matrix multiplications, to take into account the model's pose in the world, the camera's pose in the world, and the camera perspective properties. These matrices are usually generated in JavaScript and passed in as uniforms. 

- **Model space**
	- Used by mesh position attributes. 
	- Typically the origin of this space is the center or base of the mesh object

- **World space**
	- The shared space in which all objects of the world (including the camera) are located
	- Origin and axes are fixed relative to the world

- **View space**
	- The world space, but transformed (rotated/translated) into the view of the camera

- **Clip space**
	- Used by ```gl_Position```. 
	- Always covers entire canvas from bottom-left (-1, -1) to top-right (1, 1), and depth also from -1 to 1.
	- The fourth coordinate is used for perspective division, after assignment to ```gl_Position```
	
- **Fragment space**
	- The final location of a fragment in the canvas (or other render target), typically measured in pixels

Beside this workflow, there are other spaces that are used in OpenGL:

- **Texture space**
	- Texture coordinates usually cover the source data by ranging from (0, 0) to (1, 1)
	- Also known as "UV" coordinates

```
	matrix_uniform = model_in_world_matrix * camera_view_matrix * camera_projection_matrix
```

### Post-processing

Also-known as multi-pass rendering. Rather than rendering directly to the screen, render to an off-screen texture, then render that texture again through another shader to process it further. Usually the vertex shader is just a pass-through drawing a single big rectangle, and all the work is in the fragment shader (screen-space effects).    

### Differences with OpenGL

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

## Three.js

Most people are using the [THREE.js](http://threejs.org) wrapper, because raw WebGL involves a lot of repetitive fiddly work.

<a href="http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene">Tutorial</a> 

Basic sample:

```html
	<html>
	<head>
	<title>Three.js app</title>
	<style><span class="css">
		body <span class="hljs-rules">{ <span class="hljs-rule">margin: 0; <span class="hljs-rule">}
		canvas <span class="hljs-rules">{ <span class="hljs-rule">width: 100%; <span class="hljs-rule">height: 100% }
	</style>
	</head>
	<body>
	<!-- or <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></script> -->
	<script src="three.min.js"></script>
	<script>

	// create an HTML canvas via a THREE.js renderer:
	var canvas_width = <span window.innerWidth;
	var canvas_height = <span window.innerHeight;
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(canvas_width, canvas_height);
	<span document.body.appendChild(renderer.domElement);

	// create a camera:
	var near = 0.1, far = 1000;
	var aspect = canvas_width/canvas_height;
	var field_of_view_Y = 75;
	var camera = new THREE.PerspectiveCamera(field_of_view_Y, aspect, near, far);
	camera.position.z = 5;

	// create a scene to hold objects:
	var scene = new THREE.Scene();

	// create a box:
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	// simulation update:
	function update() {
		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;
	}

	// render loop:
	function render() {
		requestAnimationFrame(render);
		update();
		renderer.render(scene, camera);
	}
	render();

	</script>
	</body>
```

An object's matrix stores the object's transformation relative to the object's parent (for top-level objects, the parent is the world).

Updating object transformation matrix, using high level position/scale/quaternion properties to update the matrix:

```
	object.position = start_position;
    object.quaternion = quaternion;
    object.updateMatrix();
```

Alternatively operate on the matrix directly:

```
	object.matrixAutoUpdate = <span class="hljs-literal">false;
object.matrix.setRotationFromQuaternion(quaternion);
    object.matrix.setPosition(start_position);
```

If the object's parent is not the world, the world position can be requested: 

```
	object.updateMatrixWorld();
	return object.matrixWorld;
```

Quaternions are used for rotations, because they avoid *gimbal lock*, but you can specify with Euler Angles (object.setRotationFromEuler()) if gimbal lock will not be a problem.

### Extensions

[THREEx](http://www.threejsgames.com/extensions)

### Examples

[https://stemkoski.github.io/Three.js/](https://stemkoski.github.io/Three.js/)


