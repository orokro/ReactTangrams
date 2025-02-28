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
import { shapeData } from "./Piece";
import ProjectManager from "./ProjectManager";

// main game state and logic here
export class TangramGame {

	/**
	 * Constructor
	 */
	constructor() {

		// make a reusable instance of the drag helper
		this.dragHelper = new DragHelper({
			usePointerEvents: true,
		});

		// the position where the board is scrolled to
		this.boardX = signal(0);
		this.boardY = signal(0);

		// true when we want the project menu open (starts open)
		this.projectPanelIsOpen = signal(true);
		
		// our pie menus for adding and editing shapes
		this.addShapePieMenu = new PieMenu(this);
		this.editShapePieMenu = new PieMenu(this);
		this.rotateShapePieMenu = new PieMenu(this);
		this.sortShapePieMenu = new PieMenu(this);
		this.colorShapePieMenu = new PieMenu(this);

		// our list of spawned pieces
		this.pieces = signal([]);

		// make a project manager which will save and load projects
		this.projectManager = new ProjectManager(this, this.loadProject.bind(this));
	}


	/**
	 * Get's the current cursor position on the board
	 * 
	 * @returns {Object} {x, y} - the x and y position of the cursor on the board
	 */
	getCursorPosOnBoard() {

		const pos = this.dragHelper.getCursorPos();
		return {
			x: pos.x - this.boardX.value,
			y: pos.y - this.boardY.value - 50
		};
	}


	/**
	 * Adds a piece to the game board
	 * 
	 * @param {String} kind - the kind of piece to spawn (e.g. 'squareSM')
	 */
	spawnPiece(kind){

		// create a new piece of said kind
		const piece = new Piece(this, kind);

		// set the position to the cursor position
		const cursorPos = this.getCursorPosOnBoard();
		piece.setPos(cursorPos.x, cursorPos.y);

		// pick initial color from shapeData
		piece.color.value = shapeData[kind].defaultColor;

		// add it to the list of pieces
		this.pieces.value = [...this.pieces.value, piece];
	}


	/**
	 * Removes a piece from the game board
	 * @param {Piece|Number|String} piece - the piece to remove, or the id of the piece to remove
	 */
	removePiece(piece){

		// check if the piece parameter is a number or an instance of Piece
		if (typeof piece === 'number' || typeof piece === 'string')
			piece = this.pieces.value.find(p => p.id === parseInt(piece, 10));
		
		// filter out the piece
		this.pieces.value = this.pieces.value.filter(p => p !== piece);
	}


	/**
	 * When our project manager loads a project, this function is called
	 * 
	 * @param {Object} project - the project object to load
	 */
	loadProject(project) {

		console.log('Loaded project:', project);
	}

}
