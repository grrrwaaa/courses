![Unity](http://upload.wikimedia.org/wikipedia/en/4/4a/Unity_3D_logo.png)

Unity is a cross-platform game creation system developed by Unity Technologies, including a game engine and integrated development environment (IDE). It is used to develop video games for web sites, desktop platforms, consoles, and mobile devices. 

> Unity is an entire ecosystem of tools and services designed for people who want to build a successful business by creating multiplatform games and interactive content. The Unity ecosystem is available to anyone who downloads the Unity engine. The Unity engine integrates into one unparalleled platform the tools to create 2D and 3D interactive content; collaboration solutions; rapid multiplatform deployment, and retention, advertising and analytics services to grow your business. 

> Publish to all mobile platforms, Mac, PC and Linux desktop, web or consoles. Use powerful cross-platform tools to make your interactive content run beautifully on any device.

[Download](http://unity3d.com): Unity Free has no fee, and is available for any use to individuals or companies with less than US$100,000 of annual gross revenue. (Unity Pro has more features and capabilities, but is not free.)

For Oculus Rift development, Unity Free is sufficient. You will also need to download & install the [Oculus Unity 4 integration](https://developer.oculus.com/downloads/).

To use the Leap Motion VR kit, currently you will be restricted to using Windows. You'll also need to install the Leap Motion V2 driver, and download the Unity VR Asset from [here](https://developer.leapmotion.com/downloads/unity)

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

![Mouse controls](https://cdn.tutsplus.com/mobile/uploads/legacy/Unity3D_Introduction/mouse_buttons2.png)

Search box in scene/hierarchy

### Game view (play)

Can show/hide gizmos, stats. 

Can pause and step, and can tweak game content while playing. HOWEVER, **ALL changes made whilst the game is STILL running WILL BE LOST once the game stops running.**

### Game objects

Everything in a scene is a "game object". Game objects contain components determining behaviour and appearance, such as transform, scripts, sounds, lighting etc. 

All objects contain a *transform*, which is the position, orientation (rotation) and scale in the world. 

#### Hierarchy

All game objects in your scene, alphabetically. Objects can be grouped under a "parent" object, to make a hierarchy. The parent can also be an "empty" game object, just for grouping. "Child" objects inherit transform (position, rotation, scale) from the parent. 

Can search (as in scene).

Can create new objects. 

#### Inspector

How to adjust whatever object, asset, etc. is selected. 

Main checkbox: enable/disable the object.

Static checkbox: static objects can be optimized for lighting/navigation.   

Component checkboxes: enable/disable the component of the object. 

Add components with the button at the bottom of the inspector or Component menu, or drag from Project. 

Be careful with renderer assets: you may be editing the original asset rather than a specific instance, which means that your edits will apply to all uses of it. 

*Tag (labelling of one or many, to address via code), layer (for lighting/collision rules).*

	GameObject.FindGameObejctsWithTag("enemy")

### Project

All assets available in the project. Game objects, components and the resources used by them (such as scripts) are all Assets. 

Scenes are also here (A project can have many scenes.)

In the Project window you can view, search for assets, including searching the asset store. 

Unity comes with a bunch of standard assets, which you can import into your project by clicking on Assets -> Import Package. You also had a chance to import them when you create a new project.

You can also create or import assets here. (Can also do it by Asset menu, or by dropping files into the Assets folder on disk). 

> You should NEVER move project assets around using your OS's file system since this will break any meta-data associated with the asset, i.e. textures & materials applied to a model, scripts applied to a GameObject. You must ALWAYS use the Project View to organize your assets.

It is a *very* good idea to keep the Project view nicely organized -- a finished project will have a lot of assets. 

#### Prefabs & instances

A pre-configured, re-usable game object built in the scene and stored in the project, which can then be instantiated (cloned) in the scene. 

> For those who have worked with Flash, Prefabs are very similar to the concept of MovieClips within the Library. 

You can create as many instances of a Prefab within your game as required and any alterations to the original will be reflected within every instance you've created. This is called Inheritance. You can also override an instance's default values allowing them to look more unique, rather than like clones of the original Prefab. 

To create a *Prefab*, drag any game object to the project panel (typically to the Prefabs folder). Now delete it from the scene. 

To create an *instance*, drag the Prefab into the scene. 

Be careful when editing -- if you have the object (hierarchy/scene) selected, you are only modifying the instance. If you have the prefab (project window) selected, you are modifying the prefab, and all other instances will be modified too. 

Prefabs make it easy to have a large number of objects in the scene that share many similarities, yet are each different. Editing the similarities is done on the Prefab, editing the differences is done on the instances. 

> Prefabs are also important if you want to instantiate objects at run-time. For example, bullets. 

### Meshes, materials

[See tutorial here](http://unity3d.com/learn/tutorials/modules/beginner/graphics/meshes) - scenes are built from 3D polygonal meshes of vertices (points) connected by lines (edges) to create triangles (faces), many of which create geometric forms. They are not created in Unity, but must be imported from external programs. 

You can create 3D models yourself in tools like Maya, 3DS Max, or Sketchup, or you can just download models that have been created by 3D artists and placed on websites like the Unity Asset Store and TurboSquid.

Rendering a mesh requires a filter (the data itself) and renderer (how it will be drawn: shadows, materials and light probes). Materials use a shader (a drawing algorithm) along with colours and textures (images to map onto the geometry). Textures can also be used for other purposes, and can be created using any image editor. 

Videos can also be used as textures.

### Cameras

One default camera, additional cameras for special effects, HUD UI etc. Camera can be attached to an object for 1st/3rd person, or globally positioned. 

### Controller

The standard Character Controller package includes both 1st and 3rd person controllers, which you can drop into the scene. You should only have one controller in a scene, and if you do have one, you should remove the Main Camera (because the controller embeds a camera already). 

For using the Oculus, we'll want to use the OVRCameraRig or OVRPlayerController prefabs instead. But it can be handy to use a standard character controller initially, especially if you don't have a Rift handy to test on.

### Lights

Lights can be static (baked) or dynamic. 

- Point lights are like an omnidirectional lightbulb. 
- Directional lights are like the sun, and affect all objects regardless of position. 
- Spotlights are like flashlights. We can change the geometry (position, orientation, etc.), and color/intensity of these lights.
- Area lights only work for baking a light map, and will only use static elements. Emissive light also is only static, and captures the effect of objects that are also light sources. 
- Ambient light is added to all objects in the scene regardless of position and direction. It is the least realistic. 

More lighting effects: shadows (hard/soft), halo/flare (remember to add flare layer to camera), cookie (patterned lights). 

### Skybox

A skybox is like the backdrop of the scene -- an image that is always behind all other objects. The difference is that in 3D we need to put a backdrop in all directions, which is usually done either as a giant sphere or a giant cube. It is the mountains and clouds that you can never reach in a game. 

Edit > Render Settings, and drag a skybox from the Project into the Skybox Material slot

### Colliders, RigidBodies

Basic shapes have collider components. Any other shapes you add might also need colliders.

A collider is a simplified shape used in Physics simulation -- the bounding volume that things will bounce off, or detect when things hit it. 

A RigidBody component is needed if the object should move by gravity and collisions. Without a RigidBody, the object will just hang in space. Usually the static parts of the world (terrain, walls, etc.) do not need RigidBodies. Add with Component -> Physics -> RigidBody

Too many colliders will make the simulation slow.

### Terrain

A built-in way to create simple landscapes: Create -> 3D Object -> Terrain

You'll need some terrain assets first. Grab the "FREE Terrain Assets" from the Asset Store.

Usually the first thing to do is open the Terrain Settings in the Inspector, and reduce the resolution (it's usually 2km wide!)

Play with the other tools to paint the topography.

You can paint on more textures (pull in terrain textures from the asset store, or anywhere...)	

You can add detail by placing trees, and configure things like how the wind blows.

You probably want a directional light to be able to see it well... 

### Audio

A scene should have only one audio listener. Typically this is built into the PlayerController or MainCamera; in our case it will be part of the Oculus Controller. 

An AudioSource is attached to a GameObject and is used for playing sound effects (or music). Sounds can emanate from a 3D position of the GameObject to which it is attached, so if the GameObject is a character off on the left hand side of the scene, the sound will come from that location as well. 

Sound can also be “2D” (not originating from a 3D point in space); for example, background music for a game might be 2D so it sounds the same everywhere in the game.

ReverbZones are regions in which all sounds will be heard with a simulation of a reverberant space, such as a corridor or room. 

### Scripts

Scripts, known in Unity as behaviours, let you take assets in your scene and make them interactive. Multiple scripts can be attached to a single object, allowing for easy code reuse. 

If you are comfortable writing code, you can choose from three different programming languages; UnityScript, C#, and Boo. UnityScript is similar to JavaScript and ActionScript, C# is similar to Java, and Boo is similar to Python. 

### More

- Animations: mostly focused on humanoid characters. You can import humanoid models and attach different recorded animations to them.
- Pathfinding systems: allowing objects (e.g. NPCs) to find an unobstructed path from one location to another
- Particle effects, smoke, explosions, etc.
- User interface overlays

## Summary

- A project is made of assets and scenes.
- Scenes are made of gameobjects located in space.
- Gameobjects can be unique or can be instances of a prefab.
- Gameobjects have components to define spatial position, behaivour and appearance. 
- Appearance is a function of scene camera, lights, object mesh, and object material. 
- Meshes are built from triangles, and usually imported from external files/programs.
- Materials combine painting methods (shaders) with surface colors or textures (usually 2D images). 
- Objects & lighting can be dynamic or static. Lighting is static only when both light and object are static. The number of dynamic lights is limited. Static lighting can simulate additional effects (like the self-shadowing of ambient occlusion) by "baking" the effects into the objects.
- There are many options for the camera, but when using the Oculus Rift this is restricted to matching the optics of the hardware device.

## Oculus in Unity

First, make sure to read the [best practices guide](http://static.oculus.com/sdk-downloads/documents/Oculus_Best_Practices_Guide.pdf)

[Walkthrough of setting up a blank Unity scene using DK2](https://www.youtube.com/watch?v=xU5_1ivyItg)
