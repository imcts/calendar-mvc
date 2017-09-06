const { JSDOM } = require('jsdom');
const { window, window: { document } } = new JSDOM(
	'<!DOCTYPE html>' +
	'<html>' +
	'<body>' +
	'<div id="app"></div>' +
	'</body>' +
	'</html>'
);

global.window = window;
global.document = document;

Object.keys(window).forEach(key => {
	if(!(key in global)) {
		global[key] = window[key];
	}
});

if(!global.window.Element.prototype.dataset) {
	global.window.Element.prototype.dataset = {};
}