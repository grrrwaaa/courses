#!/usr/bin/env node

/*
	Scan a content folder of files 
	 produce a content tree (a map of site folder structure)
	
	Tree + templates + locals + views -> output files
	
	Live preview of website -- 
		(editable in browser?)
	
	mustache: https://github.com/janl/mustache.js
	{{name}} is HTML escaped, {{{name}}} is not escaped.
	{{#name}} starts a section, {{/name}} ends it. Will repeat for arrays.
		names and section names can be functions
	{{^name}} is an inverted section (the else clause)
	{{!ignored}}
	{{> partialname}}, inherits context
	
	
	
*/

var fs = require('fs');
var path = require('path');
var sys = require('sys');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var child;

var marked = require('marked');
var yaml = require('js-yaml');
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
	dst: "_site",	
};

hidden_folders = {
	"node_modules": true,
	"code": true,
};

watchable_types = {
	".md": true,
	".html": true
};

// just gives you the file paths:
function map_src_dir(dir_path) {
	var map = {};
	var filename_list = fs.readdirSync(dir_path);
	filename_list.forEach(function(file_name) {
		var c = file_name.charAt(0);
		var file_path = path.join(dir_path, file_name);
		// ignore hidden folders:
		if (c != "." && c != "_") {
			var stat = fs.statSync(file_path);
			if (stat && stat.isDirectory()) {
				// recurse to subfolder?
				// exceptions:
				if (!hidden_folders[file_name]) {
					map[file_name] = map_src_dir(file_path);
				}
			} else {	// ignore extensionless files
				
				var ext = path.extname(file_path).toLowerCase();
				var base = path.basename(file_path, ext);
				var dir = path.dirname(file_path); 
				
				if (watchable_types[ext]) {
					map[file_name] = {
						path: file_path,
						ext: ext,
						base: base,
						dir: dir
					};
				}				
			}
		}
	});	
	return map;
}

// build up a map of the source folder, skipping any ignored files:
var sitetree = map_src_dir(config.src);

// temporary hack -- this should be folder-specific, or even derived from metadata
template = fs.readFileSync("template.html", "utf-8");
if (!template) template = "{{{body}}}";

// 
var html_partials = {

};

var md_partials = {

};

//console.log(sitetree);

function parse_meta(fileobj, nav) {
	if (fileobj.ext == ".md") {
	
		//console.log("read", fileobj);
	
		var data = fs.readFileSync(fileobj.path, "utf-8");
		if (!data) {
			console.log(err);
			return;
		}
		
		var view = {};
		// grab header variables (YAML) from file:
		// search in file up to first instance of "\n---":
		var n = data.indexOf("\n---");
		if (n >= 0 && n < 1000) {
			try {
				// try to parse this as yaml:
				view = yaml.safeLoad(data.slice(0, n), {
					filename: fileobj.path,
					onWarning: function(w) {
						console.log("warning", w);
					}
				});
				// skip ahead to next newline:
				data = data.slice(data.indexOf("\n", n+1));
				//console.log(fileobj.path, data);
			} catch(e) {
				// just ignore it -- assume that this is not a YAML header
			}
		}
		view.nav = nav;
		view.data = data;
		
		if (!view.name) {
			view.name = fileobj.base;
		}
		
		if (!view.title) {
			// search in doc for first # tag:
			var h1_regex = /#\s*([^#\n].*)/;
			var captures = h1_regex.exec(data);
			//console.log(captures);
			if (captures != null && captures[1] != null) {
				view.title = captures[1];
				//console.log("TITLE", view.title);
			} else {
				// generate name from file:
				view.title = view.name.charAt(0).toUpperCase() + view.name.slice(1).toLowerCase();
			}
		}
		
		return view;
	}
}

function generate_html(fileobj, nav) {
	
	if (fileobj.ext == ".md") {
		
		var view = fileobj.view; 
		var data = view.data; 
		
		// give a chance for the markdown to embed metadata:
		data = mustache.render(data, view, md_partials);
		// convert to html:
		view.body = marked(data);
		// now embed this in the page template:
		var html = mustache.render(template, view, html_partials);
		
		//console.log(html);
		
		// save:
		var dst = path.join(config.dst, fileobj.dir, fileobj.base + ".html");
		fs.writeFileSync(dst, html);
		//console.log("wrote", dst);
	}
}

function navsorter(a, b) {
	
	
	if (typeof a.importance == "number" && typeof b.importance == "number") {
		return b.importance - a.importance;
	} else if (typeof a.importance == "number") {
		return a.importance;
	} else if (typeof b.importance == "number") {
		return b.importance;
	} else if (a.name < b.name) {
		return -1;
	} else if (a.name > b.name)  {
		return 1;
	} else {
		return 0;
	}
}

function generate(root) {
	var nav = [];
	
	// first pass gathers metadata:
	for (name in root) {
		var o = root[name];
		if (o.ext) {
			o.view = parse_meta(o, nav);
			nav.push({
				name: (typeof o.view !== "undefined") ? o.view.title : o.base,
				href: o.base + ".html",
				importance: (typeof o.view !== "undefined") ? o.view.importance : 0,
			});
		} else {
			// recurse to subfolder:
			generate(o);
		}
	}
	
	// second pass generates shared metadata:
	nav.sort(navsorter);
	
	// final pass renders:
	for (name in root) {
		var o = root[name];
		if (o.ext) {
			generate_html(o);
		}
	}
}

generate(sitetree);


/*
// now watch:
watcher = fs.watch(config.src, {}, function(event, file) {
	console.log(event, file);
	var dir = config.src;
	if (event == "change" || event == "rename") {
		generate(sitetree);
		
		console.log("ok");
	}
});
*/