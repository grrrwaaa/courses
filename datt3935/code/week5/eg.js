autowatch = 1;

function flickr_search() {
	
	var terms = [];
	for (var i=0; i<arguments.length; i++) {
		terms.push( arguments[i] );
	}
	var combined = terms.join(",");
	
	var url = "http://nowhere.com?";
	var args = {
		method: "search",
		tags: combined,
	}
	
	var i = 0;
	for (var key in args) {
		if (i > 0) {
			url = url + "&";
		}
		i++;
		
		url = url + key + "=" + encodeURIComponent(args[key]);
	}
	
	var d = new Dict();
	d.set("url", url);
	d.set("http_method", "get");
	outlet(0, "dictionary", d.name);
}










function dictionary(name) {
	
	var d = new Dict(name);
	
	// operate on d...
	
	outlet(0, "dictionary", d.name);
}





