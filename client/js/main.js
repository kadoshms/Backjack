requirejs.config({
  paths: {
	  'jquery'			:	'vendor/jquery/dist/jquery.min',
	  'backbone'		:	'vendor/backbone/backbone-min',
	  'underscore'		:	'vendor/underscore/underscore-min',
	  'mustache'		:	'vendor/mustache/mustache.min',
	  'socket.io'		:	'vendor/socket.io-client/socket.io',
	  'text'			:	'vendor/requirejs-plugins/lib/text',
	  'EaselJS'			:	'vendor/EaselJS/lib/easeljs-0.8.1.combined',
	  'TweenJS'			:	'vendor/TweenJS/lib/tweenjs-0.6.1.combined'
  },
  shim: {
	  	 'backbone':{
		  	deps:["underscore","jquery"],
	  		exports: "Backbone"
	  	 },
	  	 'mustache':{
	  		 exports : "Mustache"
	  	 },
	     'socket.io': {
	         exports: 'io'
	     },
		 'easel': {
			exports: 'createjs'
		 },
		 'tween': {
			 deps : ['easel'],
			 exports : 'Tween'
		 }
	}
});

requirejs([
  'app',
  'EaselJS',
  'TweenJS'
], function(App){

  App.initialize();
});