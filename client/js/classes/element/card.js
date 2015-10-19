/**
*	File Name 	: client/js/views/element/card.js
*	Description	: single card element graphics and animation
*	Author		: Kadoshms
*/

define([
        'jquery',
        'backbone',
        'mustache',
        'classes/consts'
], function($, Backbone, Mustache, Consts){

	/**
	 * create a new instance of card
	 * @param {object} card card data
	 */
	function Card(data){
		this.name = data.name;
		this.value = data.value;
		this.flipped = data.flipped;
	}
	
	/**
	 * draw card
	 * @param {object} stage stage to add the card to
	 * @param {object} player
	 */
	Card.prototype.draw = function(stage, player){
		var fileName = this.flipped ? "b2fv" : this.name;
		var container = stage.getContainerByPosition(player.sit);

		stage.addBitmap("client/image/classic-cards/"+fileName+".png", container);
	}

	return Card;
});