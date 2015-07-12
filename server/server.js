var app		=	require('express')();
var http 	=	require('http').Server(app);
var io 		=	require('socket.io')(http);

// Handle basic connection
io.on("connection", function(socket){

});

http.listen(3000, function(){
	console.log('Backjack server started on port *:3000');
});
