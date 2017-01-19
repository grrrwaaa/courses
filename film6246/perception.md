title: Perception
importance: 7

----

# Nausea and Simulator Sickness

> Simulation Sickness is a syndrome, which can result in eyestrain, headaches, problems standing up (postural instability), sweating, disorientation, vertigo, loss of colour to the skin, nausea, and - the most famous effect - vomiting. It is similar in effects to motion sickness, although technically a different thing. Simulation sickness can occur during simulator or VR equipment use and can sometimes persist for hours afterwards... If VR experiences ignore fundamental best practices, they can lead to simulator sickness—a combination of symptoms clustered around eyestrain, disorientation, and nausea. - [Article on Gamasutra - by Ben Lewis-Evans on 04/04/14](http://www.gamasutra.com/blogs/BenLewisEvans/20140404/214732/Simulation_Sickness_and_VR__What_is_it_and_what_can_developers_and_players_do_to_reduce_it.php)

Simulator sickness involves three kinds of issues:

- Oculomotor
	- Headaches, fatigue, eye strain, can't focus
- Nausea
	- Sweating, salivation, can't concentrate, burping/stomach awareness
- Disorientation
	- Blurry vision, dizziness (with eyes open or closed), vertigo (24%)

Which is to say, *virtual worlds can be dangerous!* See this 1996 NBC special:

<iframe width="480" height="360" src="https://www.youtube.com/embed/O0arluK5zrQ?rel=0" frameborder="0" allowfullscreen></iframe>

In fact simulator sickness has been known about since the earliest flight simulators of the 1950's, but is still not fully understood. It is clearly triggered by "cue conflicts", whereby what some parts of the visual system are reporting does not match what other sensory components (such as proprioceptive systems) are reporting. 

Some people are far more or less susceptible than others. It generally affects younger people less, and tends to reduce with increased exposure (getting your "VR legs"). People with a history of MS, alcohol/drug abuse, etc. also tend to be more susceptible.

> Around 5% of all individuals will never acclimate regardless how much they try to build a resistance to it meaning there is a confirmed minority of individuals who will never be able to us Virtual Reality as a mainstream product over their lifetime. - [Sim Sickness guide on Oculus forums](https://forums.oculus.com/viewtopic.php?t=170)

Since nausea/sim-sickness remains one of the greatest risks to virtual reality's success, it is essential to consider in the design of an experience. 

> Virtual reality’s biggest enemy is bad virtual reality.  – Palmer Luckey

> The fear is if a really bad V.R. product comes out, it could send the industry back to the '90s, – John Carmack

## Latency

To some extent this is a hardware problem -- and recent advances in VR hardware and drivers have come a long way to minimize the risk. However this still very deeply affects how we design our content, and is important to understand.

- Latency is how long it takes for a message to transmit. *Motion to photon* latency measures how long it takes for a change in head rotation to be reflected in a change in the image perceived. It should be *consistently* under 20 milliseconds to avoid nausea. Failing to do so can result in  sluggish or sloppy motion tracking, in which the world 'swims' around you. Even occasional hiccups will be experienced as a disturbing "judder" that is never experienced in normal life. The Oculus and Vive hardware now run at 90 fps and their drivers do some tricks to help keep latency down, but it also depends crucially on the content and quality of the software. 
	
- Anything that can potentially interrupt or slow down rendering, or delay the motion-to-photon pathway, has to be avoided to prevent nausea. The need for low-latency and high-framerate is one of the reasons why certain visual details and effects common in video games are eschewed in VR. When the world surrounds in you stereoscopy, geometry is often more important than screen-based post-processing. In particular, many effects popular in games are actually rendered across several frames -- this is simply not viable for VR. The Unreal VR template disables such effects by default. 

> A related issue is image persistence: a low-persistence image has a longer black interval between presenting frames, which reduces the smear/blur/ghosting when moving your head. This is mainly a display screen technology issue and largely resolved in current generation hardware. 

![Persistence](https://lh5.googleusercontent.com/bS3bZRKphnYPK1IAP7DwYN6e3Y_7y6-8RnHVutmm15S_wjzkf4M1vDR0OczN0kHx6PVd-10jd4vmhDFNhY0I18_31ovaKI2s6X_noyC9jk0AutfhEM4BIvnNyFjS6Q)

## Motion cue conflicts

The other major cause of nausea is motion cue conflicts, in which the movement portrayed by the images presented is not consistent with real motion of the body (or with an expected motion). This is almost the inverse of motion sickness, and appears to trigger a response in the body consistent with an assumption of being poisoned. Modern life has also brought to us another real-world parallel: 

> Imagine you’re on a train and look out the window to see a train leaving the station. As that train begins to move it creates an illusion of movement in your own mind and your brain’s likely conclusion is that the train you are on is actually moving in the opposite direction, that illusion is called “Vection.” Vection occurs when a portion of what you can see moves, and is one of the things that can lead to motion sickness in VR." - [5 ways to reduce motion sickness in VR](http://uploadvr.com/five-ways-to-reduce-motion-sickness-in-vr/) 

Any change of velocity (or rotational velocity, i.e. turning) is an *acceleration*, which imparts a physical force on the body detected primarily via the vestibular system. If such changes occur in the virtual world but are not mirrored in physical vestibular response (e.g. by navigating with a joystick rather than on a treadmill) nausea can very rapidly ensue. 

There are two important categories of motion cue conflicts to consider:
- Virtual motions initiated by the viewer with no physical correlate (**the locomotion problem**)
- Virtual motions not initiated by the viewer (breaking the **HMD-is-the-camera** rule)

## The camera is always head-mounted

It is helpful to **think of the HMD as the camera** into a virtual world that is aligned to the real world. (At [Weird Reality](http://artandcode.com/), I heard several speakers described the HMD as a 'head-mounted camera'). 

> The rendered image must correspond directly with the user's physical movements; do not manipulate the gain of the virtual camera’s movements. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

The golden rule for designers is that we must **never take away control of the camera from the viewer**, not even for a moment. This means no fixed-view cut-scenes or 'cinematics', no full-screen imagery, no lens and framing control, etc. Also no motion blur, depth of field effects etc. (still takes away viewer control).

Which is to say, **everything should be in-world**. Nothing should "stick" to the viewer's headset -- not even messages/menus, head-up displays, etc. User interface elements are uncomfortable if they are stuck to the headset, better if they are transparent overlays that keep the world's orientation, and best if they are actually objects in the world.

> Maintain VR immersion from start to finish—don’t affix an image in front of the user (such as a full-field splash screen that does not respond to head movements), as this can be disorienting... Even in menus, when the game is paused, or during cutscenes, users should be able to look around. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

> One of the big challenges with VR storytelling lies within the constraints on camera movement forced upon us by this tiny detail called simulator sickness. Quick zoom in to focus on a detail – nope, not possible, you can’t zoom in VR. Nice dolly shot moving around the scene – be careful or the viewer might have a look at what he had for breakfast instead of comfortably watching your experience... the safest bet is not having continuous camera movement at all. - [The limbo method](http://uploadvr.com/introducing-limbo-a-vr-camera-movement-technique-by-the-developers-of-colosse/)

### When is camera movement OK?

> Our inner ear detects various changes in velocity, or accelerations, but it doesn’t detect constant velocity. Because of this, developers can have someone moving at a constant speed in a relatively straight line and the simulator sickness effects will be greatly reduced. - [5 ways to reduce motion sickness in VR](http://uploadvr.com/five-ways-to-reduce-motion-sickness-in-vr/)

There *are* plenty of examples of VR projects that also utilize moving cameras, but you can still look around independently on top of this motion. Generally the fixed component of the camera motion is slow, at constant speed, in a straight line in the world, or only in the direction the person is facing. This is the kind of "rails" experience that has been disappointing to many, and still nauseous to some. Senza Peso is an interesting example.

For more complex camera movements an option is to fade out all but the most important elements to minimize visual flow during the movement. This "limbo effect" was suggested by the authors of Colosse in order to allow non-nauseating camera effects -- and it also relies on some (fairly subtle) cues of ground and body orientation, as well as removing most of the elements of the scene to reduce vection (a method they also leveraged for narrative focus):

![colosse](http://uploadvr.com/wp-content/uploads/2015/09/limboBeachSnippet13.gif)

> Notice the subtle points of reference in the scene that are meant to maintain a consistent frame of reference. Somewhat like staring at a single spot on the floor to maintain balance. We used two elements to create this reference frame: a subtle particle effect and a ground plane far below the user. Using short lived particles we were able to create this artificial reference frame without distracting the user. - [Introducing Limbo, a VR camera movement technique by the developers of Colosse](http://uploadvr.com/introducing-limbo-a-vr-camera-movement-technique-by-the-developers-of-colosse/)

In contrast, one of the most disturbing camera motions of all is the oscillating 'head bob' and other 'camera shake' effects often added to games. (The head-bob in particular is right around a 3-5Hz frequency that is particularly nauseous.)

![headbob](https://lh5.googleusercontent.com/fUQXkmhrWdpCi_F9vfbI8U2Ss-zB5O11xn_wNCBbTSJczmjaRefoV26EflYqwgNpgK0hrgC4ZTB372IalQhssSKD98MZ7B8lp04glfqiXpFwICL5MuzlNPBzNaw3MA)

### Collisions

It is also disturbing to be suddenly (unexpectedly) moved in the world because of collisions with objects or other dynamic impacts. However if collisions do not stop camera motion, people will be able to simply walk through walls and poke their heads inside of objects in the world, and float rather than fall, etc. 
- To deal with collisions, some recommend simply fading the image toward black as you get very close to a object's surface, or enter inside of it. This is often enough to naturally guide people away from walls and other surfaces, and also prevents the disturbing vision of a wall made of paper, or the betrayal of the secrets behind it. 
- Similarly, to effect impacts, a dip to black around the movement is an option.

## The locomotion problem

Avoiding motion cue conflicts altogether would limit viewer's exploration of a virtual world to the same physical dimensions of the real room they are in. To explore vaster worlds we must allow people to move virtually but not physically, via **some design compromises that nevertheless minimize triggers of nausea**. [Some say that this locomotion question is the biggest problem for VR.](http://fatedblog.com/2015/08/06/locomotion-simulation-sickness-and-the-fear-of-vr/). 

> "It’s in the interest of all parties to keep faulty reality away from users, and Sony, Valve, and Oculus all have the quality control systems in place in order to do that. Oculus has even devised a new “comfort” rating system, which divides its launch lineup of games into “comfortable,” “moderate,” and “intense” categories." - [Virtual Reality’s Locomotion Problem](http://motherboard.vice.com/read/virtual-realitys-locomotion-problem?trk_source=recommended)

Even being able to turn around to face behind you (rather than looking over your shoulder) is problematic. The classic yaw movement -- a horizontal rotation -- has been described as "VR poison" by John Carmack -- but without it, our worlds will be mostly straight paths... This is really problematic for artists coming from gaming environments -- most people simply can't use mouse or right-stick to change body orientation in the world without becoming sick. 

> Remember that “acceleration” does not just mean speeding up while going forward; it refers to any change in the motion of the user. Slowing down or stopping, turning while moving or standing still, and stepping or getting pushed sideways are all forms of acceleration. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/) 

- Similarly, the kinds of lateral 'strafing' movements that are common to first-person shooter games can be quite disturbing in VR. 
- Moving over uneven ground can create unexpected vertical movements. Either steady the movement, or soften the ground.
- Stairs can be especially unpleasant (both going up and down). Use elevators, or ramps with very shallow inclines.


### Some solutions / compromises

**Just don't do locomotion at all** 

- Create a world that is sufficiently interesting at the scale of a small room
	- E.g. Job Simulator, Fantastic Contraption, I expect you to die, etc.
	- E.g. create a world at a 'tabletop' scale
- Create a world that changes over time around you
	- E.g. Sightline - The Chair
	- E.g. work with scale, zooming into detail or out to macroscopy, rather than change in location

A lot of 2016's sanctioned VR content avoided locomotion.

**Instant accelerations are better than smoothing**

- If you have to change velocities, do it instantaneously rather than gradually. (This differs from the norm in screen-based games, for example). Don't accelerate smoothly: immediately moving and immediately stopping is better (for most people).
	- Same for rotations. Jumping between angles is better than smooth panning (for most people). Cloudhead games calls this "comfort mode": snapping a predictable number of degrees left or right, and holds that this significantly reduces nausea. But for some players this breaks immersion too much, and it can also leave immersants a bit confused as to where they are actually facing.

<iframe width="640" height="360" src="https://www.youtube.com/embed/Gp0eMNSVtZA?rel=0" frameborder="0" allowfullscreen></iframe>

**Instant transitions (AKA teleport)**

Vive's introductory content The Lab uses this method extensively. It is very low in terms of nausea, but relatively immersion breaking. It also depends on developing a method to identify valid locations to teleport to. 

[It has been argued that we can handle teleports in VR in a similar way that we can handle cuts in TV](https://www.engadget.com/2016/10/07/why-teleportation-makes-sense-in-virtual-reality/)

<iframe width="640" height="360" src="https://www.youtube.com/embed/nmR8iqXSspA?rel=0" frameborder="0" allowfullscreen></iframe>

It can also become a game mechanic:

<iframe width="640" height="360" src="https://www.youtube.com/embed/gbp7xX9QPOc?rel=0" frameborder="0" allowfullscreen></iframe>

Unreal's VR template includes teleport support.

**The third person view**

- Many developers have suggested a 3rd person (behind the avatar) viewpoint reduces the nausea. Oculus bundled a 3rd-person platformer ("Lucky's Tale") with the first release.

- A rather more unusual mode of navigation switches into 3rd person while moving, and back to 1st person when stationary.

**Reducing the field of view during motion**

Sim sickness is much less prevalent when the field of view is lesser, however this also reduces immersion & presence. Some suggest reducing FOV only in those moments that could be particularly nauseating. Others have suggested a kind of small FOV preview overlay while moving, that expands out to full screen when movement ends.

<iframe width="640" height="360" src="https://www.youtube.com/embed/lHzCmfuJYa4?rel=0" frameborder="0" allowfullscreen></iframe>

Reducing the field of view may work because it reduces vection.

**Anchoring (Cockpit) methods**

Placing a reference frame around the point of view can help stabilize the senses -- which is why cockpit-based simulations (inside cars, spaceships, robots, or even just a helmet, etc.) can handle much greater accelerations and rotations without inducing sickness. It might be as simple as having a reference that says which way is "body-forward", but it also taps into the reduced field of view as above.

[However it might be possible that the reference frame is semi-transparent, and even that it is not present for much of the time.](https://www.reddit.com/r/oculus/comments/3yihao/i_solved_vr_sickness_maybe/) -- more research is needed. See also the "canvas mode" [here](http://tore-knabe.com/virtual-reality#MovementExperiments)

**Given them a body?**

Many people report it disturbing to look down and see no body, especially for sedentary experiences. This may be related to giving a reference frame that has a *logical* anchor in the world. However, some say that looking down and seeing somebody else's body is equally disturbing, and others have shown that even a reference frame with no ontological sense can help. More research needed!

> A virtual avatar ... can increase immersion and help ground the user in the VR experience, when contrasted to representing the player as a disembodied entity. On the other hand, discrepancies between what the user’s real-world and virtual bodies are doing can lead to unusual sensations (for example, looking down and seeing a walking avatar body while the user is sitting still in a chair). - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

![nose](http://www.wired.com/wp-content/uploads/2015/04/vrnosetuscany.gif)

[Research at Purdue suggests that overlaying the peripheral image of a nose helps reduce simulator sickness by 13.5%](http://www.wired.com/2015/04/reduce-vr-sickness-just-add-virtual-nose/)

Again, a non-realistic body might be better than a pseudo-realistic body. Perhaps it need not even be human (or humanoid). This removes issues of mismatch size, gender, skin color, age, etc that could create cognitive dissonance. Alternatively, give immersants control over their avatar appearance.

> When it comes to modeling player avatars in VR, abstract trumps the real. Malaika says Valve has found that players tend to feel less immersed in games that try to model hands realistically, and more immersed in games with cartoony hands. - [Valve advice for VR](http://www.gamasutra.com/view/news/250362/Valve_shares_advice_on_designing_great_VR_game_interactions.php)

**Redirected walking**

The notion here is that while walking in the real space, the virtual world is slightly rotated (below perceptual levels). Although we feel we are walking in a straight line in the virtual space, we are in fact walking in circles in the real world. Problem: still requires much larger spaces than most rooms.

<iframe width="640" height="360" src="https://www.youtube.com/embed/KVQBRkAq6OY?rel=0" frameborder="0" allowfullscreen></iframe>

**Displacement of motor functions**

Disturbance is reduced if some body actions accompany a movement. Some games use a 'paddling with the hands' behaviour to trigger walking in the virtual space, or swimming etc.:

<iframe width="640" height="360" src="https://www.youtube.com/embed/MjwNItck_Vg?rel=0" frameborder="0" allowfullscreen></iframe>

Other experiences use the direction of the hands or fingers to indicate direction of motion, which appears to reduce nausea.

---

Overview of locomotion methods:

<iframe width="640" height="360" src="https://www.youtube.com/embed/p0YxzgQG2-E?rel=0" frameborder="0" allowfullscreen></iframe>

Many of these solutions are utilized in EagleFlightVR, which has had [very strong reviews commenting about the lack of nausea](http://www.roadtovr.com/eagle-flight-review-vr-psvr-htc-vive-oculus-rift/).

## Other forms of disturbance

> Avoid visuals that upset the user’s sense of stability in their environment. Rotating or moving the horizon line or other large components of the user’s environment in conflict with the user’s real-world self-motion (or lack thereof) can be discomforting.  - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/) 

***Spatial***

- The head-height above ground should be consistent with the immersant's own height, whether sitting or standing. 
- Real-world movement is more comfortable. Humans walk at ~1.4 meters per second (this is much slower than 'walking' in most video games).
- Objects drawn from the real-world should have consistent and usually accurate scale.
- On the other hand, miniature worlds work well -- about table-sized + 3rd person view
- Avoid confined spaces.
- No image-based effects such as particles, as they can look flat and break stereoscopy.

**Lighting & texturing**

- Avoid very bright lights, flickering lights, and areas of high contrast -- especially in peripheral vision.
- Avoid flicking and flashing, especially in peripheral vision.

> Refrain from using any high-contrast flashing or alternating colors that change with a frequency in the 1-30 hz range. This can trigger seizures in individuals with photosensitive epilepsy. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

- Avoid untextured surfaces, as the lack of detail provides less distance cue and weakens the perceptual illusion, making other conflicting signals more problematic.
- On the other hand, avoid high-contrast textures, which are more likely to cause flickering due to aliasing noise.
- Avoid textures that are obviously repetitive, like tiling patterns. Any high-spatial frequency repetition can give discomforting perceptual signals. They can also trigger photosensitive epilepsy.
- For the same reason, avoid very thin objects, and avoid very regular or straight objects -- irregular/random/organic shapes are more comfortable.

> The images presented to each eye should differ only in terms of viewpoint; post-processing effects (e.g., light distortion, bloom) must be applied to both eyes consistently as well as rendered in z-depth correctly to create a properly fused image. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

**Uncanny content**

The closer we get to experiences we have every day (e.g. walking), the higher the risk of creating perceptual cues that do not match reality. This may be related to the *uncanny valley*. More abstract worlds are less likely to cause such conflicts; non-photorealistic environments in many ways have advantages.

Characters not looking at you / not responding to you properly can be particularly disturbing.

**Muscle fatigue**

> People will typically move their heads/bodies if they have to shift their gaze and hold it on a point farther than 15-20° of visual angle away from where they are currently looking. Avoid forcing the user to make such large shifts to prevent muscle fatigue and discomfort. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/) 

**Experiment**

Try other ideas out. Try them out on lots of people. Just because it feels OK for you doesn't mean it will for others -- and this is more true the more time you spend in VR.

Give people the option to control the intensity of effects that can induce nausea. Not everyone wants to be limited, and some players are willing to forego comfort (or simply are less susceptible to the nausea); recent examples of succesful games that 'break the rules' in this way include Onward and Climbey.

**Learn how to avoid it**

Hardly a solution, but there are a few techniques that people susceptible to sim sickness can make use of: 

- Take time to calibrate the headset to your eyes -- your inter-pupillary distance, your field of view, the height of your eyes above ground (when standing), etc.
- When turning, keep your eyes locked on to a specific point. Also, focus on the horizon in moments that you feel unsteady.
- Close your eyes for any nausea-inducing moments.
- Sitting is usually better than standing, so long as the experience can place you at an appropriate height in the virtual world. Some prefer lying on their backs.
- Remember to take breaks.
- Don't expose yourself to nauseating experiences too often -- it can make you more sensitive, and create negative associations that are hard to shake (e.g. with the smell of the headset).
- On the other hand, over time the effect can reduce. Early pseudo-3D game such as Doom and Duke Nukem, at very low resolutions on screens, were still able to evoke motion sickness in players -- this seems remarkable and difficult to believe today -- but it suggests that perhaps VR experiences will be less nauseating the more we are used to them.

> When a land-lubber steps onto a boat for the first time, often the rocking and variations in vestibular motion from the ocean causes a feeling of ‘sea-sickness’ that is not too different from simulator sickness. However, for most people, after a few hours or days that feeling typically dissipates as they get what is commonly referred to as their ‘sea legs.’ It is something that experienced seamen are very well adapted to. It is also something, I would argue, that replicates itself in VR. - [5 ways to reduce motion sickness in VR](http://uploadvr.com/five-ways-to-reduce-motion-sickness-in-vr/) 

- Do it in a well-ventilated space, at a comfortable temperature.
- Eat ginger (a long known remedy for motion sickness). Some also recommend a little alcohol, while others say that this makes it worse. Do not try VR when sick, hungover, etc. 
> A popular household remedy in Asia is rub eucalypti leaves together and inhale the scent produced from them. - [Sim Sickness guide on Oculus forums](https://forums.oculus.com/viewtopic.php?t=170)

**See also:**

	
(Elements borrowed from [Kevin Burke's guide](https://kev.inburke.com/slides/virtual-reality/), [Simulator Sickness](http://www.gamasutra.com/blogs/BenLewisEvans/20140404/214732/Simulation_Sickness_and_VR__What_is_it_and_what_can_developers_and_players_do_to_reduce_it.php))

[Tips from a team who ported a base-jumping game to VR](https://youtu.be/DqZZKi4UHuo?list=PLckFgM6dUP2hc4iy-IdKFtqR9TeZWMPjm&t=228)

See the [Simulator Sickness questionnaire](https://www.twentymilliseconds.com/html/ssq-scoring.html)

---






