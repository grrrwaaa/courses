// load in the HTTP module:
var http = require("http");

// load in external node_modules:
var express = require("express");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var req = new XMLHttpRequest();
req.open("GET", "http://myttc.ca/york_university_common.json");
req.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		console.log(data);
	}
}
req.send();

console.log("hello world");

var data = {
	"name": "graham",
	"drink": "coffee",
	"status": "Headache"
}

var app = express();

/*
app.get("/", function(req, res) {
	res.send("hello from graham");
});
*/

app.get("/api/foo", function(req, res) {
	res.send("hello from foo");
});

app.get("/api/bar", function(req, res) {
	res.send("hello from bar");
});

app.get("/api/json", function(req, res) {
	res.send(data);
});

app.use(express.static(__dirname + '/public'));

app.listen(4000);
console.log("listening on port 4000");