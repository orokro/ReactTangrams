/*
	TangramGame.js
	--------------

	This file will provide a regular OOP class for the Tangram game.
*/

// misc/lib
import DragHelper from "gdraghelper";

export class TangramGame {

	/**
	 * Constructor
	 */
	constructor() {

		// make a reusable instance of the drag helper
		this.dragHelper = new DragHelper();

		// // set the initial state
		// this.state = {
		// 	// the tangram pieces
		// 	pieces: [
		// 		{ id: 1, name: 'small triangle', x: 0, y: 0, color: 'red' },
		// 		{ id: 2, name: 'square', x: 0, y: 0, color: 'blue' },
		// 		{ id: 3, name: 'parallelogram', x: 0, y: 0, color: 'green' },
		// 		{ id: 4, name: 'medium triangle', x: 0, y: 0, color: 'yellow' },
		// 		{ id: 5, name: 'large triangle', x: 0, y: 0, color: 'purple' },
		// 		{ id: 6, name: 'small triangle', x: 0, y: 0, color: 'orange' },
		// 		{ id: 7, name: 'square', x: 0, y: 0, color: 'pink' },
		// 	],
		// 	// the grid
		// 	grid: {
		// 		width: 10,
		// 		color: 'rgba(0, 0, 0, 1)',
		// 	},
		// };

	}


}
