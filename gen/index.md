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






