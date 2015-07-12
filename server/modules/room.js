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

/**
 * Add player to room
 * @param {player} player to add
 */
Room.prototype.playerJoin = function(player){
	this.players.push(player);
}

/**
 * Get room players
 * @returns {Array} array of players
 */
Room.prototype.getPlayers = function(){
	return this.players;
}

/**
 * Get next index of player
 * @returns {number} index 
 */
Room.prototype.nextIndex = function(){
	return this.players.length;
}

/**
 * Get room name
 * @returns room name
 */
Room.prototype.getName = function(){
	return this.name;
}

module.exports = Room;