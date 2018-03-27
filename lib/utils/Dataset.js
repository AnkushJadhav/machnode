/***********************************
Base class for implementing datsets

************************************/

'use strict';
require('../helpers/assert.js')

function Dataset(data) {
	assert(data instanceof Array, 'INVALID DATATYPE (Parameter is not an Array.)');

	this.test = function(param) {
		console.log('Param : ' + param);
	}
}

module.exports.Dataset = Dataset;
