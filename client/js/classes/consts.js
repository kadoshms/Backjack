/**
*	File Name 	: client/js/classes/conts.js
*	Description	: this file contains client wide used constants
*	Author		: Kadoshms
*/

define([], function(){
	var consts = {};

	// bet results
	consts.BET_RESULT_REJECTED = 0;
	consts.BET_RESULT_CONFIRMED = 1;
	consts.BET_RESULT_CONFIRMED_LAST = 2;

	// system
	consts.IMG_BASE = "client/image/";
	consts.CONTAINERS_PER_ROW = 3;
	consts.CONTAINERS_PER_COL = 3;
	consts.API_PATH = "http://localhost:3000/";

	// graphics
	consts.CANVAS_HEIGHT = 600;
	consts.CANVAS_WIDTH	= 600;

	return consts;
	
});