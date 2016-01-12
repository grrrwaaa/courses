title: Unreal
importance: 3

--- 

# Unreal Engine

Unreal has long been used in many "AAA" (large-scale/high-production value/high-budget) games, but was open-sourced with an amenable license in early 2015; and now has built-in support for VR and the Oculus Rift.

## Getting Unreal

Note: you will need [a reasonably fast PC or Mac](https://docs.unrealengine.com/latest/INT/GettingStarted/RecommendedSpecifications/#recommendedhardware) to run Unreal comfortably. Mac users will also need a mouse with at least two buttons.

- Go to [https://www.unrealengine.com](https://www.unrealengine.com) and follow the "Get Unreal" link to register an account and then download the launcher application. 
- Run this launcher (you will need to sign in again), and then under the "Unreal" tab download the Unreal Engine. This will take a while!
- From the launcher also get the "content examples", and perhaps any other of the free samples you find interesting. Warning -- these examples can eat *gigabytes* of disk space!!

## Create/open project

Open the editor directly, or via the launcher. It should open with the 'project browser'. 

Create a new project, typically from the "first person" template, and make sure that "with starter content" is selected. Choose where to save it, and then "create project". This will now open in the editor.

In future, just go ahead and open your existing project from the launcher or the project browser.

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

---

## Tips

> A *Class* defines the behaviors and properties of a particular Actor or Object used in the creation of an Unreal Engine game. Classes can be created in C++ code or via visual diagrams called Blueprints. Each game has one *PlayerController* class which controls a Character Pawn from input controls (joystick etc.). An *AIController* possesses other Pawns to serve as non-player characters (NPCs) in the world.

> *Volumes* define a 3D area for certain purposes, often invisible (such as blocking volumes to prevent actors leaving the area, pain causing volumes to inflict damage on any actor within the area, trigger volumes that cause events when an actor enters or exits them). 

**[Orthographic views](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=RoiQOwCg-4Q):**

In the top-right corner of viewport there is a small 'min/max' button which will alternate between a maximized 3D view, and a 4-up set of views for top, left, and front "orthographic" (non-perspective) views as well as the regular perspective one. Right-click & drag to move in these views, and mouse-scroll to zoom.

The "t" key will enable/disable the ability to select translucent objects. If it is off, you will select whatever object is seen *through* the translucent object.

**[View modes & show flags tutorial](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=7UjP6gr44dc)**:

By default the viewport uses full lighting ("lit") -- other modes are unlit (raw materials), wireframe (raw meshes), detail lighting (lighting effects only), reflections, etc. Next to this option is the **Show** drop-down, where you can enable and disable different kinds of content in the viewport.

**We can [lock the viewport to an actor](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl&video=Z7OqNjFpy6U)** by right-clicking on an object and selecting the "pilot" option. This fixes our viewport's perspective to the object itself, and we can use the standard viewport movement controls to reposition the object. This is especially useful for positioning lights and cameras, for example.

**Viewing the Frame rate**: Command+Shift+H (or the dropdown top-right of the viewport)

- A **box trigger** can cause events to happen when a player enters or leaves the region of the (invisible) box region. 
- Blueprint **timelines** are ways we can make a sequence of events happen -- and we can also make them happen in reverse. 
- Any object that can be moved in-game must have the "movable" option set in the transform Detail (rather than "static"). 

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
