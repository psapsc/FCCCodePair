// create the peer object. PeerServer uses port 9000 (default is 80).
var peer = new Peer({port: "9000", key: 'khv1lmo7pheel8fr'});
var textArea = $("#txtmessages");
var message = $("#id");
var send = $("#send");

// function for connecting to a peer. id is the id of the peer we want to connect to
function connect() {
	var id = message.val();
	message.val("");
	var conn = peer.connect(id);
	
	handleConnection(conn);
}

function handleConnection(conn) {
	
	
	conn.on("open", function() {
		textArea.append("\nConnected to " + conn.peer + " say hi");
		send.val("Send");
		
		// receive messages
		conn.on("data", function(data) {
			textArea.append("\n" + data);
		});
		
		// send message when user clicks on send
		send.click(function() {
			conn.send(message.val());
			message.val("");
		});
		
		// display all errors
		conn.on("error", function(err) {
			textArea.append("\n" + err);
		});
	});
}

// open is called when we connect to the PeerServer and id is the id assigned to us by the server
peer.on("open", function(id) {
	textArea.append("\nYour id is " + id);
});

// connection is called when we have an incoming connection from a peer
peer.on("connection", function(connection) {
	var conn = connection;
	handleConnection(conn);
});

// if we get an error display it 
peer.on("error", function(err) {
	textArea.append("\n" + err);
});
