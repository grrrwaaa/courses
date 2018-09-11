
hljs.initHighlightingOnLoad();
let markdownit = window.markdownit({
	html: true,
	linkify: true,
	// Highlighter function. Should return escaped HTML,
	// or '' if the source string is not changed and should be escaped externally.
	// If result starts with <pre... internal wrapper is skipped.
	highlight: function (str, lang) { 
		if (lang && hljs.getLanguage(lang)) {
		try {
			return hljs.highlight(lang, str).value;
		} catch (__) {}
		}
		return ''; // use default 
	}
});

/*
let ws;
function ws_connect(opt) {
	ws = new WebSocket(opt.transport+'://'+opt.host+':'+opt.port, opt.protocols);
	ws.binaryType = 'arraybuffer';
	ws.onerror = opt.onerror;
	ws.onopen = opt.onopen;
	ws.onmessage = opt.onmessage;
	ws.onclose = function(e) {
		ws = null;
		if (opt.reconnect) setTimeout(function(){
			console.log("websocket reconnecting...");
			ws_connect(opt);
		}, 2000);		
		opt.onclose(e);
	}
	return ws;
}

ws_opt = {
	transport: "ws",
	host: "localhost",
	port: "8080",
	reconnect: true,
	protocols: [],
	onerror: function() {
		// show editor buttons etc.
		$("#editor").hide();
	},
	onclose: function(e) { 
		// show editor buttons etc.
		$("#editor").hide();
		console.log('websocket closed', e.code); 
	},
	onopen: function() {
		console.log('websocket opened');
		// show editor buttons etc.
		$("#editor").show();

		let ed = $("#main");
		console.log("ED", ed.attr("data-md"))
		ed
			.text(ed.attr("data-md"))
			.attr("contentEditable", true)
			.on("input", e => {
				console.log($(e.target).html());
			})
			;
	},
	onmessage: function(e) { 
		if (e.data instanceof ArrayBuffer) {
			console.log("ws received arraybuffer of " + e.data.byteLength + " bytes");
		} else {
			try {
				let msg = JSON.parse(e.data);
				console.log("ws received JSON", msg);
				handleMessage(msg);
			} catch (e) {
				console.log('ws bad JSON: ', e);
			}
		} 
		// //Example code: send a binary blob:
		// const array = new Float32Array(5);
		// for (let i = 0; i < array.length; ++i) {
		// 	array[i] = i / 2;
		// }
		// ws.send(array);
	},
};

function handleMessage(msg) {
	switch (msg.type) {
		default: {
			console.log("unhandled message type", msg.type);

			//load_content();

			break;
		}
	}
}

/// LOCAL EDITING SUPPORT ///
let local_editing = location.hostname === "localhost" || location.hostname === "127.0.0.1"
if (local_editing) ws_connect(ws_opt);
*/

function load_content() {
	function format(s) {

	
		// TODO: parse specific elements:
		// auto TOC, 
		// adding a-links to headers (and figures? etc.)
		// convert youtube links to delayed loading
		// syntax highlighting etc.`

		let html = markdownit.render(s);
		//console.log(html);
		$("#main")
			.attr("data-md", s)
			.html(html);

	}

	//$('#main').load('main.md', format);
	format($("#source").html())
}

load_content();