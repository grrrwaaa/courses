# Node.js

Dynamic sites, web apps and services can use any technology capable of TCP sockets and HTTP parsing, but we will concentrate on using **node.js** (AKA Node), which is also JavaScript based and runs on Mac/Linux/Windows. We can also use Node for general programming tasks, including static site generation.

>Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

**Windows**: download the installer from [node.js](http://nodejs.org/download/)

To run, open a command prompt (Start Menu / Accessories / Command Prompt or Start Menu / "cmd" / enter), and type "node" (followed by enter). 

**Mac**: download the installer from [node.js](http://nodejs.org/download/) or install via brew: 

	brew install node
 
To run from a console (Applications / Utilities / Console) type "node" followed by enter. 

Mostly node is used from a console (AKA terminal, AKA command prompt). On mac, the terminal is in Applications / Utilities. To issue commands as a superuser, type "sudo" before the command. On Windows, it is in Start / Accessories / Command Prompt, however you can also open it by pressing the Windows key, typing "cmd", and enter. To open as an administrator, press the Windows key, type "cmd", then ctrl-shift-enter. 

## What does Node do?

Actually quite a lot. At its core, Node is an event-based application framework, which is primarily designed for file and web based input & output. [Here is the full reference manual](http://nodejs.org/api/index.html), which gives a brief idea. It has a very strong emphasis on asynchronous programming, which means lots and lots of callbacks!

Here's a minimal hello world server:

```
var http = require('http');
var app = http.createServer(function (req, res) {
  res.setHeader(200, {'Content-Type': 'text/plain'});
  res.end("hello world");
});
app.listen(3000);
```

Here's a minimal hello world JSON server:

```
var http = require('http');
var app = http.createServer(function (req, res) {
  res.setHeader(200, {'Content-Type': 'text/plain'});
  res.end(JSON.stringify({ "hello": "world" }));
});
app.listen(3000);
```

You can build very complex applications with what Node provides, but a lot of hard work has already gone into solving common problems, and we can leverage that through NPM:

## NPM (packages)

Node can be extended with additional modules through [NPM](https://www.npmjs.com), the node package manager. There are more than 100,000 packages available!

On Windows, open a command prompt **as administrator** and type npm. If you have an error "ENOENT, stat 'C:\Users\RT\AppData\Roaming\npm'", then manually create the folder at this path and try again. 

On Mac, type "npm" in the console. 

Typically when you create a new node project, you'll create a *package.json* file to describe it. Here's a small example package.json:

```javascript
{
	"name": "example",
	"description": "A small example Node.js project for DAT 3935",
	"dependencies": {
		"express": "4.x",
		"xmlhttprequest": "*"
	}
}
```

A full list of the possible fields in package.json is [here](http://browsenpm.org/package.json).

The dependencies dictionary lists the additional npm modules (and respective versions thereof) used by our project. Once you have created your package.json, you can run 

	npm install

in the same path, and all the dependent modules will be downloaded and built in the ```/node_modules``` subfolder. 

We're going to look at a couple of modules in particular.

## xmlhttprequest module

The [xmlhttprequest](https://www.npmjs.com/package/xmlhttprequest) module mimics the browser's XMLHttpRequest object, so that code for the browser can be easily used in the server.

To load in this module, add this to your header:

```javascript
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
```

Then you can use it just as you did in the browser:

```javascript
var req = new XMLHttpRequest();
req.open("GET", "http://myttc.ca/york_university_common.json");
req.onreadystatechange = function() {
	if (this.status == 200 && this.readyState == 4) {
		var data = JSON.parse(this.responseText);
		console.log(data);
	}
};
req.send();
```

Note that, unlike the browser, xmlhttprequest in Node.js supports cross-origin requests. Many mash-up services are now constructed server-side, with client code dedicated to rendering.

## Express

Express is one of the most widely-used packages for building web servers in Node. Pull in express, and create the main app, as follows:

```
var express = require('express');
var app = express();
```

Here's our plain old hello world:

```
app.get('/', function(req, res){
  res.send('hello world');
});

// set up other routes here

app.listen(3000);
```

Routes are paths after the domain name in the application. They don't need to resolve to actual files, but can be thought of as API methods. [Express supports great flexibility in specifying routes](http://expressjs.com/guide/routing.html).

The [documentation](http://expressjs.com/4x/api.html) shows how multiple routes can be set up, handling many different kinds of requests and responses. For example, we can serve json data simply by passing an object rather than a string:

```
app.get('/json', function(req, res){
  res.send({ "hello": "world" });
});
```

## Cloud 9 IDE

For server-side programming, we can use the [Cloud 9 IDE](https://c9.io). You can sign up for a free account using your Github/Bitbucket ID. Cloud 9 gives you a Ubuntu Linux based server, and a browser-based IDE including multi-user live programming. 

*If you have trouble with Error: EADDRINUSE, it may be that you already have a server running. Switch to the terminal tab in Cloud 9 and try the following, then restart your server script:*

	kill $(ps ax | grep '[j]s' | awk '{ print $1 }')
	killall -9 apache2
