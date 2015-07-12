/**
*	File Name 	: client/js/classes/server-events.js
*	Description	: this file contains different server events handler
*	Author		: Kadoshms
*/
define(['socket.io'], function(io){

	io.socket = io.connect('http://localhost:3000');

	var initialize = function(args){
		var main = args.main;
		io.socket.emit("joinRoom");

		/**
		 * Executed when player joins room successfully
		 * @param {data
		 */
		io.socket.on("playerJoined", function(data){

			// initialize room for player
			main.initRoom(data);
		});
	}

	return { initialize : initialize };
	
});