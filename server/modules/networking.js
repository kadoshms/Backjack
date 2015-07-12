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

module.exports = Networking;