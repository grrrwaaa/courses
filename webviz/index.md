
# Bridging data viz and 3D web

Quick demo:




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

## D3 in 3D

With *D3* being one of the most acclaimed data visualization libraries for the web, and *three.js* being probably the widest-used programming interface to WebGL, it seems natural to combine them for 3D visualizations. 

It's not so easy however. D3 operates on the HTML DOM (Document Object Model) itself, either by manipluating regular DOM elements such as ```<div>```, or by manipulating graphical DOM elements created using SVG (Scalable Vector Graphics). But WebGL is entirely contained within a single ```<canvas>``` tag, and its 3D objects are not part of the DOM. 

**Glue:** Fortunately, [with a bit of glue code](http://grrrwaaa.github.io/courses/webviz/d33d.js), we can extend Three.js's ```Object3D``` prototype to "look like" a DOM node. The glue code provides ```Object3D``` with all the method names D3 expects to find in DOM nodes, but implements them in terms of changes to a 3D WebGL scene. Since ```Object3D``` is the base class of most of three.js's 3D objects, this means we can use D3's great data handling, data binding, and transitions work with 3D scenes.

Here's a basic demo, based on D3's [General Update Pattern](http://bl.ocks.org/mbostock/3808234) -- the top version is regular D3, the bottom version is the same data but rendered via Three.js:

[D33D demo](http://codepen.io/anon/pen/dommMg?editors=001)



### Camera

An orthographic camera may be more appropriate to data visualization, as it preserves the meaning of screen-space distance regardless of depth. 

Conversely, a perspective camera may be preferable for stereoscopic and immersive visualizations, or any visualization intended to be 'navigable', where perspective grants focus and context.


### Interaction








