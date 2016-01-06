importance: 8
title: Themes

---

## What is (Artificial) Life?

Artists and engineers have devised lifelike technology for millennia, often prompting inquiry into our beliefs and perspectives about living systems. And time after time, we discover that more of the great patterns of nature can be reproduced by following relatively simple rules and relations, and increasingly, that by means of algorithms we can create wondrous complexity. In this course we explore, theoretically and practically, topics of biologically inspired computing, and especially its roots in Artificial Life, in the practice of generative art. 

But, what is life anyway? It isn't always what we think it is: evolution is not necessarily progressive, nor gradual, survival is not often a question of fitness, large amounts of DNA are shared between incredibly different species, our DNA isn't constant through our lives, environmental nurture is essential to development, etc. -- and that's before we consider what we can do with biotechnology.

<iframe width="640" height="360" src="https://www.youtube.com/embed/QOCaacO8wus?rel=0" frameborder="0" allowfullscreen></iframe>

[The WaitButWhy follow-up](http://waitbutwhy.com/2014/12/what-makes-you-you.html?doing_wp_cron=1418415874.1286160945892333984375)

**Artificial life** (often abbreviated ALife or A-Life) is a field of study and an associated art form which examine systems related to life, its processes, and its evolution, through the use of simulations with computer models, robotics, and biochemistry. The discipline was named by Christopher Langton, an American computer scientist, in 1986, and began with a colorful collection of biologists, robot engineers, computer scientists, artists, and philosophers. Today aspects of Artificial Life recur in Biologically-Inspired Computing, Complexity Science, Bioinformatics, Synthetic Biology...

Artificial Life can trace examples from the dawn of computing. In a sense, it reformulates an age-old motivation to create life from artifice, such as the Golem, early automatons, and *anima*tion. The earliest computer scientists and cyberneticians (Turing, von Neumann, Wiener, Ashby) also investigated artificial approaches to biological phenomena.

A major hypothesis is that life is not a property of the specific matter we know, but rather a more general property of particular organizations and behaviors. Computing pioneer John von Neumann claimed that "life is a process which can be abstracted away from any particular medium". If so, there is no reason to suppose that life cannot occur in systems that are not part of our natural evolution, including digital media. As a science, ALife thus studies not "life as we know it" but **"life as it could be"**.

> > "...the study of artificial systems that exhibit behavior characteristic of natural living systems. It is the quest to explain life in any of its possible manifestations, without restriction to the particular examples that have evolved on earth... the ultimate goal is to extract the logical form of living systems." Christopher Langton, 1992.

The core strategy differs from traditional sciences, which focus on a particular system is to capture the principal parameters, and instead investigate the principles of life through a **bottom-up** approach, investigating **simulations** in which complex behaviour arises from:

- a simple set of rules
- a population to follow those rules
- a method to apply these rules. 

There are three main kinds of Artificial Life simulation, named for their approaches: 

- _Soft_: digital simulation
- _Hard_: physical robotic
- _Wet_: biochemical manipuation

ALife is inherently trans-disciplinary. This is expected; it blends things that were previously distinct (born vs. made, nature vs. artifice). But it doesn't mean that related fields become merged. Indiviual simulations may differ signifiantly in their principal motivations and modes of evaluation, as elucidated in ["Artificial Evolution and Lifelike Creativity"](http://www.mitpressjournals.org/doi/abs/10.1162/002409402760105271):

- Scientific models: as analytical tools to propose and evaluate theories with respect to actual life phenomena, 
- Engineering/design tools: a problem solving-strategy evaluated according to fit, efficiency, accuracy etc.,
- New ontologies and instantiations: evaluated for other criteria involving 'lifelikeness'; including [generative arts](genart.html). 

From the earliest papers in the Artificial Life conference proceedings and journals, examples of all three perspectives are present, along with acknowledgement of the difficult philosophical questions, and example projects demonstrating remarkable capacity for adaptation and emergent complexity despite their inherent simplicity.

### Notable contributions

- Cellular automata among the oldest contributions, still widely used today. Read: [Wolfram](http://www.stephenwolfram.com/publications/articles/ca/).
- Evolutionary algorithms (genetic algorithm, evoluationary programming, swarm intelligence, ant colony optimization, ...): wide applicability in engineering/design optimization. Read: Holland, Koza. 
- Artificial chemistry: abstract chemical reactions to simulate the emergence of life. Read: Fontana.
- Agent-based systems: from scientific modeling to ubiquitous computing and robotics. 
- L-systems, rewriting systems and developmental modeling have been heavily used in computer graphics. Read: Lindenmeyer, Prusinkiewicz.

[Sims, K. Evolved Virtual Creatures](http://www.karlsims.com/papers/siggraph94.pdf), [video](https://www.youtube.com/watch?v=JBgG_VSP7f8), and [3DEVC examples](https://www.youtube.com/user/kjlg74?feature=watch)

[L-Systems (skip to 11:45)](https://www.youtube.com/watch?v=fjNPUtwURpc)

### Controversy

Artificial Life is not without controversy. Although it aims to dispel earlier _vitalism_, it remains deeply enmeshed in the controversies regarding _emergence_ and _complexity_ (see Horgan, John. "From complexity to perplexity." Scientific American 272.6 (1995): 104-109.). As a science it has been accused of being "fact-free" (Maynard Smith), yet its research has been published in *Science* and *Nature*. 

The position of life as property of organization has been characterized as **strong ALife**. The **weak ALife** position on the other hand allows that we can simulate life in order to understand the mechanisms of real living entities, but we cannot actually synthesize life itself. In any case, to define a simulation as 'alive' depends on having a widely agreed upon definition of 'life' itself, which remains problematic. 

Soft ALife has also been frequently related to issues of computer security and viruses, and hard/wet ALife with cyborg and biological disaster, and warfare.

Simon Penny, N. Katharine Hayles and Rodney Brooks criticized both AI and ALife for being 'disembodied', priveling mind over body; though more contemporary ALife now involves greater interaction, immersion, robotics and biochemistry. [Edward Shanken suggested](http://www.jstor.org/stable/1576602) that ALife is grounded in theory and ideas more than in life itself. 

### ALife Resources

#### Journals: 

[Artificial Life](http://www.mitpressjournals.org/loi/artl), Evolutionary Computation, IEEE Transactions of Evolutionary Computation, Physica D (Nonlinear Phenomena), Adaptive Behavior, [Artificial Life and Robotics](http://www.springer.com/computer/ai/journal/10015), [IJALR](http://www.igi-global.com/journal/international-journal-artificial-life-research/1153)

#### Conferences / awards:

ECAL, [EvoWorkshops](http://evostar.dei.uc.pt/2012/), IEEE ALIFE, IEEE CEC, GECCO, ALEA, EA

[VIDA art & artificial life awards](http://vida.fundaciontelefonica.com/en/)

----

## Generative art

Generative art refers to art that is constructed in part according to rules, to some degree outside the author's control. Rules might include mechanical systems, materials with independent behaviors (such as water flow or chemical reactions), mathematical procedures, huge data-sets, geometries and symmetries, and of course randomization. "Generative Art" is often used to refer to computer generated artwork that is algorithmically determined. 

> "Generative art is a term given to work which stems from concentrating on the processes involved in producing an artwork, usually (although not strictly) automated by the use of a machine or computer, or by using mathematic or pragmatic instructions to define the rules by which such artworks are executed." Adrian Ward, 1999.

Generative artworks have existed throughout human history. Before computing, composers used strict rule systems (the counterpoint of Bach, the serialism of Schoenberg) as well as chance (the dice-game of Mozart and chance operations of Cage). Pointilism, cubism, and other abstractions in painting are rule-based constraints. Many writers refer to Sol LeWitt's textual instructions, to be carried out by others; a direction more fully fleshed out with alternative approaches to scorewriting in music. One might also mention kinetic sculpture and generative texts (particularly the Oulipo group), or the pattern-based arts of Islamic tiling and weaving, Celtic knots, and other traditional arts.

The more it is considered, the more it seems that all art is somewhat generative, and certainly technological. (It is worth noting that the Greek term techné is the origin of both art and technology.) However the term generative is usually used for art in which these systems play a major role in the work, with significant autonomy from the artist's urges. It thus invokes issues of distributed and non-human creativity.

Computing media nevertheless revolutionize generative art. A great deal of early computer art is generative by necessity, since the machines were expensive and difficult to use. Generative techniques are increasingly being adopted in many creative practices, from the visual arts and design, through music, cinema and text. While this course is predominantly concerned with generative computer art, generative procedures have a long history in art that predates the computer by thousands of years. Nevertheless, the computer brings new ideas and possibilities that have previously been impossible or impractical to realise -- making it qualitatively different.

> "In essence, all generative art focuses on the process by which an artwork is made and this is required to have a degree of autonomy and independence from the artist who defines it."

The degree of autonomy can vary considerably -- along with differing perspectives on the value of an artwork as a standalone object versus its understanding embedded in a social/cultural activity. Thus far however discussion around generative art has emphasized methodology.

### Artificial life art

Langton accorded importance to the creative and aesthetic aspects of artificial life. His "life-as-it-could-be" asks us to be creators. For two decades artists have appropriated and adapted techniques and topics of artificial life to create art, or what Mitchell Whitelaw has called [Metacreation](https://mitpress.mit.edu/books/metacreation). Artificial life artists create works (or processes) that seem to mutate, evolve, and respond and generate with a life of their own. Several works have been accoladed in scientific as well as art communities (and others). Even if the concerns of artificial life have moved on from those of the 80's and 90's, it's fusion of technology boundaries and classical questions means that it remains active and pertinent to the arts. 

- Tapping into biophilia (the innate preference for natural form and behaviour).
- Responding to the increasing technologization of living matter (e.g. [3D printed organs](http://www.nature.com/news/the-printed-organs-coming-to-a-body-near-you-1.17320), [custom organism design by DNA laser printing](http://cambriangenomics.com), virtual pets, etc.) It may offer opportunities to raise new ethical issues. For example, the post-human / post-organic life discussions (see Hayles); away from 'essentialism' toward 'cyborg subjects' (Haraway). The future of *our* life is (and always has been) deeply connected with the future of machines.
- Life is the best example we have of systems adapting to unpredictable environments while propagating complexity; of surpassing themselves. In an increasingly pervasively technologized environment, the need/desire to create cultural artifacts (art, architecture, design, service) that are as rich, robust, adaptive, and fascinating as life itself. In the limit, there is the promise of **emergent** complexity and creativity found in nature.

### [A Framework for understanding Generative Art](http://www.tandfonline.com/doi/pdf/10.1080/14626268.2012.709940)

Four main components of a generative art system:

1. Entities
	- The subjects on which the artwork's processes act; real or conceptual, simulated, physical, chemical, biological or mechanical. 
	- Generally unitary/indivisible, though they have properties and states, and may form hierarchies
	- E.g. agent-based systems (whether monoculture or ecosystemic)
	- Perceived only via a *mapping*
2. Processes
	- May or may not be directly apparent
	- Operate on/by entities, possibly in process hierarchies
	- Describe via:
		- Initial conditions/initialization procedures
		- Possibly termination conditions
		- Continuation methods
		- Micro/macro events
		- Positive & negative feedbacks (cybernetics/regulation)
		- Statistical macrobehaviours/system dynamic tendencies
3. Environmental interaction
	- Flows of information between artwork/system and its operating environment
		- In both process of creation and final presentation (if separate)
	- Initial or continual, discrete or continuous, parametric
	- Physical sensors, human interaction, network...
	- Interactions in terms of frequency, range, and significance
	- How system output may influence subsequent input, also in frequency, range, and significance
	- Tweaking, selecting, filtering, rewriting
	
4. Sensory outcomes
	- visual, sonic, musical, literary, sculptural, etc.
		- static: snapshots, accretions, end-states
		- time-based: offline, real-time, interactive
	- multiplicity of results, framing/editing
		- flat: entities/processes are directly visible
		- mapping: transformation into perceptible outcomes, what should be perceived and how it should be mapped
			- natural mappings closely align in structure / entities & process match ontology of outcomes -- but not always possible

Missing artistic motivations, social/political implications? "Generative art must do more than simply implement formal systems imported from the sciences." 

### [Ten Questions Concerning Generative Computer Art](http://www.csse.monash.edu.au/~jonmc/research/Papers/TenQuestionsLJ-Preprint.pdf)

1. Can a machine originate anything? 
	- Can it generate something new, meaningful, surprising and of value?
	- To what extent can a program do "more" than what it was instructed?
		- It can exceed our ability to predict it (e.g. bugs)
		- It can be designed to modify itself
	- How to design for *meaning, surprise, value*?
	- Continuum of *creative agency*, from tool to to collaborator to autonomous
	- But isn't art based in shared human experience?
		- Individual expression depends on accumulated collective structures
		
2. What is it like to be a computer that makes art?
	- We’re asking the machine to be autonomous, yet we’re also asking for human creativity, assessed by human standards...
		- We can appreciate formal aesthetics, natural patterns... 
	- Otherwise, how could we comprehend it?
	
3. Can human aesthetics be formalised?
	- Is aesthetic response even computable in principle?
	- Could it be tailored to individuals?
	- Criticism: not just beauty/pleasure, not a scalar quantity
		- What kinds of aesthetics could be formalised?
	- Or, what parts? Neurological/evolutionary predispositions...
	- Criticism: proportion of diversity/volume remains low
	
4. What new kinds of art does the computer enable?
	- Computation as medium remains underexplored (not just display/automation)
		- Unique fidelity, flexibility and control of sophisticated processes
		- Creating "model worlds" otherwise impossible
		- Interaction with complex systems
		- Networked (culture & social change)
		- Emergent sublime
		- Destabilizing force (questions authorship/ownership/mystery etc.)
		
5. In what sense is generative art representational, and what is it representing?
	- Beyond bit manipulation, impossible to program without some form of representation [or metaphor]
	- Often draws upon simulation sciences [including artificial life], but not mimicry [or prediction]. If not reality, what is generative art representing?
	- Artwork has two aspects: underlying process, sensory artefacts produced, with a selective mapping; all have representational questions
	- Process may be driven by open data (e.g. weather) -- is it data visualization? What is the ethical/political significance?
	- Can it represent all its possible outcomes?
	
6. What is the role of randomness in generative art?
	- Randomness and chance play a part in most generative art
	- ```random()``` usually means pseudo-random (deterministic, repeatable, but statistically sufficient) -- does it matter?
	- What does it say about intentionality? E.g. ego-free Cage vs. will-ful Xenakis.
	- Are metaphorical allusions of random sources more important than the numbers?
	- Is randomness a proxy for poorly understood complexity (e.g. "humanized" rhythm)? 
	- Why resort to randomness?
	
7. What can computational generative art tell us about creativity?
	- Creativity it sought after, but poorly understood. How do brains, societies and species do it?
	- Combinatory (predefined primitives recombined) vs. emergent (new primitives); latter is an open research problem...
	- Is it wrong to dismiss 'cheap generative tricks' if they give good results?
	
8. What characterises good generative art?
	- How to form critical, not just technical, understanding?
	- Unique: primacy expression via process -- this should be main object of scrutiny
		- Motivations, design, realization, interpretation, context of this process
	- Implies that over-use of software designed by others is problematic?	
	- Criticism of algorithmic genericism, and appropriation (from scientific models)
		- But perhaps these models are much more general... 
		- How much is an artist responsible for?
	- Should audiences understand the system?
	
9. What can we learn about art from generative art?
	- Questions agency, originality, creativity, authorship and intent
	- Is the art world a complex generative system? (Driessens & Verstappen’s The Factory)
	- Most generative art operates outside the "precious bubble", with many operating across multiple disciplines; fine-art perspective is limiting?
	- Art world shows patchy interest, perhaps revealing wider tensions
	- Incompatible with art world's "irreducibility of the work of art"?
	- What is its place/role in contemporary culture? Academic, commercial, design, craft, ...
	
10. What future developments would force us to rethink our answers?
	- Hard to predict evolution of art-technology-culture system, all radically transform in short periods
	- Meaning of terms “create”, “generate” and “originate” historically far from stable
	- Nevertheless technologically optimistic speculation often misfounded
	- Creativity support AI is often more limiting, open-ended evolution has not been achieved
	- Everyday concerns limit potential of media, radically new ideas might be increasingly difficult to discover [or understand]?
	
### See also

[Whitelaw, M. System Stories and Model Worlds: A Critical Approach to Generative Art.](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.136.5399)

[Boden, M., Edmonds, E. What is Generative Art?](http://research.it.uts.edu.au/creative/eae/intart/pdfs/generative-art.pdf)

[McCormack, J. Open Problems in Evolutionary Music & Art](http://www.csse.monash.edu.au/~jonmc/research/Papers/OpenProblemsSV.pdf)

[Whitelaw, M. Metacreation](http://books.google.co.kr/books/about/Metacreation.html?id=8o8CX6sPTKwC&redir_esc=y)

[Penny, S. Art & Artificial Life - a Primer](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CDEQFjAA&url=http%3A%2F%2Fwww.escholarship.org%2Fuc%2Fitem%2F1z07j77x.pdf&ei=ImwsUZvDIeyuiQf8lYHADg&usg=AFQjCNHxJ8u96VRDoxSXcdOXu7rQAvhsRg&bvm=bv.42965579,d.aGc)

[Penny, S. 20 Years of Artificial Life Art](http://www.tandfonline.com/doi/pdf/10.1080/14626261003654640)

[Sommerer, C. and Mignonneau, L. The application of artificial life to interactive computer installations](http://link.springer.com/article/10.1007%2FBF02471174?LI=true#page-1)

[Sommerer, C. and Mignonneau, L. A-Volve an evolutionary artificial life environment.](http://books.google.co.kr/books?hl=en&lr=&id=0J8kQEjXe38C&oi=fnd&pg=PA167&dq=Sommerer+and+Mignonneau&ots=nlWrCyeDV5&sig=OgzhQf55zUmrtyGYjoSAcFCSqpw&redir_esc=y#v=onepage&q=Sommerer%20and%20Mignonneau&f=false)

[Driessens, E. and Verstappen, M. Natural Processes and Artificial Procedures.](http://link.springer.com/chapter/10.1007%2F978-3-540-74111-4_7?LI=true#page-1)

[Dorin, A. Enriching Aesthetics with Artiﬁcial
Life](http://download.springer.com/static/pdf/719/chp%253A10.1007%252F978-1-84882-285-6_14.pdf?auth66=1363162689_1efc6d54d6ee7c6e983d4150f2086f67&ext=.pdf)

[Dorin, A. A Survey of Virtual Ecosystems in Generative Electronic Art](http://link.springer.com/chapter/10.1007%2F978-3-540-72877-1_14?LI=true#page-1)

- [The Teeming Void](http://teemingvoid.blogspot.ca)
- [Data is Nature](http://www.dataisnature.com)

Anders Hoff - [Generative Algorithms](http://inconvergent.net/generative/)

> A great collection of personal experiments, some of which have become installed artworks, recreating biological behaviours. A lot of it is also available on GitHub.

Design I/O - [Connected Worlds](http://www.creativeapplications.net/openframeworks/connected-worlds-interactive-ecosystem-for-nysci-by-design-io/)

> Created by Cambridge (US) based creative studio Design I/O (Theo Watson, Emily Gobeille and Nick Hardeman), Connected Worlds is a large scale immersive, interactive ecosystem developed for the New York Hall of Science. The installation is comprised of six interactive ecosystems spread out across the walls of the Great Hall and connected together by a 3000 sqft interactive floor and a 45ft high waterfall. Visitors can use physical logs to divert water flowing across the floor from the waterfall into the different environments, where children can then use their hands to plant seeds. As the different environments bloom creatures appear based on the health of the environment and the type of plants growing in it. If multiple environments are healthy creatures will migrate between them causing interesting chain reactions of behaviours.

<iframe src="https://player.vimeo.com/video/131585517" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

> The installation is designed to encourage a systems thinking approach to sustainability where local actions in one environment may have global consequences. Children work with a fixed amount of water in the system and have to work together to manage and distribute the water across the different environments. Clouds return water from the environments to the waterfall which releases water to the floor when it rains.

<iframe src="https://player.vimeo.com/video/131665883" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Andy Lomas - [Morphogenetic Creations](http://www.andylomas.com)

<iframe src="https://player.vimeo.com/video/93056665" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/93056665">Cellular Forms HD</a> from <a href="https://vimeo.com/andylomas">Andy Lomas</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

> The animations use digital simulation of a simplified biological model of morphogenesis, with three-dimensional structures generated out of interconnected particles to represent cells.
Each form starts with a initial spherical cluster of cells which is incrementally developed over time by adding iterative layers of complexity to the structure. The aim is to create forms emergently: exploring generic similarities between many different shapes in nature rather than emulating any particular organism, revealing universal archetypal forms that can come from growth-like processes rather than top-down externally engineered design. Cell division is controlled by accumulated nutrient levels. When the level in a cell exceeds a given threshold the cell divides, and various parameters control how both the parent and daughter cells re-connect to their immediate neighbours. New nutrient can be created by photons in cells hit by incident light rays. Nutrient can also be allowed to flow to adjacent cells. The simulation process is repeated over thousands of iterations and millions of particles, with each of the final structures comprising over fifty million cells.

The procedure is fully detailed in [his paper "Cellular Forms: an Artistic Exploration of Morphogenesis"](http://www.andylomas.com/extra/andylomas_paper_cellular_forms_aisb50.pdf). It's worth reading this paper and considering the similarities and differences with the flocking algorithm, for example.

Tom Betts - [nullpointer](http://www.nullpointer.co.uk/content/research-hub/)

PhD research in procedural generation for games, and generative music, etc.

Shape of the World

<iframe width="720" height="480" src="https://www.youtube.com/embed/L2WqxTV-CIU?rel=0" frameborder="0" allowfullscreen></iframe>