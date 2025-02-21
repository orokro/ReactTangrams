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
	}


}
