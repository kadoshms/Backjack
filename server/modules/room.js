/**
*	File Name 	: server/modules/room.js
*	Description	: this module represents a room
*	Author		: kadoshms
*/

/**
 * Construct a new room
 * @param name room name
 */
function Room(name){
	this.name	 =	name;
	this.players =	[];
}

// Room statuses
Room.prototype.STATUS_BET 		= 1010;
Room.prototype.STATUS_HANDS 	= 1020;
Room.prototype.STATUS_TURNS 	= 1030;
