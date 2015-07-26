// our peer object.
var peer;
var connections = []; // an array to hold all our peer connections
connectToServer();

// connect to our peer server. PeerServer uses port 9000 (default is 80).
function connectToServer() {
	peer = new Peer({port: "9000", key: 'khv1lmo7pheel8fr'});
}

// function for connecting to a peer. id is the id of the peer we want to connect to
function connectToPeer(id, options) {
	var conn = peer.connect(id, options);

	handleConnection(conn);
}

function handleConnection(conn) {

	conn.on("open", function() {
		connections.push(conn); // add connection to our array
		displayPeer(conn);

		// receive messages
		conn.on("data", function(data) {
			addMessage(conn.peer, conn.metadata, data);
		});

		// display all errors
		conn.on("error", function(err) {
			addMessage(conn.peer, "Error", err);
		});

		// fires when the connection to a peer is closed
		conn.on("close", function() {
			addMessage(conn.peer, "", "Connection to peer has closed");
	
			// find the index of the connection in our array and remove it
			var index = -1;
			for (var i = 0; i < connections.length; i++) {
				if (connections[i] === conn) {
					connections.splice(i, 1);
					break; // we found it and removed it so exit the loop
				}
			}

		});
	});
}

function reconnectToServer() {
	if (peer.disconnected)
		peer.reconnect(); // we where disconnected from the peer server try reconnect with the same id
	else if (peer.destroyed)
		peer = connectToPeerServer(); // connection to the server was destroyed create new connection
}

// open is called when we connect to the PeerServer and id is the id assigned to us by the server
peer.on("open", function(id) {
	console.log(id);
	document.getElementById("brokeringId").innerHTML = "ID: " + id;
});

// connection is called when we have an incoming connection from a peer
peer.on("connection", function(connection) {
	var conn = connection;
	handleConnection(conn);
});

// if we get an error display it int the console (for now)
peer.on("error", function(err) {
	console.log(err);
});

peer.on("close", function() {
	console.log("\nConnection to peer server destroyed. All connections will be closed.");
	reconnectToServer();
});

peer.on("disconnected", function() {
	console.log("\nConnection to peer server was lost. Existing connections will stay alive but you can't accept or connect to new one's");
	reconnectToServer();
});

// DOM functions below

// show or hide the new connection panel
function toggleConnectDetails() {
	element = document.getElementById("connectDetails");
	if (element.style.display === "block") {
		element.style.display = "none";
	} else {
		element.style.display = "block";
	}
}

// open the tab with our connections
function displayConnections() {
	// find all active tabs and hide them
	var arr = document.getElementsByClassName("tab active");
	for (var i = 0; i < arr.length; i++) {
		arr[i].className = "tab";
	}
	// show the connections tab
	document.getElementById("connectionList").className = "tab active";
}

// open a new connection to a peer
function openConnectionToPeer() {
	var id = document.getElementById("connectId").value;
	options = {
		metadata: "Username", // with metadata we can send any data we want to the peer we are going to connect to
		serialization: "binary" // set the serialization method. Can be binary, binary-utf8, json or none
	};
	
	toggleConnectDetails();
	connectToPeer(id, options);
}

// display our new connection in the connections tab
function displayPeer(conn) {
	var element = document.getElementById("connectionList");
	element.innerHTML = element.innerHTML + "<div class=\"stitched noselect\" onclick=\"displayChat(\'" + conn.peer + "\')\"><h2>" + conn.metadata + "</h2></div>";

	// create a new chat tab for our connection
	element = document.getElementsByClassName("mainList")[0];
	element.innerHTML = element.innerHTML + "<div id=\"" + conn.peer + "\" class=\"tab\">" +
			"<div class=\"stitched noselect\" onclick=\"displayConnections()\">" +
				"<h1><</h1>" +
				"<h2>Back</h2>" +
			"</div>" +
			"<div class=\"chatBox\">" +
				"<div class=\"chatContents " + conn.peer + "\">" +
					"<div class=\"chatMessage\">" +
						"<p>Connected to " + conn.metadata + " say hi!</p>" +
					"</div>" +
				"</div>" +
				"<input class=\"tb " + conn.peer + "\" type=\"text\" placeholder=\"Click here to type a message\"></input>" +
				"<button class=\"sendButton\" type=\"button\" onclick=\"sendMessage(\'" + conn.peer + "\')\">Send</button>" +
			"</div>" +
		"</div>";
}

// close all opened tabs and display the chat tab
function displayChat(id) {
	var arr = document.getElementsByClassName("tab active");
	for (var i = 0; i < arr.length; i++) {
		arr[i].className = "tab";
	}

	document.getElementById(id).className = "tab active";
}

function sendMessage(id) {
	var conn = findConnectionById(id);
	var message = document.getElementsByClassName("tb " + conn.peer)[0];
	conn.send(message.value);
	addMessage(id, "You", message.value);
	message.value = "";
}

function addMessage(id, from, message) {
	var element = document.getElementsByClassName("chatContents " + id)[0];
	element.innerHTML = element.innerHTML + "<div class=\"chatMessage\">" +
												"<p>" + from + ": " + message + "</p>" +
											"</div>";
}

function findConnectionById(id) {
	for (var i = 0; i < connections.length; i++) {
		if (connections[i].peer === id)
			return connections[i];
	}
}