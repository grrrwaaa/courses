title: Future Cinema II
importance: 10

----

# Future Cinema II: Applied Theory

[![Personal Television from Life Magazine.](http://cdn.arstechnica.net/wp-content/uploads/2010/04/tvglasses.jpg)](http://arstechnica.com/tech-policy/2010/05/ralph-124c-41-a-century-later/)   
Hugo Gernsback (of "Hugo Awards" fame), wearing his TV Glasses in a 1963 Life magazine shoot.

**Course:** FILM 6246   
**Class time:** Tuesdays 10:00am - 1:00pm   
**Open lab/office hours:** Tuesdays 2:00-4:00pm (optional)  
**Location:** 309 GCFA

**Course director:** Graham Wakefield   
**Office:** 303C GCFA   
**Email:** grrrwaaa at yorku dot ca    

This hands-on course gives you an opportunity to learn about new screen technologies, approaches and techniques in a lab environment, and participate in the evolution of emerging media. In 2015-2016, the course will give you the opportunity to engage with wearable immersive virtual reality [(VR)](vr.html) technology via the Oculus Rift headset on both practical and theoretical levels to understand, create and imagine new kinds of worlds. 

You will work in the lab to build prototypes that will function as a testing ground. You are encouraged to be both theorists and practical experimenters, to research while doing, understanding that the process of exploring firsthand is an important step toward the kinds of knowledge and ways of knowing enabled and encouraged by these evocative new digital technologies, and suggest new ways to think about future forms of the moving image, from new literacies to new audiences. The course will expose you to the imperfect software support for building worlds, and encourage you to think about and beyond their limits. Our work is put into context and guided by a century of preceding theory and practice even as we try, collectively, to imagine moving images and screens of the future, through discussions interwoven with the individual and group projects.

Students with backgrounds in film, digital media, design, theatre, music, architecture, video production, and visual storytelling are welcome, as are students with programming, human-computer interaction, or computer graphics backgrounds. Knowledge of Max/MSP/Jitter, Unity/Unreal, Cinder/OpenFrameworks, or related software will be at an advantage, but is not required. The labs aim to accelerate development such that the technology need not be so difficult to penetrate. Above all, creative thinking with and through technology is the most important asset that you can bring to this course. This seminar and its associated lab component are understood to be very much an experimental think tank whose success very much depends on your collective enthusiasm and active engagement.

---

## Labs

We will be using the Oculus Rift DK2, unless we are lucky enough to get a [CV1](](https://www.youtube.com/watch?v=asduqdRizqs) before the 
semester ends.



Although there is great excitement in producing 360' films for VR, this is not what we will be doing in this course. Practically, we do not have access to a 360' camera rig. Moreover, 360' filmmaking is arguably (at least with current technology) unable to leverage some of the fundamental capabilities of VR -- such as positional head-tracking -- and thus does not grant a full exploration of the medium's inherent message. Instead, we will rely more on software to create worlds.

Creating a virtual world requires high-performance computer graphics -- for VR, the equivalent of at least HD resolution, but at 60 or more frames per second (90 for the Oculus CV1). This is supported by low-level drivers and libraries, but few creators want to work at this level. A number of higher-level programming frameworks exist -- for new media artists these might still use a lower level language such as C++ (openFrameworks, Cinder being two good examples), or might present a completely different high-level interface such as the visual programming of Max/MSP/Jitter, VVVV, etc. But these can still present a significant barrier to entry.

The majority of VR projects being created for today's headsets are written using *game engines*. The most widely used and freely available game engines are currently [Unity](http://unity3d.com) and [Unreal](https://www.unrealengine.com/blog). Game engines can get you a long way by just importing assets, dragging & dropping, tweaking parameters etc. without having to ever see code, and some incorporate some kind of scripting or visual programming option too. Though they might not grant the full freedom of a programming framework, the learning curve is gentler. Compared to many frameworks, game engines have much more built-in features (lighting models, terrain, physics, etc.). The danger is that these engines and their editors are permeated by game-oriented concepts, terminology, workflows etc, and the result is often recognizably the product of a game engine. They also benefit from the largest VR communities at present.

As an alternative to creating an *app*, some VR creators are focusing on the *web browser* as primary medium. Unity and Unreal also offer options to export to web, but this might not yet be VR-capable. Alternatively, numerous 3D graphics frameworks exist for browser-based JavaScript (e.g. Three.js), which can be combined with [MozVR](http://mozvr.com) for Firefox or [WebVR](http://webvr.info) for Firefox & Chrome.

Another option is to avoid software development altogether, and work within a sandbox platform: a game or game-like world that already exists, but which can be redefined by its users to build and design "user generated content" (such as SecondLife -- see [this collection of Rift-oriented examples](http://secondlife.com/destinations/oculus)). Obviously this may appear the easiest, but is also the most constrained of the available options.

For our labs we will begin with the game engine route, with the [Unreal Engine](unreal.html) in particular.

---

## Schedule

Content may vary from this plan according to needs and interests of students.

### 1. Jan 5

**Course overview**. 

Introduction to the field, the themes and objectives, the hardware and software. 

**Tasks**

Part 1:

- In-class: try out one of the VR experiences, and write down as many of your immediate impressions as you can -- whatever they may be.
- After class, reflect on your first impressions of VR some more, and note down any further insights, observations, or ideas you have.
- Research online to find a VR project, or a project you think would be suitable for VR, that you would most like to experience. Some suggested places to explore are listed below, but please don't limit yourself to these:
	- [Oculus Share](https://share.oculus.com)
	- [Apps for Google Cardboard](https://play.google.com/store/apps/collection/promotion_3001011_cardboard_featured_apps?hl=en)
	- [Unreal feature examples](https://docs.unrealengine.com/latest/INT/Resources/Showcases/index.html)
	- [VR app list](http://www.vrapplist.de)
	- [A typical indie game/VR list](http://ca.ign.com/articles/2013/12/01/10-games-thatll-make-you-want-an-oculus-rift) -- and [a more interesting one](http://blog.ianiselsewhere.com/post/51243939314/27-games-i-want-to-play-on-the-oculus-rift)
- Submit your responses and research via [this survey form here](https://docs.google.com/forms/d/1RF_6YI1hTLUdHhsctx972J5qYbH9zNNZc98wZkItNiw/viewform), by Saturday 9th, so that I have time to collate results and install whatever projects I can.

Part 2:

- Download & install the Unreal Engine, editor, and content examples [according to the instructions here](unreal.html#getting-unreal). 
	- Work through at least the first two [UE4 Editor Tutorial Videos](https://wiki.unrealengine.com/Videos?series=PLZlv_N0_O1gasd4IcOe9Cx9wHoBB7rxFl), following along with your own copy.
	- If you can, try working through some of the steps of the Level Designer Quick Start Tutorial [starting here](https://docs.unrealengine.com/latest/INT/Engine/QuickStart/1/index.html).

### 2. Jan 12

Recap. Getting to know Unreal. Simulator sickness. 

**Tasks**

- Watch the [geometry layout](https://wiki.unrealengine.com/Videos/Player?series=PLZlv_N0_O1gak1_FoAJVrEGiLIploeF3F&video=57MxoF4sy84) tutorial, no further than part 7, and follow along to create your first project and level.

### 3. Jan 19

### 4. Jan 26

### 5. Feb 2

### 6. Feb 9

### 7. Feb 16

**Reading week**

### 8. Feb 23

### 9. Mar 1

### 10. Mar 8

### 11. Mar 15

### 12. Mar 22

### 13. Mar 29

**Due Mar 30:** Final project

Final project presentation & discussion, open lab.
