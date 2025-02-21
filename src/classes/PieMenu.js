/*
	PieMenu.js
	----------

	Stores and manages the state for a Pie Menu.

	NOTE: the pie menu items are defined in DOM,
	as the children of the PieMenu component.

	This class just keeps track if its open or not,
	and where it's positioned.
*/

// libs
import { signal } from "@preact/signals-react";

// our app
import { TangramGame } from "./TangramGame";

// PieMenu class
export default class PieMenu {

	/**
	 * Constructor
	 * 
	 * @param {TangramGame} game - reference to the game state
	 */
	constructor(game) {

		// save the game reference
		this.game = game;

		// defaults
		this.isOpen = signal(false);
		this.x = signal(0);
		this.y = signal(0);

		// true when closing (for animation)
		this.closing = signal(false);
	}

	
	/**
	 * Show the pie menu
	 */
	show() {
		const currentCursorPos = this.game.dragHelper.getCursorPos()
		this.x.value = currentCursorPos.x;
		this.y.value = currentCursorPos.y;
		this.isOpen.value = true;

		// reset the closing state
		this.closing.value = false;
	}
	

	/**
	 * Hide the pie menu
	 */
	hide() {
		this.closing.value = true;
		setTimeout(() => {
			
			// if closing is false, then we canceled the close
			if (!this.closing.value) return;
			this.isOpen.value = false;
		}, 150);
	}


	/**
	 * Toggle the pie menu
	 */
	toggle() {
		this.isOpen.value ? this.hide() : this.show(); 
	}

}
