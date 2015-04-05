
# Media are Data

![On Broadway - Lev Manovich](http://manovich.net/content/03-exhibitions/01-on-broadway/thumb.jpg)

Media objects themselves are considered databases. These objects could take the form of audio data (music, sound recordings, voice), visual data (paintings, photographs, drawings) and time-based visual data (cinema and other recordings), text (prose, poetry, software code), three-dimensional data (architecture, sculpture, spatially-captured data), etc. 

Lev Manovich has written extensively on the conceptualization of media as database, including characterizing computer games as navigable spatial databases ([Manovich, L. The Language of New Media. MIT Press, 2002.](http://mitpress.mit.edu/books/language-new-media)); and has extensive course notes on the treatment of [cultural artifacts as repositories of data](https://docs.google.com/document/d/1DsAQUQ7paWimVQMNwXDO5Qgm7xnpeqv9HQdpn9EPwsg). 

> After the novel, and subsequently cinema privileged narrative as the key form of cultural expression of the modern age, the computer age introduces its correlate — database. Many new media objects do not tell stories; they don't have beginning or end; in fact, they don't have any development, thematically, formally or otherwise which would organize their elements into a sequence. Instead, they are collections of individual items, where every item has the same significance as any other.

> Why does new media favor database form over others? Can we explain its popularity by analyzing the specificity of the digital medium and of computer programming? What is the relationship between database and another form, which has traditionally dominated human culture — narrative? These are the questions I will address in this article. [(Manovich, L. Database as a Symbolic Form, 1998)](http://manovich.net/content/04-projects/021-database-as-a-symbolic-form/19_article_1998.pdf)

Some example artists working in this area:

- [George Legrady](http://www.georgelegrady.com), 
- [Luke Dubois](http://lukedubois.com), 
- [Aaron Koblin](http://www.aaronkoblin.com/work.html), 
- [Ben Fry](http://benfry.com/distellamap/), 
- [Stefanie Posavec](http://www.stefanieposavec.co.uk/-everything-in-between/#/writing-without-words/), 
- [Lev Manovich](http://manovich.net/index.php/exhibitions),
- [Fernanda Viégas and Martin Wattenberg](http://hint.fm/projects/listen/)

## Gathering data from media

Objects-as-data can be considered alone, or as part of a collection; and may also be considered alongside metadata (such as song lyrics, film subtitles, historical documents, commentaries, dates and locations of capture, etc.)

Within each media object, we are often driven to extract salience in human terms. We may be looking for occurrences of certain sounds within and audio file, or for its pitches, rhythms, dynamics and spectral variations. Within images we may be looking for specific shapes, or considering the distributions of colors, edges, patterns and densities. Within moving images we may seek general and specific movements of these elements. Within text we may seek keywords, associations, patterns of language usage, grammatical variations. And within three-dimensional data we may seek surfaces and planes, specific shapes, features of interest, enclosures and passages etc. 

In all these media we thus make use of pattern recognition, feature extraction, statistical analysis and machine learning. And many cases, a preliminary process of cleaning, organising, reducing and filtering the data is called for (and potentially filtering the results). 

### Visual media

**Computer vision** is a field that includes methods for acquiring, processing, analyzing, and understanding images in order to produce numerical or symbolic information. A theme in the development of this field has been to duplicate the abilities of human vision by electronically perceiving and understanding an image. As a scientific discipline, computer vision is concerned with the theory behind artificial systems that extract information from images. The image data can take many forms, such as video sequences, views from multiple cameras, or multi-dimensional data from a medical scanner. As a technological discipline, computer vision seeks to apply its theories and models to the construction of computer vision systems.



Max/MSP/Jitter includes several image analysis externals: [jit.3m] returns the min, mean and max values of each plane of a matrix. [jit.bsort] bubble-sorts the cells of an incoming matrix across one dimension. [jit.findbounds] locates the bounding region of pixels in a given value range. [jit.fft] moves matrices between spectral domains. [jit.histogram] calculates the distribution of values on each plane (i.e. colors) for one or more input matrices. 

However the computer vision capabilities have been greatly extended by Jean-Marc Pelletier:

> [cv.jit](http://jmpelletier.com/cvjit/) is a collection of max/msp/jitter tools for computer vision applications. The goals of this project are to provide externals and abstractions to assist users in tasks such as image segmentation, shape and gesture recognition, motion tracking, etc. as well as to provide educational tools that outline the basics of computer vision techniques.

For the purposes of this course, I have prepared a version of cv.jit in the Max package format, which you can [download from this page (click on the "view raw" link)](https://github.com/grrrwaaa/courses/blob/master/datt3935/code/cv.jit_v1.7.2.zip). Once downloaded, unzip the contents into Documents/Max 7/Packages and restart Max. You can verify that the package installed correctly by opening the "cv.jit-Object Guide" from Max's Extras menu.

The externals are broadly grouped according to:

- Edge extraction
- Pattern detection (lines, edges, salient points, faces, training)
- Shape detection (edges, directions, thinness, compactness
- Tracking (selected pixels, blobs, bright regions)
- Blob detection, and labeling, for tracking notable features within a moving image
- Optical flow (movement detection)
- Statistics (variance, deviation, running average, mean)
- Filtering (and morphology changes, such as erosion & dilation)

In most cases input needs to be converted to greyscale, and possibly even thresholded to obtain a binary image. This is a radical reduction of input data that should be done carefully to preserve meaning.

### Audio

Descriptors are metadata to describe multimedia information to assist searching, classifying and understanding content. Audio descriptors are typically derived from temporal and spectral analyses. 

Max/MSP/Jitter comes with several analysis objects, including basic level following with [peakamp~] and [avg~], and time-domain level crossing detection with [zerox~], [thresh~], [edge~], [change~] and [spike~]; and more capabilities in this regard via gen~. There is also the [sync~] object, which can derive BPM from received bangs. In the spectral domain, there are several examples using fft~ and pfft~. However richer, more powerful or more accurate feature detection algorithms have been contributed by the community:

[Zsa.descriptors](http://www.e--j.com/index.php/what-is-zsa-descriptors/) is a library for real-time sound descriptors analysis for Max developed by Mikhail Malt and Emmanuel Jourdan. The free version has a pop-up splash screen but is otherwise fully functional, and comes as an easily installable package (drop into Documents/Max 7/Packages). Analyses include:

- ```zsa.centroid~```: approximates center frequency of the input sound. ```zsa.fund```: estimates the fundamental pitch of a sound -- good for clean melodic input only. ```zsa.rolloff~``` returns the frequency above which energy tends to reduce. It is useful to characterize noisy environments, for example.
- ```zsa.kurtosis~``` returns a measure of the flatness of a spectrum around its centroid. That is -- it differentiates between sharply focused sounds and sounds with more diffuse focus. Similarly, ```zsa.spread~``` approximates the sharpness of energy distribution around the center. 
- ```zsa.skewness~``` returns a measure of the asymmetry of a spectrum around its centroid -- i.e. whether more energy is found above or below the center. ```zsa.slope~``` measures the overall balance between low and high frequency energy.
- ```zsa.bark~```: outputs loudness of 25 perceptually-oriented frequency bands. Think of it like a graphic equalizer display. ```zsa.mel~``` is very similar, and also perceptually driven. (In combination with ```zsa.dist```, bark and mel can choose between several characteristic EQ shapes you are interested in). 
- ```zsa.flux~```: reports changes of energy; useful to apply to clean sound sources & detect transitions, for example.

[A set of audio analysis externals from Adam Stark](http://www.eecs.qmul.ac.uk/~adams/software.html), including beat tracking and tempo estimation, chroma (pitch class) estimation, and chord detection. OSX only, unfortunately.

[Another set of spectrally-driven audio feature analysis, from Tristan Jehan](http://web.media.mit.edu/~tristan/maxmsp.html), including pitch, loudness, brightness, noisiness, perceptually-driven spectrum, onset and beat detection -- however these are older and I have experienced them to be less stable.

[ml.lib](http://artfab.art.cmu.edu/ml-lib/) is a collection of gesture analysis and machine learning externals based on the [Gesture Recognition Toolkit](http://www.nickgillian.com/software/grt#MachineLearningAlgorithms). A particularly useful page on the latter site is [a guide to selecting the algorithm for the task at hand](http://www.nickgillian.com/wiki/pmwiki.php/GRT/GettingStarted#AlgorithmSelection). The main goal of the library is to train a system to recognize specific patterns in an input stream based upon a collection of prior examples. I can upload a working archive for OSX if needed.

### Filtering & storing analyses

Before submitting to analysis, it may be useful or even necessary to pre-filter. Audio signals may need dc blocking (a solution exists in gen~), and perhaps also thresholding to remove quiet moments. They may also neen normalization. Images may benefit from reduction in resolution, posterization and blur, or other techniques to reduce noise. 

The raw results of analyses can also be noisy, and it may be wise to smoothen the data (numbers with [zl stream] -> [zl mean], matrices with [jit.slide] or [cv.jit.ravg], audio signals with [slide~] or [rampsmooth~] etc.). 

A rather direct working method to store data is to use the analyses to simply reduce and compile the input media into shorter fragments, e.g. cutting out all uninteresting segments (noisy frames, quiet moments, shaky camera, keeping only images with faces in, etc.), filtering on features of interest. Sometimes simply compiling these fragments into a new media file has been sufficient to present as a work of art.

Another common process is to create annotation databases for media files. In the case of audio and movie inputs these annotations should be timestamped. There is no right or wrong way to store annotations -- it mostly depends on the intended use. Older patchers will likely used [coll], but today [dict] is more advisable (and it can also export to YML and JSON). A third option, for purely numeric data of known length, is to store annotations within a [jit.matrix], which can be saved and also exported as CSV.  Of course CSV and JSON can both be read by D3.js, opening up the option to perform analysis in Max but visualize in the browser.

### Big data & media

Today there is a huge effort to understand media by means of big data. [Here's a recent TED talk on this topic](http://www.ted.com/talks/fei_fei_li_how_we_re_teaching_computers_to_understand_pictures) -- [(And here's the API...)](http://www.image-net.org/download-API) They analyzed 25 million images, using Amazon's Mechanical Turk to employ people to identify objects and other semantics by keyword, then supplied this data to a convolutional neural net. [And here's a talk at the Facebook conference also referring to the use convolution neural networks to understand language, for example](https://www.youtube.com/watch?v=UDu-cnXI8E8&feature=youtu.be).

---

### Unsorted

[Trend analysis](http://www.google.com/trends/explore?hl=en-US#q=doge&cmpt=q)