title: Reality Capture
importance: 1

----

# Getting the real into virtual reality

<intro>

## Sound

To a certain extent, bringing sound into a virtual world is not significantly different from the workflows known from film and gaming. Moreover, sound can add a tremendous amount to the sense of presence in a world. 

One significant difference from conventional film is in the approach to **spatialization**: in VR we are immersed within a world, and sound should come from all around us, not only in front of us (and almost never from exactly where we are!)  There are spatialization methods to make it seem that audio comes from a different direction (e.g. ambisonics and head-related transfer functions), and from near or far ("distance cues"), whether a sound source is approaching or receding (via Doppler effects), and whether the space itself is resonant (reverberation). Unreal has some good support for spatializing sounds, and Max has some very excellent tools in this space. 

Another important difference is in timing: if there is no single timeline, then audio mixes happen according to events in the world. This is the norm in video games, and often involves a combination of long-running tracks, short event-based sound cues, longer overlapping loops, and varying mix levels and effects in response to world events. Again, Unreal has some built-in support, while Max is far more powerful and open-ended in this regard. 

Naturally, any recording will work better if taken without any background noise and in a non-reverberant space. 

An open question is how to deal with non-diegetic audio, or even to what extent this makes sense.

## 2D Images and video

It is very easy to bring a 2D image into a world, but unlike screen-based video, we cannot simply place it in a fixed location on screen. One of the oft-mentioned guidelines for VR is to never attach anything to the viewer's perspective. So any 2D images must instead exist as surfaces within the world. This means we can approach them, walk around them, etc. In computer graphics terms the images become textures on geometry meshes. However, although images are 2D, they don't necessarily need to be flat. In fact nearly all the things you can see in a typical video game or software VR world are image textures wrapped across 3D geometry. Images may also have transparency (opacity or "alpha" channels) that will make geometry transparent in the virtual world. 

It is also possible to wrap a video source onto a geometry in the same way -- including with transparency. As with sound there needs to be sensitivity with regard to timing: triggering, looping, synchronizing etc.

## Motion Capture

The term **Motion Capture** (AKA MoCap) is generally used to describe systems that capture the bodily movements of actors, in the form of animated "skeletons", which can then be used to animate virtual characters (via "rigging" the captured skeleton to the skeleton of a character model). MoCap can be **marker-based**, where an actor wears a suit with markers (such as highly-reflective bobbles), or can be **marker-less**, where there are very few restrictions on what an actor wears. 

Marker-based MoCap is also used to track rigid bodies, which are fixed arrangements of markers attached to objects that can also be accurately tracked. In making *Avatar*, James Cameron used marker-based tracking of a tablet PC as a virtual camera into a real-time rendered version of a scene while it was being acted. 

<iframe width="640" height="360" src="https://www.youtube.com/embed/OJ1JzYPjcj0?rel=0" frameborder="0" allowfullscreen></iframe>

We have access to a markerless MoCap system (by Organic Motion) at the CineSpace facility.  The Microsoft Kinect also provides a form of markerless motion capture with its skeleton tracking capability, though it has a much smaller field of view and tracking area.

## Photogrammetry

The term **Photogrammetry** (AKA photo-scanning, and also structure-from-motion) refers to a set of algorithmic methods by which a set of 2D photographs, taken from different points of view, can be analyzed to produce a 3D model of the scene. It is useful for capturing real-world static 3D objects into 3D model assets that can be placed within a virtual world. It can also be used at a larger scale to capture 3D models of entire environments. 

