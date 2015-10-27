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
		this.indexInHand = data.indexInHand;
	}
	
	/**
	 * draw card
	 * @param {object} stage stage to add the card to
	 * @param {object} player
	 * @param {Boolean} animate should card be animated or not
	 */
	Card.prototype.draw = function(stage, player, animate){
		var _card = this;
		var fileName = this.flipped ? "b2fv" : this.name;
		var container = stage.getContainerByPosition(player.sit);

		// position maniuplation method
		// changes card offest regarding its position
		var posFunc = function(){
			var x = _card.indexInHand * 15;
			var y = 0;
			return {x : x , y : y};
		};

		// tween function
		var tweenFunc = function(card){
			if(animate === false) return;
			card.y = -500;
			card.alpha = 0;
			createjs.Tween.get(card, {loop: false}, null, false)
				.to({y : 0, alpha : 1}, 1000);
		}

		var options = { alpha : (animate === false) ? 1 : 0 };
		stage.addBitmap("client/image/classic-cards/"+fileName+".png", container, posFunc, tweenFunc, options, (this.indexInHand-1));
	}

	return Card;
});