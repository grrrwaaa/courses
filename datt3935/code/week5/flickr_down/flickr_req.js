

function flickr_search(  ) {
 	if (arguments.length) {
	
		// because arguments isn't really an array...:
		var terms = [];
		for (var i=0;i<arguments.length;i++) {
			terms.push(arguments[i]);
		}
		
		var url = "https://api.flickr.com/services/rest/?";
		var obj = {
			method: "flickr.photos.search",
			api_key: "9a3014e37264a9c7ecca7ec8a3de8ed1",
			format: "json",
			nojsoncallback: 1,
			tags: terms.join(",")
		};
				
		var i=0;
		for (var o in obj){
			if (i++ !=0) url += "&";
			//post( o + "=" + encodeURIComponent(obj[o]) +"\n");
			url += o + "=" + encodeURIComponent(obj[o]);
		}
		post ("sending request for " + url + "\n");

		var d = new Dict();
		d.set("url", url);
		d.set("http_method", "get");
		// we don't want the maxurl object to parse the json.  it is better
		// if we do it manually inside of javascript with JSON.parse()
		//d.set("parse_type", "json");
		outlet(0,"dictionary", d.name);
	} else {
		error("need a search term");
	}
}