Photogrammetry has become widely used for bringing more realistic assets into videogames. For example, see [Star Wars Battlefront](http://starwars.ea.com/starwars/battlefront/news/how-we-used-photogrammetry). Here's a great example of an industrial site captured shortly before its demolition, and experienced in VR via the Unreal Engine:

<iframe width="640" height="360" src="https://www.youtube.com/embed/DqraO04zbxI?rel=0" frameborder="0" allowfullscreen></iframe>

Here's another example, captured using Agisoft and imported into Unreal, [described in this thread](https://forums.unrealengine.com/showthread.php?66011-Unreal-Engine-4-Photogrammetry)

<iframe width="640" height="360" src="https://www.youtube.com/embed/LbJm-sWqpVw?rel=0" frameborder="0" allowfullscreen></iframe>

Valve's [Destinations](http://store.steampowered.com/app/453170) VR app can load photogrammetry scenes -- [here's a tutorial](https://developer.valvesoftware.com/wiki/Destinations/Creating_a_Destination)

### Photogrammetry from video and other image sources

Typically photogrammetry works from a collection of photos of an object or site, but of course video can also serve this purpose, when the video camera is mobile. Creating photogrammetry from video requires long, continuous dolly/tracking type shots, of scenes with consistent lighting a no moving objects, and usually taken with the same camera settings (no zoom!). The artist Claire Hentschker has produced a series of interesting VR worlds derived primarily from photogrammetry of video, including from:
- [YouTube videos of abandoned shopping malls](http://postmatter.com/galleries/new-mythologies/claire-hentschker/). [Watch here](https://www.youtube.com/watch?v=xeahnvnk2vU)
- Kubrick's The Shining. [Watch here](https://www.youtube.com/watch?v=AupAFblRwgY)

The US Navy has also explored photogrammetry from non-standard sources [as described in this paper](http://www.public.navy.mil/spawar/Pacific/Robotics/Documents/Publications/2015/SPIE_Harguess_SFM_2015.pdf), drawing source images from Youtube, from Google Earth, and from quadcopter drones. 

### Software 

[**Regard3D**](http://www.regard3d.org)
- free & open source, but sometimes overwhelming in options
- [tutorial](http://www.regard3d.org/index.php/documentation/tutorial)
- [more detailed tutorial](https://developer.valvesoftware.com/wiki/Destinations/Photogrammetry_with_Regard3D)

[**Autodesk ReMake**](http://remake.autodesk.com/try-remake)
- free for students & education, but limited quality
- [shooting tips](http://autodeskremake.squarespace.com/blog/2016/5/31/how-to-take-photos-that-will-produce-best-3d-models)

**Agisoft PhotoScan Professional**
- recommended by many professionals
- not free but has a 30 day trial (not for commercial purposes), and a very significant education discount

### Tips

For shooting tips, [see this video](https://www.youtube.com/watch?v=D7Torjkfec4). Briefly:
- use the same camera settings and lighting for all images
- use diffuse/flat lighting (avoid spots, choose overcast days when outdoors)
- make sure nothing is moving and keep any backgrounds as plain as possible
- avoid shiny and transparent objects
- get lots of overlap between images... 40% image overlap, 10 degree angles, etc.

Bear in mind that photogrammetry applications usually turn out very large files (high poly = high polygon count meshes), which need to be reduced *significantly* to keep a good framerate. For detailed workflows of bringing real objects into Unreal, there's a fantastically detailed set of articles on the Unreal blog, [starting here](https://www.unrealengine.com/blog/imperfection-for-perfection). For additional references, see these links:
- [Using only free tools](https://www.youtube.com/watch?v=D6eqW6yk50k)
- [Creating a rock from photogrammetry](https://www.youtube.com/watch?v=aemJKOMTRGQ)

## Volumetric Capture / Volumetric Video

![depthkit](http://57.media.tumblr.com/d9412a062bcf9e58847ffb2db7990839/tumblr_nzhs49wQUy1qamt2wo1_500.gif)

The term **Volumetric Capture** (AKA Volumetric Video, Volumetric VR, etc.) has emerged very recently to describe a way of capturing time-varying parts of reality (typically actors) by combining multiple images/video signals captured at different locations in space, typically surrounding the subject, and often in combination with range cameras (cameras that can also determine depth, such as LIDAR cameras, or cheaper options such as Microsoft's Kinect). It is a kind of time-based photogrammetry, and produces a series of **point clouds** or a series of surface meshes, possibly also with colour data (textures).

[See for example DepthKit](http://www.depthkit.tv)

<iframe width="640" height="360" src="https://www.youtube.com/embed/g8m_LY_HcCo?rel=0" frameborder="0" allowfullscreen></iframe>

## 360 Filmmaking

- "Inside-out" 360 camera based film-making
	- Google Jump, JauntVR, VRSE/Within, **many many** others -- a huge boom in 360 cameras right now
- Many practical challenges
	- where does the crew go?
	- actors are unaware of viewer
	- stitching & stereo artifacts
	- doesn't allow head movement (but light-field cameras like [Lytro Immerge](https://www.lytro.com/immerge))?
	- still, massive interest & investment!
- [Various contributors (open source). Making 360. Github, ongoing.](http://making360.com)

- Perhaps, forget what you knew about cinema?
	- frame, focus, [attention](https://medium.com/the-language-of-vr/in-the-blink-of-a-mind-attention-1fdff60fa045#.61ahduc8u)
	- cuts & [editing in general](https://vrfilmreview.ru/what-we-ve-learned-about-editing-in-vr360-905e32e9f9bd#.ghn2t04cc)
	
> "The recent announcement of Vrse changing its name to Within is representative of an important shift in the way certain artists are thinking about VR. Chris Milk, one of the leading creators in the VR space is moving away from thinking about VR as a medium in which the author tells a story, and toward thinking about it as a medium in which viewers can, for the first time, step directly into the world of the creator." - [source](http://uploadvr.com/chris-milk-storytelling-change-within/)

> "VR eliminates the need for external frames. For the first time, the medium is no longer outside us, but within us. The paint is human experience and the canvas is our consciousness. The idea of an externalized medium ceases to exist. That’s why I think of VR as the last medium." - [source](https://virtualrealitypop.com/futureofvr-8be30f0fca6a#.n1s3d4n92)

> "Every rule we’ve discovered and employed in traditional filmmaking has an entirely new effect in VR. It’s very exciting. All the tools I’ve learned to love as a filmmaker now operate differently." - [source](http://uploadvr.com/chris-milk-storytelling-change-within/)

Jessica Brillhart, Google's Principal Filmmaker for VR, gave a good introduction to the challenges posing filmmakers for cinematic VR at Google I/O 2016 – providing some of her own insights from being a creator in this field while highlighting experiences produced by the world's most prolific VR content creators:

<iframe width="640" height="360" src="https://www.youtube.com/embed/t3xDgONMdlM?rel=0" frameborder="0" allowfullscreen></iframe>

[She has also posted widely on the Medium](https://medium.com/@brillhart)

- [How to storyboard for VR/360](https://virtualrealitypop.com/storyboarding-in-virtual-reality-67d3438a2fb1#.lwt8ojgeu) -- “Instead of controlling what the audience sees in VR, we work with probabilistic areas of user attention based on ergonomic data.”
	- [VR at Dreamworks](https://www.youtube.com/watch?v=oW5RRolm9J8&feature=youtu.be&t=10m40s) -- Cylindrical concept with personal, action, and vista distances. Like close, medium and long shots, except that they all happen at the same time.
Stresses important of previz in VR as soon and as much as possible.

