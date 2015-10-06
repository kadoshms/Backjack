/**
*	File Name 	: client/js/views/controls.js
*	Description	: game controls panel
*	Author		: Kadoshms
*/

define([
        'jquery',
        'backbone',
        'mustache',
        'socket.io',
        'text!../templates/controls.mustache'
], function($, Backbone, Mustache, io, ControlsTemplate){
	var exports = {};

	exports.ControlsView = Backbone.View.extend({
		events 		: {
			'click #playerReady'	:	'playerReady'
		},
		/**
		 * Emit server request to mark player as ready
		 * 
		 */
		playerReady	:	function(e){
			io.socket.emit("playerAction", { action : "ready" });
		},
		/**
		 * Render view
		 */
		render 		:	function(){
			this.$el.html(Mustache.to_html(ControlsTemplate, {}));
			return this;
		}
	});

	return exports;
});
