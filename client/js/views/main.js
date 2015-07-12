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
		
		// render the view
		render	:	function(){
			this.$el.html("renderd");
			return this;
		}
	});
	
	return exports;
});