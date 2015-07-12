/**
*	File Name 	: server/modules/deck.js
*	Description	: this module represents a deck of cards
*	Author		: kadoshms
*/

function Deck(){
	this.cards = [];
}

/**
 * This method shuffles a new deck of cards
 * Reference : http://gamedevelopment.tutsplus.com/tutorials/quick-tip-shuffle-cards-or-any-elements-with-the-fisher-yates-shuffle-algorithm--gamedev-6314
 * 
 * @return {array} deck shuffled deck of cards
 */
Deck.prototype.shuffle = function(){
	var cards = function(){
		var arr = [];

		for(var i = 0 ; i < 4 ; i++)
		{
			for(var j = 0; j < 52; j++)
			{
				arr.push(j);
			}
		}

		return arr;
	}();

	var theLength = cards.length - 1;
	var toSwap;
	var temp;

	for (i = theLength; i > 0; i--)
	{ 
	    toSwap 			= Math.floor(Math.random() * i);
	    temp 			= cards[i];
	    cards[i] 		= cards[toSwap];
	    cards[toSwap] 	= temp;
	}

	this.cards = cards;
}

/**
 * Get length of deck
 * 
 * @return {number} size size of deck
 */
Deck.prototype.length = function(){
	return this.cards.length;
}

/**
 * Get card by index
 * 
 * @param {number} i index
 * @return {number} card number
 */
Deck.prototype.get = function(i){
	return this.cards[i];
}

/**
 * Draw a card
 *
 * @returns {card} drewed card
 */
Deck.prototype.draw = function(){
	var card = this.cards.pop();
	return card;
}

module.exports = Deck;