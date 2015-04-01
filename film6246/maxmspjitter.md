# Max/MSP/Jitter

> A full kit of creative tools for sound, graphics, music and interactivity in a visual environment.

[30 day demo is free](https://cycling74.com/downloads/). For [students](https://cycling74.com/shop/#educational), $250 or $10/month.

For Windows, 32-bit version is recommended. 

Max is one of the most widely-used platforms for computer music and interactive/digital media art. It originated in work at IRCAM, a computer music laboratory in Paris, over 20 years ago.

MSP added real-time audio. Jitter added 2D and 3D graphics. Gen added run-time code generation.

Max document is a "patcher". You create objects, which represent processes and UI, and connect them with "cables". This creates paths of data flowing between processes. It is called visual data-flow programming. Jitter manages 3D via the industry-standard OpenGL library, but presents it in terms of max objects.  

## Unity 3D or Max/MSP/Jitter?

In general, what Unity gives you automatically, in Max you often have to build yourself. However, by doing so it allows you to change things and make them your own at a much finer level of control and experimentation than in Unity. In particular, Max will let you do things mathematically and generatively that are much more difficult in Unity.

Both have excellent tutorials and documentation, accessible from within the editor. Both tend to be domain-oriented.

In Unity you can build basic scenes graphically, but for most interactions sooner or later you have to write code. In Max you are writing code from the start, but doing so visually (there are also text options but these are less often needed). 

In Unity you are writing a project with scenes made up of assets. In Max you are writing a program. Unity gives you game-oriented rendering and spatialized audio for free, but no musical or complex sound synthesis capabilities and no algorithmic data processing. Max gives you an incredible range of high and low level algorithmic processing and audio synthesis capabilities, but you have to build rendering and audio spatialization yourself (or find some prior work to start from... I have quite a bit we could leverage).

Unity has an Asset Store that is incredibly full of models, textures and other plugins created by 3rd parties, mostly designed for games, but most of the good things are not free. Max has [a huge library of community-provided "externals"](http://www.maxobjects.com), most of which are free, but are usually oriented toward algorithmic processes and connecting with other hardware, software, protocols etc. 

> E.g. I am authoring an extension to support the Oculus Rift, which can be downloaded [here](https://github.com/grrrwaaa/max_oculus). I also have extensions written for the Kinect, for AR marker tracking, for spatialized audio, etc.

Unity Free is free, Unity Pro is $1500. Max is $250 or $10/month for students. Unity apps will export for mobile and web as well as major desktop platforms. Max apps only export to Windows and Mac. Exported Unity apps have some license limitations. Exported Max apps have no license limitations.

## Basic maxing

Main document is called a patcher, or patch. Patchers can be in: 
- edit mode, for creating objects and drawing the wires (aka cables) between them. Use the padlock icon or Cmd-E to toggle edit mode.
- locked mode, in which UI objects like buttons, toggles, number boxes, sliders etc. can be interacted with.
- presentation mode, in which only specific objects are visible, hiding the actual patching from the user.

Objects have inlets and outlets. Wires connect outlets of one object to the inlets of another. Some outlets or inlets have specific types, which must match. In edit mode, mouse over an inlet or outlet for the tooltip to tell you what it does.

In **edit mode**, the most commonly used keys for creating new objects are:
- **n**: generic object
- **m**: message box object
- **b**: button object (outputs a "bang")
- **t**: toggle object (outputs 0 or 1 alternately)
- **f**: number box object (decimal numbers)

## In-class screen recordings

Introduction to Max/MSP/Jitter:

<iframe width="640" height="480" src="https://www.youtube.com/embed/Fr17qFv5Qks?rel=0" frameborder="0" allowfullscreen></iframe>

A first 3D scene:

<iframe width="640" height="480" src="https://www.youtube.com/embed/JCt4PwtbWmU?rel=0" frameborder="0" allowfullscreen></iframe>

Finding & importing 3D models:

<iframe width="640" height="480" src="https://www.youtube.com/embed/1g-RweUiouQ?rel=0" frameborder="0" allowfullscreen></iframe>

Making video screens out of points:

<iframe width="640" height="480" src="https://www.youtube.com/embed/RyZaTJR0sQw?rel=0" frameborder="0" allowfullscreen></iframe>

Dropping in audio tracks:

<iframe width="640" height="480" src="https://www.youtube.com/embed/3NDOdCoring?rel=0" frameborder="0" allowfullscreen></iframe>

The files created in these screen recordings can be [downloaded from here](https://github.com/grrrwaaa/courses/tree/master/film6246/max).

## Audio analysis

[zsa.descriptors](http://www.e--j.com/index.php/what-is-zsa-descriptors/) - collection of audio analysis objects. Download and place into Documents/Max 7.

- ```zsa.centroid~```: approximates center frequency of the input sound. ```zsa.fund```: estimates the fundamental pitch of a sound -- good for clean melodic input only. ```zsa.rolloff~``` returns the frequency above which energy tends to reduce. It is useful to characterize noisy environments, for example.

- ```zsa.kurtosis~``` returns a measure of the flatness of a spectrum around its centroid. That is -- it differentiates between sharply focused sounds and sounds with more diffuse focus. Similarly, ```zsa.spread~``` approximates the sharpness of energy distribution around the center. 

- ```zsa.skewness~``` returns a measure of the asymmetry of a spectrum around its centroid -- i.e. whether more energy is found above or below the center. ```zsa.slope~``` measures the overall balance between low and high frequency energy.

- ```zsa.bark~```: outputs loudness of 25 perceptually-oriented frequency bands. Think of it like a graphic equalizer display. ```zsa.mel~``` is very similar, and also perceptually driven. (In combination with ```zsa.dist```, bark and mel can choose between several characteristic EQ shapes you are interested in). 

- ```zsa.flux~```: reports changes of energy; useful to apply to clean sound sources & detect transitions, for example.

















