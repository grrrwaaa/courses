# ![Unity](http://upload.wikimedia.org/wikipedia/en/4/4a/Unity_3D_logo.png)

Unity is a cross-platform game creation system developed by Unity Technologies, including a game engine and integrated development environment (IDE). It is used to develop video games for web sites, desktop platforms, consoles, and mobile devices. 

[Download](http://unity3d.com): Unity Free has no fee, and is available for any use to individuals or companies with less than US$100,000 of annual gross revenue. (Unity Pro has more features and capabilities, but is not free.)

For Rift development, Unity Free is sufficient. You will also need to download & install the [Oculus Unity 4 integration](https://developer.oculus.com/downloads/).

> Unity is an entire ecosystem of tools and services designed for people who want to build a successful business by creating multiplatform games and interactive content. The Unity ecosystem is available to anyone who downloads the Unity engine. The Unity engine integrates into one unparalleled platform the tools to create 2D and 3D interactive content; collaboration solutions; rapid multiplatform deployment, and retention, advertising and analytics services to grow your business. 

> Publish to all mobile platforms, Mac, PC and Linux desktop, web or consoles. Use powerful cross-platform tools to make your interactive content run beautifully on any device.

- [Showcase](http://unity3d.com/showcase)
- [Docs](http://unity3d.com/learn/documentation)
- [Tutorials](http://unity3d.com/learn/tutorials/modules)
- [Asset store -- there are more than 1000 free assets](https://www.assetstore.unity3d.com/en/)
	- [More free 3D models](http://answers.unity3d.com/questions/16650/game-asset-website-list-free-and-paid-textures-mod.html)
	- [More free sounds and music](http://unity3diy.blogspot.ca/2014/08/top-16-best-free-music-and-sound-effect.html)

## Editor tutorial notes

### Scene view

q,w,e,r keys for mode:
- q: hand, use left/right mouse to navigate, alt key. press f to focus on selected object. Click on xyz axis for aligning camera.
- w: translate (move), e: rotate, r: scale

Search box in scene/hierarchy

### Game view (play)

Can show/hide gizmos, stats. 

Can pause and step, and can tweak game content while playing. **Important:** edits to game objects (rather than assets) in the scene will be lost when the game is ended. 

### Game objects

Everything in a scene is a "game object".

#### Hierarchy

All game objects in your scene, alphabetically. Objects can be grouped under a "parent" object, to make a hierarchy. The parent can also be an "empty" game object, just for grouping. "Child" objects inherit transform (position, rotation, scale) from the parent. 

Can search (as in scene).

Can create new objects. 

#### Inspector

How to adjust whatever object, asset, etc. is selected. 

Main checkbox: enable/disable the object.

Static checkbox: static objects can be optimized for lighting/navigation.   

Each game object is made up of a number of components, such as transform, scripts, sounds, lighting etc. All objects have a transform. 

Transform: position, rotation, scale. 

Component checkboxes: enable/disable the component of the object. 

Add components with the button at the bottom of the inspector or Component menu, or drag from Project. 

Be careful with renderer assets: you may be editing the original asset rather than a specific instance, which means that your edits will apply to all uses of it. 

*Tag (labelling of one or many, to address via code), layer (for lighting/collision rules).*

	GameObject.FindGameObejctsWithTag("enemy")

### Project

All assets available in the project. 

Search assets, and asset store. 

Can create or import assets here. (Can also do it by Asset menu, or by dropping files into the Assets folder on disk). 

#### Prefabs

A pre-configured game object built in the scene and stored in the project, which can then be instantiated (cloned) in the scene. 

Drag any game object to the project panel to save it as a prefab, then delete it from the scene.  

To edit, drag back into scene, make changes, press Apply in inspector, then delete it from the scene again. Likewise, applying change to one instance will apply it to all others. The Revert button will discard changes made in the scene. 

### Meshes, materials

[See tutorial here](http://unity3d.com/learn/tutorials/modules/beginner/graphics/meshes) - scenes are built from 3D polygonal meshes of vertices (points) connected by lines (edges) to create triangles (faces), many of which create geometric forms. They are not created in Unity, but must be imported from external programs. 

Rendering a mesh requires a filter (the data itself) and renderer (how it will be drawn: shadows, materials and light probes). Materials use a shader (a drawing algorithm) along with colours and textures (images to map onto the geometry). Textures can also be used for other purposes, and can be created using any image editor. 

### Cameras, lights

One default camera, additional cameras for special effects, HUD UI etc. Camera can be attached to an object for 1st/3rd person, or globally positioned. 

Lights can be static (baked) or dynamic. Point lights are like an omnidirectional lightbulb. Directional lights are like the sun, and affect all objects regardless of position. Spotlights are like flashlights. We can change the geometry (position, orientation, etc.), and color/intensity of these lights.

Area lights only work for baking a light map, and will only use static elements. Emissive light also is only static, and captures the effect of objects that are also light sources. 

Ambient light is added to all objects in the scene regardless of position and direction. It is the least realistic. 

Lighting effects: shadows (hard/soft), halo/flare (remember to add flare layer to camera), cookie (patterned lights). 

# Oculus in Unity

First, make sure to read the [best practices guide](http://static.oculus.com/sdk-downloads/documents/Oculus_Best_Practices_Guide.pdf)

[Walkthrough of setting up a blank Unity scene using DK2](https://www.youtube.com/watch?v=xU5_1ivyItg)
