title: Cinema
importance: 7

----

## VR is or is not cinema...?

Whereas through the 90's surge and earlier, the cinema industry has been more interested in VR as a plot device, it is now becoming increasingly interested in VR as a medium.

[Hollywood Reporter: Fox Is Bullish on Virtual Reality, But Is It the "Real Deal" for Hollywood?](http://www.hollywoodreporter.com/behind-screen/ces-fox-is-bullish-virtual-760925) - Fox Home Entertainment worldwide president Mike Dunn projects that virtual-reality technology will go mainstream, potentially reaching 25 million households by 2017.

[Filmmakers Look to Virtual Reality and Oculus as the Future of Storytelling](http://www.hollywoodreporter.com/news/filmmakers-look-virtual-reality-oculus-734500) - “I think the next step for us as filmmakers is to figure out what narrative filmmaking looks like in virtual reality,” said music video director Chris Milk... Now is the time to figure out how to tell human stories — and that involves questioning fundamental concepts... "I don’t think this is cinema," he said. "I think this is something completely new."

> Saschka Unseld (The Blue Umbrella): "For the type of storytelling I’m currently interested in, I think interactivity is a problem. User-decided story threads are a problem. The audience is a horrible storyteller."

> Pixar's Ed Catmull: [VR is not storytelling.](http://www.theguardian.com/technology/2015/dec/03/pixar-virtual-reality-storytelling-ed-catmull) "However, in an interview with the Guardian, he stressed that his caution on VR as a storytelling medium does not mean he sees the technology as a creative dead-end."

A more integrated mixed-reality approach is being taken by [Industrial Light & Magic's xLAB](http://www.ilmxlab.com); [Intro video](https://www.youtube.com/watch?v=7T9Dv1aLMbw&feature=youtu.be); [Inside](http://www.theverge.com/2015/8/13/9131805/ilm-ilmxlab-interview-virtual-reality-star-wars-movies)

Despite this, we should be cautious in naively bringing cinematic ideas to the medium. There are many quite fundamental differences, such as:

- The immersant controls the camera (or else they will feel sick). How can framing make sense? What can cinematography tell us? What if the immersant is looking the wrong way and misses an important action/plot point?
- This means the immersant may also need to control time. How do we compress/dilate narrative time seamlessly (especially in combination with pre-recorded materials)?
- A number of common editing methods, most notably the simple cut, almost never work in VR! There's no Kuleshov effect here. A whole realm of editing lore developed over a century seems irrelevant. But is it? What can we still make use of, and how does it mutate to adapt?
- Although in cinema the camera is usually positioned in the world, we do not think of it existing in the world, and we don't think of ourselves as part of the world -- the fourth wall must not be broken. But in VR there *is* no fourth wall, at least not spatially: we are inside. Can we identify with characters in this situation? Are we also characters? If not, what are we? Will we comfortably accept the 'fly on a wall' perspective, will we always feel like an invisible ghost, will we forget ourselves, or be conscious voyeurs?

## Live action capture (or the lack of it)

"Filming" for VR is an unsolved problem. Of course, we can bring human elements from traditional filming media into 3D worlds by placing them on surfaces. They could be regular TVs/projectors/billboards etc., or textured onto more unusual or abstract surfaces. This also includes stereoscopic video, though the depth effect will depend on the viewer's viewpoint.

But to go beyond such *decals* and *textures*, and bring more of the real world into the virtual, there are currently two broad approaches -- one predominantly based on static cameras (generally becoming known as 360 filmmaking), and one predominantly based on placing real-world footage into a largely CG (computer generated) world. 

> Perhaps there are some ways these inside-out and outside-in methods can be combined?

### "Inside-out": 360 cinema

A great howto guide to this rapidly emerging medium is here: [Various contributors (open source). Making 360. Github, ongoing.](http://making360.com). It involves an array of cameras (many cameras, or fewer cameras with extreme wide angles) to cover a 360 cylindrical or full spherical panoramas, and software to synchronize and then stitch the various sources together into a complete image. 

In general, this tends more easily toward the transportation to a sincere likeness of another part of our real world, which is perhaps why it is particularly attracting documentary-making.

- Tech: Google Jump, JauntVR, VRSE, **many many** others -- a huge boom in 360 cameras right now
- Stereoscopy is imperfect, and likely impossible to perfect
- There is still a significant loss of agency/interaction:
	- Viewer can't move
	- Actors are unable to respond to the viewers actions.

The future/high-end of this direction is the use of lightfield cameras, which capture both the colour and *direction* of incoming rays. 

- The first real contender is [Lytro Immerge](https://www.lytro.com/immerge)
- Incredibly expensive
- The lack of viewer agency/interaction largely remains.

Because of the static camera location and lack of agency/interaction, there is debate whether 360 filmmaking should really be considered virtual reality. [For example, see here](http://vrscout.com/news/virtual-reality-and-360-film/):

"The predominant argument against 360° film as a virtual reality experience exists in the limitations inherent within the medium... shot with a static camera... the viewer doesn’t have the option to get closer to an object or engage with the surrounding environment through free-reign agency."
"... a common mishap is occurring: content creators shoehorning old formats into new technologies."

### "Outside-in": motion/surface capture for virtual worlds	

Rather than having an array of cameras pointing out from a singular location, the other way of bringing real-world objects and movement (and especially actors) into a virtual world is to surround them with cameras pointing in, and use computer vision techniques to turn the images into full 3D models or textured surfaces which can be placed in a largely synthetic virtual world; inevitably, this tends more toward the creation of worlds less familiar than our own. Moreover, because objects are captured from all directions, there is no limitation on our moving around them, and less limitations on our interacting with them. 

**Motion Capture (MoCap)** tracking is already a well-established technique, widely-used in videogames and cinema for more than a decade. Actors wear suits studded with reflective markers or icons, which an array of cameras can recognized and use to reconstruct the skeletal pose of the actor, and then rig that onto pre-designed 3D models of virtual characters (or creatures). The walking, jumping, fighting etc. poses of characters in modern videogames are often drawn from MoCap data, as are nearly all the non-human characters in cinema today. Note that in VR the artificiality of avatars is less easy to ignore than in theatrical/home screen formats. 

Likely this is the only method in which captured actors will be able to turn their eyes to look at you directly. Still, the way that avatars respond to your presence may feel distinctly unrealistic.

**Point-cloud surface capture** tries to capture the actual surface geometry of actors and objects, through a combination of computer vision techniques resulting in a "cloud" of 3D points, which can be "meshed" into a consistent surface, and textured with appropriate colour. Frequently cameras will also make use of *depth* data, whether by structured light or time-of-flight methods, in a similar fashion to LiDAR, but some systems use RGB only (with methods similar to photogrammetry). Some examples:

- Using cheap depth cameras plus DSLRs: http://depthkit.tv
- See [Clouds docu](http://cloudsdocumentary.com)
- [Suspect this is essentially the same thing](http://www.wired.com/2015/10/uncorporeal-vr-movies/)
- [And this](http://www.mimesysvr.com)

<iframe width="480" height="360" src="https://www.youtube.com/embed/8nTFjVm9sTQ?rel=0" frameborder="0" allowfullscreen></iframe>

We might be able to set something like this up in the lab -- but the quality with the cameras we currently have will be no better (and likely worse) than [this](https://www.kickstarter.com/projects/specular/blackout-a-virtual-glimpse-into-the-lives-of-stran):

![point clouds](http://57.media.tumblr.com/d9412a062bcf9e58847ffb2db7990839/tumblr_nzhs49wQUy1qamt2wo1_500.gif)

- This method from Organic Motion does not use depth imaging:

<iframe width="640" height="360" src="https://www.youtube.com/embed/g8m_LY_HcCo?rel=0" frameborder="0" allowfullscreen></iframe>

If streamed in real-time, this might be the best option for real human-human interaction. But what to do about the big headset on everyone's faces?

Lastly, the point-cloud method doesn't need to be used for just actors, nor does the point-like basis need to be hidden, see for example [In the Eyes of the Animal](http://www.creativeapplications.net/maxmsp/in-the-eyes-of-the-animal-mlf-virtualise-a-forest-through-the-eyes-of-its-creatures/):

<iframe src="https://player.vimeo.com/video/140057053" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Similarly, [A Light in Chorus](http://www.alightinchorus.com)

<iframe src="https://player.vimeo.com/video/97512210" width="720" height="405" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>