var http = require('http');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var express = require('express');

var data = { a: 1 };

// update this with open data:
var req = new XMLHttpRequest();
req.open("GET", "http://myttc.ca/york_university_common.json");
req.onreadystatechange = function() {
	if (this.status == 200 && this.readyState == 4) {
		data = JSON.parse(this.responseText);
		console.log(data);
	}
};
req.send();

// the simplest json service
// no route handling
var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
});
console.log("listening on http://localhost:3000");
//app.listen(3000);

var app = express();


app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/json', function(req, res){
  res.send({ "hello": "world" });
});

app.listen(3000);