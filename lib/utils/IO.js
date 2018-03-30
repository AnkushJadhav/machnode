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
var Dataset = require('./Dataset.js').Dataset;
var fs = require('fs');

/*
const CODE_DOUBLE_QUOTES = 34;
const CODE_POUND = 35;
const CODE_NL = 10;
const CODE_COMMA = 44;

module.exports.read_csv = function(path) {
var m_result = [];
var m_record = [];
var data = fs.readFileSync(path, 'utf-8');
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
return new Dataset(m_result);
};
*/

module.exports.readCsv = function(path, delimiter) {
	delimiter = (delimiter || ","); // user-supplied delimeter or default comma
	var CSV_string = fs.readFileSync(path, 'utf-8');

	var pattern = new RegExp( // regular expression to parse the CSV values.
		( // Delimiters:
			"(\\" + delimiter + "|\\r?\\n|\\r|^)" +
			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
			// Standard fields.
			"([^\"\\" + delimiter + "\\r\\n]*))"
		), "gi"
	);

	var rows = [[]];  // array to hold our data. First row is column headers.
	// array to hold our individual pattern matching groups:
	var matches = false; // false if we don't find any matches
	// Loop until we no longer find a regular expression match
	while (matches = pattern.exec( CSV_string )) {
		var matched_delimiter = matches[1]; // Get the matched delimiter
		// Check if the delimiter has a length (and is not the start of string)
		// and if it matches field delimiter. If not, it is a row delimiter.
		if (matched_delimiter.length && matched_delimiter !== delimiter) {
			// Since this is a new row of data, add an empty row to the array.
			rows.push( [] );
		}
		var matched_value;
		// Once we have eliminated the delimiter, check to see
		// what kind of value was captured (quoted or unquoted):
		if (matches[2]) { // found quoted value. unescape any double quotes.
			matched_value = matches[2].replace(
				new RegExp( "\"\"", "g" ), "\""
			);
		} else { // found a non-quoted value
			matched_value = matches[3];
		}
		// Now that we have our value string, let's add
		// it to the data array.
		rows[rows.length - 1].push(matched_value);
	}
	return new Dataset(rows); // Return the parsed data Array
};
