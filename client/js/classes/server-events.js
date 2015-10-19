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
		 * @param data
		 */
		io.socket.on("playerJoined", function(data){

			// initialize room for player
			main.initRoom(data);
		});

		/**
		 * Executed when server is done handling user action
		 * @param data
		 */
		io.socket.on("playerActionResult", function(data){
			var method = data.action + "Result";
			if(main[method] != undefined)
			{
				main[method].call(main, data);
			}
		});
		/**
		 * Executed when a new round begins and bets should be placed
		 */
		io.socket.on("placeBet", function(data){
			main.placeBet();
		});
		/**
		 * Exectued when server deals a card to player
		 */
		io.socket.on("dealResult", function(data){
			main.addCardToTable(data);
		});
		/**
		 * Remove player's sit if other players are connected but not ready
		 */
		io.socket.on("removeSit", function(data){
			main.removeSit(data);
		});
	}

	return { initialize : initialize };
	
});