/**
*	File Name 	: server/modules/room.js
*	Description	: this module represents a room
*	Author		: kadoshms
*/

var winston 		= 	require('winston');
var Deck			=	require('./deck');
var Player			=	require('./player');
var game			=	undefined;

/**
 * Construct a new room
 * @param name room name
 * @param _game current game manager
 */
function Room(name, _game){
	this.name	 =	name;
	this.players =	[];
	this.deck	 =  new Deck();
	this.deck.shuffle();
	this.status	= this.STATUS_NO_ACTIVE;
	this.round	= 0;
	this.betCount = 0;
	this.dealer = new Player("dealer", 0);
	game = _game;
}

/**
 * Change status
 * @param status new status
 */
Room.prototype.setStatus = function(status){
	this.status = status;
	winston.log('info', 'room '+this.name+' changed status to : '+status);

	if (game == undefined) return;

	if (game.roomStatusHandlers[status] != undefined)
	{
		game.roomStatusHandlers[status](this);
	}
}

// Room statuses
Room.prototype.STATUS_NO_ACTIVE = 1000;
Room.prototype.STATUS_BET 		= 1010;
Room.prototype.STATUS_HANDS 	= 1020;
Room.prototype.STATUS_TURNS 	= 1030;
Room.prototype.STATUS_ACTIVE	= 1040;

/**
 * Add player to room
 * @param {player} player to add
 * @param {socket} current socket
 */
Room.prototype.playerJoin = function(player, socket){
	this.players.push(player);

	if(socket != undefined)
	{
		socket.join(this.name);
	}

	winston.log('info', 'player ' +player.id+ " joined room "+this.name);
}

/**
 * Get room players
 * @returns {Array} array of players
 */
Room.prototype.getPlayers = function(){
	return this.players;
}

/**
 * Get next index of player
 * @returns {number} index 
 */
Room.prototype.nextIndex = function(){
	return this.players.length + 1;
}

/**
 * Get room name
 * @returns room name
 */
Room.prototype.getName = function(){
	return this.name;
}

/**
 * Get player by id
 * @param {string} id player id
 */
Room.prototype.getPlayer = function(id){
	for(var i = 0 ; i < this.players.length; i++)
	{
		if(this.players[i].id == id)
		{
			return this.players[i];
		}
	}
	return null;
}

/**
 * Get room deck
 */
Room.prototype.getDeck = function(){
	return this.deck;
}

/**
 * return number of ready players
 * @return number of ready players
 */
Room.prototype.getNumOfReadyPlayers = function(){
	var players = this.players;
	var count = 0;

	for(var i = 0 ; i < players.length; i++)
	{
		count = ( players[i].status == Player.prototype.STATUS_READY ) ? count+1 : count;
	}

	return count;
}

/**
 * Start a new round
 */
Room.prototype.startNewRound = function(){
	this.round++;
	winston.log('info', 'new round started in room '+this.name);
	this.setStatus(this.STATUS_BET);
	this.betCount = 0;
}


/**
 * Resets room properties (fresh start)
 */
Room.prototype.reset = function(){
	this.round 	= 0;
	this.status	= this.STATUS_NO_ACTIVE;
	this.players =	[];
	this.deck	 =  new Deck();
	this.deck.shuffle();
	this.betCount = 0;
}

/**
 * Confirm player bet
 * @param params room and player data
 */
Room.prototype.betConfirmed = function(params){
	this.betCount++;

	// if all players placed their bets
	if( this.betCount == this.players.length ) return true;

	return false;
}

module.exports = Room;