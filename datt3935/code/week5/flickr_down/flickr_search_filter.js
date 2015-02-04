
function dictionary( dictname ) {
	post("received dictionary:", dictname);

	var dict = new Dict( dictname );
	var body = dict.get("body");
	var json = JSON.parse(body);
	
	if (!json || !json.photos) {
		error("Invalid json for search");
		return;
	}
	
	for (var i=0; i< json.photos.photo.length; i++) {
		var out_dict = new Dict();
		var o = json.photos.photo[i];
		var url ="https://farm" + o.farm + ".staticflickr.com/" + o.server + "/" + o.id +"_" +o.secret + "_c.jpg";
		
		var imagepath =  "~/Desktop/flickr_down/"+ o.id +"_" +o.secret + "_c.jpg";
		out_dict.set("url", url);
		out_dict.set("http_method", "get");
		out_dict.set("filename_out", imagepath);
		out_dict.set("overwrite_output_file", 1);
		//post( url + "\n");
		if (i > 29)
		  return;
		outlet(0, "dictionary", out_dict.name);
	}
}