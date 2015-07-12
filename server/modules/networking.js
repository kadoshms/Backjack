/**
*	File Name 	: server/modules/networking.js
*	Description	: this module holds all messaging/netwokring methods
*	Author		: kadoshms
*/
function Networking()
{
}

/**
 * Send message to all palyers in room
 * @param room room to send the message to
 * @param evt event name
 * @param msg message to emit
 */
Networking.prototype.toRoom = function(room, evt, msg){
	io.to(room.name).emit(evt, msg);
}

module.exports = Networking;