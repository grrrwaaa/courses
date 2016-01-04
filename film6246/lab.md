title: Labs
importance: 5

--- 

# Labs

## Software for Worldmaking

Creating a VR world requires high-performance computer graphics supported by low-level drivers and libraries. Few developers want to work at this level, so a number of higher-level programming frameworks exist -- for new media artists these might still use a lower level language such as C++ (openFrameworks, Cinder being two good examples), or might present a completely different high-level interface such as the visual programming of Max/MSP/Jitter, VVVV, etc. 

However the majority of VR experiences are programmed using *game engines*. The most widely used and freely available game engines used today are [Unity](http://unity3d.com) and [Unreal](https://www.unrealengine.com/blog). Game Engines can get you a long way by just importing assets, dragging & dropping, tweaking parameters etc. without having to ever see code, and some have some kind of visual programming option too. Though they don't grant the full freedom of a programming framework, the learning curve is gentler. Compared to many frameworks, game engines have much more built-in features (lighting models, terrain, physics, etc.). The danger is that these engines and their editors are permeated by game-oriented concepts, terminology, workflows etc, and the result is often recognizably the product of a game engine. They also benefit from the largest VR communities at present.

As an alternative to creating an *app*, some VR creators are focusing on the *web browser* as primary medium. Unity and Unreal also offer options to export to web, but this might not yet be VR-capable. Alternatively, numerous 3D graphics frameworks exist for browser-based JavaScript (e.g. Three.js), which can be combined with [MozVR](http://mozvr.com) for Firefox or [WebVR](http://webvr.info) for Firefox & Chrome.

Another option is to avoid software development altogether, and work within a sandbox platform: a game or game-like world that already exists, but which can be redefined by its users to build and design "user generated content" (such as SecondLife -- see [this collection of Rift-oriented examples](http://secondlife.com/destinations/oculus)). Obviously this may appear the easiest, but is also the most constrained of the available options.

For our labs we will begin with the game engine route, with the [Unreal Engine](unreal.html) in particular.


