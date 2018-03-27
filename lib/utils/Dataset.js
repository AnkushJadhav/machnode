/***********************************
Base class for implementing datsets

************************************/

'use strict';
require('../helpers/assert.js')

function Dataset(data) {
	var m_index = {};
	var m_rows, m_columns, m_meta;
	let _init = function() {
		assert(data instanceof Array, 'INVALID DATATYPE (Parameter is not an Array)');
		assert((data.length > 0 && data[0] instanceof Array), 'INVALID DATATYPE (Parameter is not a 2D Array)');
		assert(data.length > 0, 'INVALID INITIALISATION (Empty Dataset cannot be initialised)');
		
		for (var itr_row = 0, len_row = data[0].length; itr_row < len_row; itr_row++) {
			m_index[data[0][itr_row]] = itr_row;
		}
		m_columns = data[0].length;
		m_meta = data[0];
		data = data.slice(1);
		m_rows = data.length;
		for (var itr_data = 1, len = data.length; itr_data < len; itr_data++) {
			assert(data[itr_data].length === m_columns, 'INVALID DATA (Source data is malformed)');
		}
	};	
	let _getDimensions = function() {
		return [m_rows, m_columns];
	};
	let _getColumnHeaders = function() {
		return m_meta;
	};
	let _getAtributes = function(indexes) {
		assert(indexes instanceof Array, 'INVALID PARAM (Parameter can be a String Array)');
		
		if (indexes instanceof Array) {
			for (var itr_scope = 0, len_scope = indexes.length; itr_scope < len_scope; itr_scope++) {
				assert(m_index.hasOwnProperty(indexes[itr_scope]), 'INVALID PARAM (Invalid attribute list)');
				assert(m_index[itr_scope] instanceof String || typeof m_index[itr_scope] === 'string', 'INVALID PARAM (Non string attribute)');
			}
			var m_result = [];
			m_result.push(indexes);
			for (var itr_data = 0, len = data.length; itr_data < len; itr_data++) {
				var record = [];
				for (var itr_scope = 0, len_scope = indexes.length; itr_scope < len_scope; itr_scope++) {
					record.push(data[itr_data][m_index[indexes[itr_scope]]]);
				}
				m_result.push(record);
			}
			
			return new Dataset(m_result);
		}
	};
	let _getRecords = function(start, end, step) {
		assert(start != null && end != null && step != null, 'INVALID PARAM (Invalid parameters)');
		
		var m_start = start || 0;
		var m_end = end || data.length;
		var m_step = step || 1;
		var m_result = [];
		
		m_result.push(m_meta);
		for (var itr_data = m_start, len = m_end; itr_data < len; itr_data += m_step) {
			m_result.push(data[itr_data]);
		}
		
		return new Dataset(m_result);
	};
	

	_init();
	this.dimensions = _getDimensions();
	this.columns = _getColumnHeaders();
	this.getAttributes = (indexes) => _getAtributes(indexes);
	this.getRecords = (start, end, step) => _getRecords(start, end, step);
}

module.exports = Dataset;
