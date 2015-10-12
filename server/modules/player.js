/**
*	File Name 	: server/modules/player.js
*	Description	: this module represents a player
*	Author		: kadoshms
*/

var winston 		= 	require('winston');

Player.prototype.STATUS_NOT_READY = 2000;
Player.prototype.STATUS_READY = 2010;

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
	this.bet	= 0;
	this.status = this.STATUS_NOT_READY;
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

/**
 * Set bet
 * @param {Number} set player bet
 */
Player.prototype.setBet = function(bet){
	var result = this.credit - bet;

	if( result >= 0 )
	{
		this.credit = this.credit - bet;
		return 1;
	}
	else
	{
		return 0;
	}
}

/**
 * Player ready
 */
Player.prototype.playerReady = function(){

	if ( this.status == this.STATUS_READY)
		return false;

	this.status = this.STATUS_READY;
	winston.log('info', 'player ' +this.id+ " marked as ready");

	return true;
}

module.exports = Player;