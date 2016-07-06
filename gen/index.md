# gen~

...takes its name from its underlying implementation: code *gen*eration. 

Short version: **You can thus think of editing a gen~ patcher as rewriting the internals of an MSP object, while it is running.** 

Longer version: In a Max patch, each object represents an instance of a library that was implemented (as C code compiled to binary form) before Max was even launched; and the flow of data between objects in a patcher is managed by Max's runtime and scheduler. In a gen~ patch however, the objects of a patcher are not implemented or instantiated as such; instead the patcher as a whole is compiled at once, as if it were a single object, into efficient native binary code. This happens when the patcher is loaded, and at every edit. In practice, this leads to a number of really nice benefits.

[Gen presentation slides](Gen.pdf)

## Why use gen~

- gen~ patchers can be more efficient than MSP. 
	- MSP objects operate over blocks of samples, rather than single samples, to reduce the overhead of interpreting the flow between objects in a patcher at samplerate. These blocks have to be stored in slow memory and passed between objects. In gen~, since the entire patcher is compiled at once, so there is no need to use blocks. The whole patcher operates per-sample, in fast memory. 
	- Since the entire patcher is compiled at once, many optimizations can be applied to simplify or make the generated code more performant.
	- Moreover, objects can be specialized according to the patcher context, and thus flexibilities that are necessary in MSP can be bypassed to generate leaner code.
	- Comparative benefits increase as gen~ patchers get larger. 

- You can write things in gen~ that you couldn't write in MSP.
	- Since the patcher operates per sample, rather than per block, it is much easier to implement algorithms that require sample-accurate timing, including microsonic techniques such as granular and waveset synthesis.
	- More importantly, this also includes audio feedback paths shorter than the block size, necessary for many physical modeling synthesis algorithms, and down to a single sample, necessary for nearly all audio filters. 
	- gen~ patchers also support an embedded language (GenExpr) that supports control flow previously not available to MSP, including conditionals (if), loops (for, while), and functions -- these also operate at the single-sample scale.

- Things that previously required authoring dedicated externals can now be written as patchers. 
	- Writing externals is difficult, requiring C programming skills, and probably also experience writing audio signal-processing algorithms. It also means compiling the externals separately for OSX and Windows (neither are straightforward), and from time to time re-compiling them as operating systems are replaced. In contrast, a gen~ patcher is just another patcher and it works on both platforms.
	- Writing externals is laboriously slow -- you have to manually recompile and reload after each edit, and errors appear in the compiler rather than in Max. With gen~ patching, compilation is almost instantaneous as you work, with errors reported directly in the patcher.
