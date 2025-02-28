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

		// for closing callbacks
		this.openContext = null;
		this.onPick = null;
	}

	
	/**
	 * Show the pie menu
	 * 
	 * @param {Function} onPick - the callback when an item is picked
	 */
	show(onPick=null) {
		this.onPick = onPick;

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

			// run the close callback
			if (this.onPick) {
				this.onPick();
				this.onPick = null;
			}
			
		}, 150);
	}


	/**
	 * Toggle the pie menu
	 * 
	 * @param {Function} onPick - the callback when an item is picked
	 */
	toggle(onPick=null) {		
		this.isOpen.value ? this.hide() : this.show(onPick); 
	}

}
