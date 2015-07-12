var assert 	= require('assert');
var Deck	= require('../modules/deck');
var Player	= require('../modules/player');

describe('deck', function(){
	it('shuffle a deck', function(){
		var deck = new Deck();
		deck.shuffle();
		
		for(var i = 0 ; i < 52; i++)
		{
			var counter = 0;
			for(var j = 0 ; j < deck.length() ; j++)
			{
				if(i == deck.get(j))
				{
					counter++;
				}
			}
			assert.equal(4, counter);
		}
	});
});

describe('Player', function(){
	var player = new Player();
	it('set player credit', function(){
		player.setCredit(500);
		assert.equal(player.getCredit(), 500);
	});
});