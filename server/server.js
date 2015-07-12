var app				=	require('express')();
var http 			=	require('http').Server(app);
var io 				=	require('socket.io')(http);
var winston 		= 	require('winston');
var Netwokring	 	=	require('./modules/networking');
var Player			=	require('./modules/player');
var Room			=	require('./modules/room');
var Game			=	require('./modules/game');

// Create the roomm
var room = new Room("Las Vegas");

var networking = new Netwokring(io);
var game 	   = new Game();

// Handle basic connection
io.on("connection", function(socket){

	/**
	 * Handle join room
	 * @param {data} player data
	 */
	socket.on("joinRoom", function(data){

		// create player instance
		var player = new Player(socket.id, room.nextIndex());

		room.playerJoin(player, socket);

		networking.toRoom(room, "playerJoined", { room : room });
	});

	/**
	 * Handle user action
	 */
	socket.on("playerAction", function(action){
		var player = room.getPlayer(socket.id);
		game[action].apply(player)
	});
});

http.listen(3000, function(){
	console.log('Backjack server started on port *:3000');
});
