/**
*	File Name 	: client/js/views/main.js
*	Description	: game main view
*	Author		: Kadoshms
*/

define([
        'jquery',
        'backbone',
        'socket.io',
        'views/controls',
        'classes/consts'
],
function($, Backbone, io, Controls, Consts){

	var exports = {};
	
	exports.MainView = Backbone.View.extend({
		el		:	'#main-content',
		events	: 	{},
		/**
		 * Sets up graphics for new player
		 */
		initRoom:	function(data){
			var players = data.room.players;
			var player	= data.player;

			// render controls
			var controls = new Controls.ControlsView();
			this.$el.append(controls.render().el);
		},
		// handle player actions
		/**
		 * Handle player hit
		 * @param {object} data retrived from server
		 */
		hitResult:	function(data){
			this.$el.append(data.result);
		},
		/**
		 * Handle player ready (after server is done handling request)
		 * @param {object} data retrived from server
		 */
		readyResult: function(data){
			// the ready button is useles after it has been used
			this.$el.find('#playerReady').remove();
		},
		/**
		 * Handle player bet result
		 * @param {object} data retrived from server
		 */
		betResult: function(data){
			var result = data.result;

			if( result !=  Consts.BET_RESULT_CONFIRMED_LAST)
			{
				console.log("waiting for the rest of players to bet")
			}
			else
			{
				console.log("every one is done betting");
				io.socket.emit("shit");
			}
		},
		/**
		 * ask player to place bet
		 */
		placeBet: function(){
			var bet = window.prompt("Enter your bet");
			io.socket.emit("playerAction", { target : 1, action : "bet" , args : { bet : bet } });
		},
		/**
		 * Render the view
		 * @return {Backbone.View} current view
		 */
		render	:	function(){
			this.$el.html("renderd");
			return this;
		}
	});
	
	return exports;
});