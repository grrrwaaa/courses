title: Unreal
importance: 3

--- 

# Unreal Engine

Unreal has long been used in many "AAA" (large-scale/high-production value/high-budget) games, but was recently open-sourced with an amenable license in early 2015; and now has built-in support for VR and the Oculus Rift (just press Alt + Enter!)

## Getting Unreal

Note: you will need a reasonably fast PC or Mac to run Unreal comfortably. Mac users probably also want an external two- or three-button mouse. 

- Go to [https://www.unrealengine.com](https://www.unrealengine.com) and follow the "Get Unreal" link to register an account and then download the launcher application. 
- Run this launcher (you will need to sign in again), and then under the "Unreal" tab download the Unreal Engine. This will take a while!
- From the launcher also get the "content examples", and perhaps any other of the free samples you find interesting. Warning -- these examples can eat *gigabytes* of disk space!!

---

## Concepts

[Getting started with UE4](https://docs.unrealengine.com/latest/INT/GettingStarted/index.html?utm_source=launcher&utm_medium=ue&utm_campaign=uelearn)

You use the Unreal *Editor* application to author your world. Ultimately you will export it as an application (.exe on windows), but most of the time you will edit and also playtest the world via the Editor. A *Project* is actually a whole folder of files on your disk, including a .uproject file that keeps the global settings together. You can see these files via the Content Browser in the Unreal editor. You can see all your projects in the "Library" section of the Unreal launcher.

Each project has one or more *Levels* (sometimes also called "maps"), which are like 3D scenes or locations into which you place objects to define the world experienced. Each level is saved as a separate .umap file. All the levels in an Unreal project make up a *World*.

Any object (a player, character, geometry mesh, light, etc.) that can be placed in 3D space (with position/translation, rotation/orientation, scale etc.) is an *Actor*. Remember that *Assets* in the content browser are the resources you can place into the world, while *Actors* are instances that use these resources.

At its most basic level, creating levels boils down to placing Actors in a map. Actors can also be created ("spawned") by scripts, e.g. the arrows launched by a bow. Some examples of kinds of Actor are StaticMeshActor, CameraActor, PlayerStartActor. A *Pawn* is a kind of actor that serves as an avatar or persona. 

A *Component* is a piece of functionality that can be added to an Actor. Components cannot exist by themselves. For example, a Spot Light Component will allow your Actor to emit light like a spot light.

A *Class* defines the behaviors and properties of a particular Actor or Object used in the creation of an Unreal Engine game. Classes can be created in C++ code or via visual diagrams called Blueprints. Each game has one *PlayerController* class which controls a Character Pawn from input controls (joystick etc.). An *AIController* possesses other Pawns to serve as non-player characters (NPCs) in the world.

*Volumes* define a 3D area for certain purposes, often invisible (such as blocking volumes to prevent actors leaving the area, pain causing volumes to inflict damage on any actor within the area, trigger volumes that cause events when an actor enters or exits them). 
 
## Editing

The main panel is the 3D viewport, showing a preview of the world. 

- Move & look around by dragging the left mouse button, or rotate in place by dragging the right mouse button. Drag with both buttons down to move vertically.
- With any mouse button held down, using keys W, A, S, D, Q and E to move around.
- Mouse-scroll to zoom in and out.
- Select an object by clicking on it, then press "F" to focus on it (or, double-click an item in the World Outliner)

On the left, the Modes panel selects different task workflows, such as placing objects, creating geometry, painting meshes, generating trees, etc.

On the right, the World Outliner panel shows all the levels, and all the actors involved in each level. You can select them here, or in the 3D viewport, to modify them. Below that, the Details panel is used to modify properties of whatever is currently selected.

Below, the Content Browser is where you can manage the Assets used in your project.

> Tip: Hold Control+Alt and mouse-over any Editor feature to see a help window about it.

## Viewing the Frame rate

Command+Shift+H (or the dropdown top-right of the viewport)

---

## Building levels

Like any major production, everything starts with planning and sketching; with some interesting overlaps and differences from film, architecture, design, composition, etc.

Within Unreal, sketch first with a "roughed-in" or "blocked out" schematic of the world, and start testing it's movement and flow as soon as possible -- long before spending any time on creating the real mesh geometry and other art assets. [Geometry Brushes](https://docs.unrealengine.com/latest/INT/Engine/Actors/Brushes/index.html), also sometimes called "BSPs", are perfect for this aspect of the level design process. After testing & refining, spend more time updating the meshes, lighting and other elements of the world, testing continually, up to the last stages of polishing up.

A *Geometry Brush* is a way to fill in and carve out volumes of space in a level. They can be used to rapid-prototype a level where static meshes have not yet been created. Geometry Brush shapes include Boxes, Cones, Spheres, and Staircases, and have a few things that can be tweaked in the details panes. Using the *Geometry Editing Mode*, very simple 3D modeling can be performed. A geometry brush's settings can be set to "Subtractive" type, which will carve out holes in other brushes -- however the order of brushes is important. Also be careful to use the *Drag Grid* to make sure geometry snaps to tight alignment. You can also apply materials and lighting properties to a brushes' surfaces. After modeling, you can convert a brush into a regular StaticMeshActor from the Brush settings.

It can be useful to make new levels to test out ideas quickly without breaking work done in your main level(s). File->New Level.

---

[Level Designer Quick Start](https://docs.unrealengine.com/latest/INT/Engine/QuickStart/index.html)

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
