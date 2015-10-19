/**
*	File Name 	: server/modules/networking.js
*	Description	: this module holds all messaging/netwokring methods
*	Author		: kadoshms
*/

/**
 * Construct a new networking manager
 * @param {socket.io} io object
 */
function Networking(io)
{
	this.io = io;
}

/**
 * Send message to all palyers in room
 * @param room room to send the message to
 * @param evt event name
 * @param msg message to emit
 */
Networking.prototype.toRoom = function(room, evt, msg){
	this.io.to(room.name).emit(evt, msg);
}

/**
 * Send message only to player 
 * @param room room the room the player is in
 * @param player player the player to send the message
 * @param evt event name
 * @param msg message to emit
 */
Networking.prototype.toPlayer = function(room, player, evt, message){
	for(var i = 0 ; i < room.players.length; i++)
	{
		if( room.players[i].id == player.id )
		{
			this.io.to(player.id).emit(evt,message);
			return;
		}
	}
}

/**
 * Send message only to ready players
 * @param room room the room the player is in
 * @param evt event name
 * @param msg message to emit
 */
Networking.prototype.toReadyPlayers = function(room, evt, message){
	for(var i = 0 ; i < room.players.length; i++)
	{
		if( room.readyPlayers.indexOf(room.players[i].index) != -1 )
		{
			this.io.to(room.players[i].id).emit(evt,message);
			return;
		}
	}
}

/**
 * Send message only to non-ready players
 * @param room room the room the player is in
 * @param evt event name
 * @param msg message to emit
 */
Networking.prototype.toNonReadyPlayers = function(room, evt, message){
	for(var i = 0 ; i < room.players.length; i++)
	{
		if( room.readyPlayers.indexOf(room.players[i].index) == -1 )
		{
			this.io.to(room.players[i].id).emit(evt,message);
			return;
		}
	}
}

module.exports = Networking;