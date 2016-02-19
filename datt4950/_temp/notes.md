PLATFORM TODO:

draw2D coordinate system should match field2D

blending colors

mouse & keyboard interaction

making it easier to embed in a page

----

Learn international art english: http://canopycanopycanopy.com/issues/16/contents/international_art_english

# Alife course notes

Need to start by establishing the course themes, goals, before getting too deep into the code.

Ultimately looking for complexity, patterns, behaviours, etc., perhaps of sustaining interest, rich enough to inhabit, etc. Or simply solving the scale problem of how to fill a world (or 3 minutes) with content... And inevitably we look to nature. No different to artists of past centuries in that regard, except that now our medium is active and symbolic, cerebral yet excitable, and live if not yet alive. In that regard it also connects through film and animation to another older story of reanimation, the artificial creation of the animate. 

phys, chem, bio etc. art sci. also contemporary issues of synthetic biology, genetic engineering, nanotechnology, ecological impact, etc. Touches on a fundamental (and for some, transcendental) boundary between the living and the nonliving, and its origin and endless rebirth. 

We will look at the field of Artificial Life in particular, which received its name in the mid 1980's during a surge of computational research, though the theoretical history can be traced much earlier. AL is concerned with the emulation, simulation, and construction of living systems. 

TODO: theory of the living state

Adami: AL is broadly divided into emulation, simulation (agents & populations), & construction (and he concentrates on latter)
exteberria's 3 classes


General terms -- population thinking: rather than designing a particular machine or media result, we want it to spontaneously emerge from some other dynamical process. Why?

- because we don't know exactly what we want
- because we don't know exactly how to get it
- because there's too much detail to do it by hand
- because we want to be surprised
- because we want something robust (adaptive to perturbation)
- because we want something complex
- because we want something uniquely shaped by other's interaction
- because we want continuous engagement, persistent change
- because we want the autonomy of a full origin-story
- because we are interested in the indeterminacy of autonomy
- because we want a whole class of solutions, not a single one
- because if it can innovate in one way, it may be able to innovate in others we didn't predict

Nevertheless we still need to specify the space in which the solutions are found, which means the kinds of components that solutions can be made of, the kinds of search tools that can be utilized, and some mode of selecting which avenues to pursue or abandon. (And whether these components, tools and decision-making processes are also self-modifiable...)

Throughout there is a reliance on working between processes and descriptions of processes -- understanding machines as information, behaviours as organization. Hence the placement of 'creative code' in the course title.


## Information theory

Information theory deals with encoding messages to send along a communication channel that connects a source to a decoding receiver. It was developed to investigate how well messages can be conveyed in the presence of background noise, but is now used in a vast range of applications. (In the case of DNA/RNA transmission between generations in life, mutations, replication errors, external stress errors, viruses etc. are all sources of noisy communication.) 

The simplest way to model a transmission channel is as a stream of binary bits; zeroes and ones. And the simplest way to model a noisy channel is to have a probability that each bit will be flipped. To send a message in a noisy channel we need strategies for error-correction. A simple strategy is redundancy: to send the message multiple times, or to send each bit multiple times. This is an *encoding*. This requires more memory (or takes more time), but decreases the *uncertainty* of the corresponding *decoding*.

Given a stream of symbols X, each symbol x1, x2, ... xn has an associated probability p1, p2 ... pn, such that the sum of all these probabilities is 1. Without any other information, we may begin by assuming each x is equiprobable, i.e. p = 1/N. 

## Foundations in automata theory

AL takes us back to the roots of computation; Post, Turing, Church, von Neumann, etc.

Turing machine is an abstract concept but rigorously defined.

- It can be in one of a finite number of states
- It occupies a single cell in a potentially infinite tape of cells. Each cell can also be in a finite number of states (e.g. 0 and 1)
- It can read and write to the cell it occupies
- It has an initial state, and initial location on the tape
- It is characterized by a set of rules by which it changes state, writes to the tape, and moves back & forth along the tape (e.g. move +1 cell, -1 cell, or no change). Each rule thus maps:
	- (current automaton state, current cell state) => (new automaton state, new cell state, new cell location)

