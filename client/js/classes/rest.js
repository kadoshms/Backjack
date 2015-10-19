/**
*	File Name 	: client/js/classes/rest.js
*	Description	: rest api helper class
*	Author		: Kadoshms
*/

define([
 'jquery',
 'classes/consts'
], function($, consts){

	var Rest = function(){}
	
	/**
	 * execute ajax request
	 * @param type
	 * @param url
	 * @param success
	 * @param error
	 */
	Rest.prototype.request = function(type, url, success, error){
		$.ajax({
			type	:	type,
			url		:	consts.API_PATH+url,
			success :	success,
			error	:	error
		});
	}
	/**
	 * get resource
	 * @param url
	 * @param success success callback
	 * @param error error callback
	 */
	Rest.prototype.get = function(url, success, error){
		this.request("GET", url, success, error);
	}

	return new Rest;
});