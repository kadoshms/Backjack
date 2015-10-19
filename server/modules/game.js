/**
*	File Name 	: server/modules/game
*	Description	: this module holds all game operations
*	Author		: kadoshms
*/

var winston 		= 	require('winston');
var Room			=	require('./room');
var TurnManager		=	require('./turn-manager');

/**
 * Construct a new game manager
 * @param {socket.io} io object
 * @param {object} card map generated by server
 * @param {object} networking network manager
 */
function Game(io, map, networking)
{
	game = this;
	this.networking = networking;
	this.io = io;
	this.map = map;
}

/**
 * Hit player
 * @param {object} params parameters
 */
Game.prototype.hit = function(params){
	var cardIndex = params.room.getDeck().draw();
	var card = game.map[cardIndex];

	winston.log('info', 'player '+params.player.id+' drawed card '+ cardIndex + " and value " + game.map[cardIndex].value);

	// determine if card should be flipped or not
	card.flipped = (params.player.index == -1) && (params.player.hand.length > 0) ? true : false;

	params.player.handCards(cardIndex);
	game.networking.toRoom(params.room, "dealResult", { card : card, player : params.player });

	return card;
}

/**
 * Player bet
 * @param {object} params parameters
 */
Game.prototype.bet = function(params){
	var result = params.player.setBet(params.data.bet);

	if ( result )
	{
		winston.log('info','player '+params.player.id+' placed bet of '+params.data.bet);

		var betResult = params.room.betConfirmed(params);

		if(betResult == true)
		{
			result = 2;
		}
	}
	else winston.log('info','server rejected '+params.player.id+' bet');

	return result;
}

/**
 * Player mark as ready
 * @param {object} param parameters
 */
Game.prototype.ready = function(params){
	var room = params.room;
	room.playerReady(params.player.index, params.data.sit);
	params.player.playerReady(params.data.sit);

	var readyPlayers = room.getNumOfReadyPlayers();

	// remove player's sit
	if ( room.players.length > room.readyPlayers.length)
	{
		game.networking.toNonReadyPlayers(room, "removeSit", { sit : params.data.sit });
	}
	// check if there's at least one player ready
	if ( room.status == Room.prototype.STATUS_NO_ACTIVE && readyPlayers >= 1)
	{
		game.startGame(params);
	}
}

/**
 * Start a new game
 * @param {object} param parameters
 */
Game.prototype.startGame = function(params) {
	var room = params.room;
	this.turnManager = new TurnManager(room);

	if ( room.round == 0 )
	{
		room.startNewRound();
	}
	else
	{
		room.reset();
	}
}

/**
 * Room status change handlers
 */

Game.prototype.roomStatusHandlers = [];

Game.prototype.roomStatusHandlers[Room.prototype.STATUS_BET] = function(room){
	winston.log("info", "room "+room.name+"'s players are placing bets now");
	game.networking.toReadyPlayers(room, "placeBet", {});
}

/**
 * Deal cards - first round
 * @param {object} param parameters
 */
Game.prototype.deal = function(params){
	var room 	= params.room;
	var players = room.players;
	var dealer 	= room.dealer;
	var card;

	room.setStatus(Room.prototype.STATUS_HANDS);

	for(var i = 0 ; i < 2; i++)
	{
		var current	= this.turnManager.getCurrent();

		// while not all players got their cards
		while( current != -1 )
		{
			var currentPlayer = room.getPlayerByIndex(current);
			winston.log('info', 'dealing card to player '+currentPlayer.id);

			this.turnManager.nextTurn();
			game.hit({ room : room, player : currentPlayer });

			current = this.turnManager.getCurrent();
		}
		winston.log('info', 'dealing card to dealer');
		game.hit({ room : room, player : room.dealer });

		this.turnManager.reset();
	}

}

module.exports = Game;