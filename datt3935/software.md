# Software

The course will make use of two main technologies: the [Max/MSP/Jitter](http://www.cycling74.com) visual data flow software environment, and modern web technologies. JavaScript is the primary language of client-side web today, and we will also use it server-side through [node.js](http://nodejs.org). (Moreover, JavaScript is supported in Max through the [js] object. 

## Max/MSP/Jitter

> A full kit of creative tools for sound, graphics, music and interactivity in a visual environment.

Max is installed on the Art & Technology lab machines and licenses are available for DM students. Download an installer from [Cycling74](https://cycling74.com/downloads/). (Max 7 licensing for York DM will be arranged in January 2015). 

### Getting static data into Max

[jit.fprint] will import delimited text files. The @planedelim, @coldelim and @rowdelim attributes can be used to define the format of the data expected. Note that this will only work well for data that is purely numeric and tabular. This is true for many scientific data sources. For [CSV](http://en.wikipedia.org/wiki/Comma-separated_values) files (comma separated values):

	[jit.fprint @type float32 @planedelim space @coldelim \, @rowdelim cr]
	
[dict] will import (and export) JSON and YAML files directly. Note that you can set ```@embed 1``` to ensure that a dict remembers its data between Max sessions. As with other objects in Max, a named dict is globally shared. And [dict] is well integrated with the [js] Javascript object:

	// import
	var x = new Dict;
	x.import_json("dict_file.json");
	post(x.name, x.getkeys());
	
	// global reference:
	var d = new Dict("outside");
	var name = d.name;	// "outside"
	var names = d.getnames();
	var keys = d.getkeys();
	
	d.set("bologna", 1.99);
	var price = d.get("bologna");
	
	var there_is_coffee = d.contains("drink::hot::coffee");
	
	d.replace("drink::hot::coffee::origin", "sumatra");
	d.set("drink::hot::coffee::sizes", "small", "medium", "large");	// creates array
	d.append("drink::hot::coffee::sizes", "mega-grande");	// extends array
	
	// convert to json string:
	var j = x.stringify();
	
Alternatively, using the [js] object you can just parse JSON text directly:

	var obj = JSON.parse(jsontext);
	
[See the Max JavaScript Reference](http://max-javascript-reference.tim-schenk.de/#gsc.tab=0)

> Note: Max contains an implementation of the SQLite database engine (more info available @ http://sqlite.org). This database engine is accessible through both the C-API and directly in Max through the JavaScript interface. 

### Getting dynamic web data into Max: maxurl

The maxurl object allows you to make HTTP requests with Max. See the maxurl help file for examples and explanation.

Simple GET/POST requests can be made with messages to maxurl, which will output a dict containing the response, as well as other network status updates. More structured requests can be made by sending a dict to maxurl, for the ability to parse specific response types, add arguments, proxy servers, or even save the results to disk. For more complex needs, it is possible to use JavaScript directly: the [js] object in Max supports a similar interface to maxurl (and browser-based JavaScript) through the **XMLHttpRequest** object. [Here's a fun example making instagram collages.](https://cycling74.com/2014/06/09/use-maxurl-to-create-a-realtime-instagram-collage/)

### Examples

- [Max + OpenWeatherMap](https://cycling74.com/wiki/index.php?title=MaxURL_Weather_Report)
- [Max realtime instagram collage](https://cycling74.com/2014/06/09/use-maxurl-to-create-a-realtime-instagram-collage/)
- [Tom Zicarelli](http://reactivemusic.net/?p=5859)
- [Elevator Music](https://cycling74.com/2014/12/19/music-hack-for-max-7-elevator-music-generator/)

----

## Web technology

**Clients** (browsers) make requests to **servers**, that respond with renderable content (mainly HTML, with embedded media and scripts). Servers (sites, services and applications) are addressable at [URLs](http://en.wikipedia.org/wiki/Uniform_resource_locator).

### Client-side programming (HTML, CSS, JS)

Modern client-side web technology is a trio of HTML, CSS and [JavaScript](js.html), making extensive use of the new audiovisual capabilities of HTML5 including Canvas, SVG, WebGL etc. A great way to play with how it all fits together is using an online test-bed such as [JS Fiddle](http://jsfiddle.net).

[HTML](http://www.w3schools.com/html/) (HyperText Markup Language) is the standard markup language for the web. It is not a programming language, but a formatting language; the browser reads this language and uses it to render the web page. The basic document syntax:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>This is a title</title>
    <!-- more metadata here -->
  </head>
  <body>
    <p>Hello world!</p>
    <a href="http://www.google.com/">A Link to Google!</a>
    <!-- more content here -->
  </body>
</html>
```

The indentation helps us to see that HTML has the abstract structure of a hierarchical tree. This structure is called the [DOM](http://en.wikipedia.org/wiki/Document_Object_Model) (Document Object Model). Nodes within the tree can also be uniquely named via the ```id``` attribute, and classified by the ```class``` attribute: 

```html
<p id="intro" class="normal">Welcome to HTML</p>
```

IDs and classes are often used in combination with [CSS](http://www.w3schools.com/css/) to automatically define visual styles independently of the content. The DOM, including id and class attributes, are also available to JavaScript in the browser.  

CSS (Cascading Stylesheets) is a language for styling HTML pages. CSS styles (also know as selectors) are typically applied to HTML tags based on their name, class, or ID.

```css
	/* Applied to all <p> tags */
	p {
	  color: blue;
	}

	/* Applied to all tags with the class "red" */
	.red {
	  background: red;
	}

	/* Applied to the tag with the id "some-id" */
	#some-id {
	  font-style: italic;
	}

	/* Applied only to <p> tags that are inside <li> tags */
	li p {
	  color: #0C0;
	}
```

There are endless sources of libraries, scripts, examples etc. online, but there are also dangers in relying on unstable technology. 

### The client-side nightmare

Web technologies evolve at a remarkably fast rate. [Standards for web technologies are defined](http://www.w3.org), but are often only partially and sometimes incorrectly implemented by browser developers. Clients use a wide variety of platforms with different screen resolutions and capabilities, and different browsers, browser settings, plugins, and often quite old browser versions, making it very hard to predict what a page will look like or even whether it will even work. The situation today isn't much better than it was a decade ago (standards are clearer but vaster, and platforms are more diverse). Best practice is to keep things simple, detect failure and have fallback solutions, assume last year's technology at best, and test widely. 

### JQuery

[JQuery](http://jquery.com/) helps navigate and control the DOM, for finding, manipulating and even generating the page. It also helps smooth over the differences between browsers.

You can [download jquery](http://jquery.com/download/) and link it to your page by adding this to the HTML header (make sure the src name matches the filename):

	<script src="jquery-1.11.2.min.js"></script>

Now you can access jquery from within your JavaScript code, using the ```$``` symbol. For example, to run code as soon as the document is ready to be manipulated, jQuery has a statement known as the ready event:

	$( document ).ready(function() {
 
		// Your code here.
 
	});
	
[JQuery tutorial](http://learn.jquery.com/about-jquery/how-jquery-works/)

Most JQuery operations begin with a **selector**, which is a query into the DOM that returns one or more document elements. Examples: 

	$()		// the whole document
	$( "#myId" );	
	$( ".myClass" );
	$( "#contents ul.people li" );	// complex CSS selector
	$( "a.external:first" );	
	$( "tr:odd" );
	$( "#myForm :input" );	// all form input nodes
	$( "div:visible" );
	$( "div:gt(2)" ); // all but first 3 divs
	$( "div:animated" ); // all animated divs
	
Selections can be further refined with filters:

	$( "div.foo" ).has( "p" );         // div.foo elements that contain <p> tags
	$( "h1" ).not( ".bar" );           // h1 elements that don't have a class of bar
	$( "ul li" ).filter( ".current" ); // unordered list items with class of current
	$( "ul li" ).first();              // just the first unordered list item
	$( "ul li" ).eq( 5 );              // the sixth
	
Ensure a selection is not empty:

	if ( $( "div.foo" ).length ) {
		...
	}

With the selection you can set attributes:

	$( "h1" ).html( "hello world" );
	$( "h1" ).text( "hello world" );	// HTML will be stripped
	$( "a" ).attr( "href", "allMyHrefsAreTheSameNow.html" );
	$( "a" ).attr({
		title: "all titles are the same too!",
		href: "somethingNew.html"
	});
	// also .css, .width, .height, .position, etc.
	
Moving elements:

	$( "#myList li:first" ).appendTo( "#myList" );
	// also .insert, insertTo, remove, detach, etc.
	
Adding elements:
	
	var myNewElement = $( "<p>New element</p>" );
	myNewElement.appendTo( "#content" );
	$( "#myList li:first" ).clone(true).appendTo( "#myList" );
 
myNewElement.appendTo( "#content" );
	
Usually the same function can also work as a getter (this is not the same as a query filter):

	$( "a" ).attr( "href" ); // Returns the href for the first a element in the document
	

### Visualization

- [D3.js](http://d3js.org) is a JavaScript library for manipulating documents based on data.   
[![Interactive Data Visualization for the Web, Scott Murray](http://alignedleft.com/assets/images/idvftw_cover.gif)](http://chimera.labs.oreilly.com/books/1230000000345/index.html)
- [The Google Visualization API](https://developers.google.com/chart/interactive/docs/reference)
- [Sigma graph drawing](http://sigmajs.org)


## Server-side programming

Sites can be **static** or **dynamic**. A dynamic site generates files in response to requests from a client. A static site just returns pre-existing files. Note that static files can still embed JavaScript for dynamic content generated or accessed from the client. 

HTML is human-readable, but not very pleasantly so; and writing it by hand is laborious, error-prone and inefficient. Since page content is often repetitive, most sites are generated by combining database records or document-based stores with modular templates. A fully dynamic site generates the pages as needed, however there is also an increasing interest in **static site generators**: programs that convert simple human-readable text (such as markdown) into full HTML static sites, which can then be published. After all, most of the essentially dynamic parts (page stats, comments, twitter/facebook integration, etc.) can be provided by embedding external cloud services on the client-side. Two easy and free ways to serve static sites are Dropbox public folders and Github pages. 

### Node.js

Dynamic sites, web apps and services can use any technology capable of TCP sockets and HTTP parsing, but we will concentrate on using **node.js** (AKA Node), which is also JavaScript based and runs on Mac/Linux/Windows. We can also use Node for general programming tasks, including static site generation.

>Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

**Windows**: download the installer from [node.js](http://nodejs.org/download/)

To run, open a command prompt (Start Menu / Accessories / Command Prompt or Start Menu / "cmd" / enter), and type "node" (followed by enter). 

**Mac**: download the installer from [node.js](http://nodejs.org/download/) or install via brew: 

	brew install node
 
To run from a console (Applications / Utilities / Console) type "node" followed by enter. 

Mostly node is used from a console (AKA terminal, AKA command prompt). On mac, the terminal is in Applications / Utilities. To issue commands as a superuser, type "sudo" before the command. On Windows, it is in Start / Accessories / Command Prompt, however you can also open it by pressing the Windows key, typing "cmd", and enter. To open as an administrator, press the Windows key, type "cmd", then ctrl-shift-enter. 

#### Packages 

Node can be extended with additional modules through [NPM](https://www.npmjs.com), the node package manager. There are more than 100,000 packages available!

On Windows, open a command prompt **as administrator** and type npm. If you have an error "ENOENT, stat 'C:\Users\RT\AppData\Roaming\npm'", then manually create the folder at this path and try again. 

On Mac, type "npm" in the console. To install a package globally (for all node apps):

	sudo npm install -g <packagename>

#### Cloud 9 IDE

For server-side programming, we can use the [Cloud 9 IDE](https://c9.io). You can sign up for a free account using your Github/Bitbucket ID. Cloud 9 gives you a Ubuntu Linux based server, and a browser-based IDE including multi-user live programming. 

*If you have trouble with Error: EADDRINUSE, it may be that you already have a server running. Switch to the terminal tab in Cloud 9 and try the following, then restart your server script:*

	kill $(ps ax | grep '[j]s' | awk '{ print $1 }')
	killall -9 apache2

### The server-side nightmare

Performance, bandwidth, backup, security, DoS etc. 

## XMLHttpRequest

> XMLHttpRequest is a JavaScript object that was designed by Microsoft and adopted by Mozilla, Apple, and Google. It's now being standardized in the W3C. It provides an easy way to retrieve data from a URL without having to do a full page refresh. 

The XMLHttpRequest object is available both in [client browser JavaScript](https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest), and in Max/MSP/Jitter JavaScript (with some small differences -- see the maxurl help file). 

A typical example looks like this:

```javascript
	function reqListener () {
		console.log(this.responseText);	// Browser
		post(this.responseText);		// Max
	}

	var req = new XMLHttpRequest();
	req.onreadystatechange = reqListener;
	req.open("get", "http://myttc.ca/york_university_common.json");
	req.setRequestHeader("Content-Type" , "application/json");
	req.send();
```

### Handling the response in Max:

If the response is JSON formatted, we can convert this into a regular JavaScript object:
	
	// convert JSON response into a javascript object:
	
	var body = JSON.parse(this.responseText);
	
	post(body);

Alternatively, in Max we could copy it into an existing [dict] object, so long as the names match:

	// copy JSON response into a dict:
	var d = new Dict("mydict");		// assumes the Max patch has a [dict mydict] object
	d.parse(this.responseText);

### Handling the response in a browser:

[See the MDN tutorial](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
