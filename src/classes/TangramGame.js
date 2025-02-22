/*
	TangramGame.js
	--------------

	This file will provide a regular OOP class for the Tangram game.
*/

// misc/lib
import DragHelper from "gdraghelper";

// libs
import { signal, useSignal } from "@preact/signals-react";

// app classes
import PieMenu from "./PieMenu";
import Piece from "./Piece";

// main game state and logic here
export class TangramGame {

	/**
	 * Constructor
	 */
	constructor() {

		// make a reusable instance of the drag helper
		this.dragHelper = new DragHelper();

		// the position where the board is scrolled to
		this.boardX = signal(0);
		this.boardY = signal(0);
		
		// true when the pie-menu should be open & it's position where spawned
		this.addShapePieMenu = new PieMenu(this);

		// our list of spawned pieces
		this.pieces = signal([]);
	}


	/**
	 * Adds a piece to the game board
	 * 
	 * @param {String} kind - the kind of piece to spawn (e.g. 'squareSM')
	 */
	spawnPiece(kind){

		// create a new piece of said kind
		const piece = new Piece(this, kind);

		// add it to the list of pieces
		this.pieces.value = [...this.pieces.value, piece];

	}


	/**
	 * Removes a piece from the game board
	 * @param {Piece|Number|String} piece - the piece to remove, or the id of the piece to remove
	 */
	removePiece(piece){

		// check if the piece paramter is a number or an instance of Piece
		if (typeof piece === 'number' || typeof piece === 'string')
			piece = this.pieces.value.find(p => p.id === parseInt(piece, 10));
		
		// filter out the piece
		this.pieces.value = this.pieces.value.filter(p => p !== piece);
	}

}