- Externals are "black boxes" that cannot be easily edited by other users, unless you a) share the source code and b) they also learn how to write externals; whereas a gen~ patcher can always be "cracked open" to see how it works, maybe make modifications, improvements or extensions. 
	- Max ships with a diverse collection of example gen~ patchers, and many more examples can be found in the community, particularly the projects and forums of [https://cycling74.com/](https://cycling74.com/).
- The algorithms you write in gen~ are not stuck in that language. Gen patchers can be immediately exported as C++ code to embed within other applications or plugins. This does require programming expertise, but users have implemented VST and AudioUnit plugins and iOS applications in this way.

- Used by [Robert Henke](http://www.roberthenke.com/concerts/lumiere.html), Autechre, Jonny Greenwood, Leafcutter John, ...

## Gen patching

Gen patching is mostly like MSP patching, but without the ~ character, since all objects in a gen~ patcher are implicitly audio signal processing objects.

Currently in gen~ there are no Max-like messages, which means no hot/cold inlets, no right-to-left ordering, etc (just like MSP). It also means there is effectively only one type: the audio sample signal (a 64-bit float) -- no bangs, no lists, etc (just like MSP). More importantly: objects are not triggered by incoming messages; they are *always running* (just like MSP). If an inlet has two incoming connections, the object doesn't operate twice; instead the two incoming values are added together (just like MSP).

The set of objects you can use in gen~ is slightly different than in MSP, because the rules of gen patching are a bit different; but they should be mostly pretty obvious. In fact there are not as many gen~ objects, since a lot of MSP objects can be rewritten as gen patchers anyway. Another common difference is that gen~ objects usually specify durations in terms of samples rather than milliseconds.

Many objects will use arguments to replace inlets. Whereas the 74 in [+~ 74] in MSP is just a default initial value for the 2nd inlet, which can be overridden by messages arriving at that inlet, in gen~ [+ 74] will simply have only one inlet. (It makes no sense for it to have a second inlet, because there are no messages in gen~).

Similarly, many objects use attributes to modify their behaviour. E.g. [cycle @index phase] changes the meaning of the object's inlet to expect phase, rather than frequency. (Again, gen~ can make more drastic and efficient modifications in this way because there are no messages in gen~ that could change attribute values). 

Arguments and attributes can accept simple constant expressions for brevity, e.g. [+ pi/2].

A gen~ patcher can interact with the outside world of Max in a three ways:

- [in] and [out] objects in the gen~ patcher correspond to the MSP signal inlets and outlets of the gen~ object, rather like in poly~ or pfft~. Give a numeric argument to specify which inlet/outlet, e.g. [in 3].
- [param] objects in a gen~ patcher become attributes of the gen~ object. Each param is named, e.g. [param foo], and its value can be modified by sending messages such as (foo 74) to the gen~. [history] objects can also be named attributes in this way.
- [buffer] objects in a gen~ patcher will refer to [buffer~] objects in the Max patcher, again according to the name argument. Messages can be sent to a gen~ to re-assign buffer~ references.

Gen patchers can be saved (as .gendsp files) and re-used by assigning the @gen attribute of a [gen~] object, rather like patcher abstractions.

Gen patchers can also have embedded subpatchers (called [gen] rather than [p]), and can also include gendsp abstractions (by specifying the @gen attribute of a [gen]).

You can create feedback paths in a gen~ patcher so long as there is either a [history] or a [delay] object within this feedback path. ([history] is just a single-sample delay, the z-1 operation on which most filters are built.) However feedback paths are not currently supported through subpatchers/abstractions.

Because the patcher is compiled, debugging is not as easy. You can't put number boxes, UI controls, audio scopes or spectrograms within a gen~ patcher; this has to happen outside in MSP land.

## Tons of help, docs, tutorials, examples, ...

- gen~.maxhelp
- [Gen Overview](https://docs.cycling74.com/max7/vignettes/gen_overview)
- [Gen common operators](https://docs.cycling74.com/max7/vignettes/gen_common_operators)
- [gen~ operators](https://docs.cycling74.com/max7/vignettes/gen~_operators)
- [GenExpr](https://docs.cycling74.com/max7/vignettes/gen_genexpr), etc.
- Reference panel (select an object)
- Left margin [+] button shows ALL operators
- Codeview panel to understand patcher as GenExpr
- Keep max window open to watch out for compile errors (more important for GenExpr)
- [gen~_For_Beginners](https://cycling74.com/wiki/index.php?title=gen~_For_Beginners)
- [gen~ tutorial](https://cycling74.com/2011/11/07/gen-tutorial-1-the-garden-of-earthly-delays/)
- Help->Examples->gen (or in the file browser)
- Tons of code sharing on the [gen~ forum](https://cycling74.com/forums/forum/gen/)
- Really nicely documented and awesome gen~ tools at [http://www.yofiel.com](http://www.yofiel.com/software/cycling-74-patches), such as [this one](http://www.yofiel.com/software/cycling-74-patches/antialiased-oscillators)

## Patchers from the Tacit Group sessions:

[Download from here](https://github.com/grrrwaaa/courses/tree/master/gen)

---------

## Tacit Group Sessions 2016

### What's new?

- Now there's a [facebook group](https://www.facebook.com/groups/gen.max.msp.maxforlive/)
- A bit of gen in the [Max Kadenze course](https://www.kadenze.com/courses/programming-max-structuring-interactive-software-for-digital-arts-i/info) -- free admission without support
- Some awesome antialiased oscillators from [Yofiel](http://www.yofiel.com/software/cycling-74-patches/antialiased-oscillators)
- Other examples...

---

### Gibberwocky

Gibberwocky integrates the Ableton Live digital audio workstation with a browser-based textual coding environment derived from the Gibber project. The live-coding interface emphasizes sequencing of events and parameter changes as opposed to audio synthesis, but also affords rapid construction of audio graphs to modulate any parameter in Ableton Live with much greater resolution than is typically found in live-coding systems outputting MIDI. 

[Grab it from here](https://github.com/charlieroberts/gibberwocky)

#### Basic demo: 

- Put a `gibberwocky.amxd` MIDI effect onto the instrument track you want to live code
- Start Live playing (easy to forget!)
- Pop open the Browser window (the `Browser` button)
- There's some demo code in there which will trigger notes (or drums on an Impulse instrument)
- `alt-enter` to execute block
- `ctrl-enter` to execute line or selection
- `ctrl-.` to stop all running sequencers


The end-user programming language for Gibberwocky is JavaScript, and its API is derived from abstractions for musical programming found in the online Gibber environment. The API focuses on creating and manipulating musical patterns that are combined into musical sequences; these sequences schedule output to devices in the current Ableton Live set. A small set of methods can be sequenced to generate MIDI output:

- note - note can accept strings providing note names, accidentals, and octaves (such as ‘c4' or ‘Fbb5') or scale positions into a global scale object (0 would indicate the root of the current global scale)
- chord - output a cluster of notes simultaneously, notated by either a string indicating root and quality (such as C#dim7) or an array of integers indicating zero-indexed indices in the current global scale object. For example, given a current global scale of C Major, the chord description [0,2,4,6] would indicate a C major-7th chord (root, third, fifth and seventh).
- midinote - output a note message using a MIDI pitch (0–127) and the current velocity and duration
- midichord - output a cluster of notes simultaneously, notated as an array of MIDI pitches. 
- velocity - set the velocity of subsequently outputted notes
- duration - set the duration of subsequently outputted notes

These methods can be easily sequenced by appending calls to .seq after their name. The two arguments to seq specify a pattern of values to output, and a pattern of timings. Below are examples of creating sequences:

```
// repeat the note c4 every quarter note
this.note.seq( 'c4', 1/4 )

// repeat an upward series of notes, alternating between quarter and eighth notes
this.note.seq( [ 0, 2, 4, 6 ], [ 1/4, 1/8 ] )
```

To control a different track:

```
// tracks count from 0,1,2...
tracks[1].note.seq( [0, 1, 3, 4].rnd(), [1/8, 1/16] )
```

Arbitrary JavaScript functions can be used to generate either the output or the scheduling for any call to .seq. There
are also convenience functions for randomization:

```
// randomly select an output of 0,3, or 5 every quarter note
this.note.seq( [ 0, 3, 5 ].rnd(), 1/4 )

// Randomly choose an integer between 0 or 15 to index the global scale 
// Randomly trigger output using timings of either a 1/2, 1/4, or 1/8 note 
this.note.seq( Rndi( 0, 15 ), [ 1/2, 1/4, 1/8 ].rnd() )
```

Multiple, independent sequences can be created to call a particular method by appending a unique ID number to the end of a call to .seq; if no number is appended, the default ID is 0. The example below creates independent melodic lines creating a polyrhythmic texture:

```
this.note.seq( [ 2,4,6,5,3 ], 1/8 ) // default id #0 
this.note.seq( [ 7,9 ], 1/6, 1 ) // id #1 
this.note.seq( [ 11,3,14,5,16 ], 1/5, 2 ) // id #2
```

Each sequence is stored as an array-indexed property of the method it is sequencing; the above example creates sequences at `this.note[0]`, `this.note[1]`, and `this.note[2]`. Independent access to each of these sequences enables them to be selectively started and stopped, and also provides a reference for pattern manipulation. 

Transformations to patterns can also be easily sequenced in Gibberwocky, enabling performers / composers to treat patterns in a serialist or evolutionary fashion, and live coders to tersely express complex sequences of musical output that vary over time. For any given sequence, the scheduling information is stored in its timings pattern, while the output is stored in its values pattern.

```
this.note.seq( [ 0, 4, 6, 9, 8, 7 ], 1/8 ) // a basic pattern of notes 
this.note[0].values.transpose( 1 ) // transpose values by +1
this.note[0].values.transpose.seq( [1,1,-2], 1 ) // sequence transpositions to occur each measure 
this.note[0].values.rotate.seq( 1,1 ) // rotate the pattern every measure
```

In addition to programming patterns, Gibberwocky comes with a number of pattern generators built-in, such as an arpeggiator (`Arp`) and a Euclidean rhythm generator (`Euclid`). These enable the quick generation of more complex patterns that are still subject to all the diverse pattern transformations that Gibberwocky offers. As a higher-level temporal construct, Gibberwocky provides a `Score` object enabling programmers to place functions on a timeline that will automatically be executed. The Score object can be started, stopped, rewound and paused at will; by default these actions occur in sync with the transport in Ableton Live. A step-sequencer, `Steps`, provides a quick way to sequence drum beats and other polyrhythmic patterns. 

Although there are Ableton Live and Max For Live plugins that possess similar functionality, the patterns that these plugins create cannot typically be manipulated algorithmically. For example, after the Euclid function generates a Gibberwocky pattern, that pattern can easily be transformed over time; this is also true for patterns generated by the Arp and Steps objects. This enables users to easily define morphing patterns and avoid static repetition.

```
a = Steps({
  [60]: '3.3f..4..8.5...f',
  [62]: '7.9.f4.....6f...',
  [64]: '........7.9.c..d',
  [65]: '..6..78..b......',
  [67]: '.f..3.........f.',  
  [71]: 'e.a.e.a.e.a.a...',  
  [72]: '..............e.',
})

// rotate one pattern in step sequencer
// every measure
a[71].rotate.seq( 1,1 )

// reverse all steps each measure
a.reverse.seq( null, 2 )
```

A list of all parameters for every device and track in an Ableton Live set,  each with a unique identifier, is accessible from within the code editors to assign values to parameters of Ableton Live devices, and to easily sequence them, as shown below. Note that Ableton Live parameters expect to receive values in the range {0,1}, which will be automatically mapped to their actual ranges; this makes it easy to re-use code for different parameters.

```
// store a reference to the impulse device on the plugin's track
impulse = this.devices['Impulse 606']

// set the value of Global Time property, which temporally stretches / compresses sample playback using 
// granular techniques. All Ableton Live parameters expect a value in the range of {0,1},
// which is automatically mapped to their real range.
impulse[‘Global Time']( .25 )

//sequence the same property
impulse['Global Time'].seq( [.1, .25,.5,.75, .9], [1/4,1/2] ) 
```

The primitive functions and operators supported by gen~ have JavaScript representations in Gibberwocky. These functions can easily be combined to create graphs for modulation. For example, in the following code slithy returns a graph that represents the absolute value of an 8Hz sine wave:

```
slithy = abs(cycle(8))
```

This is translated fairly directly into equivalent textual code for gen~, however any numeric arguments are replaced with named param objects so that they can be readily modified and sequenced after creation:

```
// the gen~ expression language equivalent of the above Gibberwocky code: Param p0(8);
out1 = abs(cycle(p0));
```

A few additional functions can be used in the graph that expand into more complex gen~ code, such as the `beats(n)` function, which produces a ramp synchronized to a multiple (or division) of Ableton Live's meter. In the example below, we assume that an instance of the Gibberwocky plugin has been placed on a track in front of an instance of Ableton Live's "Impulse 606" sample playback device. We assign an LFO (low frequency oscillator) to control the transpose parameter of this device, which controls the pitch of sample playback via granular synthesis techniques. Finally, we sequence the LFO using the same syntax previously discussed in this section:

```
// store a reference to the impulse device
impulse = this.devices['Impulse 606']

// create a function that outputs a ramp in the range {0,1} at 0.15Hz and store a reference
gyre  = phasor( .15 )

// lfo() accepts frequency, amplitude (defaults to 1) and bias (defaults to .5) arguments 
// create a compound parameter modulator using our previous ramp function
gymble = lfo( 2, 0.5, gyre )

// assign the modulator to the global transposition parameter of the Impulse device
impulse['Global Transpose']( gymble )

// sequence the first parameter of the cycle function in our lfo, which corresponds to its frequency
gyre[0].seq( [ .1, .5, 1, 2 ], 1 )
```

Of course LFOs can also be created that are far more complex than what is typically provided by a DAW – to the point where they approach the complexity of simple synthesizers:

```js
vorpal = mod(add(mul(noise(), lfo(1, 0.01, 0.01)), max(beats(2), mul(lfo(2, 0.5, lfo(8)),2))),1)
```

The list of supported gen~ operators currently includes: `'noise', 'phasor', 'cycle', 'beats', 'lfo', 'abs','acos','acosh','asin','asinh','atan','atan2','atanh','cos','cosh','degrees', 'fastcos','fastsin','fasttan','hypot','radians','sin','sinh','tan','tanh', 'min','max','add','sub','mul','div','rdiv','mod','rsub','rmod','absdiff', 'and','or','gt','eq','eqp','gte','gtep','gtp','lt','lte','ltep','ltp','neq', 'step', 'rate',`