TODO UTM, church-turing thesis

Machine that can become any other.

One of the first applications of Turing's work was the construction of a formal neuron that could be shown to have the capacity of universal computation and would thus constitute in principle an adequate building block of a brain.

Von Neumann took the idea of a machine that can emulate any another, by being fed its description, and began to formulate the requirements for a machine that can construct any other. Von Neumann was careful to distinguish the hierarchical categories of *automaton* and *description* -- what we might today call the *running program* and the *source code*. The *universal construction automaton* is imagined floating in an infinite sea of basic machine parts (program fragments), and given a new machine description (code) it can find and connect the parts it needs to build it. In the special case, given a description of itself, this machine can self-replicate. By extension, a machine can not only construct from a description, it can also duplicate that description and embed it into the resulting machine -- a program carrying its own source code along with it, not unlike DNA! And given its own description, it becomes a *universal self-reproducing automaton*. Von Neumann attempted to model this (purely theoretically of course!) using [cellular automata](cellular.html).

It is also evident that *a machine, if it has sufficient complexity, is able to construct another machine of even higher complexity* -- but where does the new, more complex description come from? Returning to our analogy with DNA, we know this comes from mutation and the mixing of genetic material in sexual reproduction. Thus a complete picture of a reproductive system must take into account the environment in which it adapts. 

-> CA

Langton revived research in AL by demonstrating a self-replicating CA that achieves universal computation (if not universal construction), just as this kind of research became feasible to investigate empirically through simulation, rather than merely theoretically. (It has also been shown that the Game of Life is capable of universal computation.) Langton's key suggestion was that important aspects of living systems are also universal, in that they may be independent of a particular substrate. This is a definition of life in terms of organization and behaviour, as opposed to terms of material constitution or transcendental terms. He suggested we may be able create life in digital media by means of artificial chemistries. 

Langton investigated which rules would lend themselves to an artificial chemistry, by trying out sets of rules *at random* and evaluating their progress in similar terms to Wolfram. Langton defined a *lambda* parameter, representing the probability that a neighborhood in a particular rule maps to a nonzero state. With lambda = 0 nothing happens. With lambda slightly greater than zero some activity can occur but rapidly dies out, similar to Wolfram's Class I. At about 0.2 (20% of rules map to nonzero states), active cells can persist or sometimes migrate, like Wolfram's Class II. At around 0.3, the behaviours become dramatically more complex, as the mean distance between persistent active structures decreases such that they can interact and trigger each other. This is the region of most interesting behaviour, corresponding to Wolfram's Class IV. Beyond a lambda of 0.5 active regions become so intermingled that structure does not persist long, characterized as chaotic or noisy behaviour akin to Wolfram's Class III. The lambda parameter has thus been compared to a temperature control.

TODO: compare Kauff's RBNs.

The non-zero structures of cells are like virtual state machines, and the entire lattice is the information tape they move through. Langton showed that it is possible to write a structure of cells that is able to self-reproduce; a minimal von Neumann machine. Since the machine and the tape are one and the same material, it is also possible that such a machine could spontaneously be produced by random processes: an origin story!

insert langton's loop

However, it is noted that the update rules of the automaton remain immutable, a static chemistry. And the lack of separation between automaton and description makes them quite fragile; mutations are unlikely to preserve the self-replicating behaviour.



TODO: adami then goes to Viruses, core worlds, Tierra. 


## Why spatial?

- limit agents from interacting with any other, restrict to neighborhood
- new spawned agents are nearby parents, leading to clusters of similarity
- reduces uniformity (which negatively impacts adaptability, and increases susceptibility to parasites)
- locality of interaction in a large space can keep system away from equilibrium (haven't defined that yet)
- niches

If you don't want to specify movement yet, just use random walks

Or, why not spatial? Modelling chemical interactions within cells for example, in which the jostling medium ensures that any two elements may interact more or less randomly. Many benefits of locality are instead managed by the selective membrane of the cell.













