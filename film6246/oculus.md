# Oculus

[![https://www.oculus.com](http://www.hollywoodreporter.com/sites/default/files/imagecache/675x380/2014/09/oculus_crescentbay_0.jpg)](https://www.oculus.com)

The Rift is an upcoming virtual reality head-mounted display, being developed by Oculus VR. Starting with a Kickstarter campaign in 2012, and during its period as an independent company, Oculus VR raised US$2.4 million for the development of the Rift. It was then purchased by Facebook for $2 billion. 

The consumer version of the product is expected to become available sometime in 2015. Oculus released two 'development kits', DK1 in late 2012 and DK2 in mid 2014, to give developers a chance to develop content in time for the Rift's release; these have also been purchased by many virtual reality enthusiasts for general usage.

## "Experiences"

- Sightline - Mainly passive, oneiric. A very interesting way of changing scenes. Psychological. 
- Senza Peso - "mini VR opera" - archetypal magic landscapes, at limits of real-time rendering, slow roller coaster, smoke ring cuts.
- Eden River - ambient/relaxation

### Documentary

- Experience Japan - 360 documentary footage.
- [Sir Richard Attenborough is working on a VR nature documentary](http://www.fastcolabs.com/3033320/oculus-rift-powered-nature-documentaries-are-here-complete-with-david-attenborough)
- [Zero Point](http://www.theverge.com/2014/10/28/7078925/zero-point-vr-oculus-rift-documentary-released)
- [Clouds](http://vimeo.com/54633485)
- [Assent (1973 Chile)](http://vimeo.com/89607805)

### Game

- [Elite: Dangerous](http://www.roadtovr.com/play-elite-dangerous-dk2-depth-hands-video/)
- [Windlands](https://www.youtube.com/watch?v=y-vGvXxXZAs) - NPR graphics, alternative mode of navigation (swinging)
- Airdrift - landscape modelling, alternative navigation (hand gliding)
- BlazeRush - toy cars, 3rd person
- [Radial-G](http://www.roadtovr.com/radial-g-just-earned-spot-oculus-rift-demo-folder/) - cockpit-based pipe track sci-fi racing
- Minecrift (Minecraft mod)

#### + LEAP

- [Leap collection](https://developer.leapmotion.com/gallery/tags/vr)
- [Collider](http://stv.re/collider/)

<iframe width="853" height="480" src="https://www.youtube.com/embed/Mg-zZXeWyJU?list=PLUj8-Hhrb-a0Z3f70ygX5fXLk8Sa4mTQZ" frameborder="0" allowfullscreen></iframe>

### Horror

- Affected - Indie horror.
- WakeUp - Somewhat narrative semi-nightmare, interesting cut style
- Alien: Isolation is a survival horror set in the Alien universe, where Ellen Ripley’s daughter Amanda enters a desperate battle for survival, on a mission to unravel the truth behind her mother’s disappearance.

### Sculpting

- [VR Clay](http://vrclay.com)
- [Tiltbrush](http://www.tiltbrush.com)

### Education?

- VR Typing Trainer

### Visualization

- [Sciviz / Dataviz](https://www.youtube.com/watch?v=IERHs7yYsWI)
- [DARPA Cyberwar (via Wired)](http://video.wired.com/watch/inside-darpa-s-oculus-cyberwar-visualization)

### VR & Psychology

Widely used for decades in research to present alternate reality scenarios, investigating topics from vertigo to racial bias.

[VR confuses brain's sense of location mapping](http://simulatortrends.com/vr-confuses-brain-cell-gps/)

## Interaction

Xbox controller, Razor Hydra, [Sixense STEM](http://sixense.com/wireless)

Hand tracking - [Leap VR](http://www.roadtovr.com/leap-motions-next-gen-dragonfly-sensor-designed-vr-headsets/), and future Dragonfly model for AR

[Walking and even crawling](https://www.youtube.com/watch?v=wPffziOrE6Y#t=24), or running in a [treadmill](http://www.roadtovr.com/virtual-reality-virtusphere-omnidirectional-treadmill/)

[Being a bird](http://birdly.zhdk.ch/about/)

Saschka Unseld (The Blue Umbrella): "For the type of storytelling I’m currently interested in, I think interactivity is a problem. User-decided story threads are a problem. The audience is a horrible storyteller."

[2nd-person perspective - the machine to be another](http://www.themachinetobeanother.org)

## AR in VR

[Doc_OK Oliver Kreylos using Kinects to put himself in the world](https://www.youtube.com/watch?v=yUu1ZQDCGp8&index=5&list=UUj_UmpoD8Ph_EcyN_xEXrUQ)

[Sciviz / telematics / AR in VR](https://www.youtube.com/watch?v=B4g9J-aSF-c)

[Virtual Worlds Using Head-mounted Displays](https://www.youtube.com/watch?v=R0-dsbeasgA)



## Technology tips

[How time warping works](https://www.youtube.com/watch?v=WvtEXMlQQtI) -- essentially, in the last stage after rendering the scene, we grab the head tracking data once again and warp the image slightly to account for this difference. Warping uses the depth buffer to re-project each pixel from its XYZ position and the new camera position. If we restrict warping to rotation, there are no gaps due to occlusion. 

[Solving motion blur with low persistence](https://www.youtube.com/watch?feature=player_detailpage&v=HoLHHUdi_LE#t=341) -- essentially, the screen is black most of the time, and the image per frame is actually only displayed for around a millisecond; this ensures that the image is rarely in the wrong place as you turn your head, reducing the apparent blur. 