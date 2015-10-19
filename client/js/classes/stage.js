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
	 */
	Stage.prototype.addChild = function(child){
		this.crjs.addChild(child);
		this.crjs.update();
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
	 */
	Stage.prototype.addBitmap = function(path){
		var self = this;
		var image = new Image();
		image.src = path;
		image.onload = function(){
			var bitmap = new createjs.Bitmap(path);
			self.addChild(bitmap);
		}
	}

	/**
	 * update stage
	 */
	Stage.prototype.update = function(){
		this.crjs.update();
	}
	

	return Stage;
});