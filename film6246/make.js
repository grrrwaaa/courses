#!/usr/bin/env node

var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var child;

var marked = require('marked');
var mustache = require('mustache');
var highlight = require('highlight.js');
/*
// see https://github.com/chjj/marked
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});*/

marked.setOptions({
	highlight: function (code, lang, callback) {
		return highlight.highlightAuto(code).value;
	}
});

// default config:

config = {
	src: ".",
	dst: "../_site/film6246",	
};

nav = [];

var walk = function(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function(file) {
			var c = file.charAt(0);
			if (c == '.' || c == '_') {
				// ignore:
				if (!--pending) done(null, results);
			} else {
				var path = dir + '/' + file;
				fs.stat(path, function(err, stat) {
					if (stat && stat.isDirectory()) {
						/*
						// recurse
						walk(path, function(err, res) {
							results = results.concat(res);
							if (!--pending) done(null, results);
						});
						*/
						// skip:
						if (!--pending) done(null, results);
					} else {
						var name = file;
						var ext = "";
						var i = file.lastIndexOf('.');
						if (i > 0) {
							name = file.substr(0, i);
							ext = file.substr(i+1).toLowerCase();
						}
						
						if (ext == "md") {
						
							var fileobj = {
								file: file,
								path: path,
								dir: dir,
								name: name,
								ext: ext,
								// output type should depend on ext... 
								dst: config.dst + '/' + name + ".html",
							
							};
						
							results.push(fileobj);
						
							// add to nav:
							nav.push({
									name: name,
									href: name + ".html",
								});
						}
						
						if (!--pending) done(null, results);
					}
				});
			}
		});
	});
};

template = fs.readFileSync("template.html", "utf-8");
if (!template) template = "Mmm... {{{body}}}";

parse = function(fileobj) {
	// parse by extension:
	if (fileobj.ext == "md") {
		console.log(fileobj);
		
		var data = fs.readFileSync(fileobj.path, "utf-8");
		
		if (!data) {
			return console.log(err);
		}
		
		console.log(data);
		
		// TODO: parse out header YAML/JSON?
		var view = {
			name: fileobj.name,
			nav: nav,
		};
		
		view.title = view.name;
		
		// give a chance for the markdown to embed metadata:
		data = mustache.render(data, view);
		// convert to html:
		view.body = marked(data);
		
		// now embed this in the page template:
		var html = mustache.render(template, view);
		
		console.log(html);
		
		// save:
		fs.writeFileSync(fileobj.dst, html);
		console.log("wrote", fileobj.dst);
	}
}


// map the site:
walk(config.src, function(err, results) {


	// process
	
	results.forEach(parse);
	
	console.log("ok");
});

// now watch:
watcher = fs.watch(config.src, {}, function(event, file) {
	console.log(event, file);
	var dir = config.src;
	
	if (event == "change" || event == "rename") {
		var path = dir + '/' + file;
		
		fs.stat(path, function(err, stat) {
			if (stat && stat.isDirectory()) {
			
			} else {
				var name = file;
				var ext = "";
				var i = file.lastIndexOf('.');
				if (i > 0) {
					name = file.substr(0, i);
					ext = file.substr(i+1).toLowerCase();
				}
				var fileobj = {
					file: file,
					path: path,
					dir: dir,
					name: name,
					ext: ext,
					// output type should depend on ext... 
					dst: config.dst + '/' + name + ".html",
				};
				
				parse(fileobj);
			}
		});
		
	}
});
