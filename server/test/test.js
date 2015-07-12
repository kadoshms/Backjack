var assert 	= require('assert');
var Deck	= require('../modules/deck');
var Player	= require('../modules/player');
var Room	= require('../modules/room');

describe('server', function(){

});

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
	var player = new Player(1, 0);
	it('set player credit', function(){
		player.setCredit(500);
		assert.equal(player.getCredit(), 500);
	});
});

describe('Room', function(){
	var room = new Room('Test Room');
	var player = new Player(1, 0);

	it('add player to room', function(){
		room.playerJoin(player);
		assert.notEqual(-1, room.getPlayers().indexOf(player))
	});
	it('next index should be 1', function(){
		assert.equal(1, room.nextIndex());
	});
	it('get server name', function(){
		assert.equal(room.getName(), "Test Room");
	});
});