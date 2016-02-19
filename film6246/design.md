title: Design
importance: 5

----

# Design notes for virtual worlds

Here is a collection of observations, insights, and recommendations being gathered by VR researchers, professionals, artists, and developers, some of which are well known, others relatively recently discovered. This remains a moving target, so there may be many valid exceptions, and many important components still missing. Nevertheless, these observations are incredibly important.

“Virtual reality’s biggest enemy is bad virtual reality”.  – Palmer Luckey

“The fear is if a really bad V.R. product comes out, it could send the industry back to the ’90s,” – John Carmack

---

## Causes and remedies of simulator sickness

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

In fact simulator sickness has been known about since the earliest flight simulators of the 1950's, but is still not fully understood. It is likely to be due to sensory conflict ("Cue Conflict Theory") -- that what some parts of the visual system are reporting does not match what other sensory components (such as proprioceptive systems) are reporting. But it also may be a complex of several factors, and affects different people in different ways.

Some people are far more or less susceptible than others. It generally affects younger people less, and tends to reduce with increased exposure (getting your "VR legs"). People with a history of MS, alcohol/drug abuse, etc. also tend to be more susceptible.

> Around 5% of all individuals will never acclimate regardless how much they try to build a resistance to it meaning there is a confirmed minority of individuals who will never be able to us Virtual Reality as a mainstream product over their lifetime. - [Sim Sickness guide on Oculus forums](https://forums.oculus.com/viewtopic.php?t=170)

It remains one of the greatest risks to virtual reality's success. Here are some things to avoid and ways to reduce the risk:

**Maintain low latency, high frame-rate, and tracking**

- Frame rates for the DK2 should be 75Hz, for the CV1 90Hz. This is quite demanding, which is why Oculus requires high recommended specifications for computer chips, memory, and graphics cards (GPUs). 
	- "Judder" happens when the frame rate is not consistent, and a few frames are dropped -- the image then stalls briefly, causing a nauseating mechanical movement of the world.
- Latency is how long it takes for a message to transmit. *Motion to photon* latency measures how long it takes for a change in head rotation to be reflected in a change in the image perceived. It should be *consistently* under 20 milliseconds to avoid nausea. The oculus driver does some tricks to help keep this down, but like frame-rate, it also depends crucially on the content and quality of the software. 
	- The need for low-latency and high-framerate is one of the reasons why many VR works opt for simpler graphics than we may be used to for videogames; but the effect in-world can be far more powerful. Improving geometry may be more worthwhile than special effects. In particular, some effects popular in games are rendered across several frames -- this is not viable for VR.
	
- A related issue is image persistence: a low-persistence image has a longer black interval between presenting frames, which reduces the smear/blur/ghosting when moving your head. This is mainly a display screen technology issue. 

![Persistence](https://lh5.googleusercontent.com/bS3bZRKphnYPK1IAP7DwYN6e3Y_7y6-8RnHVutmm15S_wjzkf4M1vDR0OczN0kHx6PVd-10jd4vmhDFNhY0I18_31ovaKI2s6X_noyC9jk0AutfhEM4BIvnNyFjS6Q)

- Finally, maintaining good head tracking is a necessity, or else the world will appear to jump unnaturally. Although this is also mostly a hardware/software issue, it does require some thought in how an experience is presented (e.g. as an installation).

**Avoid accelerations (and decelerations)**

> Our inner ear detects various changes in velocity, or accelerations, but it doesn’t detect constant velocity. Because of this, developers can have someone moving at a constant speed in a relatively straight line and the simulator sickness effects will be greatly reduced. - [5 ways to reduce motion sickness in VR](http://uploadvr.com/five-ways-to-reduce-motion-sickness-in-vr/) 

Any change of velocity (or rotational velocity) is an *acceleration*, which imparts a physical force on the body detected primarily via the vestibular system. If such changes occur in the virtual world but are not mirrored in physical vestibular response (e.g. by navigating with a joystick rather than on a treadmill) nausea can very rapidly ensue. 

> Remember that “acceleration” does not just mean speeding up while going forward; it refers to any change in the motion of the user. Slowing down or stopping, turning while moving or standing still, and stepping or getting pushed sideways are all forms of acceleration. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/) 

Since most of us don't have access to a treadmill, or the spherical equivalent, this makes navigation in virtual worlds a big problem. Even being able to turn around to face behind you (rather than looking over your shoulder) is problematic. The classic yaw movement -- a horizontal rotation -- has been described as "VR poison" by John Carmack -- but without it, our worlds will be mostly straight paths... 

- Don't accelerate smoothly: immediately moving and immediately stopping is better (for most people).
- Same for rotations. Jumping between angles is better than smooth panning (for most people). Cloudhead games calls this "comfort mode": snapping a predictable number of degrees left or right, and holds that this significantly reduces nausea. But for some players this breaks immersion too much, and it can also leave immersants a bit confused as to where they are actually facing.

<iframe width="640" height="360" src="https://www.youtube.com/embed/Gp0eMNSVtZA?rel=0" frameborder="0" allowfullscreen></iframe>

This is really problematic for game-like experiences -- we can't use mouse or right-stick to change body orientation in the world without getting dizzy. The future of first-person shooter VR does not look good. [Some say locomotion is the biggest problem for VR.](http://fatedblog.com/2015/08/06/locomotion-simulation-sickness-and-the-fear-of-vr/) Many developers are choosing 3rd person (behind the avatar) viewpoints to sidestep the issue.

See also the potentially immersion-breaking "canvas mode" [here](http://tore-knabe.com/virtual-reality#MovementExperiments)

- Move the camera in the direction it is facing, or close to it. Moving the camera perpendicular to the direction it's facing seems to cause problems for some people. This is important to consider if the orientation of the body (or vehicle) is not locked to the orientation of the immersant's head. Rapid tilts and rolls can be very upsetting.

- Oscillating movement is the worst -- especially in oscillatory periods of around 3-5 seconds.
- Don't create a fake 'head bob' or 'camera shake' camera movement -- it works great on a screen but awful in VR. Even collisions with world objects shouldn't affect the viewpoint if possible.

![headbob](https://lh5.googleusercontent.com/fUQXkmhrWdpCi_F9vfbI8U2Ss-zB5O11xn_wNCBbTSJczmjaRefoV26EflYqwgNpgK0hrgC4ZTB372IalQhssSKD98MZ7B8lp04glfqiXpFwICL5MuzlNPBzNaw3MA)

- Therefore, the most comfortable experience is stationary, and after that, moving at constant velocity.

> One of the big challenges with VR storytelling lies within the constraints on camera movement forced upon us by this tiny detail called simulator sickness. Quick zoom in to focus on a detail – nope, not possible, you can’t zoom in VR. Nice dolly shot moving around the scene – be careful or the viewer might have a look at what he had for breakfast instead of comfortably watching your experience... the safest bet is not having continuous camera movement at all. - [The limbo method](http://uploadvr.com/introducing-limbo-a-vr-camera-movement-technique-by-the-developers-of-colosse/)

**Reduce vection**

Vection is the illusion of movement based on solely visual cues. The biggest trigger of vection is optical flow: a lot of things within your visual field moving in the same direction. 

> Imagine you’re on a train and look out the window to see a train leaving the station. As that train begins to move it creates an illusion of movement in your own mind and your brain’s likely conclusion is that the train you are on is actually moving in the opposite direction, that illusion is called “Vection.” Vection occurs when a portion of what you can see moves, and is one of the things that can lead to motion sickness in VR. You can reduce vection with a number of different techniques, such as reducing the complexity of the textures and reducing the speed of player motion. - [5 ways to reduce motion sickness in VR](http://uploadvr.com/five-ways-to-reduce-motion-sickness-in-vr/) 

Fading out all but the most important elements to minimize visual flow during camera movement is one way to avoid vection, as explored by the creators of [Colosse](http://uploadvr.com/introducing-limbo-a-vr-camera-movement-technique-by-the-developers-of-colosse/). 

**Don't move like in video games**

- Movements should be much slower than we are accustomed to in video games. 
- Sideways movement (strafing / tracking) can be particularly nauseous. 
- Moving backwards is much worse than moving forwards.
- Moving over uneven ground can create unexpected vertical movements. Either steady the movement, or soften the ground.
- For some reason, stairs are especially unpleasant (both going up and down). Use elevators, or ramps with very shallow inclines.

> Avoid visuals that upset the user’s sense of stability in their environment. Rotating or moving the horizon line or other large components of the user’s environment in conflict with the user’s real-world self-motion (or lack thereof) can be discomforting.  - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/) 

Even acceleration-free, forward-only movement can still cause some people trouble, so many experiences avoid movement altogether, or use alternative methods such as "teleporting". However this can also be discomforting... be sure to give plenty of good cues, and maintain orientation before and after.

- Don't create "zoom" effects like gun scopes -- it doesn't work in 1st person.

> People will typically move their heads/bodies if they have to shift their gaze and hold it on a point farther than 15-20° of visual angle away from where they are currently looking. Avoid forcing the user to make such large shifts to prevent muscle fatigue and discomfort. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/) 

**Scale**

- The head-height above ground should be consistent with the immersant's own height, whether sitting or standing. 
- Real-world movement is more comfortable. Humans walk at ~1.4 meters per second (this is much slower than 'walking' in most video games).

- Objects drawn from the real-world should have consistent and usually accurate scale.
- On the other hand, miniature worlds work well -- about table-sized + 3rd person view

> The rendered image must correspond directly with the user's physical movements; do not manipulate the gain of the virtual camera’s movements. A single global scale on the entire head model is fine (e.g. to convert feet to meters, or to shrink or grow the player), but do not scale head motion independent of interpupillary distance (IPD). - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

- Avoid confined spaces.

**Choose an experience that is not familiar**

The closer we get to experiences we have every day (e.g. walking), the higher the risk of creating perceptual cues that do not match reality. This may be related to the *uncanny valley*. More abstract worlds are less likely to cause such conflicts.

**Everything should be in-world**

This means nothing should "stick" to the viewer's headset -- not even messages/menus, head-up displays, etc. User interface elements are uncomfortable if they are stuck to the headset, better if they are transparent overlays that keep the world's orientation, and best if they are actually objects in the world.

> Maintain VR immersion from start to finish—don’t affix an image in front of the user (such as a full-field splash screen that does not respond to head movements), as this can be disorienting... Even in menus, when the game is paused, or during cutscenes, users should be able to look around. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

**Give a visual reference frame ("anchoring in the world")**

Placing a reference frame around the point of view can help stabilize the senses -- which is why cockpit-based simulations (inside cars, spaceships, robots, or even just a helmet, etc.) can handle much greater accelerations and rotations without inducing sickness. It might be as simple as having a reference that says which way is "body-forward" (see the "nose" below).

[However it might be possible that the reference frame is semi-transparent, and even that it is not present for much of the time.](https://www.reddit.com/r/oculus/comments/3yihao/i_solved_vr_sickness_maybe/) -- more research is needed.

Alternatively, rather than a close-proximity reference, a horizon reference (a "skybox") that always maintains orientation with the real world (i.e. is not affected by in-world navigation) can help stabilize the experience. Obviously this won't work for many worlds.

The "limbo effect" was suggested by the authors of Colosse in order to allow non-nauseating camera effects -- and it also relies on some (fairly subtle) cues of ground and body orientation, as well as removing most of the elements of the scene to reduce vection (a method they also leveraged for narrative focus):

![colosse](http://uploadvr.com/wp-content/uploads/2015/09/limboBeachSnippet13.gif)

> Notice the subtle points of reference in the scene that are meant to maintain a consistent frame of reference. Somewhat like staring at a single spot on the floor to maintain balance. We used two elements to create this reference frame: a subtle particle effect and a ground plane far below the user. Using short lived particles we were able to create this artificial reference frame without distracting the user. - [Introducing Limbo, a VR camera movement technique by the developers of Colosse](http://uploadvr.com/introducing-limbo-a-vr-camera-movement-technique-by-the-developers-of-colosse/)

**Given them a body?**

Many people report it disturbing to look down and see no body, especially for sedentary experiences. This may be related to giving a reference frame that has a *logical* anchor in the world. However, some say that looking down and seeing somebody else's body is equally disturbing, and others have shown that even a reference frame with no ontological sense can help. More research needed!

> A virtual avatar ... can increase immersion and help ground the user in the VR experience, when contrasted to representing the player as a disembodied entity. On the other hand, discrepancies between what the user’s real-world and virtual bodies are doing can lead to unusual sensations (for example, looking down and seeing a walking avatar body while the user is sitting still in a chair). - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

![nose](http://www.wired.com/wp-content/uploads/2015/04/vrnosetuscany.gif)

[Research at Purdue suggests that overlaying the peripheral image of a nose helps reduce simulator sickness by 13.5%](http://www.wired.com/2015/04/reduce-vr-sickness-just-add-virtual-nose/)

Again, a non-realistic body might be better than a pseudo-realistic body. Perhaps it need not even be human (or humanoid). This removes issues of mismatch size, gender, skin color, age, etc that could create cognitive dissonance. Alternatively, give immersants control over their avatar appearance.

> When it comes to modeling player avatars in VR, abstract trumps the real. Malaika says Valve has found that players tend to feel less immersed in games that try to model hands realistically, and more immersed in games with cartoony hands. - [Valve advice for VR](http://www.gamasutra.com/view/news/250362/Valve_shares_advice_on_designing_great_VR_game_interactions.php)

**Limit field of view**

Sim sickness is much less prevalent when the field of view is lesser, however this also reduces immersion & presence. Some suggest reducing FOV only in those moments that could be particularly nauseating -- though changes of FOV may also be triggers. 

Limiting FOV may be another reason why cockpit views are less nauseating.

**Lighting, texturing, effects**

- Avoid very bright lights, flickering lights, and areas of high contrast -- especially in peripheral vision.
- Avoid flicking and flashing, especially in peripheral vision.

> Refrain from using any high-contrast flashing or alternating colors that change with a frequency in the 1-30 hz range. This can trigger seizures in individuals with photosensitive epilepsy. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

- Avoid untextured surfaces, as the lack of detail provides less distance cue and weakens the perceptual illusion, making other conflicting signals more problematic.
- On the other hand, avoid high-contrast textures, which are more likely to cause flickering due to aliasing noise.
- Avoid textures that are obviously repetitive, like tiling patterns. Any high-spatial frequency repetition can give discomforting perceptual signals. They can also trigger photosensitive epilepsy.
- For the same reason, avoid very thin objects, and avoid very regular or straight objects -- irregular/random/organic shapes are more comfortable.

- Do not use motion blur or depth of field post-processing effects
- No post-production effects that are computed over multiple frames, as these would add to latency.

> The images presented to each eye should differ only in terms of viewpoint; post-processing effects (e.g., light distortion, bloom) must be applied to both eyes consistently as well as rendered in z-depth correctly to create a properly fused image. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

**Experiment**

Try other ideas out. Try them out on lots of people. Just because it feels OK for you doesn't mean it will for others -- and this is more true the more time you spend in VR.

Give people the option to control the intensity of effects that can induce nausea.

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

## From screen to VR

> VR is an immersive medium. It creates the sensation of being entirely transported into a virtual (or real, but digitally reproduced) three-dimensional world, and it can provide a far more visceral experience than screen-based media. Enabling the mind’s continual suspension of disbelief requires particular attention to detail...  - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

- With positional tracking, users can now move their viewpoint to look places you might have expect them to, such as under objects, over ledges, and around corners, and more worryingly, poke their head through walls and inside objects -- though most immersants tend to avoid this if they can.

- That said, keep most content at a comfortable viewing angle. It is uncomfortable to look up or down for very long, or to twist sideways frequently or for sustained time. 

> Provide the user with warnings as they approach (but well before they reach) the edges of the position camera’s tracking volume as well as feedback for how they can re-position themselves to avoid losing tracking. We recommend you do not leave the virtual environment displayed on the Rift screen if the user leaves the camera’s tracking volume, where positional tracking is disabled. It is far less discomforting to have the scene fade to black or otherwise attenuate the image (such as dropping brightness and/or contrast) before tracking is lost. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

- 3D depth perception is extremely powerful at short range, and effective within a range of a few meters. Beyond 10 meters, stereopsis ceases to be the most important depth cue, and parallax (i.e. moving via position tracking), texture, size, lighting etc. take precedence. It therefore makes sense to place significant content and interaction in this range. For this reason, user interface overlays are usually positioned 1-3 meters away.

> The optics of the DK2 Rift make it most comfortable to view objects that fall within a range of 0.75 to 3.5 meters from the user’s eyes... objects at which users will look for extended periods of time (such as menus and avatars) should fall in that range. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

- Moreover, [beyond around 60m](https://forums.oculus.com/viewtopic.php?f=33&t=4155), for the DK2 there is virtually no distinguishable stereopsis effect at all, and it can be effectively rendered in mono (may be more efficient).

- At the other end, in reality we cannot focus on objects closer than ~5cm, and we can't put our head through walls. Since disabling head-tracking is not a good idea (see above), I recommend instead fading out (either the object, or fading to black) as distances close.

> Converging the eyes on objects closer than the comfortable distance range above can cause the lenses of the eyes to misfocus, making clearly rendered objects appear blurry as well as lead to eyestrain. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

- Beware of particle-based effects, which often use flat 'billboard' textures that are oriented to the viewer. While these are very effective on flat screens, in immersive 3D their flatness can become painfully apparent and break immersion.

- Spatializing audio is much more important -- presenting audio in mono, or worse, in a single speaker, breaks immersion. Headphone audio should also use head orientation, and located sounds should get significantly louder when you lean toward them closely. 

- Shocking/scary etc. content is much more powerful in VR, in a way that past media could not. For example, too much action of flying bullets, explosions, moving vehicles etc. around the user can be distressing, where it would be quite acceptable in a screen-based film/game. For good reason a lot of early VR experiences are in the horror genre -- but that isn't the long-term picture.

> When we started tinkering with the DK1 back in the beginning of 2014, the VR scene was pretty much two things: first-person view horror games and rollercoasters. A lot of people saw the future of VR entertainment as that kind of experiences. - [Locomotion and the fear of VR](http://fatedblog.com/2015/08/06/locomotion-simulation-sickness-and-the-fear-of-vr/)



---

## Interaction

### Navigation

(See also discussion above in *simulator sickness*)

Walking around a world is really counter intuitive, as you have to think about two spaces simultaneously. Since we can change viewpoint by moving our heads, typical gaming conventions (mouse / right stick to look around) map two entirely different physiological actions to the same perceptual result, confusing the body. If you do have movement, does looking in a direction mean you move in that direction, or are they independent? And if look-orientation == move-orientation, does this stop when you are not moving ("tank mode")?

The immersant is free to look in any direction they choose -- you need to make sure all directions are valid, potentially valuable, and that nothing essential will be missed because 'they were looking the wrong way'. 

### Physical devices

Devices can't been seen while wearing a headset. The keyboard in particular is almost impossible to use. Use head-movement for control as much as possible, and hand-held devices otherwise, and place more interaction via in-world manipulation.

> “In VR, you don’t have a keyboard full of hotkeys,” says Malaika. “The buttons on a controller are much more limited, so you have to think about how to provide the same number of choices…and manage the number of choices a user has.”   - [Valve advice for VR](http://www.gamasutra.com/view/news/250362/Valve_shares_advice_on_designing_great_VR_game_interactions.php)

However, don't make interaction laborious (even if it really would be):

> For example, you can require players to reach out, grasp a door handle, and turn it a full 90 degrees to open a door. “Something like that, although novel the first time, can quickly become fatiguing.”   - [Valve advice for VR](http://www.gamasutra.com/view/news/250362/Valve_shares_advice_on_designing_great_VR_game_interactions.php)

Even with tracked hand-held devices, like those provided with VIVE, or the Oculus Touch, or tracking via Leap Motion or the Kinect, there is still no haptic feedback -- no sense of touch. And for some reason, gloves are not in fashion for VR this time around (as they were in the 90's).

For Leap Motion in particular, [here are some accumulated best practices.](https://developer.leapmotion.com/assets/Leap%20Motion%20VR%20Best%20Practices%20Guidelines.pdf)

**See also:**

- [Valve advice in interaction in VR](http://www.gamasutra.com/view/news/250362/Valve_shares_advice_on_designing_great_VR_game_interactions.php)

### Virtual user interfaces

UI should be located in the world -- overlays & head-up-displays (HUDs) locked to the screen should be avoided. They could be:

- on walls ![walls](https://twentymilliseconds.com/screenshots/ui-walls-example.png)
- on objects, on screens in world ![screens](https://twentymilliseconds.com/screenshots/vr_typing_hud.png)
- or cockpit, 
- or floating over its subject ![coins](https://twentymilliseconds.com/screenshots/lucky/coins-ui.gif)

Pop-up alerts should also be in-world, but appear in the center of the current view.

> Draw any crosshair, reticle, or cursor at the same depth as the object it is targeting; otherwise, it can appear as a doubled image when it is not at the plane of depth on which the eyes are converged.
> Don’t require the user to swivel their eyes in their sockets to see the UI. Ideally, your UI should fit inside the middle 1/3rd of the user’s viewing area; otherwise, they should be able to examine it with head movements. - [Best practices, Oculus](https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/)

Text should use thick and larger fonts, and not require head movement to read.

Overly realistic environments can confuse immersants -- who may begin to expect that *everything* in the environment can be interacted with, and be disappointed when it isn't. 
