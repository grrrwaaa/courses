var imgs=[]
// Here we fetch data and use javascript's internal JSON.parse method to read
// individual elements from and array of objects (aka dictionaries)
function on_flickr_search() {
	if (this.readyState ==4){
		post("got the flickr\n");
 		var r = JSON.parse(this.responseText);
		post(this.responseText + "\n");
		if (!r.photos){ error("no photos");  return; }
		if (!r.photos.photo && r.body.photos.photo.length){ 
			error("no photo array");  return;
		}
		var p = r.photos.photo
		for (var i=0;i<p.length;i++) {
			imgs.push( p[i] );
			if (i >4) break;
		}
	}
}

on_flickr_image_down = function() {
	if (this.readyState ==4){
		post("got image\n");
	} else {
		post("got image, wrong readystate\n");
	}
}

function flickr_fetch(  ) {
 	for(var i=0;i<imgs.length;i++){
	var o =imgs[i];
	var url ="https://farm" + o.farm + ".staticflickr.com/" + o.server + "/" + o.id +"_" +o.secret + "_c.jpg";
	var imagepath =  "~/Desktop/tmp/"+ o.id +"_" +o.secret + "_c.jpg";
	post ("now fetching " + url + "\n");
	var pp = new XMLHttpRequest();
	pp._setRequestKey("filename_out",imagepath);
	pp._setRequestKey("overwrite_output_file","1");
	pp.open("GET", url);
	pp.onreadystatechange = on_flickr_image_down;
	pp.send();
	}
}

function flickr_search(  ) {
 	if (arguments.length) {
		var terms = []
		for (var i=0;i<arguments.length;i++) {
			terms.push(arguments[i]);
		}
		var term = terms.join(" ");
		var xhr = new XMLHttpRequest();
		term = encodeURIComponent(term);
		post(term);
		var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=83735cb9d62ebf3be2380f3027f281cb&tags=" + term + "&format=json&nojsoncallback=1";
		post ("now fetching " + url + "\n");
		xhr.open("GET",url);
		xhr.onreadystatechange = on_flickr_search;
		xhr.send();
	} else {
		error("need a search term");
	}
}