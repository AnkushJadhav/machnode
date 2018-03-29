/***********************************
Base class for implementing IO functions

NOTES:
Parse CSV as a Buffer
If first character is a pound symbol, then skip the line //NEXT RELEASE
Add buffer character to current local buffer, until a comma is encountered
Push local buffer in current record when comma is encountered and quote switch is off
If
************************************/

'use strict';
require('../helpers/assert.js')
var fs = require('fs');

const CODE_DOUBLE_QUOTES = 34;
const CODE_POUND = 35;
const CODE_NL = 10;
const CODE_COMMA = 44;

var _read_csv = function(path) {
		var m_result = [];
		var m_record = [];
		fs.readFile(path, (err, data) => {
			assert(!err, err);
			var m_quote_switch = false;
			var m_skip_switch = false;
			var l_buffer = '';
			for(const value of data.values()) {
				if (value === CODE_DOUBLE_QUOTES) {
					!m_quote_switch;
					continue;
				}
				if (value === CODE_POUND) m_skip_switch = true;
				if(value === CODE_COMMA && !m_quote_switch) {
					m_record.push(l_buffer);
					l_buffer = '';
					continue;
				}
				if (value === CODE_NL && !m_quote_switch) {
					m_record.push(l_buffer);
					m_result.push(m_record);
					m_record = [];
					l_buffer = '';
					continue;
				}
				l_buffer += String.fromCharCode(value);
			}
		});
		return m_result;
};

module.exports.read_csv = (path) => Promise.resolve(_read_csv(path));
