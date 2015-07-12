/**
*	File Name 	: server/modules/player.js
*	Description	: this module represents a player
*	Author		: kadoshms
*/

/**
 * Construct a new player
 * @param id player id
 * @param index player index
 */
function Player(id, index){
	this.id 	= id;
	this.index 	= index;
	this.hand 	= [];
	this.credit = 1000;
}

/**
 * set credit
 * @param credit
 */
Player.prototype.setCredit = function(credit){
	this.credit = credit;
}

/**
 * get player credit
 * @returns {Number} player credit
 */
Player.prototype.getCredit = function(){
	return this.credit;
}

module.exports = Player;