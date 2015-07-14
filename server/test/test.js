var assert 	= require('assert');
var Deck	= require('../modules/deck');
var Player	= require('../modules/player');
var Room	= require('../modules/room');

describe('Backjack', function(){

	var room 	= new Room('Test Room');
	var player 	= new Player(1, 0);

	describe('game', function(){
		var deck 	= new Deck();
		deck.shuffle();

		it('Test Hit', function(){
			var counter = 0;
			while(deck.length() > 0)
			{
				assert.notEqual(typeof(deck.draw()), "undefined")
				counter++;
			}
			assert.equal(counter, 208);
		});
	});

	describe('deck', function(){
		var deck 	= new Deck();
		deck.shuffle();
		it('shuffle a deck', function(){
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
		it('draw cards', function(){
			for(var i = 0 ; i < 208; i++)
			{
				assert.notEqual(deck.draw(), undefined);
			}
			assert.equal(deck.draw(), undefined);
		});
	});

	describe('Player', function(){
		it('set player credit', function(){
			player.setCredit(500);
			assert.equal(player.getCredit(), 500);
		});
	});

	describe('Room', function(){
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
		it('find player', function(){
			assert.notEqual(room.getPlayer(1), null);
		});
	});
});