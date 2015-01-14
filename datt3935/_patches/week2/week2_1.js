
// tell max to watch this file for changes:
autowatch = 1;

// post a message so that we know it is working:
// (post() is a method specific to JavaScript in Max)
// (in a browser, use console.log() instead)
post("ok\n");

// respond to the "bang" message from max:
function bang() {
	post("banged!\n");
}

function square(s) {
	post("hello from " + x + "\n");
	s = s * s;
	// output s from the first (zeroth) outlet:
	outlet(0, s);
}

function gotresponse() {

	// handle possible errors:
	if (this.status != 200) {
		error("bad status:" + this.status + "\n");
		if (this.status == 404) {
			error("URL not found\n");
		}
		return;
	} 
	if (this.readyState != 4) {
		error("response not received:" + this.readyState + "\n");
		return;
	}
	
	/* Max 7 only:
	var d = new Dict("ttc");
	d.parse(this.responseText);
	*/
	
	var data = JSON.parse(this.responseText);
	
	// equivalent Max dict format: data::stops[0]::routes[0]::stop_times
	var stop_times = data.stops[0].routes[0].stop_times;
	
	// get time now:
	var now_in_ms = Date.now();
	var now_in_secs = now_in_ms * 0.001;
	
	// check through each stop_time until we find one in the future
	// i++ is the same as i = i + 1
	for (var i = 0; i < stop_times.length; i++) {
	
		var bus = stop_times[i];
		
		// compute time remaining until next bus:
		var time_to_bus = bus.departure_timestamp - now_in_secs;
	
		// is it in the future?
		if (time_to_bus > 0.) {
			
			// output the result:
			outlet(0, "name", data.name);
			outlet(0, "shape", bus.shape);
			outlet(0, "time", bus.departure_time);
			outlet(0, "time_to_bus", time_to_bus);
			
			// we found a result, no need to continue the for loop:
			break;
		}
	}
}

function getnextbus() {
	// create a new XML HTTP request object
	var req = new XMLHttpRequest();
	// define the http_method and URL:
	req.open("GET", "http://myttc.ca/york_university_common.json");
	// tell the request what to do when it gets a response:
	// (this is setting an aynchronous callback. 
	// note that we don't say gotresponse() or "gotresponse")
	req.onreadystatechange = gotresponse;
	// start the request running:
	req.send();
}







