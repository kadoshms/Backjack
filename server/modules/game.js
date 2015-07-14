/**
*	File Name 	: server/modules/game
*	Description	: this module holds all game operations
*	Author		: kadoshms
*/

/**
 * Construct a new game manager
 * @param {socket.io} io object
 */
function Game(io)
{
	this.io = io;
}

/**
 * Hit player
 * @param {pobject} params parameters
 */
Game.prototype.hit = function(params){
	var card = params.room.getDeck().draw();
	return card;
}

module.exports = Game;