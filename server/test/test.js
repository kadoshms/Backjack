var assert 	= require('assert');
var Deck	= require('../modules/deck');
var Player	= require('../modules/player');
var Room	= require('../modules/room');
var helpers	= require('../modules/helpers');
var Game	= require('../modules/game');

describe('Backjack', function(){

	var room 	= new Room('Test Room');
	var player 	= new Player(1, 0);
	var game 	= new Game(undefined, undefined, undefined);

	describe('helpers', function(){
		it('generate a card map', function(){
			var map = helpers.generateCardMap();

			assert.equal(Object.keys(map).length, 52);

			for(var i = 0 ; i < 52 ; i++)
			{
				var card = map[i];
				var name = card.name;

				if(name.indexOf('ace') != -1)
				{
					assert.equal(card.value, -1);
				}
				else if( (name.indexOf('jack') != -1) || (name.indexOf('queen') != -1) || (name.indexOf('king') != -1) )
				{
					assert.equal(card.value, 10);
				}
			}
		});
	});
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
		it('Place bet', function(){
			var data = { bet : 500 };
			assert.equal(game.bet({ player : player, room : room,  data : data }), true);
			data.bet = 600;
			assert.equal(game.bet({ player : player, room : room,  data : data }), false);
			assert.equal(room.betCount, 1);
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
		it('player ready', function(){
			assert.equal(player.playerReady(), true);

			// After player is ready already...
			assert.equal(player.playerReady(), false);
		});
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
		it('change status', function(){
			room.setStatus(room.STATUS_ACTIVE);
			assert.equal(room.status, 1040);
		});
		it('next index should be 1', function(){
			assert.equal(1, room.nextIndex());
		});
		it('get number of ready players', function(){
			var num = room.getNumOfReadyPlayers();
			assert.equal(num, 1);
		});
		it('get server name', function(){
			assert.equal(room.getName(), "Test Room");
		});
		it('find player', function(){
			assert.notEqual(room.getPlayer(1), null);
		});
		it('start a new round', function(){
			room.startNewRound();
			assert.equal(room.round, 1);
			assert.equal(room.status, 1010);
		});
		it('hand card', function(){
			player.handCards([1, 4]);
			assert.notEqual(player.getHand().indexOf(4), -1);
			assert.equal(player.getHand().length, 2);
		});
		it('reset room', function(){
			room.reset();
			assert.equal(room.round, 0);
			assert.equal(room.players.length, 0);
			assert.equal(room.status, 1000);
			assert.equal(room.betCount, 0);
		});
	});
});