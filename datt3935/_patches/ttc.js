// useful so that we can use an external editor:
autowatch = 1;

// start by assuming the next bus has just left:
var nextbus = Date.now();

function bang() {
	
	// calculate remaining time in seconds:
	var remain = (nextbus - Date.now()) * 0.001;
	
	if (remain <= 0) {
		// make a new request:
		var req = new XMLHttpRequest();
		req.open("GET","http://myttc.ca/york_university_common.json");
		req.onreadystatechange = readystatechange;
		req.send();
	} else {
		// update time
		outlet(0, "remain", remain);
	}
}

function readystatechange()
{
	// is it ok?
	if (this.readyState != 4){
		error("transfer incomplete");
		return;
	}
	//post("total_time : "+ this._getResponseKey("total_time")+"\n");
	//post("size_download : "+ this._getResponseKey("size_download")+"\n");
	
	// copy JSON response into a dict:
	var d = new Dict("ttc");
	d.parse(this.responseText);
	
	// convert JSON response into a javascript object:
	var body = JSON.parse(this.responseText);
	
	var firstroute = body.stops[0].routes[0];
	
	// now iterate the due busses until we find one in the future:
	for (var i=0; i<firstroute.stop_times.length; i++) {
		var bus = firstroute.stop_times[i];
		var due = bus.departure_timestamp*1000;	// convert to ms
		if (due > Date.now()) {
			nextbus = due;
			outlet(0, "route", bus.shape, "\n");
			var date = new Date(due);
			outlet(0, "msg", "The next bus will be at " + date.getHours() + ":" + date.getMinutes(), "\n");
			break;
		}
	}
}