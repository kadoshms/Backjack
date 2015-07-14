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

/**
 * Hand card to player
 * @param {Array} cards array of cards
 */
Player.prototype.handCards = function(cards){
	if(typeof(cards) != "number")
	{
		for(var i = 0 ; i < cards.length; i++)
		{
			this.hand.push(cards[i]);
		}
	}
	else
	{
		this.hand.push(cards);
	}
}

/**
 * Get player hand
 * @returns {array} player's hand
 */
Player.prototype.getHand = function(){
	return this.hand;
}

module.exports = Player;