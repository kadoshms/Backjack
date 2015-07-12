define(['socket.io'], function(io){

	io.socket = io.connect('http://localhost:3000');

	var initialize = function(args){
		var main = args.main;
	}

	return { initialize : initialize };
	
});