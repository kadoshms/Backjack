// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'views/main',
  'classes/server-events'
], function($, _, Backbone,Mustache,MainView, Socket){
  var initialize = function(){
	var main = new MainView.MainView();
	main.render();
	Socket.initialize({ main : main });
  }

  return {
    initialize: initialize
  };
});
