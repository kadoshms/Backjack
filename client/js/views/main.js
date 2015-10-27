/**
*	File Name 	: client/js/views/main.js
*	Description	: game main view
*	Author		: Kadoshms
*/

define([
        'jquery',
        'backbone',
        'socket.io',
        'views/controls',
        'classes/element/card',
        'classes/consts',
        'classes/stage',
        'classes/rest'
],
function($, Backbone, io, Controls, Card, Consts, Stage, Rest){

	var exports = {};
	
	exports.MainView = Backbone.View.extend({
		el		:	'#main-content',
		events	: 	{},
		/**
		 * Initialize view
		 */
		initialize: function(){
			this.graphics = {};
			self = this;
		},
		/**
		 * Sets up graphics for new player
		 */
		initRoom:	function(data){
			var self = this;
			// render controls
			var controls = new Controls.ControlsView();

			this.$el.append(controls.render().el);

			// draw the rest of the stage
			var players = data.room.players;
			var dealer = data.room.dealer;
			players.push(dealer);

			$.each(players, function(i, player){
				var hand = player.hand;
				$.each(hand, function(j, card){
					self.addCardToTable({ card : card , player : player}, false);
				});
			});
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
		 * Handle player bet result
		 * @param {object} data retrived from server
		 */
		betResult: function(data){
			var result = data.result;

			if( result !=  Consts.BET_RESULT_CONFIRMED_LAST)
			{
				console.log("waiting for the rest of players to bet")
			}
			else
			{
				console.log("every one is done betting");
				io.socket.emit("doneBetting", { room : data.room });
			}
		},
		/**
		 * ask player to place bet
		 */
		placeBet: function(){
			var bet = window.prompt("Enter your bet");
			io.socket.emit("playerAction", { target : 1, action : "bet" , args : { bet : bet } });
		},
		/**
		 * add a card graphics to table
		 *
		 * @param data data retrived from server - player data, card data..
		 * @param {Boolean} animate weather to aniamte card
		 */
		addCardToTable: function(data, animate){
			var card = new Card(data.card);
			card.draw(this.graphics.stage, data.player, animate);
		},
		/**
		 * add "sit" buttons to relevant tiles on stage
		 */
		addSitButtons: function(){
			var self = this;
			var W = Consts.CANVAS_WIDTH / Consts.CONTAINERS_PER_ROW;
			var H = Consts.CANVAS_HEIGHT / Consts.CONTAINERS_PER_COL;

			// helper method to check if seat is available
			var sitFree = function(seats, x, y){
				if(!seats) return true;
				for(var i = 0 ; i < seats.length; i++)
				{
					if(seats[i].x == x && seats[i].y == y)
						return false;
				}
				return true;
			}

			// retrive taken seats from server
			Rest.get('seats', function(result){
				for( i = 0 ; i < Consts.CONTAINERS_PER_ROW ; i++)
				{
					for( j = 0 ; j < Consts.CONTAINERS_PER_COL; j++)
					{
						if( i != 0 && (i + j == Consts.CONTAINERS_PER_COL || i + j == 1) && sitFree(result, j, i))
						{
							if(!sitFree()) continue;

							var container = self.graphics.stage.getContainer(i, j);
							var sitButton = new createjs.Shape();

							// create graphics
							sitButton.graphics
								.beginFill("red")
								.drawCircle(W/2, H/2, 20);

							// listen to click event
							sitButton.addEventListener("click", self.playerReady);

							// add some custom attributes
							sitButton.containerPosition = { x : j, y : i };
							sitButton.name = "sitButton["+j+","+i+"]";

							container.addChild(sitButton);
						}
					}
				}
				self.graphics.stage.update();
			});
		},
		/**
		 * player ready
		 * @param e event data
		 */
		playerReady: function(e){
			io.socket.emit("playerAction", { action : "ready", args : { sit : e.target.containerPosition } });
			self.graphics.stage.removeByName("sitButton");
		},
		removeSit: function(data){
			var x = data.sit.x;
			var y = data.sit.y;

			this.graphics.stage.removeByName("sitButton["+x+","+y+"]");
		},
		/**
		 * Render the view
		 * @return {Backbone.View} current view
		 */
		render	:	function(){
			// create the game canvas
			var canvas = $('<canvas/>').attr('width', Consts.CANVAS_WIDTH).attr('height', Consts.CANVAS_HEIGHT);
			this.graphics.stage = new Stage(canvas[0]);
			this.addSitButtons();

			this.$el.html(canvas);

			return this;
		}
	});
	
	return exports;
});