let WebSocketServer = require('ws').Server;
let http = require("http");
let express = require("express");
let app = express();

app.use(express.static(__dirname + "/index.html"));

let server = http.createServer(app);
let wss = new WebSocketServer({server:server})

let connections = [];

wss.on("connection", function (ws) {
	connections.push(ws);
	ws.on("close", function() {
		connections = connections.filter(function (conn, i) {
			return (conn === ws) ? false: true;
		});
	});
	ws.on("message", function(message) {
		console.log("message:-> ", message);
		broadcast(JSON.stringify(message));
	});

});

function broadcast(message) {
	connections.forEach(function(con, i) {
		con.send(message);
	});
};

server.listen(3000);