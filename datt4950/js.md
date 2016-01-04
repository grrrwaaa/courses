# JavaScript

[JavaScript](http://en.wikipedia.org/wiki/JavaScript) (JS) is a language of growing importance at the intersection of media/culture technology:

- It has become the de facto 'language of the web' (following the failure of Java applets and resistance to plugins such as Flash), having evolved from lightweight scripting roots to a full-fledged application language with powerful capabilities in HTML5. 
- Not only is it used pervasively in client browser-based applications, it is also used for high-performance server applications, particularly using the [node.js](http://nodejs.org/) system. 
- JS has also been used as an embedded scripting language for desktop applications by Google, Adobe, OpenOffice, Apple, MicroSoft, Qt, GNOME, etc., including many media-oriented applications such as Max/MSP/Jitter, [Processing](http://en.wikipedia.org/wiki/Processing.js), Logic Pro, Unity, DX Studio, Maxwell Render, Flash, etc., and many games/game engines.

**Note: Despite the similarity of name, JavaScript has no particular relation to Java.** JavaScript is however also known as [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), JScript, and ActionScript.

### For media/culture technology purposes:

- A browser-based JS application will run on Windows, OSX, Linux, Android, iOS etc., so long as browser applications are up to date. In recent years this has meant that even low-level audio signal processing and 3D OpenGL are available for use. 
- Browser and server-based applications open up easy possibilities to reach out to vast audiences and connect to social and other media networks, to explore collaborative interfaces, to interact with the increasing number of devices supporting HTTP and WebSocket APIs, etc.
- Examples:
	- [Live coding audio (and graphics)](http://gibber.mat.ucsb.edu/)
	- [Shadertoy](https://www.shadertoy.com/)
	- [Jellyfish](http://aleksandarrodic.com/p/jellyfish/) and [Fish](http://webglsamples.org/fishtank/fishtank.html) and [Horses](http://empaempa.github.io/GLOW/examples/complicated/) and [Cars](http://alteredqualia.com/three/examples/webgl_cars.html) and [Reaction Diffusion](http://cake23.de/turing-fluid.html)
	- [World population globe](http://globe.chromeexperiments.com/); the globe itself is [open source](http://www.chromeexperiments.com/globe)

Nevertheless, JavaScript is not the greatest language, and incorporates some rather poor designs; we'll work through and around those as we go.

<!--

ECMAScript 5 is a reduced and modified set of JavaScript that aims to remove some of the bad parts. You might be able to use ES5 in modern browsers, by placing ```"use strict"``` at the head of each function:

```
function main() {
	"use strict";
	// all your ES5 script here:
	// ...
}
```
-->

### Flexible, fast, well-supported:

- JS is a primarily imperative, procedural language (just like C, Java, Python, etc.), however it also supports functional programming features such as first-class functions. It has been described as Lisp in C's clothing. It is dynamically-typed and object-based, but uses a more flexible, dynamic [prototype-based](http://en.wikipedia.org/wiki/Prototype-based_programming) rather than static class-based inheritance. 

- Although it is a dynamic language, JS virtual machines such as [Google's V8](http://en.wikipedia.org/wiki/V8_(JavaScript_engine)) can achieve remarkably high performance through implicit Just-In-Time compilation to machine code.  

- The JS community is vast, and the available libraries, modules, frameworks, extensions, etc. are correspondingly huge. For example [npm](https://www.npmjs.org/) lists over 100,000 (at time of writing) libraries for node.js desktop/server-side applications. 

- JS has become the language of choice for several Introduction to Computer Science (CS101) courses, including at [Stanford University](http://www.stanford.edu/class/cs101/) (also [here](https://www.coursera.org/course/cs101)). The Khan Academy also offers [a free, online course](https://www.khanacademy.org/cs).

## Additional learning resources:

- [Eloquent JavaScript](http://eloquentjavascript.net)
- [W3C JavaScript Guide](http://www.w3schools.com/js/)
- [Mozilla JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Codecadamy](http://www.codecademy.com/tracks/javascript)
- [Khan Academy](https://www.khanacademy.org/cs/programming)
- [Stanford CS101](https://www.coursera.org/course/cs101)
- [The Node handbook](http://www.nodebeginner.org/)
- [How to Node](http://howtonode.org/)
- [WTFJS](http://wtfjs.com/)
- JavaScript: The Good Parts, Douglas Crockford, O'Reilly

## Brief overview of the language

### TL;DR:

- **The best parts**
	- Functions are first-class objects
		- anonymous functions, functions as properties, arguments, return values; closures, callbacks, currying etc.
	- Dynamic objects with prototypal inheritance
		- No limitation to pre-defined types and classes
	- Object and array literals
		- Convenient notation that became JSON
		
- **The worst parts**
	- JavaScript tries to make things easier for you, which eventually makes you confused.
	- Variables are global by default
		- Any variable defined outside a function (with ```var``` or without), 
		- any inside a function without using ```var```
	- Calling a constructor without ```new``` will bind ```this``` to the global object and throw no errors
		- Capitalize constructors to help you notice these bugs, or
		- Build objects without using ```new``` and constructors.
	- Scope is function-level, not block-level. 
		- Variables declared in a block are visible throughout the function. Declare all variables at the function start. 
	- ```typeof null``` -> object, ```typeof array``` -> object
	- Too many falsy values, and falsiness used to widely.
		- ```false, 0, NaN, '', null, undefined``` are falsy
		- Missing values are ```undefined```, not ```null```. 
		- Use ```===``` and ```!==```, not ```==``` and ``!=``.  
	- Iterating objects will pick up properties and methods from the prototype chain. 
		- Use ```.hasOwnProperty()```.
	- Optional syntax means that mistakes are often not found by the parser
		- Always put semicolons, always wrap blocks in { }. 
	- There are lots of bad syntax possibilities and bad library functions in JavaScript that you will find in production code and online tutorials. Don't trust what you find.
	- Regular expressions are hard to read and write, causing many bugs (and security vulnerabilities!)

### Types

JavaScript types are: number, string, true, false, null, undefined, and object. Numbers and strings are object-like in having methods, but they are immutable. Arrays, functions, regular expressions are objects. 

```typeof n``` returns the type of variable ```n``` as a string, which may be: ```number, string, boolean, undefined, function, object```; however if the operand is an array, or null, it will also return ```object```. 

### Strings

Strings are bounded by ```"``` or ```'```. Characters are 16-bit. Special characters are escaped: ```\", \', \\, \/, \n (newline), \t (tab)```. Also character codes, e.g. ```"A" === "\u0041"```.

Strings are immutable but can be concatenated with ```+``` and manipulated through methods.

```
"seven".length == 5
'cat'.toUpperCase() === 'CAT'
```

```string.charAt(n)``` returns the character (a string of length 1) at position n. ```string.charCodeAt(n)``` returns a character code (integer). ```string.fromCharCode(n)``` converts back to a string.

```string.indexOf(s, i)``` returns the first index of s, starting at position i. If not found, it returns -1. See also ```string.lastIndexOf```.

```string.slice(start, end)``` makes a copy of a subsection of the string. Indices can be negative.

```string.split(separator, limit)``` creates an array of strings according to a separator (which can be ''). Limit is optional. 

### Numbers

There is no integer type, all numbers are floats. ```10``` is the same as ```10.0``` is the same as ```1e1```. Convert a float to an integer using ```Math.floor(), Math.ceil()``` etc. 

All kinds of unexpected fun can happen from the fact that floats cannot accurately represent many numbers. This can be surprising, e.g. ```0.1 + 0.2 === 0.3``` returns false. See [wtfjs](http://wtfjs.com/) for more examples.

```1/0``` returns ```Infinity```. 

```Math.sqrt(-1)``` and similar return ```NaN```. You can check with ```isNaN(number)```. Note that ```NaN``` is not equal to itself.

To check if a value is a usable number:

```
var isNumber = function(v) {
	return typeof v === "number" && isFinite(v);
}
```

There are several built-in numbers (constants) such as ```Math.PI```.

Numbers have several methods for conversion to string, such as ```number.toString()```, ```number.toFixed(n)```, ```number.toPrecision(n)``` etc.

### Booleans & truthiness

```true``` and ```false``` are the only boolean values, but in most cases JavaScript uses a more permissive sense of truthiness/falsyness, because of automatic type coercion.

*falsy* values are ```false, null, undefined, '', 0, NaN```; all other values are *truthy*. An ```if``` condition (and similarly ```case, while, for```) will test for truthiness, not truth. The ```!``` unary operator uses truthiness (not truth), and the boolean operators ```&&, ||``` also use truthiness. 

To explicitly use truth (not truthiness), use the ```===``` comparators.

### Control flow

The common forms:

```
if (<cond>) {
	// "then" clause
} else if (<cond2>) {
	// alternate then
} else {
	// all other cases
}

for (<init>; <cond>; <increment>) {
	// body
}

// note: the order is unpredictable.
for (<name> in <obj>) {
	// body
}

while (<expr>) {
	// until expr is falsy
}
```

### Objects

An object maps keys (strings, including '') to values (anything at all except ```undefined```). A key only appears once. Objects collect & organize data. Keys can be added, modified and removed.

```
var emptyobj = {};
var binarytree = {
	"left": {			// note: quotes around keys are optional
		"left": 10,		// so long as key name is valid syntax
		"right": 20		// for a JavaScript variable name
	},
	"right": {
		"left": 5,
		"right": 13
	}
}

// indexing objects:
binarytree["left"]["left"]; 	// 10
binarytree.left.left; 	// 10
binarytree.middle;		// undefined
binarytree.middle || 7;	// 7
binarytree.middle.middle;	// throw TypeError
binarytree.middle && binarytree.middle.middle;	// undefined

// Warning: indexing will also check methods and prototypes:
binarytree.toString;	// returns a function

// adding & removing keys:
emptyobj.x = 10;
emptyobj.x;	// 10
delete emptyobj.x;
emptyobj.x;	// undefined

// objects are passed by reference (i.e. they are not copied):
z = binarytree.left;
z.right = 999;
binarytree.left.right;	// 999

```

### Arrays

JavaScript arrays are not linear allocations of memory (as in C), but objects with an array-like interface. Like objects, array values need not be the same type. Values can be of any type.

```
var emptyarray = [];
var myarray = [
	"zero", "one", "two", "three", "four"
];
emptyarray[1]; 		// undefined
myarray["1"]; 		// "one"
myarray[1]; 		// "one"
emptyarray.length;	// 0
myarray.length;		// 5

for (var i=0; i < myarray.length; i++) {
	console.log(i, myarray[i]);
}

// grow:
myarray[myarray.length] = "five";
myarray.push("six"); 	// myarray is now: 
// ["zero", "one", "two", "three", "four", "five", "six"]
myarray.length;		// 7

// shrink:
myarray.pop();	// returns "six", myarray is now:
// ["zero", "one", "two", "three", "four", "five"
myarray.length = 3;
// myarray is now ["zero", "one", "two"]

// .length is not necessarily to be trusted:
emptyarray[1000] = 1;	
emptyarray.length;	// 1001
```

Because arrays are really objects, we can add non-numeric properties and methods to individual arrays. We can also change their ```.prototype```. Arrays inherit from ```Array.prototype``` by default, which gives them many useful methods (and the ```.length``` special property). 

Don't use ```delete``` on arrays; it will leave ```undefined``` holes in them. Instead use ```.splice(index, elements_to_remove, elements_to_add)```:

```
["a", "p", "q", "c"].splice(1, 2, "b");	// ["a", "b", "c"]
```

```array.concat(items...)``` will create a new array (a shallow copy) and push items onto the end. ```array.slice(start, end)``` will create a shallow copy from a sub-section of the array. Do not confuse ```slice``` with ```splice```.

```array.join(separator)``` will turn the array into a string.

```array.shift()``` removes and returns the first element, ```array.pop()``` removes and returns the last element. ```array.unshift(item)``` prepends to the start of the array, ```array.push(item)``` appends to the end. 

```array.sort(comparefunc)```. The default comparefunc is alphabetic, so it will sort numbers incorrectly. Provide your own comparefunc, which takes two arguments and returns negative if the first item is lower, positive if the second item is lower, and zero if they are equal. E.g.:

```
// sort numbers properly:
array.sort(function(a, b) { return a - b; });
```

Multidimensional arrays are just arrays whose values are arrays. E.g. to create a 3x3 array of zeroes:

```
var z = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];
// or
var z = [];
for (var r=0; r<3; r++) {
	z[r] = [];
	for (var c=0; c<3; c++) {
		z[r][c] = 0;
	}
}
```

Note: since ```typeof myarray``` returns ```"object"```, we must use the prototype to distinguish objects & arrays:

```
var is_array = function(obj) {
	return obj && typeof obj === "object" && obj.constructor === Array;
}
```

### Functions

- Functions are *first-class* objects
- Functions provide scope

Functions are objects; they can have properties. Functions also store their context. As objects, they can be stored in variables, objects, arrays etc, and passed around as arguments & return values of other functions. For example, passing a function as an argument is commonly done when specifying callbacks. 

If a function is a property of another object, it is called a **method**. Functions themselves can also have methods.

```
var <name> = function <optional name>(<argument list>) {
	<body>
}

var add = function(a, b) {
	return a + b;
}
```

Note that functions are *hoisted* to the top of the program; that means functions don't have to be declared in order that they are used. You can use a function that is declared later in the program.

A function can be invoked with more or less values than specified in its definition. Extra arguments are ignored, missing arguments are ```undefined```. When invoked, functions also receive hidden variables ```this``` and ```arguments```.  

```arguments``` is an array-like object of all the arguments passed to the function, including excess arguments. It is not really an array, and only has the .length property and support for ```[]``` indexing. It is there to allow functions with variable numbers of arguments:

```
var sum = function() {
	var i, sum = 0;
	for (i=0; i<arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
}
```

What ```this``` refers to depends on how the function was invoked:
- as a method: ```this``` refers to the object invoking its method.
- as a constructor (using ```new```): ```this``` refers to the new object being created.
- via function```.apply()```: ```this``` is the first argument of apply (the second argument is a list of arguments passed to the function)
- via function```.call()```: ```this``` is the first argument of call (the remaining arguments are passed to the function)
- as a function: ```this``` refers to the global object. **This is a major cause of bugs!** In particular, calling a constructor without using ```new``` is a common mistake that leads to a terrible mess.
	
Functions can be defined anywhere an expression can appear, even inside other functions (in which case they can access private variables of the outer function). However, because of the way ```this``` is defined, inner functions do not inherit ```this``` from the outer function. The usual workaround is as follows:

```
myobj.outer = function() {
	var that = this;	// make a local reference
	var inner = function() {
		// can't use "this" here, as it would refer to the global object
		that.value = that.value + that.value;
	}
	
	inner();
}
```

If you can understand this, then you have mastered one half of JavaScript's complexity. 

By default functions link to ```Function.prototype```. Functions **also** have a ```.prototype``` property; do not confuse these two! A function's ```.prototype``` is an object whose ```.constructor``` is the function itself. 

#### Scope

**JavaScript has function scope, not block scope.** Within a function, the ```var``` statement defines the function's private variables. Best practice is to always declare these at the top of the function, since this is their scope (```if```, ```for``` and other blocks do not create new scopes). Forgetting this can easily lead to bugs.

Nested inner functions can access and modify variables defined their outer function scope -- even if the inner function has a longer lifetime (by being returned). Note that these are references, not copies. 

However, if the inner function declares a variable with ```var```, this is local to the inner function and will mask a same-named variable in the outer function scope. Note that the ```this``` and ```arguments``` of the outer scope are NOT visible in the inner scope.

Outside of functions, variables are always global. This can rapidly lead to bugs, so either put your variables inside of objects or wrap them in functions. Note, in the browser the global object is called ```window```.

In particular, we want to carefully chose what is exposed and what is hidden when creating **modules**. Modules are like libraries: re-usable code with a well-defined interface. A module should not modify any global variables or otherwise conflict with other modules. Module definitions are typically defined within a function that is immediately invoked to return the actual module itself.

```
var <modulename> = function() {
	var m = {};
	// populate m with the module's interface
	// any helper methods are defined with var to ensure they remain private
	// avoid use of "this"
	return m;
}();
```

### Inheritance

There are no classes, but each object links to a "prototype" from which properties can be inherited. By default, objects link to ```Object.prototype```. 

The prototype is used when we index a key that the object doesn't contain; in that case, it automatically tries to index the prototype; and so on until we reach Object.prototype, in which case we return undefined. This is *delegation*. 

Use ```obj.hasOwnProperty(key)``` to bypass the prototype chain.

Unlike classes, prototypes can be dynamically modified.

The way to write this in JavaScript is messy. When a function is invoked with ```new```, a new object is created with a link to the function's ```.prototype``` property. 

``` 
// define a function to be a constructor
// typically we capitalize constructor names:
var Quo = function(string) {
	// add "status" property to new object:
	this.status = string;
	// note, no return value needed (the returned object is implicit)
}

// add a method to the new prototype:
Quo.prototype.get_status = function() {
	return this.status;
}

// invoke constructor:
var q = new Quo("confused");
```

Alternatives:

```
var myobj = Object.create(prototype);
```

This applies the prototype explicitly and avoids using ```new``` at all.

```
var mytype = function(spec) {
	var that = {}; // or Object.create... 
	// initialize that according to spec
	// define private members as local (var) variables
	// define public members as properties of that
	// define private methods as local (var) functions
	// assign methods to that to make them public
	return that;
}
```

This style adds security through the private members/methods, but calling super methods becomes more clunky. It also allows us to procedurally build objects with different capabilities.

### JSON

The only syntax difference between object/array and JSON, is that object key names must be quoted:

```
{ "one": 1 }
```

Most JS environments now provide ```JSON.parse()``` and ```JSON.stringify()``` wich convert between JSON strings and Javascript objects, and vice versa. Otherwise, JSON libraries are available at json.org. 

### Exceptions

Throw exceptions with ```throw <exception-object>;```, and catch with the ```try...catch``` control flow. A throw will immediately exit the current flow. The exception-object can be anything, but typically an object with ```.name``` and ```.message``` properties for the ```catch``` to deal with:

```
try {
	throw { name: "MyError", message: "It all went horribly wrong" };
} catch (e) {
	console.log("error " + e.name + ": " + e.message);
}
```

### Regular Expressions

A *regular expression* specifies the syntax of a simple (type-3) language. They are used to search and replace information from strings. RegExps are usually fast, but are difficult to write (and read!), which means they are common sources of bugs.

A *pattern* is a template for text that may have fixed and optional or variable components. Patterns either match a strong, or they don't. A *capture* within a pattern identifies the part of the pattern that we want to return. 

Regular expressions are denoted with ```/``` delimiters:

```
var r = /pattern/;
```

- anchors:
	- ```^``` at the start anchors the pattern at the beginning of the string. Without it, the pattern can skip characters until it finds a matching start point.
	- ```$``` at the end anchors the pattern at the end of the string
- character classes:
	- ```.``` matches any character
	- ```[...]``` describes a set, range or both of characters. E.g. [A-Za-z] matches all alphabetic characters.
	- ```[^...]``` as above, but negative: matches any character not in the set described by ...
	- ```\...``` is an escape: it is used to match literals such as /, \, ^, $, +, -, *, |, ?, ., {, }, [, ], (, ),  etc. that would otherwise be interpreted as regular expression syntax
	- ```\d``` matches any digit, i.e. the same as ```[0-9]```
	- ```\n``` matches a newline, ```\t``` matches tab, ```\u0041``` matches "A", etc.
	- ```\s``` matches most whitespace characters
	- ```\w``` matches alphabetic and numeric characters
	- ```\1``` matches whatever was captured in group 1, etc.
	- any other characters are literals -- the same character must appear in sequence in the input
- modifiers:
	- ```?``` as a suffix means the preceding pattern is optional
	- ```*``` as a suffix matches the preceding pattern zero or more times
	- ```+``` as a suffix matches the preceding pattern one or more times
	- ```{3}``` as a suffix matches the preceding pattern a specific number of times, in this case 3 times.
	- ```{0,3}``` as a suffix matches the preceding pattern a specific number of times, in this case 0, 1, 2, or 3 times.
	- ```a|b``` the vertical bar | means either a or b will match
- captures & groups:
	- ```(...)``` means the pattern in ... should be captured.
	- ```(?:...)``` means the pattern in ... is a non-capturing group. It is useful for applying prefix/suffix modifiers to a group without capturing them. 
- flags (placed after the final ```/```):
	- i: ignore case throughout, i.e. ```e``` matches both e and E.
	- m: multi-line, ^ and $ can match line-end characters
	- g: global, can match multiple times  

Use ```regex.exec(string)``` to apply the pattern to a string; it will return an array of captures. 

Use ```regex.test(string)``` to simply test for matches; it will return true or false.

```string.match(regexp)``` applies a regular expression to a string. If the g flag is given, it produces an array of all the matches (instead of an array of captures). Otherwise it is the same as ```regex.exec```.

```string.replace(s, v)``` replaces all instances of s with v. s can be a regular expression. If s is a string, it only replaces once. v can be a string or a function; if it is a function, it is called for each match and the result used as the replacement. If it is a string, the "$" character has special meaning:
- ```$&``` the matched text
- ```$1``` capture group 1
- ```$$``` the "$" character

```string.search(regex)```: like ```string.indexOf```. 

### Danger zone

Since prototypes are objects, we can add methods to them as we need. This also includes Array.prototype, String.prototype, Object.prototype etc. Adding to these can be convenient, but also dangerous -- especially if the code you are writing will interact with other people's code. **Never augment built-in prototypes when writing a module.**

```eval()``` takes a string, parses it as JavaScript, and runs it. ```setTimeout``` and ```setInterval``` can also take string arguments and use eval. ```new Function``` similarly compiles arbitrary code. This capability is extremely powerful, but very very dangerous and difficult to debug.
