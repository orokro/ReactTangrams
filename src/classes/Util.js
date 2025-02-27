/*
	Util.js
	-------

	File to store utility functions that are used throughout the app
*/

// Util class
export default class Util {

	/**
	 * Static method to take an event (e) and stopo it from bubbling up
	 * 
	 */
	static stopEvent(e) {
		e.preventDefault();
		e.stopPropagation();
		e.cancelBubble = true;
		return e;
	}
}
