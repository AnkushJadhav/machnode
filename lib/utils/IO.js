/***********************************
Base class for implementing IO functions

************************************/

'use strict';
require('../helpers/assert.js')
var fs = require('fs');

const CODE_DOUBLE_QUOTES = 34;
const CODE_POUND = 35;

var read_csv = function(path) {
	var m_result = [];
	var m_record = [];
	fs.readFile(path, (err, data) => {
		assert(err, err);
		var m_quote_switch = false;
		var m_skip_switch = false;
		for(const value of data.values()) {
			if (value === CODE_DOUBLE_QUOTES) !m_quote_switch;
			if (value === CODE_POUND) m_skip_switch = true;
		}
	});
};
