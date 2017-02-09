title: Unreal
importance: 3

--- 

# Unreal Engine

Unreal has long been used in many "AAA" (large-scale/high-production value/high-budget) games, but was open-sourced with an amenable license in early 2015; and now has built-in support for VR and the Oculus Rift.

Note: you will need [a reasonably fast PC or Mac](https://docs.unrealengine.com/latest/INT/GettingStarted/RecommendedSpecifications/#recommendedhardware) to run Unreal comfortably. Mac users will also need a mouse with at least two buttons.

## Some quick inspiration

On Youtube there are now plenty of examples of high-speed video captures of level design using game engines such as Unreal -- and [here's an interesting article speculating how the emergence of VR is adding fuel to the fire, with many examples](http://thegrue.com/how-vr-is-creating-a-new-market-and-community-for-level-design-pointless-places/) -- such as:

<iframe width="640" height="360" src="https://www.youtube.com/embed/UCOww2sdsTM?rel=0" frameborder="0" allowfullscreen></iframe>

<iframe width="640" height="360" src="https://www.youtube.com/embed/67NToSkW2vs?rel=0" frameborder="0" allowfullscreen></iframe>

We cover nearly all of the tools used in these clips during the labs.

## Getting Unreal

- Go to [https://www.unrealengine.com](https://www.unrealengine.com) and follow the "Get Unreal" link to register an account and then download the launcher application. 
- Run this launcher (you will need to sign in again), and then under the "Unreal" tab download the Unreal Engine. This will take a while!
- From the launcher also get the "content examples", and perhaps any other of the free samples you find interesting. Warning -- these examples can eat *gigabytes* of disk space!!

## Create/open project

Open the editor directly, or via the launcher. It should open with the 'project browser'. 

Create a new project, typically from the "blank" or "first person" template, and make sure that "with starter content" is selected. Choose where to save it, and then "create project". This will now open in the editor. 

In future, just go ahead and open your existing project from the launcher or the project browser. I recommend that you only create one project, and just make new levels whenever you want to try a new idea out. This will make it easier to copy things between levels, and save disk space.

## The editor

[video tutorial](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=w4XlBKeE46E)

The main panel is the 3D **viewport**, showing a preview of the world. You can navigate around the world and also modify objects (actors) in here.

[Navigating](https://docs.unrealengine.com/latest/INT/Engine/QuickStart/2/index.html)

- Left mouse: move forward/backward/turn
- Right mouse: look around
- Both buttons (or middle button): vertical & strafe movement
- Mouse-scroll to zoom in and out (not the same as moving!!)
- Keys: with any mouse button (usually the right) held down, keys W, A, S, D, Q and E move around. 
- Select an object by clicking on it, then press "F" to focus on it (or, double-click an item in the World Outliner)
- Press G to turn nonvisible items (e.g. lights) on and off
- Alt+mouse ("maya style") pivots and dollys around the focused object.

On the left, the Modes panel selects different task workflows, such as placing objects, creating geometry, painting meshes, generating trees, etc. Most of the time we stay in the initial "placement mode" -- which allows us to drop basic items such as default lights into the scene.

At the bottom, the **Content Browser** is where you can manage the Assets used in your project. With this you can also drop any existing assets into the scene. You can also double-click on some items in this browser to modify them in special editors.

On the right, the **World Outliner** panel shows all the levels, and all the actors involved in each level. You can select them here, or in the 3D viewport, to modify them. You can also use this to "parent" one object to another, so that they always are positioned together (drag one item onto another to set it as parent).

Below that, the **Details panel** is used to modify properties of whatever is currently selected, and also to add additional components and "blueprints" (scripted behaviours) to them.

> Tip: Hold Control+Alt and mouse-over any Editor feature to see a help window about it.

---

## Concepts

[Getting started with UE4](https://docs.unrealengine.com/latest/INT/GettingStarted/index.html?utm_source=launcher&utm_medium=ue&utm_campaign=uelearn)

You use the Unreal *Editor* application to author your world. Ultimately you will export it as an application (.exe on windows), but most of the time you will edit and also playtest the world via the Editor. A *Project* is actually a whole folder of files on your disk, including a .uproject file that keeps the global settings together. You can see these files via the Content Browser in the Unreal editor. You can see all your projects in the "Library" section of the Unreal launcher.

Each project has one or more *Levels* (sometimes also called "maps"), which are like 3D scenes or locations into which you place objects to define the world experienced. Each level is saved as a separate .umap file. All the levels in an Unreal project make up a *World*.

> I recommend that you do all your development in a single project. You can create new levels to try different ideas out, but keeping it all in a single project will make it easier to copy items between levels, and reduce disk space.

Any object (a player, character, geometry mesh, light, etc.) that can be placed in 3D space (with position/translation, rotation/orientation, scale etc.) is an *Actor*. Remember that *Assets* in the content browser are the resources you can place into the world, while *Actors* are instances that use these resources.

At its most basic level, creating levels boils down to placing Actors in a map. Actors can also be created ("spawned") by scripts, e.g. the arrows launched by a bow. Some examples of kinds of Actor are StaticMeshActor, CameraActor, PlayerStartActor. A *Pawn* is a kind of actor that serves as an avatar or persona. 

A *Component* is a piece of functionality that can be added to an Actor. Components cannot exist by themselves. For example, a Spot Light Component will allow your Actor to emit light like a spot light.

---

## Viewport navigating

[Viewport tutorial](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=j2CKS6G3G2k):

- Left mouse: move forward/backward/turn
- Right mouse: look around
- Both buttons (or middle button): vertical & strafe movement
- Mouse-scroll to zoom in and out (not the same as moving!!)
- Keys: with any mouse button (usually the right) held down, keys W, A, S, D, Q and E move around. C and Z will do a temporary zoom in/out.
- Select an object by clicking on it, then press "F" to focus on it (or, double-click an item in the World Outliner)
- Alt+left mouse ("maya style") pivots around the focused object.
- Alt+right mouse can dolly toward/away from the object.

## Placing objects 

[First tutorial](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=01BL2bWeJSA):

By default new levels pretty much just have a floor and a player-start actor. Ways of adding content:

1. We can drag basic objects & actors from the 'place mode' palette at the left. You can drag objects from the browser into the viewport, and also materials right onto objects in the viewport. And also more abstract items such as lights, triggers, and other classes. 
2. We can drag objects from the Content Browser below.
3. Right-click in the viewport and choosing 'place actor', then selecting the time to add.

Once placed, objects can be [moved](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=wHJCv-Ph6zU), [rotated](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=ralshA7aWag), and [scaled](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=rqJoX8orsUM):

Press "w" to enable the move tool (usually it is enabled by default), or using the toolbar at the top-right. The red, green, and blue arrows represent the X, Y, and Z axes respectively. Click & drag an arrow to move the object.

Press "end" with an object selected and it will drop down to the floor.

Hold down "shift" while moving an object, and it will also move the camera at the same time.

Press "e" to enable the rotation tool, or using the toolbar at the top-right. Click on one of the arcs to start rotating, and it will show you how much you are rotating in degrees. 

Press "r" to choose the scale mode, or using the toolbar at the top-right. To scale in one axis choose the corresponding red, green, or blue box, or to scale in all axes grab the white cube in the center.

The globe icon (after the scale tool) chooses between world-space and object local-space to move & rotate in. (Ctrl ~). Note: scaling is always in local space.

The next tool along controls move snapping (enable, grid size, etc.) This is followed by the rotation snapping options, and then the scale snapping options. Snap to grid is useful for creating buildings -- making sure there are no gaps between walls! 

Position, rotation & scale can also be modified from the object's details panel. Remember, Unreal measures in centimeters, and the Z axis is up.

"alt drag" to make a copy of an actor.

"ctrl g" to group, "shift g" to ungroup.

"g" - toggle 'game view', which hides all the additional viewport visualizations that are not viewable in the game itself.

## Content browser

The [Content browser](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=tG2KML-CDRo) contains all assets created within Unreal, or imported from outside. Meshes, materals, particle effects, sounds, etc. This mirrors the directory structure on disk. Many of them can be edited and saved in-place, which will be automatically re-imported to Unreal.

You can **add new** to create new simple assets or content packs. You can create new folders to organize assets better. You can **import** external assets to the content browser.

Assets can be edited *before* bringing them into the level. Double-click any asset and it will open a special sub-editor in which it can be modified.

Projects can end up with very many assets. There is a search tool and options to filter assets by type. You can have multiple content browsers and lock them to different folders.

## Building a level

We're not going to cover roles an "environment artist" would play in game development, such as the creation of 3D models. Instead we will operate more like "level designers". 

Like any major production, everything starts with planning and sketching; with some interesting overlaps and differences from film, architecture, design, composition, etc. 

> Within Unreal, sketch first with a "roughed-in" or "blocked out" schematic of the world, and start testing it's movement and flow as soon as possible -- long before spending any time on creating the real mesh geometry and other art assets. [Geometry Brushes](https://docs.unrealengine.com/latest/INT/Engine/Actors/Brushes/index.html), also sometimes called "BSPs", are perfect for this aspect of the level design process. After testing & refining, spend more time updating the meshes, lighting and other elements of the world, testing continually, up to the last stages of polishing up.

[Geometry layout -- part 2](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gak1_FoAJVrEGiLIploeF3F&video=57MxoF4sy84):

The **First person template** gives us a simple world of grey and white blocks, with a character who can run around, jump, and also shoot physical balls. This is a good starting point. **To hide the silly blue character**: In the content browser, double click the Blueprints/FirstPersonCharacter, switch to the viewport and select the Mesh1P mesh, in the details panel click the "owner no see" option. Then compile & save.

Alternatively, when starting from the **blank template** you'll probably want to add some floor, light, atmospheric fog, Lightmass Importance Volume, etc. as [described here](https://docs.unrealengine.com/latest/INT/Engine/QuickStart/4/index.html).

It can be useful to make new levels to test out ideas quickly without breaking work done in your main level(s). We can create a new level (File -> new level), and likely choose the default map. Delete the "player start" for now. Maybe also delete the floor if we'll be making our own.

A *Geometry Brush* is a way to fill in and carve out volumes of space in a level. They can be used to rapid-prototype a level where static meshes have not yet been created. Geometry Brush shapes include Boxes, Cones, Spheres, and Staircases, and have a few things that can be tweaked in the details panes. Using the *Geometry Editing Mode*, very simple 3D modeling can be performed. A geometry brush's settings can be set to "Subtractive" type, which will carve out holes in other brushes -- however the order of brushes is important. Also be careful to use the *Drag Grid* to make sure geometry snaps to tight alignment. You can also apply materials and lighting properties to a brushes' surfaces. After modeling, you can convert a brush into a regular StaticMeshActor from the Brush settings.

In the Placement mode tab, choose the BSP (also known as *geometry brush*). Now we can drag different kinds of brushes into the level, such as boxes, cylinders, and stairs (though remember -- stairs are nauseous in VR!). After dragging it in we can resize it (e.g. via the details panel). 

Snapping on is pretty important when drawing basic geometry -- and probably want to have the snap size bigger than the default 10cm. 

Use "ctrl end" to snap an object to grid ("end" by itself drops an item to the floor). 

"alt drag" to make copies. "ctrl drag" to select multiple items to copy.

Switch to the *Geometry editing* mode tool to modify existing geometry brushes in terms of faces, vertices etc.

Hit "Build" in the top toolbar to apply the changes, and rebuild lighting models etc.

[Part 3](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gak1_FoAJVrEGiLIploeF3F&video=RGxf2SiUBt8)

Create an opening in a wall: duplicate the wall, reduce its size. Set the brush type to "subtractive" (in the details panel). Then drag it back into the wall. The starter content has some static meshes for door frames, window frames etc. which we can drag into these openings.

[Part 4](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gak1_FoAJVrEGiLIploeF3F&video=v5yCcP9EnT8)

**Applying materials**: Can just drag & drop materials onto the geometry brushes. To drag onto all faces of a geometry brush, first press "shift+b" to select all the faces. Also, if you select a wall, pressing "shift+w" will select all adjacent walls.

**Aligning textures (to avoid seams):** Select all adjoining panels (with "ctrl") and in the details panel, set Geometry / Alignment / Align surface planar to make sure there are no seams between them.

[Part 5](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gak1_FoAJVrEGiLIploeF3F&video=dSckAxhy_4I), [Part 6](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gak1_FoAJVrEGiLIploeF3F&video=xVDq-9kSD74), [Part 7](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gak1_FoAJVrEGiLIploeF3F&video=xzGWuW_iWPM)

**Adding feature and prop meshes, lights, etc.**: After adding the brushes and dropping in materials, we can start adding some more detailed meshes, improve the lighting, etc. The starter content has a few good architectural items to work with, such as a "glass window" panel that can be used for all kinds of glass panels.

> See also the [Level Designer Quick Start](https://docs.unrealengine.com/latest/INT/Engine/QuickStart/index.html) documentation.

### Mesh Assets

Here are some other places where free 3D models can be downloaded. Depending on what your intended use for the project is, pay special attention to the licensing terms of these models -- this is intellectual property.

- [Google 3D Warehouse](https://3dwarehouse.sketchup.com/?redirect=1)
- [3D models for free](http://tf3dm.com) 
- [Turbosquid](http://www.turbosquid.com/Search/?KEYWORD=Free)
- [Exchange 3D](http://www.exchange3d.com/Free%203D%20Models/cat_35.html)
- [3DVia](http://www.3dvia.com/search/?search%5Bquery%5D=free&search%5Bresults_per_page%5D=12&search%5Bsort_order%5D=Rank&search%5Bfile_types%5D=1)

---

Of course, we can also drag in other kinds of props, such as basic particle systems (e.g. fire).

Any mesh props can be made to simulate physics simply by selecting them and ticking the "simulate physics" option in the Details tab.

Whenever we add or modify a light source, we will need to rebuild the lighting model (press Build in the big toolbar). 

---

## Landscaping

[See documentation](https://docs.unrealengine.com/latest/INT/Engine/Landscape/QuickStart/index.html)

If this is a new level, delete the default floor. In the Modes panel select the Lanscapes mode. A green grid will show in the viewport.

If this is the first time to use it, you will need to "Create New" to make a new landscape. It's a good idea to assign a landscape material before creating it. You can drag on the landscape's edges to make it cover more or less area.

> For recommended landscape sizes, see https://docs.unrealengine.com/latest/INT/Engine/Landscape/TechnicalGuide/index.html#recommendedlandscapesizes

Once created, you can start to Sculpt and Paint it.

### Sculpting

Ctrl-click to select areas.

With the default sculpt tool, left click to increase elevation, shift-click to decrease.

There are lots of other tools, for smoothing, flattening, eroding, etc. the land. Smoothing & flattening is good for VR, as it feels more comfortable to walk on. Flattening can also be good for making rivers and roads.

Use the brush options to change the size & strength.

Make sure that your Player Start object is above your terrain or else you will fall through the world. If this does happen, drag the player to start up on top of the terrain and hit the End key for it to fall.

### Painting

We can just drop in a single material, but we can also use Paint mode to blend multiple materials on the landscape. 

Creating landscape materials is a little more complex ([there's a tutorial here](https://www.youtube.com/watch?v=tsXVP0fykBM)), but we can migrate some from other example projects or content packs available through the Epic community (via the Launcher app).

For example: 
- open the ExampleContent project, 
- navigate in the content browser to Content/Landscapes/Materials, 
- right-click on M_LandscapeMaterial_Inst, 
- choose Asset Actions > Migrate...
- click OK to select all dependencies
- navigate to & select your project's Content folder on disk (e.g. Documents/UnrealProjects/MyProject/Content) & OK
- open your project 
- File > New Level, choose default, OK
- delete the ground box
- switch to Landscape tool
- in the content browser, navigate to ExampleContent/Landscapes/Materials
- drag the M_LandscapeMaterial_Inst into the Material option of the New Landscape tool 
- set the size & create landscape
- switch to the landscape tool's paint mode
- scroll down to the tool's target layers
- for each of Soil, Grass, and Snow layers, click on the + button to create layer instances (choose the "Weighted Layer" option, and save these in a sensible location, e.g. also in the ExampleContent/Landscapes)
- Now you can paint the materials
- After painting, click Build in the big toolbar to rebuild the lighting for the level

Another fairly easy thing to do is to then customize this landcape material by replacing the textures -- just double-click on the material in the browser to open the editor, find the texture nodes you want to replace, and drag in different textures from the content browser. Save, apply, and build again.

### Adding water

Place a BSP box into the world so that it lies above the lowest land. Drag on the "M_Water_Lake" material from the StarterContent/Materials folder in the content browser.

It might seem weird that we can walk on water. [To make it swimmable, look here](https://wiki.unrealengine.com/Swimmable_Water_Volume_Tutorial) -- or [this video tutorial](https://www.youtube.com/watch?v=LtyXjSb1P-4). 

Very likely you want to also place a post-processing volume under the water, so that the rendering has a watery style when swimming.

### Caves

It isn't possible for a single landscape to overhang itself, so you can't punch caves into a surface, but there are other ways of making caves.

It is possible to make a hole in a landscape, so that they can be walked through, by sculpting with the visibility tool. Make a hole in the landscape using the visibility mask, [as described here](https://docs.unrealengine.com/latest/INT/Engine/Landscape/Editing/SculptMode/index.html#visibility). You will first need a Hole Material, [as described here](https://docs.unrealengine.com/latest/INT/Engine/Landscape/Materials/index.html#landscapeholematerials), which you can apply as the Hole Material in the landscape's details panel. 

You probably want to surround the hole with some meshes to mask it. You probably also need to edit the material of the landscape to enable two-sided lighting, so that it doesn't become transparent underneath.

To fill out the cave underneath, either use BSPs & meshes with collisions, or you can also create another landscape underneath the first (but you will still probably need BSPs & meshes for the roof.)



--- 

## "Foliage"

The foliage tool is really just a way to randomly disperse objects over a landscape -- typically used for trees, bushes, grassy areas etc., but in fact it can be used for any kinds of objects.

You'll need some ground to start with, whether a giant BSP, mesh, or a landscape, to place objects on. Then switch to the Foliage Mode tool.

In the Paint option, drag one or more objects (meshes) into the Foliage Type box. Now click and drag in the viewport to paint randomized scatterings of these meshes on your ground. If you placed too many, you can also remove them by shift-clicking. 

The paint options can be used to set the area over which meshes are added, and how densely (and the shift-click erase density). The Reapply tool can be used to change parameters of existing instances. The selection tool can be used to grab individual instances for moving and deleting. With the Lasso tool, you can drag to select many instances.

You can also vary the properties of each mesh type in the foliage tool -- select the mesh, and the details panel appear below. Common settings would be varying the scale, increasing the radius (spacing between objects), random yaw (random rotations), collision option (i.e. whether you can walk through them -- as BlockAll -- or not -- as NoCollision). There are many other options. Align to normal will rotate objects on sloped surfaces, ground slope angle will not place objects on extreme slopes, etc.

> Note that there is a newer, more experimental [foliage creation system described here.](https://docs.unrealengine.com/latest/INT/Engine/OpenWorldTools/ProceduralFoliage/QuickStart/index.html)

---

## Embedding sound

[See documentation](https://docs.unrealengine.com/latest/INT/Engine/Audio/index.html)

You can import .wav audio files into the Content Browser like any other content -- they become "Sound Wave" assets. A handy place to find free audio files is freesound.org. The simplest way to then add the Sound Wave to your world is to drag it from the content browser to the viewport. 

More complex sounds can be created as "Sound Cues", which have their own editor similar to the material editor or blueprint editor. With this editor multiple sounds can be mixed together, with different modulation and other effects.

When sound waves or sound cues are added to a level, they are known as "ambient sound actors". 
- Generally these will get louder as you approach them, and quieter as you move away.
- You can either have them play continuously and loop (enable looping in the sound wave or sound cue asset, and enable "Auto Activate" in the ambient sound actor details), or trigger them from e.g. box triggers.
- In the Attenuation of an ambient sound actor's details, you can control if and how the sound is spatialized. 

You can also create an "Audio Volume" (from the "Volumes" option of the placing mode tool), a region of space with specific audio properties, and then assign a Reverb Effect to this space with particular properties like the echo density, overall reverb gain, air absorption, and more, to craft its unique sonic character.

---

## Embedding videos

[See documentation](https://docs.unrealengine.com/latest/INT/Engine/MediaFramework/index.html#mediaframeworkwithblueprints) -- but note that the "Auto Play" feature they mention no longer exists. We will need to use Blueprints to make the video play.

- First, if it doesn't already exist, in the ContentBrowser (or in your project's Content folder on disk), create a folder called Movies
- Drag the movie clips you want to embed into this folder
- Press the Add New button in the content browser, and under Miscellaneous, choose MediaPlayer
	- It will create a new MediaPlayer asset in the content browser (which you can rename now). 
- Double-click on it to open the editor. In the Details panel, under Source, click on the "..." icon next to File or URL
	- Navigate to the Content/Movies folder and select your video
	- Play the video to see it working
	- Close the media editor.
- Right-click on the MediaPlayer asset in the content browser, and select Create Media Texture. It will create a new MediaTexture asset in the content browser.
- You can now use the Media Texture in place of any texture in a Material. But even simpler, you can right-click on the MediaTexture and select "Create Material" to make a material we can drag onto any BSP or static mesh, which will play the video back in-game.

Now, to make the video actually play, we need to trigger it -- typically this would be when you enter within a certain region near it. This involves some visual programming -- [here's a tutorial for that](https://docs.unrealengine.com/latest/INT/Engine/MediaFramework/index.html#mediaframeworkwithblueprints).

![diagram](https://docs.unrealengine.com/latest/images/Engine/MediaFramework/LevelBlueprintExample.jpg)

- From the (placement) Mode tool, drag in a box trigger. 
	- Resize it to the area you want the video to be active in, but no bigger.
	- Right click on it, and in the "Add Event" option, choose OnActorBeginOverlap
		- This will open up the blueprint editor, but move it out of the way for now
	- Do that again, for OnActorEndOverlap
- Now call up the level blueprint editor again. If you closed it, you can reopen it from the Blueprints menu in the big toolbar, selecting "Open Level Blueprint"
	- In the left toolbar, click the "+" next to Variables
		- Set the type (the coloured icon) to Object Types > MediaPlayer > Reference	
		- Give it a name, e.g. "myMovie1"
	- In the right Details, set the Variable Type to Media Player
	- Press the Compile button in the big toolbar
	- Again, in the right Details, set the Default Value to your video asset
	- Again, from the right, drag the Variable into the level blueprint, and choose the Get option.
- Drag out a cable from this variabel reference, and let go of the mouse to see the menu
	- Choose Media > Media Player > Play
	- Do that again, and choose Media > Media Player > Play (or Rewind)
- Now hook up the OnActorBeginOverlap "exec" output to the Play "exec" input
- And hook up the OnActorEndOverlap "exec" output to the Pause "exec" input
- Again, press Compile in the big toolbar (it should say "good to go" -- otherwise there must be some error, and try to fix it or do it again)
- Close the blueprint editor, save & build your level, and try it out!

### Media sound

If the video has sound, you can also create a Media Sound Wave for it -- it will also play and stop in sync with the video.

- Right-click on the media asset in the content browser and choose "Create Media Sound Wave"
- drag the newly created sound wave into the world

---

## Post effects volumes

From among the Volumes that can be dragged in, the post effects volume can be used to change the rendering style. It can also be used to define a completely new post rendering material, for more dramatic effects.

Care needs to be taken with these however: the result experienced in VR may be quite different than how it is experienced on screen, where there is less depth and immersion.

---

---

## Tips

### Projects & levels

You can make a new level at any time from File->New Level. 

To set the default level (the one that opens when a project launches), go to Project Settings

To set where the immersant will start (and what direction they face) when the level runs, move and rotate the "Player Start" actor. If you don't have a Player Start actor in the level, you can drag one in from the starter content collection. It's common while editing a level to remove the Player Start, so that it will run from wherever you where editing from. 

### Content

**Copying (migrating) assets between projects**:

You can't usually copy objects directly from one project to another, but you can [migrate assets](https://wiki.unrealengine.com/Migrate_content_between_projects). Migrating an asset will also migrate everything that it depends on (textures, materials, blueprints, etc.):

1. Locate the content in the Content Browser, right-click and choose "Migrate"
2. Confirm all the assets to migrate
3. Locate the project "Content" folder (on disk) of the project to migrate to (not a subfolder!)

**Copying actors between levels (maps) of the same project**:

Just select what you want to copy in the Outliner and Ctrl-C to copy, then switch to the destination level, and Ctrl-V to paste.

**Copying actors between levels (maps) of different projects**:

First, migrate the necessary assets, then copy the actors, both as described above.

### Converting BSPs to Meshes

A BSP, or even multiple selected BSPs, can be converted to a static mesh. This is helpful when you want to assign different properties or behaviors that BSPs don't support, or to use them as reusable assets for building blueprints, or with foliage, etc.

By default, a static mesh created this way has no collision hull, so a character will fall right through it. To add a collision hull:
	- double-click the mesh to open the mesh editor, 
	- to generate the hull automatically:
		- from the Collision menu choose Auto Convex Collision
		- in the details panel that opens, set the accuracy options, and click Apply
		- a visualization of the collision hull will appear in the viewport
	- otherwise, with other options in this menu you can build a hull by hand
	- finally, save and close the mesh editor	

### More viewport editing options

**[Orthographic views](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=RoiQOwCg-4Q):**

In the top-right corner of viewport there is a small 'min/max' button which will alternate between a maximized 3D view, and a 4-up set of views for top, left, and front "orthographic" (non-perspective) views as well as the regular perspective one. Right-click & drag to move in these views, and mouse-scroll to zoom.

**[View modes & show flags](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=7UjP6gr44dc)**:

By default the viewport uses full lighting ("lit") -- other modes are unlit (raw materials), wireframe (raw meshes), detail lighting (lighting effects only), reflections, etc. Next to this option is the **Show** drop-down, where you can enable and disable different kinds of content in the viewport.

**Selecting translucent objects**: The "t" key will enable/disable the ability to select translucent objects. If it is off, you will select whatever object is seen *through* the translucent object.

**We can [lock the viewport to an actor](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=Z7OqNjFpy6U)** by right-clicking on an object and selecting the "pilot" option. This fixes our viewport's perspective to the object itself, and we can use the standard viewport movement controls to reposition the object. This is especially useful for positioning lights and cameras, for example.

**Viewing the Frame rate**: Command+Shift+H (or the dropdown top-right of the viewport)

**Other tips**:

The "[" and "]" keys change the snapping size.

### More concepts & definitions

- A *Class* defines the behaviors and properties of a particular Actor or Object used in the creation of an Unreal Engine game. Classes can be created in C++ code or via visual diagrams called Blueprints. Each game has one *PlayerController* class which controls a Character Pawn from input controls (joystick etc.). An *AIController* possesses other Pawns to serve as non-player characters (NPCs) in the world.

- *Volumes* define a 3D area for certain purposes, often invisible (such as blocking volumes to prevent actors leaving the area, pain causing volumes to inflict damage on any actor within the area, trigger volumes that cause events when an actor enters or exits them). 

- A **box trigger** can cause events to happen when a player enters or leaves the region of the (invisible) box region. 

A neat thing is to turn an existing geometry brush into a trigger. You can select a BSP geometry brush in a level, duplicate it, then in the Details panel, the Actor section, you can choose "Convert Actor" and turn it into a "Trigger Volume". 

- Blueprint **timelines** are ways we can make a sequence of events happen -- and we can also make them happen in reverse. See day/night example below.

---

## Blueprints

"Blueprint" is the visual scripting system in Unreal, which means you can do programming by connecting up visual flow charts rather than writing code. (You can also write C++ code if you want...)

The most common places that you will do blueprints are: 

1. The **Level blueprint**, where you can write behaviours that are global to a level. Typically this is where you would put mouse/keyboard etc. interactions, for example. 

You can open the level blueprint from the Blueprints large tool item above the viewport.

2. **Class blueprints** are ways that you can add scripted behaviour to objects that can be spawned during a game, or which you can make multiple instances of while editing. In this case the script is contained within each instance. Class blueprints therefore also have a viewport, and can have other components such as meshes embedded. They also have a Construction Script.

You can open class blueprints from in the Content Browser, or by following links in the World Outliner. You can create new Class Blueprints from the Content Browser.  The benefit of using class BPs is that you can create many many instances of them throughout your level.

Here's a gentle introduction:

<iframe width="640" height="360" src="https://www.youtube.com/embed/8WeE4q6Ba40?list=PLZlv_N0_O1gaCL2XjKluO7N2Pmmw9pvhE" frameborder="0" allowfullscreen></iframe>

Generally the form of blueprints is that there are events that can trigger functions, and there are references to objects that these functions can operate over. 
To add a new node to a blueprint you right-click in the background of the blueprint window, or you drag a wire off one of the pins in an existing node, to pull up the menu of nodes. The nodes that you can choose may depend on what objects you have selected in the editor. 

Wire colors tell you what kind of data is going down the wire. Red is booleans, green is floats, blue are objects, etc. The most important are white wires, which are execution wires -- things that actually make stuff happen. A special thing about white wires is that they can only have one destination. If you want to trigger two things from one event, you have to connect the Exec output of the event to Exec input of the first function, and then take the Exec output of that to the Exec input of the second function, and so forth. 

> Although white wires are the 'execution' wires, and flow left-to-right, when they trigger an operation with non-white 'data' wire inputs, they may cause execution to run back up that path right-to-left in order to calculate the actual value at that moment.

Within a class blueprint, the **construction** script is for events that fire whenever your object is created (or transformed, etc.) within the editor. This is where procedural generation can happen, for example!



Some useful events
- "EventBeginPlay" is for events that should fire when the level begins.
- OnActorBeginOverlap / OnActorEndOverlap -- typically for collisions, typically for the player actor entering and leaving a trigger volume
- You can also create custom events, that can then be called as if they were functions

Some useful functions:
- Branch (conditionally execute paths, depending if the condition is true or false)
- Delay
- Enable Input -- set true/false to enable player input (keyboard etc.) for a particular class blueprint, e.g. disabling input when not within a trigger box volume.

#### Debugging

You can right-click and add a breakpoint on any event, and this will call up the blueprint editor when the event triggers in-game. At that point you can step through node by node to see exactly what is happening.

You can also add "Log" (or "Print") nodes in a blueprint, which will write text onto the viewport during the game.

#### Variables

- We can add **variables** to the blueprint using the +variable toolbar item (for example), and set the type and name of the variable. Once created, variables can be dragged into the editor (as a getter or setter reference), and used to store state within the script. Use a variable to store some data, of whatever data. Or, to send some data to another graph within the same blueprint or another blueprint. Or, to make something configurable on a class blueprint with instances. etc.

- Note that Set variable nodes must also have an Exec input to take effect.

- Many input and output pins can be turned into a variable -- right click the pin and select "Promote To Variable" -- set the name, compile, set the default, done!

- Any variable can be made **editable** -- just tick the editable option in the details window, or, click the eyeball icon next to the variable name. This will now be editable in the details of any instance in the world. 

> Vector variables can also be 3D editable, which means they can be manipulated right in the main scene editor!

- A special type is the **struct** type, which combines multiple types into a single element. Dragging an out-pin of a struct type gives the option to "Break" the struct into its components.

- Object type variables can be used to store references to other actors in the game. This is what you need to refer to an object that already exists in your scene.

- Class type variables are only for when you need to remember the **type** of an object. It is not as often needed, but it will be needed if you want to spawn new objects that don't yet exist in the level. 

- Array type variables are lists in which all members have the same type. However, the number of items can vary. These lists are indexed from 0, which means the first item is at index 0, the second item is at index 1, etc. Any variable can be turned into an array of that variable type by clicking the grid icon at the right of the *Variable Type* field. Then you can set multiple default values accordingly. You can iterate over a list using the ForEachLoop function for example. You can also Add items, Clear the array, Get items, get the LastIndex, CallFunctionForEach, etc. etc. You might also end up with arrays in your blueprint by using functions such as GetAllActorsOfClass.

#### Tips

- The blueprint editor is highly context sensitive. Whatever item you have selected in the viewport or content browser, relevant blueprint actions will come top in the blueprint context menu.


- Any object that will be moved in-game must have the "movable" option set in the transform Detail (rather than "static"). **Weirdly, the same is also true for lights. So for example, if you want to turn a light on and off dynamically, you also need to set the "movable" option to true**. Yeah.

A blueprint's **Construction Script** can be used to configure the properties of a blueprint, such as enabling the visibility of a light source, or even generating procedural objects, which can be configured via variables.  [A couple of simple examples here](https://www.youtube.com/watch?v=6RqDo3012YA)

#### Adding comments to remind you what parts of a blueprint do

- Right-click any node and edit the text in the Node Comments section, or
- Select a few nodes, Right-click and choose Create Comment from Selection, or
- Press "C" to create a new comment box

---

### Day-night cycle

The default level creates sky and sun from the Light Source and Sky Sphere actors, but by default these are static. To make a changing day/night:

- In the Light Source details
	- set Movable to true, 
	- set Cast Static Shadows to false
- In the Level Blueprint
	- drag references to both SkySphere and LightSource into the level blueprint
	- create a new timeline (right-click and choose New Timeline)
		- name it Day-Night Cycle, 
		- set it to AutoPlay and Loop
		- set the length of this timeline to be the length of the day/night in seconds
		- add a float track
			- name it Sun Angle
			- shift-click to create a keyframe at the start, and one at the end (at the timeline length)
			- set the first keyframe value to zero, the second keyframe value to 360 (i.e. degrees)
	- connect the Update outpin of the timeline to a new Set Actor Rotation node, and use the light source as its target
	- Connect the Sun Angle outpin of the timeline to a new Make Rotator node's Y value, and connect its return value outpin to the New Rotation of the Set Actor Rotation created above
	- From the sky sphere reference, drag out an Update Sun Direction node, and connect its exec inpin to the outpin of the Set Actor Rotation.
	- Comple & save the level blueprint!
	
You might also want to change details in the SkySphere actor, such as increasing the stars brightness.

### Large worlds

Multiple levels can be joined together [to create a larger world](https://docs.unrealengine.com/latest/INT/Engine/LevelStreaming/WorldBrowser/)

### Teleportals

- [Simple teleporter](https://www.youtube.com/watch?v=326pqXPQCgA)
- [Portal gun](https://www.youtube.com/watch?v=LHmDoEMNbyE)

### Weird physics

There's not an easy way to make gravity change direction in different parts of space, but it *is* possible to do something similar with some blueprinting. The main idea is that when a character enters a trigger volume, the blueprint disables normal gravity on the character, and apples a constant force in a different direction. Perhaps there should also be a character/camera rotation applied at the same time. [Here's a forum thread on applying this to a marble-rolling game](https://forums.unrealengine.com/showthread.php?8262-Rolling-Ball-Game). 

---

## VR in Unreal

- Documentation: https://docs.unrealengine.com/latest/INT/Platforms/VR/index.html
- Oculus-specific: https://docs.unrealengine.com/latest/INT/Platforms/Oculus/index.html
- Forums: https://forums.unrealengine.com/forumdisplay.php?27-VR-Development
- Videos: https://www.youtube.com/playlist?list=PLZlv_N0_O1gZaB0IgQEnO9WOXYRx3Puvo

When editing: Alt+P to play in VR mode
When playing: Alt+Enter to switch between VR mode
Control+R to reset the forward view

**VR Recommendations**

Unreal measures space in centimeters (so 1 meter is 100 Unreal units, or UU). The best interaction space is 75 to 350 UU from the player camera.

Player height 176cm, width 68cm (this is smaller than Unreal default)
Camera base eye height: 160cm
Movement speed: 24 meters per second

Switch AA method to FXAA or None in the Post Process volume settings.

Normal mapping won't look as effective in VR; use "Parallax mapping"  or "Tessellation Shader Displacement" instead.

Some blueprint functions under "head mounted display" menu in the blueprint editor

[Mitch's VR tutorial](https://www.youtube.com/watch?v=L-uK0zIY28g)

Really useful: [UE VR settings / performance](https://www.youtube.com/watch?v=2Yc_Lz-uRdU)

## What's wrong with the default 3rd person VR in Unreal, and how to fix it

[Tutorial](https://www.youtube.com/watch?v=YU3TEu_jT6Y)

Need to make our own player controller & camera manager classes.

In project's blueprints folder:
- right click, create a new blueprint of Player Controller type, call it VRPlayerController
- right click, create a new blueprint of Player Camera Manager type, call it VRPlayerCameraManager

- dbl-click on VRPlayerController to open the Class Defaults
	- set Player Camera Manager Class to VRPlayerCameraManager
	- compile, save, & close
- dbl-click on VRPlayerCameraManager  to open the Class Defaults
	- check the Follow HMD Orientation option 
	- compile, save, & close
	
- dbl click on FirstPersonGameMode blueprint, open Defaults panel
	- change player controller class to VRPlayerController 
	- compile, save, & close
	
- in top toolbar, under Settings choose World Settings (will open a new tab next to Details)
	- In Game Mode section, change Game Mode Override to your FirstPersonGameMode blueprint
	- Probably want to close the World Settings tab again
	
We can also adjust the camera location from within the main Character blueprint, and in the viewport adjust the camera's location.

Also, we probably want to implement the "F12 to recenter the Rift" feature, [as described here](https://youtu.be/2Yc_Lz-uRdU?t=107).