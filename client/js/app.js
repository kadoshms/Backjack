// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'views/main',
], function($, _, Backbone,Mustache,MainView){
  var initialize = function(){
	var main = new MainView.MainView();
	main.render();
  }

  return {
    initialize: initialize
  };
});
