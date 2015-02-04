
function dictionary( dictname ) {
 	
	var dict = new Dict( dictname );
	var fn = dict.get("filename_out");
	
	if (fn){
		post("loading " +fn + "\n");
		outlet(0, fn);
	} else {
		error("no body\n");
	}
}