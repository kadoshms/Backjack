/**
*	File Name 	: server/modules/turn-manager.js
*	Description	: this module represents turn manager
*	Author		: kadoshms
*/

var winston 		= 	require('winston');

/**
 * Construct a new turn manager
 * @param room to manage
 */
function TurnManager(room){
	this.room  = room;
	this.current = 0;
}

/**
 * Start a new round
 */
TurnManager.prototype.reset = function(){
	this.current = 0;
	winston.log('info', 'room '+this.room.name+"'s turn manager was reset");
}

/**
 * Get current turn
 * @return current turn index
 */
TurnManager.prototype.getCurrent = function(){
	return this.current;
}

/**
 * Next turn
 */
TurnManager.prototype.nextTurn = function(){
	if( this.current >= this.room.players.length - 1 )
	{
		this.current = -1;
	}
	else
	{
		this.current++;
	}
}

module.exports = TurnManager;