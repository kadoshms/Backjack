/**
*	File Name 	: client/js/views/main.js
*	Description	: game main view
*	Author		: Kadoshms
*/

define([
        'jquery',
        'backbone',
        'socket.io'
],
function($, Backbone, io){

	var exports = {};
	
	exports.MainView = Backbone.View.extend({
		el		:	'#main-content',
		events	: 	{
			'click' : function(){
				io.socket.emit("playerAction", "hit");
			}
		},
		/**
		 * Sets up graphics for new player
		 */
		initRoom:	function(data){
			var players = data.room.players;
		},
		// handle player actions
		/**
		 * Handle player hit
		 * @param {object} data retrived from server
		 */
		hit:	function(data){
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