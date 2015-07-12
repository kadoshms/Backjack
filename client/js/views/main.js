/**
*	File Name 	: client/js/views/main.js
*	Description	: game main view
*	Author		: Kadoshms
*/

define([
        'jquery',
        'backbone'
],
function($, Backbone){

	var exports = {};
	
	exports.MainView = Backbone.View.extend({
		el		:	'#main-content',
		/**
		 * Sets up graphics for new player
		 */
		initRoom:	function(data){
			var players = data.room.players;
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