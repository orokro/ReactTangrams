/*
	TangramGame.js
	--------------

	This file will provide a regular OOP class for the Tangram game.
*/

// misc/lib
import DragHelper from "gdraghelper";

// libs
import { signal } from "@preact/signals-react";

// app classes
import ProjectManager from "./ProjectManager";
import ModalManager from "./ModalManager";
import PieMenu from "./PieMenu";
import Piece from "./Piece";
import ImportExportManager from "./ImportExportManager";

import { shapeData } from "./Piece";
import { watch } from "../util/preact_watch";

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

		// dark mode?
		this.darkMode = signal(false);

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

		// disable save while loading to prevent feedback loop
		this.isLoading = false;

		// modal state goes here
		this.modalManager = new ModalManager(this);

		// make a project manager which will save and load projects
		this.projectManager = new ProjectManager(this, this.loadProject.bind(this));

		// helps with importing and exporting projects
		this.importExportManager = new ImportExportManager(this);
		
		// save project when these change
		watch([this.boardX, this.boardY, this.pieces], () => {
			this.queueSaveProject();
		});

		// show welcome on load
		this.modalManager.openModal(ModalManager.MODALS.WELCOME);
		
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
	spawnPiece(kind) {

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
	 * 
	 * @param {String} pieceID - the piece id of the piece to remove
	 */
	removePiece(pieceID) {

		// filter out the piece by id
		this.pieces.value = this.pieces.value.filter(piece => piece.id !== pieceID);
	}


	/**
	 * Moves a piece back in the piece list
	 * 
	 * @param {Piece} piece - the piece to move
	 */
	movePieceBack(piece) {
		const index = this.pieces.value.findIndex(p => p.id === piece.id);
		if (index > 0) {
			const newPieces = [...this.pieces.value];
			[newPieces[index], newPieces[index - 1]] = [newPieces[index - 1], newPieces[index]];
			this.sortFix(newPieces);
		}
	}


	/**
	 * Moves a piece forward in the piece list
	 * 
	 * @param {Piece} piece - the piece to move
	 */
	movePieceForward(piece) {
		const index = this.pieces.value.findIndex(p => p.id === piece.id);
		if (index !== -1 && index < this.pieces.value.length - 1) {
			const newPieces = [...this.pieces.value];
			[newPieces[index], newPieces[index + 1]] = [newPieces[index + 1], newPieces[index]];
			this.sortFix(newPieces);
		}
	}


	/**
	 * Sends a piece to the back of the piece list
	 * 
	 * @param {Piece} piece - the piece to send to the back
	 */
	sendPieceToBack(piece) {
		const newPieces = this.pieces.value.filter(p => p.id !== piece.id);
		newPieces.unshift(piece);
		this.sortFix(newPieces);
	}


	/**
	 * Sends a piece to the front of the piece list
	 * 
	 * @param {Piece} piece - the piece to send to the front
	 */	
	sendPieceToFront(piece) {
		const newPieces = this.pieces.value.filter(p => p.id !== piece.id);
		newPieces.push(piece);
		this.sortFix(newPieces);
	}


	/**
	 * This is dumb and I need to fix this
	 */
	sortFix(newPieces){

		this.pieces.value = [];
		setTimeout(() => {this.pieces.value = newPieces;}, 0);
	}


	/**
	 * When our project manager loads a project, this function is called
	 * 
	 * @param {Object} project - the project object to load
	 */
	loadProject(project) {

		// load the project data into the game state
		this.deserializeFromJSON(project.data);
	}


	/**
	 * Queues a save project operation
	 */
	queueSaveProject() {

		// if we're loading a project, GTFO to prevent feedback loop
		if (this.isLoading)
			return;

		// if we are already saving, just increment the counter
		this.saveQueued = this.saveQueued || 0;
		this.saveQueued++;
		if (this.saveQueued > 1)
			return;

		// save the project after a short delay to prevent spamming
		setTimeout(() => {

			// for debug
			// console.log(`saving project..., was queued ${this.saveQueued} times`);

			// save & reset the counter
			this.projectManager.save(this.serializeToJSON());
			this.saveQueued = 0;
		}, 100);
	}


	/**
	 * Serializes the game state to a JSON object
	 * 
	 * @returns {Object} - the game state as a JSON object
	 */
	serializeToJSON() {

		return {
			boardX: this.boardX.value,
			boardY: this.boardY.value,
			pieces: this.pieces.value.map(piece => piece.serializeToJSON())
		};
	}


	/**
	 * Loads the game state from a JSON object
	 * 
	 * @param {Object} data - the game state as a JSON object
	 */
	deserializeFromJSON(data) {

		// if no pieces, clear board & gtfo
		if (!data.pieces) {
			this.pieces.value = [];
			return;
		}

		// true till we're done loading
		this.isLoading = true;

		// load our board position
		this.boardX.value = data.boardX ? data.boardX : 0;
		this.boardY.value = data.boardY ? data.boardY : 0;

		// clear the pieces
		this.pieces.value = [];

		// load the pieces into new array
		setTimeout(() => {
			this.pieces.value = data.pieces.map(pieceData => {
				const piece = new Piece(this, pieceData.type);
				piece.deserializeFromJSON(pieceData);
				return piece;
			});

			// done loading
			this.isLoading = false;
		}, 0);
	}

}
