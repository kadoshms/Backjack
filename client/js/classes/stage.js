/**
*	File Name 	: client/js/classes/stage.js
*	Description	: createjs stage object with custom methods and attributes
*	Author		: Kadoshms
*/

define([
        'classes/consts',
        'socket.io'
], function(Consts, io){
	/**
	 * create a new stage
	 * @param canvas canvas to attach stage to
	 */
	function Stage(canvas){
		this.crjs = new createjs.Stage(canvas);
		this.containers = [];
		this.buildContainers();

		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", this.crjs);
	}
	/**
	 * divides stage into evan containers
	 */
	Stage.prototype.buildContainers = function(){
		var W = Consts.CANVAS_WIDTH / Consts.CONTAINERS_PER_ROW;
		var H = Consts.CANVAS_HEIGHT / Consts.CONTAINERS_PER_COL;

		// first create those containers
		for(var i = 0 ; i < Consts.CONTAINERS_PER_ROW; i++)
		{
			this.containers[i] = [];
			for(var j = 0 ; j < Consts.CONTAINERS_PER_COL; j++)
			{
				var container = new createjs.Container();
				
				container.x = j * W;
				container.y = i * H;
				
				this.containers[i].push(container);
				this.addChild(container);
			}
		}
	}
	/**
	 * remove all children with name
	 * @param name name of object
	 */
	Stage.prototype.removeByName = function(name){
		for(var i = 0 ; i < Consts.CONTAINERS_PER_ROW; i++)
		{
			for(var j = 0 ; j < Consts.CONTAINERS_PER_COL; j++)
			{
				var container = this.containers[i][j];
				for(var n = 0 ; n < container.children.length; n++)
				{
					if(container.children[n].name.indexOf(name) != -1)
					{
						container.removeChildAt(n);
					}
				}
			}
		}
		this.update();
	}
	/**
	 * removes a child from the stage
	 * @param child
	 */
	Stage.prototype.removeChildFromContainer = function(child){
		var children = child.parent.children;

		for(var i = 0 ; i < children.length ; i++)
		{
			if(child.id == child.parent.children[i].id)
				child.parent.removeChild(child.parent.children[i])
		}

		this.update();
	}
	/**
	 * generic method to add child to stage
	 * @param {object} child child to add
	 * @param optional container
	 * @param optional {function} tween function
	 * @param optional {object} set of options to apply to child
	 * @param optional {number} add child at index
	 */
	Stage.prototype.addChild = function(child, container, tween, options, index){
		if(typeof(options) == "object") $.extend(child, options, true);

		if(container == undefined)
		{
			container = this.crjs;
		}

		if( index == undefined )
		{
			container.addChild(child);
		}
		else
		{
			container.addChildAt(child, index);
		}

		this.crjs.update();

		if(typeof(tween) == "function") tween(child);
	}

	/**
	 * get container by row and column
	 * @param row row number
	 * @param col column number
	 * @returns relevant container
	 */
	Stage.prototype.getContainer = function(row, col){
		return this.containers[row][col];
	}
	
	/**
	 * add bitmap to stage
	 * @param {string} path bitmap path
	 * @param optional container
	 * @param optional {function} position manipulation
	 * @param optional {function} tween tween function
	 * @param optional {object} set of options to apply to child
	 * @param optional {number} index index of bitmap for draw order
	 */
	Stage.prototype.addBitmap = function(path, container, posCallback, tween, options, index){
		var self = this;
		var image = new Image();
		image.src = path;
		image.onload = function(){
			var bitmap = new createjs.Bitmap(path);
			if(typeof(posCallback) == "function")
			{
				var pos = posCallback();
				bitmap.x = pos.x;
				bitmap.y = pos.y;
			}
			self.addChild(bitmap, container, tween, options, index);
		}
	}

	/**
	 * update stage
	 */
	Stage.prototype.update = function(){
		this.crjs.update();
	}

	/**
	 * get container by position
	 * @param {object} pos position
	 * @returns
	 */
	Stage.prototype.getContainerByPosition = function(pos){
		return this.containers[pos.y][pos.x] || undefined;
	}
	

	return Stage;
});