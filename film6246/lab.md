title: Lab
importance: 4

----

# Lab instruction & practice work for the course

The goal in 2016-2017 is to create one or more projects for head-mounted virtual reality display by the end of the course. Projects may be produced individually, but I strongly encourage collaborating in teams -- entire worlds are large places to fill alone! 

<iframe width="640" height="360" src="https://www.youtube.com/embed/8YAuRxyE3Us?rel=0" frameborder="0" allowfullscreen></iframe>

The above example is a small part of a world produced in Spring semester by three students, who had never used any kind of software authoring or game engine tools previously.

## Software for VR

Creating a virtual world requires high-performance computer graphics -- for VR, the equivalent of at least HD resolution, at 90 frames per second. This is supported by low-level drivers and libraries, but few creators want to work at this level. Options to author for VR above this level roughly consist of:

- C++ Programming frameworks such as Cinder or OpenFrameworks that offer more support for computer graphics and interactivity built-in. 
	- Still very low level, most flexible, most efficient, but very steep learning curve. 
	- I am familiar with using Cinder for VR and can support that option.
- Visual programming systems for media arts such as [Max/MSP/Jitter](max.html), VVVV, etc.
	- Coding is visual, more like arranging a flowchart
	- I am very familiar with Max, and I have authored VR and other components for it.
- Game engine authoring tools, such as [Unity](http://unity3d.com) and [Unreal](https://www.unrealengine.com/blog)
	- Nearly all VR products today use game engines. 
	- These can get you a long way by just importing assets, dragging & dropping, tweaking parameters etc. without having to ever see code, and have wide platform support
	- Less freedom than a programming framework, but easier to learn, and more built-in features to use
	- Risk of being tinted by game-oriented concepts, styles, etc, harder to be more innovative
	- I will focus on Unreal as I am more familiar with it
- HTML5 and WebVR to author "web apps": VR in the browser (Chrome/Firefox best)
	- Coding in Javascript and GLSL for [WebVR](http://webvr.info), but many simpler libraries such as Three.js to help
	- There's a performance hit
	- I have plenty of web programming experience, but haven't used WebVR in particular yet; happy to learn
- Work within a sandbox platform such as MineCraft etc.
	- A game or game-like world that already exists, but which can be redefined by its users to build and design "user generated content" such as MineCraft
	- The easiest, but is also the most constrained in options.

I expect most of you will want to use Unreal or perhaps Max.

### Unreal or Max?

It really depends on what you hope to achieve. 

- Both tend to be domain-oriented; for Unreal the primary domain is game development, for Max, it is sonic and interactive media arts. In Unreal you are writing a project with scenes made up of assets. In Max you are writing a system made up of a network of processes. 

- In general what Unreal can give you automatically, in Max you usually have to build yourself. However, by doing so it allows you to change things and make them your own at a much finer level of control and experimentation. Unreal on the other hand is likely to support more complex environments and certainly will create more photorealistic lighting and materials, for example. Both support a form of 'coding' that is more like drawing flowcharts -- but where in Unreal you can avoid needing it most of the time, in Max you must do this from the start. 

- For example, Unreal gives you game-oriented rendering and spatialized audio for free, but no musical or complex sound synthesis capabilities and no algorithmic data processing. Max gives you an incredible range of high and low level algorithmic processing and audio synthesis capabilities, but you have to build rendering and audio spatialization yourself (or find some prior work to start from... I have quite a bit we could leverage). 

- Unreal comes with a vast array of free assets that you can add to your scenes, and there are a few more in the community (but most are not free); Max comes with a vast array of audio-visual processes that you can combine into a more complex system. Max also has a huge library of community-provided "externals", most of which are free, but are usually oriented toward algorithmic processes and connecting with other hardware, software, protocols etc. 

- Thus the more experimental, algorithmic, interactive or otherwise unusual the project, the more likely Max is going to better facilitate your work. But if you feel more comfortable thinking in terms of spatial objects and earth-like architectures and landscapes than flows of process and interaction, you will probably prefer Unreal. 

- Unreal is free until you start selling lots of copies of your game/app/project. You'll need to figure out how to acquire assets for your scenes though. [Max is USD$10/month, or for students, USD$60/year or USD$250 forever.](https://cycling74.com/shop/), with a 30-day free demo. Exported Max apps have no license limitations. Both have excellent tutorials and documentation, accessible from within the editor; and also great communities. I know Max better because I authored Max's VR extensions and some components of Max itself. Knowing Unreal is more likely to help you get a job. 

## Hardware

We have access to the two current consumer desktop VR devices: HTC Vive and Oculus Rift. We also have access to earlier developer versions of the Oculus headset and an OSVR headset, as well as Google's Cardboard. Although there is great excitement in producing 360' films for VR, this is not the focus of the course -- rather we will focus on software-driven worlds in order to explore the VR medium's potentials. However we may be able to bring in real-world content in other ways, including volumetric capture and photogrammetry, and also motion capture via the CineSpace studios. 

We don't have enough machines for all students (in fact at present we are waiting for machines to be delivered, but it could be several weeks or more). If you do not own a reasonably recent and powerful laptop or PC, you may request access to the [Digital Media Transmedia Lab](http://dm.ampd.yorku.ca/), in which there are iMacs with Unreal and Max installed.

> Lab Cards are $25 for the year, or $15 for one term. The Digital Media Lab Card can be purchased in the Digital Media office, located in Rm. 232, Goldfarb Centre for Fine Arts. The office is open Monday to Friday, 8:30am-4:30pm.

Desktop machine requirements for today's consumer VR are quite high, and at present limited to the Windows platform. However you can design and build a world on a lower spec machine, and on a Mac, and bring it to a PC in the lab to test with a headset. 






