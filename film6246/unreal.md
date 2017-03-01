title: Unreal
importance: 3

--- 

# Unreal Engine

Unreal has [long been used in many "AAA" (large-scale/high-production value/high-budget) games](https://en.wikipedia.org/wiki/List_of_Unreal_Engine_games), but was open-sourced with an amenable license in early 2015; and now has built-in support for VR, including the Oculus Rift, HTC Vive, and OSVR. Some better-known games created in Unreal include:
Assassin's Creed, Batman, Bioshock, Borderlands, Eve: Valkyrie, Final Fantasy, Hellblade, Kingdom Hearts, Mass Effect, Mirror's Edge, etc. A significant percentage of experiences available for the Oculus Rift and HTC Vive were authored in Unreal.

## Some quick inspiration

On Youtube there are now plenty of examples of high-speed video captures of level design using game engines such as Unreal -- and [here's an interesting article speculating how the emergence of VR is adding fuel to the fire, with many examples](http://thegrue.com/how-vr-is-creating-a-new-market-and-community-for-level-design-pointless-places/) -- such as:

<iframe width="640" height="360" src="https://www.youtube.com/embed/UCOww2sdsTM?rel=0" frameborder="0" allowfullscreen></iframe>

<iframe width="640" height="360" src="https://www.youtube.com/embed/-l7ia1M1r1E?rel=0" frameborder="0" allowfullscreen></iframe>

We cover nearly all of the tools used in these clips during the labs.

## Getting Started

For Winter 2017 we will be using Unreal Engine version 4.14, which you can [download from here](https://www.unrealengine.com/what-is-unreal-engine-4). However, be aware that Unreal needs [a reasonably fast PC or Mac](https://docs.unrealengine.com/latest/INT/GettingStarted/RecommendedSpecifications/#recommendedhardware) to run comfortably. Mac users will also need a mouse with at least two buttons. It also will eat up gigabytes of disk space!

- Go to [https://www.unrealengine.com](https://www.unrealengine.com) and follow the "Get Unreal" link to register an account and then download the launcher application. 
- Run this launcher (you will need to sign in again), and then under the "Unreal" tab download the Unreal Engine. This will take a while!
- From the launcher also get the "content examples", and perhaps any other of the free samples you find interesting. Warning -- these examples can eat even more *gigabytes* of disk space!! 

Once Unreal is installed, we can create a new project. Open the editor directly, or via the launcher. It should open with the 'project browser' / 'new project' window. 

- In the ```New Project``` tab:
	- Choose the Blueprint tab (not C++)
	- For working outside the lab, choose the "First Person" template (we'll migrate your work to a Virtual Reality template in the lab later)
	- Choose ```Desktop``` target, ```Maximum Quality```, and ```With Starter Content```
	- Set the project path (e.g. ```E:\Unreal Projects``` )
	- Set the project name
	- Press 'Create Project'
	- After a few moments, the new project will open in the editor
	
In future, you can go ahead and open your existing project from the launcher, or the editor's project browser. 

---

## Worldmaking with Unreal

### Activities

Unreal is primarily designed for building games, and although it is also used for creating other kinds of experiences including artworks, education, data visualizations, architectural previews, etc., a lot of influence from its gaming origins is present in the language and the workflows it presents. Games are usually products of teams with different specializations, such as artists (who spend a lot of time using software such as Maya to create 3D models and animations), developers (who spend a lot of time working in coding environments such as Visual Studio), and level designers (who spend more time in editors like Unreal). We will be operating more like level designers.

Like any major production, everything starts with planning and sketching; with some interesting overlaps and differences from film, architecture, design, composition, etc. A good idea is to start with an idea of the overall size and locations of the space, and how one moves between them. Drawing a map on paper can help, but don't forget that the 3rd dimension! (Also, it's important to recall the limitations of VR, particularly of navigation; creating a large space that requires a lot of navigation to traverse (whether walking or teleporting) is going to be tiresome or nauseating for the immersant.) This initial sketch can be 'roughed-in' in Unreal by placing simple objects into space, allowing you to start testing it's movement and flow as soon as possible -- long before spending time on creating details. After testing & refining, you spend more time refining details, converting geometries to meshes, adding lighting and other elements of the world, testing continually, up to the last stages of polishing up.

> See also the [Level Designer Quick Start](https://docs.unrealengine.com/latest/INT/Engine/QuickStart/index.html) documentation.

### Basic concepts

See [Getting started with UE4](https://docs.unrealengine.com/latest/INT/GettingStarted/index.html?utm_source=launcher&utm_medium=ue&utm_campaign=uelearn).

You use the *Unreal Editor* application to author your world. Ultimately you will export it as a distributable application (.exe on windows), but most of the time you will edit and also playtest the world via the Editor. A *Project* is actually a whole folder of files on your disk, including a ```.uproject``` file that keeps the global settings together. You also see these files via the Content Browser in the Unreal editor. Each project has one or more **Levels** (sometimes also called **Maps**), which are independent 3D scenes or locations into which you place objects to define the world experienced. Each level is saved as a separate ```.umap``` file.

> I recommend that you do all your development in a single project. You can create new levels to try different ideas out, but keeping it all in a single project will make it easier to copy items between levels, and reduce disk space required. There are also methods to 'teleport' between levels to build a larger world.

Any object (a player, character, geometry mesh, light, etc.) that is placed in 3D space (with position/translation, rotation/orientation, scale etc.) is an **Actor**. A *Pawn* is a special kind of actor that serves as an avatar or persona. **Assets** (in the content browser) are the resources you can place into the world, while Actors are instances of resources. There can be many instance Actors of a single Asset in a world. Modifying an asset will change all the actors based upon it. At its most basic level, creating levels boils down to placing Actors in space. Actors can also be created dynamically ("spawned") by scripts, e.g. the arrows launched by a bow. Actors may be made of several **Components**. A Component is a piece of functionality that can be added to an Actor. Components cannot exist by themselves. For example, a Spot Light Component will allow your Actor to emit light like a spot light.

> In summary: A Project has many Assets, including multiple Levels (maps). Each Level (map) has a number of Actors, based on the Assets, and modified with instance-specific parameters such as location. Actors can come in different kinds, and may include a number of Components.


## Editing

### The editor panels

Watch the [video tutorial here](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=w4XlBKeE46E).

The main panel is the 3D **viewport**, showing a preview of the world. You can navigate around the world and also modify objects (actors) in here.

Above the viewport is a *toolbar* with which you can trigger builds and preview (run) your project in different ways, including within a VR headset.

On the left, the **Modes panel** selects different task workflows, such as placing objects, creating geometry, painting meshes, generating trees, etc. Mostly we stay in the initial "placement mode".

At the bottom, the **Content Browser** is where you can manage the *Assets* used in your project. With this you can also drop any existing assets into the scene. You can also double-click on some items in this browser to modify them in special editors.

On the right, the **World Outliner** panel shows all the *Actors* involved in the current level. You can select them here, or in the 3D viewport, to modify them. You can also use this to "parent" one object to another, so that they always are positioned together (drag one item onto another to set it as parent). Below that, the **Details panel** is used to modify properties of whatever actor is currently selected, and also to add additional components to them.

> Tip: Hold Control+Alt and mouse-over any Editor feature to see a help window about it.

### Viewport navigating

See the [documentation](https://docs.unrealengine.com/latest/INT/Engine/QuickStart/2/index.html) or the [video tutorial](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=j2CKS6G3G2k). Quick notes:
- **Left mouse**: "walk mode" move forward/backward/turn... 
- **Right mouse**: look around
- **Both buttons** (or middle button): vertical & strafe movement
- **Mouse-scroll** to zoom in and out (not the same as moving!!)
- Keys: with any mouse button (usually the right) held down, keys **W, A, S, D, Q and E** move around. **C and Z** will do a temporary zoom in/out.
- Select an object by clicking on it, then press **F** to focus on it (or, double-click an item in the World Outliner)
- **Alt+left mouse** ("maya style") pivots around the focused object.
- **Alt+right mouse** can dolly toward/away from the object.
- Press **G** to turn nonvisible items (e.g. lights) on and off

### Placing objects 

A new level begins fairly empty. Ways of adding content ([see tutorial](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=01BL2bWeJSA)):

1. We can drag basic objects & actors from the 'place mode' palette at the left. You can drag objects from the browser into the viewport, and also materials right onto objects in the viewport. And also more abstract items such as lights, triggers, and other classes. 
2. We can drag objects from the Content Browser below.
3. Right-click in the viewport and choosing 'place actor', then selecting the type to add.
4. **alt-drag** to make a copy of an actor

### Spatial transforms

Once placed, objects can be moved [(see tutorial)](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=wHJCv-Ph6zU), rotated [(see tutorial)](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=ralshA7aWag), and scaled [(see tutorial)](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=rqJoX8orsUM). Quick tips:

- Press **w** to enable the move tool. The red, green, and blue arrows represent the X, Y, and Z axes respectively. Click & drag an arrow to move the object.
	- Press the **end** key with an object selected and it will drop down to sit on the floor.
	- Press **ctrl end** to snap an object to the current snapping grid.
	- Hold down **shift** while moving an object, and it will also move the camera at the same time.
- Press **e** to enable the rotation tool. Click on one of the arcs to start rotating, and it will show you how much you are rotating in degrees. 
- Press **r** to enable the scale tool. To scale in one axis choose the corresponding red, green, or blue box, or to scale in all axes grab the white cube in the center.

The top-right toolbar shows which tool is enabled. 
- The globe icon (after the scale tool) chooses between world-space and object local-space to move & rotate in. (**Ctrl ~**). 
- After this there are icons for setting the snapping options for each of move, rotate, and scale. Snap to grid is useful for creating buildings -- making sure there are no gaps between walls!  The **[** and **]** keys change the snapping size.

Position, rotation & scale can also be modified numerically from the object's details panel. Unreal measures in centimeters, and the Z axis points up.

Press **ctrl g** to group items, **shift g** to ungroup. Grouping is helpful to move a bloc of items together en masse.

### Hiding the First Person Template's person

- In the Content Browser navigate to Content/FirstPersonBP/Blueprints and double-click the "First Person Character" to open the blueprint editor
- Switch over to the Viewport tab, and select the gun
- In the Details panel, type in "owner" in the search box, and then check "Owner No See" underneath.
- Do the same for the arms
- Save and close

- Now in the Content Browser navigate to Content/FirstPersonBP/Blueprints and double-click the "FirstPerson GameMode" to open the property editor
- In the "HUD Class" drop-down, choose "None"

### Managing Assets

Some assets are created within the Unreal Editor, others you import from outside. All the assets in a project can be found in the Content Browser [(tutorial here)](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=tG2KML-CDRo), which mirrors the directory structure on disk. Some of these are files that can be edited externally (e.g. editing texture images using Photoshop, or mesh geometry in a 3D modeling software) -- when these files are modified externally, Unreal will automatically re-import them into the world.

You can use the **add new** button to create new simple assets or content packs. You can **import** external assets to the content browser. Assets can also be duplicated, and many can be edited *before* bringing them into the level. Double-click the asset and it will open a special sub-editor in which it can be modified.

Projects can end up with hundreds of assets. **It is essential to create meaningful names for assets, and place them in organized folders in the content browser**. There is a search tool and options to filter assets by type. You can also open multiple content browser panels, and lock them to different sub-folders of your project.

### Getting more assets

**From other Unreal projects**. The easiest place to get more assets (more than what the starter content pack gives you) is to grab them from other Unreal projects. There's a very generous set of example projects available through the Unreal Launcher's Library tab, for example. Once these are downloaded you can open them up, navigate through their Content Browsers and see if there's anything you want to take. Getting them into your own project however takes a few steps, and is called *migrating assets* [(see the documentation here)](https://wiki.unrealengine.com/Migrate_content_between_projects). Migrating an asset will also migrate everything that it depends on (textures, materials, blueprints, etc.):
1. In the source project, locate the content in the Content Browser, right-click and choose "Asset Actions > Migrate"
2. Confirm all the assets to migrate
3. Locate the project "Content" folder (on disk) of the destination project to migrate to (not a subfolder!)
4. Now those files should also appear in the destination project. You may want to move them into appropriate subfolders of your project now. 

**From the Unreal Marketplace**. The Unreal Launcher's Marketplace tab also has a range of assets that can be downloaded (though most are not free). At the time of writing, some decent looking free packages include:
- [Epic games content](https://www.unrealengine.com/marketplace/profile/Epic%20Games)
- [architectural visualization scene](https://www.unrealengine.com/marketplace/lightroom-interior-day-light) and [here's another](https://www.unrealengine.com/marketplace/xoio-berlin-flat), but might not be compatible with Unreal 4.14
- [materials](https://www.unrealengine.com/marketplace/gametextures-material-pack)

> Between the above built-in free sources for Unreal-specific content there is over 40 gigabytes of objects, landscapes, characters, materials, effects, sounds, and so forth to draw from!


**From anywhere else.** Assets can also be imported from other sources. For sounds, images, videos, 3D models etc. any compatible format file can be simply imported to the Content Browser. 

Below are some other places where free 3D models can be downloaded. Depending on what your intended use for the project is, pay special attention to the licensing terms of these models -- this is intellectual property.

- [Google 3D Warehouse](https://3dwarehouse.sketchup.com/?redirect=1)
- [3D models for free](http://tf3dm.com) 
- [Turbosquid](http://www.turbosquid.com/Search/?KEYWORD=Free)
- [Exchange 3D](http://www.exchange3d.com/Free%203D%20Models/cat_35.html)
- [3DVia](http://www.3dvia.com/search/?search%5Bquery%5D=free&search%5Bresults_per_page%5D=12&search%5Bsort_order%5D=Rank&search%5Bfile_types%5D=1)

[This plugin](https://www.unrealengine.com/marketplace/playup-tools-plugin-for-ue4) lets you import scenes from SketchUp's PlayUp.


### Creating Geometry

A *Geometry Brush*, also sometimes called "BSPs" [(see documentation)](https://docs.unrealengine.com/latest/INT/Engine/Actors/Brushes/index.html), is a great way to start filling in and carving out volumes of space in a level. They can be used to rapid-prototype a level where static meshes have not yet been created. 

In the Placement mode tab, choose the BSP (also known as *geometry brush*). Now we can drag different kinds of brushes into the level, such as boxes, cylinders, and stairs (though remember -- stairs can be nauseous in VR!). After dragging it in we can resize it. Be careful to use a snapping grid to make sure geometry snaps to tight alignment, and set the size accordingly (e.g. 10cm may be too small for laying out buildings!). 

Using the **Geometry Editing Mode**, very simple 3D modeling can be performed, modifying the faces and vertices (corners) of objects.  

**Creating holes and indentations**: A geometry brush's settings can be set to "Subtractive" type, which will carve out holes in other brushes -- however the order of brushes is important. For example, to create an opening in a wall, we can duplicate the wall, reduce its size, set its brush type to "subtractive" (in the details panel), then drag it back into the wall. 

**Updating lighting etc.** Hit "Build" in the top toolbar to apply the changes, and rebuild lighting models etc. This can be especially important when building enclosed spaces with holes for light to come through.

**Applying materials**: You can simply drag & drop materials from the Content Browser onto geometry brushes. By default, materials will drag onto a single face. To drag onto all faces of a geometry brush, first press "shift+b" to select all the faces (or, if you select a wall, pressing "shift+w" will select all adjacent walls).

**Aligning materials/textures (to avoid seams):** Select all adjoining panels (with "ctrl") and in the details panel, set Geometry / Alignment / Align surface planar to make sure there are no seams between them.

**Adding feature and prop meshes, lights, etc.**: After adding the brushes and dropping in materials, we can start adding some more detailed meshes, improve the lighting, etc. The starter content has a few good architectural items to work with, such as a "glass window" panel that can be used for all kinds of glass panels.

---

## Projects and assets

### Levels

You can make a new level at any time from File->New Level. 

To set the default level (the one that opens when a project launches), go to Project Settings

**Copying actors between levels (maps) of the same project**: Just select what you want to copy in the Outliner and Ctrl-C to copy, then switch to the destination level, and Ctrl-V to paste.

To set where the immersant will start a level (and what direction they face) when the level runs, move and rotate the "Player Start" actor. If you don't have a Player Start actor in the level, you can drag one in from the starter content collection. However it's common while editing a level to remove the Player Start, so that it will run from wherever you where editing from. 

--- 

## More advanced viewport options

**[Orthographic views](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=RoiQOwCg-4Q):**

In the top-right corner of viewport there is a small 'min/max' button which will alternate between a maximized 3D view, and a 4-up set of views for top, left, and front "orthographic" (non-perspective) views as well as the regular perspective one. Right-click & drag to move in these views, and mouse-scroll to zoom.

**[View modes & show flags](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=7UjP6gr44dc)**:

By default the viewport uses full lighting ("lit") -- other modes are unlit (raw materials), wireframe (raw meshes), detail lighting (lighting effects only), reflections, etc. Next to this option is the **Show** drop-down, where you can enable and disable different kinds of content in the viewport.

**Selecting translucent objects**: The "t" key will enable/disable the ability to select translucent objects. If it is off, you will select whatever object is seen *through* the translucent object.

**We can [lock the viewport to an actor](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=Z7OqNjFpy6U)** by right-clicking on an object and selecting the "pilot" option. This fixes our viewport's perspective to the object itself, and we can use the standard viewport movement controls to reposition the object. This is especially useful for positioning lights and cameras, for example.

**Viewing the Frame rate**: Command+Shift+H (or the dropdown top-right of the viewport)

---

## Landscaping

[See documentation](https://docs.unrealengine.com/latest/INT/Engine/Landscape/QuickStart/index.html).

Unreal has built-in tools for creating rich, undulating landscapes. These are ground surfaces that can have a broad variety of different features. Technically they are achieved by "height maps" -- for each XY position in space, there is an associated height value, just like geographical elevation maps. Areas can be flat, shallowly or steeply sloped; the only restriction is that they cannot overhang (though there are ways to deal with that if needed, see below). A level can have more than one landscape, if needed.

To create or edit a landscape, in the Modes panel select the **Landscapes** mode. 

If this is the first time to use the Lanscape mode, a green grid will show in the viewport. You can drag on the landscape's edges to make it cover more or less area. The default is huge -- for VR we don't want to travel such large distances. Reducing the number of sections to 2x2 or 4x4 might be enough.

> For recommended landscape sizes, see https://docs.unrealengine.com/latest/INT/Engine/Landscape/TechnicalGuide/index.html#recommendedlandscapesizes

It's a good idea to assign a landscape material before creating the landscape itself. The starter content doesn't have a good landscape material, but you can either create a new one or migrate one from another project. Creating landscape materials is a little more complex ([there's a tutorial here](https://www.youtube.com/watch?v=tsXVP0fykBM)), but we can migrate some from other example projects or content packs available through the Epic community (via the Launcher app). For example: 
- open the LandscapeMountains project, 
- navigate in the content browser to Content/Landscapes/Materials, 
- right-click on M_LandscapeMaterial_Inst, 
- choose Asset Actions > Migrate...
- click OK to select all dependencies
- navigate to & select your project's Content folder on disk (e.g. E:/UnrealProjects/MyProject/Content) & OK
- back in your project, locate the /Assets/Landscape/M_LandscapeMaterial_Inst in the content browser, and drag it into the Material option of the Landscape Mode's New Landscape panel.

Then "Create New" to instantiate the new landscape. Once instantiated, you can start to Sculpt and Paint it.

### Sculpting

With the default sculpt tool, left click to increase elevation, shift-click to decrease. Use the brush options to change the size & strength.

Under the Sculpt tool menu there are many other tools: smooth, flatten, ramp, erosion, hyrdo erosion, etc. Smoothing & flattening is good for VR, as it feels more comfortable to walk on. Flattening can also be good for making rivers and roads.

Make sure that your Player Start object (if you have one) is above your terrain or else you will fall through the world. If this does happen, drag the player to start up on top of the terrain and hit the End key for it to start on the ground. Bear in mind that if a slope is too steep, the character will not be able walk up it.

### Creating landscape from existing data

[See tutorial](https://docs.unrealengine.com/latest/INT/Engine/Landscape/Custom/index.html)

A new landscape can be created from an existing height map image by choosing "Import from File" instead of "Create New" when creating a landscape.

Any landscape layer can be exported to a file, edited, and re-imported.

In Sculpt mode, right-click on Heightmap and choose Export to File. Once you have done this, you can edit the PNG elsewhere. Then right-click on the Heightmap and choose Reimport or Import to bring the new data back in.

In Paint mode, this method can also be used to define the regions of each paint layer of a landscape.

For very large landscapes however, it is recommended to do streaming level world composition [as described here](https://docs.unrealengine.com/latest/INT/Engine/LevelStreaming/WorldBrowser/)

### Painting

We can just drop in a single material, but we can also use Paint mode to blend multiple materials on the landscape. 

- switch to the landscape tool's paint mode
- scroll down to the tool's target layers
- for each material layer, click on the + button to create layer instances (choose the "Weighted Layer" option, and save these in a sensible location)
- Now you can paint the materials
- After painting, click Build in the big toolbar to rebuild the lighting for the level

Again, there are many painting tool options to explore. 

Once built, a landscape material instance can be customized by double-clicking on it to open the editor. There are many parameters to test, and textures that can be replaced --- but it's recommended to do this *after* the landscape is created.

### Adding water

Place a BSP box into the world so that it lies above the lowest land. Drag on the "M_Water_Lake" material from the StarterContent/Materials folder in the content browser.

It might seem weird that we can walk on water. [To make it swimmable, look here](https://wiki.unrealengine.com/Swimmable_Water_Volume_Tutorial) -- or [this video tutorial](https://www.youtube.com/watch?v=LtyXjSb1P-4). 

Very likely you want to also place a post-processing volume under the water, so that the rendering has a watery style when swimming.

### Caves

It isn't possible for a single landscape to overhang itself, but there are other ways of making caves.

It is possible to make a hole in a landscape, so that they can be walked through, by sculpting with the visibility tool. You will first need a Hole Material, [as described here](https://docs.unrealengine.com/latest/INT/Engine/Landscape/Materials/index.html#landscapeholematerials), which you can apply as the Hole Material in the landscape's details panel. 

- Open the M_Landscape_Master material
- In the Material panel, set "Blend Mode" from "Opaque" to "Masked"
- In the graph editor, drag a cord from the Opacity Mask node and release the mouse
- Search for "vis" and select "Landscape Visibility Mask"
- Apply, save, and close the material editor
- Drag the MI_Landscape_Inst onto the "Landscape Hole Material" option of the lanscape's panel

Then make a hole in the landscape using the visibility mask, [as described here](https://docs.unrealengine.com/latest/INT/Engine/Landscape/Editing/SculptMode/index.html#visibility). 
- In Sculpt mode, select the Visibility Tool, and draw the hole(s) as needed
- You will need to rebuild lighting again.

You probably want to surround the hole with some rocks or other meshes to mask it. You probably also need to edit the material instance of the landscape to enable two-sided lighting, so that it doesn't become transparent underneath.

To fill out the cave underneath, either use BSPs & meshes with collisions, or you can also create another landscape underneath the first (but you will still probably need BSPs & meshes for the roof.)

---

## "Foliage"

The foliage tool is really just a way to randomly disperse objects over a landscape -- typically used for trees, bushes, grassy areas etc., but in fact it can be used for any kinds of objects.

You'll need some ground to start with, whether a giant BSP, mesh, or a landscape, to place objects on. Then switch to the Foliage Mode tool.

In the Paint option, drag one or more objects (meshes) into the Foliage Type box. Be very careful not to bring in very complex meshes or other complex (heavy) items that when duplicated many times could severely affect frame rate. 

Now click and drag in the viewport to paint randomized scatterings of these meshes on your ground. If you placed too many, you can also remove them by shift-clicking. 

The paint options can be used to set the area over which meshes are added, and how densely (and the shift-click erase density). The Reapply tool can be used to change parameters of existing instances. The selection tool can be used to grab individual instances for moving and deleting. With the Lasso tool, you can drag to select many instances.

You can also vary the properties of each mesh type in the foliage tool -- select the mesh, and the details panel appear below. Common settings would be varying the scale, increasing the radius (spacing between objects), random yaw (random rotations). There are many other options. Align to normal will rotate objects on sloped surfaces, ground slope angle will not place objects on extreme slopes, etc.

If you want meshes that can't be walked through: 
- make sure they have a proper collision mesh applied first (you can check this by double-clicking on the mesh, and pressing the "Collision" toolbar option -- you shoudl see a wireframe of the collision bounds appear). 
- In the foliage panel select the mesh, and in the below Instance Settings / Collision Presets choose "BlockAllDynamic"

> Note that there is a newer, more experimental [foliage creation system described here.](https://docs.unrealengine.com/latest/INT/Engine/OpenWorldTools/ProceduralFoliage/QuickStart/index.html)

---

## Volumes

*Volumes* define a 3D area for certain purposes, often invisible (such as blocking volumes to prevent actors leaving the area, pain causing volumes to inflict damage on any actor within the area, trigger volumes that cause events when an actor enters or exits them). We'll see a few volume types relating to lighting and rendering in particular.

For example, a **box trigger** can cause events to happen when a player enters or leaves the region of the (invisible) box region. 

A neat thing is to turn an existing geometry brush into a trigger. You can select a BSP geometry brush in a level, duplicate it, then in the Details panel, the Actor section, you can choose "Convert Actor" and turn it into a "Trigger Volume". 

---

## Lighting & Visual effects

The simplest way to add lights by dragging a light in from the placement mode lights panel. 

- Point lights diffuse in all directions
- Spot lights diffuse over a cone shape
- Directional lights point in only one direction, as if from a huge distance, like the sun

Once added, lights can be moved, rotated etc. like any other actor. Whenever we add or modify a light or rendering feature, or even a new material, we will need to rebuild the lighting model (press Build in the big toolbar). Unreal will tell you that lighting needs to be rebuilt.

In the Transform panel, Lights also have a Mobility option. Lights can be "static" , "stationary" (the default), or "movable". 
- Static lights are always on, and can't move. They are "baked" into the world when built, so they are effectively free. However they do not cast shadows from any moving objects. 
- Stationary lights are better in that they can also cast shadows on moving objects. No more than four non-static lights can overlap for shadowing to work -- and bear in mind that sunlight counts as one.
- Movable lights are completely dynamic in position and properties, and the most expensive to use.

Common properties of interest:

- Intensity (brightness), colour, attenuation radius (how large an area it affects)
- Source radius/length are important for the shape of specular highlights, if used with shiny materials

Aside from point/spot/directional lights, there are several other asset types that have a strong influence on the lighting visualization. Most of these can also be created by dragging in from the placement mode panel:

- To improve the lighting quality drag in a **Lightmass Importance Volume** and resize it to cover all of our objects of interest. This is especially important for VR. 

- **Sky lights** are used to capture the light coming from content in the world at large distances, such as the skybox or distant geometry. It is useful for emulating cloudy days, for example (in which you should also reduce the directional light of the sun, or remove it altogether). 

- The **Atmospheric Fog** and **Exponential Height Fog** visual effects simulate the light scattering effects of the air. Exponential Height Fog tends to make the fog denser closer to the ground, like haze. 

- To improve realism, add **Reflection Capture** actors to any important spaces in which shiny surfaces should respect the surrounding space. Frequently you would put a reflection capture in each room, for example. Box reflection captures are good for ordinary rooms, sphere reflection captures for most other spaces. Be careful not to place them too close to any particular object, or that object will dominate the reflections. Note that these reflection capture objects are very cheap, as they are pre-baked when building the project. However they might not reflect dynamic objects.

> Although a shiny material will reflect in a mirror-like way via reflection captures, it won't be perfectly accurate. To create a better mirror, we can use [Planar Reflection](https://docs.unrealengine.com/latest/INT/Engine/Rendering/LightingAndShadows/PlanarReflections/) objects. This is very expensive though. Another method to make mirrors uses screen capture objects. There's an example of this in the Content Examples project, [see docs](https://docs.unrealengine.com/latest/INT/Resources/ContentExamples/Reflections/1_7/index.html). 

- The **Post effects volume** can be used to change the rendering style. The post visual effects are only applied when the camera is within the volume's bounds. Care needs to be taken with these however: the result experienced in VR may be quite different than how it is experienced on screen, where there is less depth and immersion. See [the docs here](https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/index.html#postprocesssettings) for examples of some of the effects applicable.

	- Even more radical changes can be achieved using **Post Process Materials** and embedding them within a post effects volume: [see docs](https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/PostProcessMaterials/)

Dynamic shadows are usually a costly feature. However, this cost can be cut in half by enabling “Single Sample Shadow from Stationary Lights” on your movable Actors. This feature makes shadow receiving on dynamic objects much cheaper at the cost of some quality. It doesn’t work for all scenarios, but is worth playing around with for your dynamic objects for potentially great performance gains.


---

## Materials

Materials are assets that can be applied to geometry and meshes, and determine how light plays off them. The starter content comes with a few examples of materials, including brick, grass, chromes, plastics, etc. 

**Applying a material to an object** can be as simple as dragging the material from the content browser onto the object in the viewport. However, some objects can carry more than one material (this is evident from their details panel) -- it could be for example a lamp that uses a glassy material for the shade and a different material for the stand. In this case you can drag materials to each of the material slots in the details panel.

**Modifying materials by instancing:** Some materials also have **parameters**, which can be modified by using **Material Instances**. You can right-click on any Material to select "Create Material Instance", and save the instance in the content browser. Material Instances can be used wherever a Material was used. The main difference is that when you double-click it opens the Material Instance editor, which lists the parameters in the material and allows us to edit them. Also each one has a checkbox, which when ticked, makes them appear in the object's details panel, allowing us to customize the instance per object. Instancing is much cheaper than creating new materials, and also allows you to change properties without needing to recompile the underlying shaders.

Instance parameters can also be modified in-game via Blueprints, see [tutorial](https://docs.unrealengine.com/latest/INT/Videos/PLZlv_N0_O1gbQjgY0nDwZNYe_N8IcYWS-/srUSDU1u0og/index.html).

**Creating new materials:** You can create new materials by selecting "New Material" in the content browser menu (or by right-clicking in the content browser), and you can duplicate existing materials like any other asset. You can edit a material by double-clicking on it, which will open the Material Editor. This editor allows you to define the material properties via a data-flow graph, [as described in the tutorial here](https://docs.unrealengine.com/latest/INT/Videos/PLZlv_N0_O1gbQjgY0nDwZNYe_N8IcYWS-/lngF4VVNER4/index.html). Materials in Unreal are mainly defined in terms of:
- Base color (the underlying colour or coloured texture of the object)
- Metallic (whether shinyness is metal-like or plastic-like, usually just the value 0 or 1)
- Roughness (a roughness of 0 is like a perfect mirror, a roughness of 1 is not reflective at all)
- Specular (how bright or prominent reflective shines are)
- Emissive colour (usually zero/black, but can be increased if this material emits light, like an LED)
- Normal (emulates small deviations in the surface, such as grout between bricks; usually requires specific normal map textures)

---

## Particles

Particle systems are used to create a wide variety of effects, such as smoke, fire, fireworks, electric sparks, dust, explosions, etc. There are quite a few particle system example assets in the starter content and other free projects (especially "Particle Effects" project!)

Your world can have a number of **Emitter** actors, each of which refer to a **Particle System** asset (specified by the emitter's "Template" property in the details panel). Particle system *components* can also be added to Blueprint objects. Particle systems themselves can be edited through a built-in editor called "Cascade".

See the [tutorials](https://docs.unrealengine.com/latest/INT/Videos/PLZlv_N0_O1gbQjgY0nDwZNYe_N8IcYWS-/srUSDU1u0og/index.html).

---

## Blueprints

"Blueprint" is the visual scripting system in Unreal, which means you can do programming by connecting up visual flow charts rather than writing code. (You can also write C++ code if you want...)

Here's a gentle introduction:

<iframe width="640" height="360" src="https://www.youtube.com/embed/8WeE4q6Ba40?list=PLZlv_N0_O1gaCL2XjKluO7N2Pmmw9pvhE" frameborder="0" allowfullscreen></iframe>

Generally the form of blueprints is that **there are events that can trigger functions, and there are references to objects** that these functions can operate over. 

To add a new node to a blueprint you right-click in the background of the blueprint window, or you drag a wire off one of the pins in an existing node, to pull up the menu of nodes. The nodes that you can choose may depend on what objects you have selected in the editor. Wire colors tell you what kind of data is going down the wire. Red is booleans, green is floats, blue are objects, etc. 

The most important are white wires, which are execution wires -- things that actually make stuff happen. A special thing about white wires is that they can only have one destination. If you want to trigger two things from one event, you have to connect the Exec output of the event to Exec input of the first function, and then take the Exec output of that to the Exec input of the second function, and so forth. 

The most common places that you will do blueprints are: 

1. The **Level blueprint**, where you can write behaviours that are global to a level. Typically this is where you would put mouse/keyboard etc. interactions, for example. You can open the level blueprint from the Blueprints large tool item above the viewport.

2. **Class blueprints** are ways that you can add scripted behaviour to objects that can be spawned during a game, or which you can make multiple instances of while editing. In this case the script is contained within each instance. Class blueprints therefore also have a viewport, and can have other components such as meshes embedded.    

	- They also have a Construction Script. Within a class blueprint, the **Construction Script** is for events that fire whenever your object is created (or transformed, etc.) within the editor.  It can be used to configure the properties of a blueprint, such as enabling the visibility of a light source, or even generating procedural objects, which can be configured via variables.  [A couple of simple examples here](https://www.youtube.com/watch?v=6RqDo3012YA)  
	- You can open class blueprints from in the Content Browser, or by following links in the World Outliner. You can create new Class Blueprints from the Content Browser.  The benefit of using class BPs is that you can create many many instances of them throughout your level.

### Variables

- We can add **variables** to the blueprint using the +variable toolbar item (for example), and set the type and name of the variable. Once created, variables can be dragged into the editor (as a getter or setter reference), and used to store state within the script. Use a variable to store some data, of whatever data. Or, to send some data to another graph within the same blueprint or another blueprint. Or, to make something configurable on a class blueprint with instances. etc.

- Note that Set variable nodes must also have an Exec input to take effect.

- Many input and output pins can be turned into a variable -- right click the pin and select "Promote To Variable" -- set the name, compile, set the default, done!

- Any variable can be made **editable** -- just tick the editable option in the details window, or, click the eyeball icon next to the variable name. This will now be editable in the details of any instance in the world. 

> Vector variables can also be 3D editable, which means they can be manipulated right in the main scene editor!

- Object type variables can be used to store references to other actors in the game. This is what you need to refer to an object that already exists in your scene.

- Class type variables are only for when you need to remember the **type** of an object. It is needed if you want to spawn new objects that don't yet exist in the level. 

### Tips

- The blueprint editor is highly context sensitive. Whatever item you have selected in the viewport or content browser, relevant blueprint actions will come top in the blueprint context menu.

- Any object that will be moved in-game must have the "movable" option set in the transform Detail (rather than "static"). **Weirdly, the same is also true for lights. So for example, if you want to turn a light on and off dynamically, you also need to set the "movable" option.**. Yeah.
	
### Adding comments to remind you what parts of a blueprint do

- Right-click any node and edit the text in the Node Comments section, or
- Select a few nodes, Right-click and choose Create Comment from Selection, or
- Press "C" to create a new comment box

### Debugging

You can right-click and add a breakpoint on any event, and this will call up the blueprint editor when the event triggers in-game. At that point you can step through node by node to see exactly what is happening.

You can also add "Log" (or "Print") nodes in a blueprint, which will write text onto the viewport during the game.


---

## Embedding sound

[See documentation](https://docs.unrealengine.com/latest/INT/Engine/Audio/index.html)

You can import audio files into the Content Browser like any other content -- they become **Sound Wave** assets. 

> A handy place to find free audio files is [freesound.org](http://freesound.org) (but check licensing first!). 

Audio files should be in the WAV format (you'll have to use other software to convert files to WAV if they are e.g. MP3 format). Just press the "Import" button in the content browser, or drag them from a windows explorer into the content browser. 

The simplest way to then add the Sound Wave to your world is to drag it from the content browser to the viewport. This will create an **AmbientSound** Actor, indicated by a loudspeaker icon in the world. 

However it will normally just play once at the level start. To make it play continuously, double-clock the SoundWave in the content browser and set the **Looping** property to true. (Watch out though, to make a continuous ambience you may need to edit the soundfile to have good loop points using an external audio editor such as [Audacity](http://www.audacityteam.org).) 

The AmbientSound actor has several properties in the details panel that can be useful to modify, such as the Sound to be played, the Volume multiplier (a way to change loudness), and Spatialization.

### Spatialization (Attenuation)

Spatialization makes sounds seem to emanate from the correct directions as you move around the world. Attenuation specifies how a sound gets more subdued as you move away from the source.

By default, most AmbientSound actors have spatialization enabled (see the Attenuation properties in the actor's details panel). However the default attenuation settings do not have much effect. You can either:
- Override the settings on a specific AmbientSound actor (only recommended for special cases), or
- Assign a **[Sound Attentuation](https://docs.unrealengine.com/latest/INT/Engine/Audio/DistanceModelAttenuation/index.html)** asset. Click on the Attenuation Settings option in the actor's details panel, and either pick an existing one, or press "Create New Asset: Sound Attenuation" in the menu. The asset is created in the content browser and you can then double-click to assign settings. The benefit of creating an asset this way is that you can re-use it many times in a world.

In either case there are many options. The most important:

- Radius (min radius): Within this distance (in cm) the sound plays at full volume.
- Falloff Distane (max radius): at this distance (in cm) the sound is no longer heard. 
- Distance Algorithm: determines how quickly the sound becomes quiet as you move away. 	
	- Use "Linear" for general looping ambience and low-detail background sounds, and large radius background sounds. Use "Logarithmic" when accuracy is important -- they'll only draw attention when very near. Or use "NaturalSound" as a softer alternative for this. Use "LogReverse" for sounds that should seem loud anywhere near. 
- The attenuation shape determines the shape of the space the sound fills. It is displayed as an orange frame around the sound actor. Generally use Sphere, but other shapes may be useful for large objects.

### Triggering

Within a level blueprint, we can drag an AmbientSound actor in to get a reference, and then trigger from events (such as OnActorOverlap of box triggers) to call the "Play" function referencing this sound. It's also possible to spawn sound events (search for "Spawn Sound" in the blueprint editor), which can be useful for short sound effects associated with other actions in the world.

For more interesting triggered sounds we'd want to use a Class Blueprint.

- Let's make a simple cylinder in the world. Drag in Cylinder from the Basic section of the Placement Mode panel. 
- Now in the details panel, select the blue button Blueprint/Add, and choose where in the content browser to save it, and give it a more useful name.
- In the blueprint editor's viewport, click +Add Component and choose Box Collision. Scale this up so that it is larger than the cylinder. 
- In the details panel, scroll down to Events, and press the + button for "On Component Begin Overlap". This opens the blueprint editor.
- Again press +Add Component, but this time select Audio. This is like an AmbientSound actor, but within a Class blueprint it is called Audio Component. In the details panel, choose a Sound to play, Attenuation settings, etc. as normal. Turn the "Activation: Auto Activate" property off.
- Now drag the audio component into the blueprint editor to create a reference. Drag a line from the outpin, and under Audio/Components/Audio choose "Play". Drag a white line from the OnComponentBeginOverlap white outpin to the white pin of "Play".
- Now save the blueprint & go back to the main level editor. 

Now you can make many copies of this object in the world, and edit them all in one place.

To take this further, let's make it possible to change the sound associated with each instance. 
- In the class blueprint editor open the Construction script tab.  
- Drag in a reference to the Audio component, and drag a line of it. Choose the Audio/Component/Audio/Set Sound function. 
- Connect the White exec pin of the Construction Script node to the Set Sound node. 
- On the Set Sound node's "New Sound" pin, right click and choose "promote to variable". This makes a new variable node appear. 
- In the details panel, change the name of this node to something sensible (e.g. "sound to play"), and tick the Editable box. Also, in the Default Value option, set a sound to play.
- Compile & save the blueprint, then return to the level. You should now be able to create copies of the actor, and in the details panel, see & change the "sound to play" variable of each one independently.

### More complex sounds

The AmbientSound actor also has a "Modulation" property set, which can be used to set ranges of pitch (rate) and volume (loudness) over which triggered sounds may randomly vary. This can enrich the soundscape relatively easily.

More complex sound sources than simple SoundWaves can be created as [Sound Cues](https://docs.unrealengine.com/latest/INT/Engine/Audio/SoundCues/Editor/index.html), which have their own editor similar to the material editor or blueprint editor, and can have additional instance properties. With this editor multiple sounds can be mixed together, with different modulation and other effects. Sound Cues can be used anywhere instead of a Sound Wave (i.e. in AmbientSound actors and class blueprint Audio components.

You can also create an "Audio Volume" (from the "Volumes" option of the placing mode tool, see [here](https://docs.unrealengine.com/latest/INT/Engine/Actors/Volumes/index.html)), a region of space with specific audio properties such as how a space creates reverberation, rather like how the Post Effects volume can change visual properties.  See the details panel under Reverb, and choose or create a Reverb Effect. Reverb effects have properties like the echo density, overall reverb gain, air absorption, and more, to craft its unique sonic character. Also, Audio Volumes can be useful to define the effect of sounds being inside or outside enclosed spaces, using the Ambient Zone settings. 

---

## Embedding video

[See documentation here](https://docs.unrealengine.com/latest/INT/Engine/MediaFramework/HowTo/)

For the best compatibility and performance, it is recommended that the .mp4 file extension in H.264 be used. 

**Adding movie files to a project:** Create a Movies folder in the content browser, and open it on disk in Windows Explorer. Copy your mp4 files into this folder using Windows Explorer, then drag them back into the Content Browser. 

> Videos can be streamed from the web, but file references are recommended.

**Placing a video texture onto an object**: See [Playing a video in a level](https://docs.unrealengine.com/latest/INT/Engine/MediaFramework/HowTo/FileMediaSource/index.html) documentation.


---

## Converting: Brush to Mesh, Actors to Blueprint, ...

**Brush to Mesh**: Although it can be convenient to mark up a level using BSPs ("Geometry Brushes"), it is not recommended to keep them in the final project, as they can slow down performance, reduce the quality of lighting, etc. You might also want to convert a brush to mesh so that you can use it in blueprints, for foliage, and other places where BSPs cannot be used.

You can convert any BSP into a mesh in the Details Panel / Brush Settings / Create Static Mesh. Note however that after conversion, the geometry will no longer be editable. 

You can also convert multiple BSPs into a single mesh by selecting them all, right-clicking, and choosing Convert Actors to Static Mesh

You might also need to then edit the new mesh to create a collision profile for it. To check whether you need to, either play the level and see if you can run through the object, or edit the new Mesh and enable the Collision button in the toolbar. If no purple collision lines show up, you can add a new collision hull like this:
- double-click the mesh to open the mesh editor, 
- to generate the hull automatically:
	- from the Collision menu choose a collision option
		- For regular shapes, a sphere/capsule/box collision might be good enough
		- For most other cases, use Auto Convex Collision
			- in the details panel that opens, set the accuracy options, and click Apply
	- a visualization of the collision hull will appear in the viewport
- otherwise, with other options in this menu you can build a hull by hand
- finally, save and close the mesh editor	
[See here for more on mesh collision options](https://docs.unrealengine.com/latest/INT/Engine/Content/Types/StaticMeshes/HowTo/SettingCollision/)

**Actors to Blueprint**: You create new blueprints from an object in the scene by hitting the blueprint button at the top of the details panel. But you can also convert **multiple** actors into a single blueprint:
- Select the objects in the viewport
- In the main toolbar above the viewport, under Blueprints / Convert Selected Components to Blueprint Class..." 

Note that you also need to convert brushes to meshes first if you want to use them in a blueprint!

**Merge multiple actors to single actor**: Reducing the number of actors can improve performance in large projects. You can merge mesh actors together right in the level viewport. This allows you to reduce draw calls to get better performance. [See docs](https://docs.unrealengine.com/latest/INT/Engine/Actors/Merging/)
- Select actors to merge
- Window / Developer Tools / Merge Actors

**Convert actor to static mesh:** Sometimes you might have a complex object or actor that you want to simply grab as a plain mesh. On the actor in the viewport right-click and choose "Convert to Static Mesh". As usual it asks where to place this new mesh asset in the content browser. An example of where you might want to do this is in creating a manikin mesh from a character blueprint.

---


# Basic "AI"

The model of artificial intelligence for agents (or Non-Player Characters, NPCs) provided by Unreal comprises a loop of Sensing, Decision-making, and Acting:

- **Sensing**: represented in Unreal as a "Blackboard", this is simply a set of variables that are updated often at fairly low frequencies, and remain available for the agent's decision making processing. It's a bit like short-term memory, in both echoic and working memory forms. Sensing may involve things like navigation mesh queries, physics queries, detecting nearby objects/agents, etc. and thus can sometimes be quite expensive. It can also represent internal states or persistent knowledge of the agent, such as whether it knows somebody, whether it is hungry, etc. Blackboards could be updated via Services, AI Components, or general Blueprints. Basically, the blackboard needs to contain all the data, or facts, upon which decisions are made.

- **Decision-making**: represented in Unreal via *Behaviour Trees*. These are a kind of flow-chart of tasks driven mainly by conditional logic on task success or failure. Nodes are either tasks, or composites that can trigger multiple tasks, and can have a number of conditions determining whether they can be executed. They're very cheap, but design-intensive. Some decisions will react/respond to external stimuli; others respond to internal goals etc. But generally, behaviour trees are designed around a kind of prioritized list of condition-action pairs.

- **Action execution**: represented in Unreal via *Tasks*, making the agent do something in the world. Tasks often take some time to complete, and can be usually defined as either running or completed (successfully or not). Generally when a task completes, the success status returns to the behaviour tree to figure out what task to start next.

Building an AI agent requires a few components:

- An **AI Character** blueprint, which is the container you see in the world; the "body". It may also contain animation blueprints etc. for animating the character model. 

- An **AI Controller** blueprint, the "head", which stores the blueprints for behaviour, including the **Behaviour Tree**, which forms the "brain", including the **Blackboard**, which stands in for memory, and any **Tasks** involved. 
	
One way of thinking it is that a Character asset could more or less be controlled either by a player or by an AI Controller; in that regard the AI Controller is a bit like a brain behind a virtual joystick. Breaking up the AI into all these parts makes them interchangeable. So, lots of agents can be made from the same character, lots of agents can use the same AI controller, different controllers can use the same Tasks, etc. But, it also means there's quite a few steps to wire up just to get started:

- Create a Blackboard first, and then a Behaviour Tree, by right-clicking in the Content Browser and selecting each of these types in turn. Remember to name these assets well!
	- Open up the Behaviour Tree to make sure it is using the correct Blackboard you just made.
- Create a Controller by making a new blueprint in the content browser, and making sure to set the parent class to "AIController". Now we need to tell this controller to start using our behaviour tree when the level begins:
	- Open up the Controller's blueprint event graph
	- create an Event Begin Play node, 
	- drag a cable out to create a Run Behaviour Tree node, 
	- set it to use your new Behaviour Tree.
- Now you just need a character. A quick way to make a new character is to duplicate and modify the player character, then:
	- open up event graph and delete everything, and also delete the camera/boom components
	- under details, Pawn, AI Controller class, set to the controller blueprint you just made.

At this point, the jobs to do include:
- adding some 'keys' to the blackboard. A simple example would be a location, to where the actor should walk.
- adding blueprints to the controller event graph to populate these blackboard keys using various Set Blackboard functions in the event graph. There should be at least including one driven by Event Begin Play, but of course these can be updated by other events. For our example above, it could be by getting the location of a *Target Point* actor in the world, or the location of the player, etc.
- adding nodes to the behaviour tree to determine actions to perform according to blackboard values
- adding Services to the behaviour tree that update blackboard values
- adding Tasks to the behaviour tree that define new actions

> Tip: if you are using any Move To nodes/functions in the AI behaviour, make sure to create a Navigation Volume in the level that covers your area. You can use the P key in the viewport to toggle whether the navigable area is shown or not.

However... [are Behaviour Trees a thing of the past?](http://www.gamasutra.com/blogs/JakobRasmussen/20160427/271188/Are_Behavior_Trees_a_Thing_of_the_Past.php)

---

## Beyond static meshes

### Instanced meshes

Using Instanced Static Meshes (ISMs) or Hierarchical Instanced Static Meshes (HISMs) allows vastly larger numbers of objects in a scene with little performance penalty. This is a bit like how the Foliage tool works. The limitations are that instances should all be the same mesh & material, with only transform (position, rotation, scale) being different. There's a way to use blueprints to create them. The HISM variant adds level of detail (LOD) mesh variants, which can also make a massive performance gain by reducing mesh detail for more distant objects. Of course, you need to create the lower poly meshes first!

[See this video here](https://www.youtube.com/watch?v=oMIbV2rQO4k)

### Procedural meshes

You can add Procedural Mesh Component to an Actor and provide Vertices, Triangles and UVs to generate a mesh that is rendered at the actors location. Or you can use the Copy from Static Mesh function to initialize it, then start modulating it. One of the cool things you can do with a procedural mesh is to *slice* it dynamically, as if cutting cheese. 

[Docs](https://docs.unrealengine.com/latest/INT/BlueprintAPI/Components/ProceduralMesh/index.html)

---

## VR notes

Unreal's VR template offers support for both gamepad (e.g. Xbox controller) and motion controllers (e.g. Oculus Touch or HTC Vive wands). The template comes with a number of rendering optimizations for VR. [The template is described in detail here, including how to navigate it](http://www.tomlooman.com/vrtemplate/).

### Getting an existing world into a VR project

Because of various factors (including specific rendering settings) it makes more sense to create a new project based on the VR template, and migrate your existing world's content into it. So long as you are careful in how you organize your content, it should be possible. It's often a good idea therefore to keep the number of files/folders at the top-level of your Content to a minimum. Bear in mind that not all of a project can be migrated; things like project settings need to be manually duplicated if needed. 

> For example, it *is* possible to migrate player pawns between VR and FPS template projects, in the same way as migrating other assets. However they won't work until the Input mappings are copied too, which has to be done manually in the project settings. Moreover, for the First Person Character, you may also need to set the Default Game Mode to First Person Game Mode (either in Project Settings or your level's World Settings). Then you can drop "HMD Locomotion Pawn" and "First Person Character" into the same world, just make sure that only one of them has the "Auto Possess Player" set to "Player 0" in the details pane. 

### Other VR plugins/templates

There are other VR templates and plugins available for Unreal, that may also be worth looking into:

- [Here](https://forums.unrealengine.com/showthread.php?137399-VIVE-and-probably-occulus-VR-intereractable-physic-objects) are some expansions to the Unreal VR template that add more VR-interactive objects, such as handles, levers, doors, keys, etc.

<iframe width="1280" height="720" src="https://www.youtube.com/embed/MymMZNzzGGw?rel=0" frameborder="0" allowfullscreen></iframe>

- [Here](https://forums.unrealengine.com/showthread.php?133957-Single-Multiplayer-Touch-amp-Vive-Proteus-blueprint-only-Template) is a modification of the Unreal VR Template that adds hands, monitors, optimizations, head, force feedback, network modes, and more. 

<iframe width="1280" height="720" src="https://www.youtube.com/embed/ml2xgiQ41BY?rel=0" frameborder="0" allowfullscreen></iframe>

- [Here](https://bitbucket.org/mordentral/vrexpansionplugin) is an alternative VR plugin for Unreal that provides a huge range of different features. 

<iframe width="1280" height="720" src="https://www.youtube.com/embed/pCuRWdLsCYE?rel=0" frameborder="0" allowfullscreen></iframe>


---

## Using C++

[Main documentation entry point is here](https://docs.unrealengine.com/latest/INT/Programming/index.html)

To be able to use C++ features, on Windows, Visual Studio 2015 needs to be installed; on OSX, Xcode needs to be installed. Both have free versions, both are big downloads. Generally, the idea is to use C++ to build classes that can then be used by designers in ordinary Blueprints. Typically you want to add C++ features either to improve performance in critical parts of a game, or to add features that are not provided by Unreal already.

If you want/need C++ in a project, and your project was a Blueprints-only project (i.e. you haven't added any C++ classes yet), you can convert it to a C++ project by simply adding a new C++ class. 

Add a new C++ class to a UE4 project by going to File > New C++ Class. Pick a base class (e.g. Actor) and it will create all the files we need, including a Visual Studio solution, and a Source folder, in your project; and it will open Visual Studio automatically. After editing code, compile either by Build in Visual Studio, or Compile in Unreal Editor. 

The actor show now show up in the Content Browser under the C++ Classes section. We can drag it into the world, add components, etc. 

[We can now also create new Blueprints that derive from our C++ class](https://docs.unrealengine.com/latest/INT/Gameplay/ClassCreation/CodeAndBlueprints/index.html) (create new blueprint as normal, set the C++ class as the base class for the blueprint). Or, we can create blueprints that modify specific instances of a C++ actor (With a C++ actor instance selected in the world,  click the Blueprint/Add Script button in the Details Panel.) While editing the new blueprint's graph, C++ implemented events and functions become available for use.


### Adding a property

```
	UPROPERTY(EditAnywhere) int32 TotalDamage;
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Damage") int32 TotalDamage;
```

Remember to also initialize the property in the class constructor.

> [See here for all the property options](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Properties/Specifiers/index.html)

### Adding functions/events

Expose a function to be callable via blueprints:

```
	UFUNCTION(BlueprintCallable) void CalculateValues();
```

Expose an event to blueprints (i.e. a way to call back from C++ into a blueprint):

```
	UFUNCTION(BlueprintImplementableEvent, Category="Damage") void CalledFromCpp();
```

Expose a function to be both callable (with a default implementation) but also overrideable (replacing implementation) in blueprints:å

```
	// if you want to also provide a default C++ implementation, where user did not provide one via blueprint:
	UFUNCTION(BlueprintNativeEvent, Category="Damage") void CalledFromCpp();
	void CalledFromCpp_Implementation() { ... }
```

To just bind static functions to blueprints, rather than objects & methods, see the [blueprint function library docs](https://docs.unrealengine.com/latest/INT/Programming/BlueprintFunctionLibraries/index.html)

### Base classes / concepts

**UObject**: most basic class provides reflection, serialization, & networking of properties and methods, etc. Marked by UCLASS(). 

**UStruct**: simpler than UObject, it does not provide garbage collection etc., but does allow plain-old-data structs to be exposed to blueprints, serialization, networking etc. Marked by USTRUCT(). 

**AActor**: a UObject intended to be placed or [spawned](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/Spawning/index.html) in a level, and which contains Components. The RootComponent holds a UActorComponent or USceneComponent which can contain many other UActorComponents. Actors themselves do not have transforms, and thus do not have locations, rotations, or scales. Instead, they rely on the transforms of their Components; more specifically, their RootComponent. Actors have events such as BeginPlay, Tick, EndPlay. [See docs](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/index.html). Actors can be removed by calling Destroy().

**UActorComponent**: are attached to Actors on creation. USceneComponent is a specialization that has a spatial transform relative to its parent. UPrimitiveComponents are USceneComponents that also have a visible representation. etc. All of these components can have their own TickComponent() events, etc. [See this tutorial for how to add components to an actor via code](https://docs.unrealengine.com/latest/INT/Programming/Tutorials/Components/index.html)

### Binding 3rd party libraries

- When building libraries:
	- Build for Multi-threaded DLL (/MD) with 32- and 64-bit versions
- In the Unreal project:
	- add folder /ThirdParty/libraryname and inside add /include and /lib

[Unreal has its own build system, documented here](https://docs.unrealengine.com/latest/INT/Programming/UnrealBuildSystem/index.html). To configure to add a library to the build system, [there are some suggestions here](https://answers.unrealengine.com/questions/396982/cant-build-project-in-ue-412.html).

Beyond simple cases, it might be worth packaging the library binding as a [plugin](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html), so that it can be re-used in many projects.

[Example: binding OpenCV to Unreal](https://wiki.unrealengine.com/Integrating_OpenCV_Into_Unreal_Engine_4). [Another example](https://github.com/shadowmint/ue4-static-plugin/).

> Possibly useful: UE4 gives callbacks right after dll load and before unload. 

<!--






- create a new blueprint based on the AIController class

- duplicate the 3rd person character with a new name for the NPC
- open up event graph and delete everything
- select camera/boom components, delete
- under details, Pawn, AI Controller class, set to the blueprint created above

- drag navigation bounds volume into scene & resize to cover available area
- press P to toggle viewing the navigable area


Gameplay:
https://docs.unrealengine.com/latest/INT/Gameplay/index.html

Any mesh props can be made to simulate physics simply by selecting them and ticking the "simulate physics" option in the Details tab.

Input devices: Edit > Project Settings… and browse to category Input. 

look into:
- sequencer (introduced in https://www.unrealengine.com/blog/unreal-engine-4-12-released)
- vr editor (introduced in https://www.unrealengine.com/blog/unreal-engine-4-12-released)
- procedural mesh & slicing
- decals
- cables
- COOKING BLUEPRINTS TO C++
- GRASS AND FOLIAGE SCALABILITY
- FULL SCENE IMPORTER
- LIGHTMASS PORTALS
- large worlds

redo Day-night cycle
redo teleportals

still true?
When playing: Alt+Enter to switch between VR mode
Control+R to reset the forward view

- Blueprint **timelines** are ways we can make a sequence of events happen -- and we can also make them happen in reverse. See day/night example.

vr: http://www.tomlooman.com/getting-started-with-vr/
Edit / Editor Preferences / General: Experimental / VR / Enable VR Editing (tick)

VR editing:
- landscaping, mesh painting, foliage, 

checkout unreal.js (https://www.unrealengine.com/marketplace/unrealjs)
and https://www.unrealengine.com/marketplace/runtime-mesh-component
and https://www.unrealengine.com/marketplace/varest-plugin


-->

---

## Random tips

Transparent materials in Unreal are rendered separately from all other objects, and this can cause some issues such as improper material look, wrong objects showing through, etc. An interesting workaround using noisy masking instead of transparency is presented [here](https://www.youtube.com/watch?v=ieHpTG_P8Q0). This won't work well for VR because the mask is fixed to the screen, but a little modification to the material to make this dynamic might be very workable.