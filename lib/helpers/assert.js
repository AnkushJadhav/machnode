'use strict';

module.exports.assert = function(condition, message) {
	if (!condition) {
		console.log('ASSERTION FAILED : ' + message);
		throw new Error(message);
	}
};
