/*
	TangramGame.js
	--------------

	This file will provide a regular OOP class for the Tangram game.
*/

// misc/lib
import DragHelper from "gdraghelper";

// libs
import { signal, useSignal } from "@preact/signals-react";

// main game state and logic here
export class TangramGame {

	/**
	 * Constructor
	 */
	constructor() {

		// make a reusable instance of the drag helper
		this.dragHelper = new DragHelper();

		// true when the pie-menu should be open & it's position where spawned
		this.pieMenuOpen = signal(false);
		this.pieMenuX = signal(0);
		this.pieMenuY = signal(0);

		// drag position of the board
		this.boardX = signal(0);
		this.boardY = signal(0);

	}

	/**
	 * Show the pie menu
	 */
	showPieMenu() {
		const currentCursorPos = this.dragHelper.getCursorPos()
		this.pieMenuX.value = currentCursorPos.x;
		this.pieMenuY.value = currentCursorPos.y;
		this.pieMenuOpen.value = true;
	}


	/**
	 * Hide the pie
	 */
	hidePieMenu() {
		this.pieMenuOpen.value = false;
	}

	/**
	 * Toggle
	 */
	togglePieMenu() {
		this.pieMenuOpen.value ? this.hidePieMenu() : this.showPieMenu(); 
	}

}
