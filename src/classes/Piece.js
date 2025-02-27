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
		this.isSelected	= signal(false);
		this.color = signal('#000000');
	}


	/**
	 * Sets the position of the piece
	 * 
	 * @param {Number} x - the x position to set
	 * @param {Number} y - the y position to set
	 * @param {Boolean} snap - (optional) if true, snap to the grid
	 */
	setPos(x, y, snap=true) {
		const snapToGrid = (n) => n - (n % 20);
		this.x.value = snap ? snapToGrid(x) : x;
		this.y.value = snap ? snapToGrid(y) : y;
	}


	/**
	 * Starts dragging the piece
	 */
	startDrag() {
		this.isDragging.value = true;
		
		// save the position we were at when drag was started
		const initialPos = {
			x: this.x.value,
			y: this.y.value
		};

		// for styling
		this.isDragging.value = true;

		this.game.dragHelper.dragStart(
			(dx, dy)=>{
				this.setPos(initialPos.x - dx, initialPos.y - dy);
			},
			()=>{
				this.isDragging.value = false;
			}
		);
	}


	/**
	 * Rotates the piece left or right depending on if shift is held with the (e) event
	 * 
	 * @param {Event} e - the event object
	 */
	rotate(e) {

		// if shift is held, rotate 45 degrees
		const rotateAmount = e.shiftKey ? -45 : 45;

		// rotate the piece
		this.rotation.value += rotateAmount;

		// keep the rotation between 0 and 360
		// this.rotation.value = this.rotation.value % 360;
	}

}
