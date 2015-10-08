/**
*	File Name 	: client/js/views/main.js
*	Description	: game main view
*	Author		: Kadoshms
*/

define([
        'jquery',
        'backbone',
        'socket.io',
        'views/controls'
],
function($, Backbone, io, Controls){

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
		 * ask player to place bet
		 */
		placeBet: function(){
			var bet = window.prompt("Enter your bet");
			io.socket.emit("playerAction", { action : "bet" , args : { bet : bet } });
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