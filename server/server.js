var app				=	require('express')();
var http 			=	require('http').Server(app);
var io 				=	require('socket.io')(http);
var winston 		= 	require('winston');
var Netwokring	 	=	require('./modules/networking');
var Player			=	require('./modules/player');
var Room			=	require('./modules/room');
var Game			=	require('./modules/game');
var helpers			=	require('./modules/helpers');

var networking 	= new Netwokring(io);
var map			= helpers.generateCardMap();
var game 	   	= new Game(io, map, networking);

//Create the roomm
var room = new Room("Las Vegas", game);

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

		networking.toRoom(room, "playerJoined", { room : room, player : player });
	});

	/**
	 * Handle user action
	 */
	socket.on("playerAction", function(data){
		var player = room.getPlayer(socket.id);
		var target = data.target == 1 ? 1 : 0;

		var params = {
			room	:	room,
			player	:	player,
			data	:	data.args
		};

		if ( game[data.action] == undefined){
			winston.log('warn', 'unkown action '+data.action+', aborting');
			return;
		}

		var result = game[data.action].call(Room, params);

		if( target == 1 )
		{
			networking.toPlayer(room, player, "playerActionResult", { action : data.action,  player : player , result : result });
		}
		else
		{
			networking.toRoom(room, "playerActionResult", { action : data.action,  player : player , result : result });
		}
	});
});

http.listen(3000, function(){
	console.log('Backjack server started on port *:3000');
});
