/*
	Piece.js
	--------

	Stores the state for an instance of a Tangram piece.
*/

// react
import { signal } from "@preact/signals-react";

// our app classes
import { TangramGame } from "./TangramGame";

// Piece class
export default class Piece {

	// static counter for unique ids
	static idCounter = 0;

	/**
	 * Constructor
	 * 
	 * @param {TangramGame} game - reference to the game state
	 * @param {String} type - the type of piece to create (e.g. 'squareSM')
	 */
	constructor(game, type) {

		// save ref to our game
		this.game = game;

		// unique id
		this.id = Piece.idCounter++;

		// our dynamic state
		this.type = signal(type);
		this.x = signal(0);
		this.y = signal(0);
		this.rotation = signal(0);
		this.isDragging = signal(false);
		this.color = signal('#000000');
	}


	startDrag() {
		this.isDragging.value = true;
		
		// save the position we were at when drag was started
		const initialPos = {
			x: this.x.value,
			y: this.y.value
		};

	}


}
