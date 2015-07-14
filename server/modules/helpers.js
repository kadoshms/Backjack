/**
*	File Name 	: server/modules/helpers.js
*	Description	: this module contains helper methods
*	Author		: kadoshms
*/

var exports = {};

/**
 * Generates a card map in this form key = > { name :"card name", value : "actual value", key : "card key"}
 * returns {object} card map
 */
exports.generateCardMap = function(){
	var shapes 	= ['diamonds','clubs','spades','hearts'];
	var keys 	= [2,3,4,5,6,7,8,9,10,'ace','jack','queen','king'];
	var map 	= {};
	var counter = 0;

	var getCardValue = function(val){
		if(isNaN(val))
		{
			if(val == "ace")
				return -1;
			return 10;
		}
		return val;
	}

	for(var i = 0 ; i < shapes.length; i++)
	{
		for(var j = 0 ; j < keys.length; j++)
		{
			var value 	= getCardValue(keys[j]);
			var name	= keys[j]+"_"+shapes[i];
			map[counter] = { name : name , value : value, key : keys[j]};

			counter++;
		}
	}

	return map;
}

module.exports = exports;