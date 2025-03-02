/*
	ModalManager.js
	---------------

	Manages the state for which modals should be open at any given time,
	and opening / closing the ui layer.

	BTW, in the future, depending on needs, this might also have
	a way to queue / schedule modals, in case multiple modals need to be
	scheduled to open in sequence.
*/

// libs
import { signal } from "@preact/signals-react";

// app
import { TangramGame } from "./TangramGame";

// main vanilla js class
export default class ModalManager {

	// static modal kinds
	static MODALS = {

		WELCOME: "WELCOME",
		SHARE_URL: "SHARE_URL",
		IMPORT_EXPORT: "IMPORT_EXPORT",
		HELP: "HELP",
		THREED: "THREED",
		MSGBOX: "MSGBOX",
	};

	/**
	 * Constructor
	 * 
	 * @param {TangramGame} game - The game instance
	 */
	constructor(game){

		// the game instance
		this.game = game;

		// the current modal kind
		this.currentModal = signal(null);

		// open or close the modal layer
		this.isOpen = signal(false);
	}


	/**
	 * Open a modal
	 * 
	 * @param {string} modalKind - The kind of modal to open
	 */
	openModal(modalKind){
		this.currentModal.value = modalKind;
		this.isOpen.value = true;
	}


	/**
	 * Close the current modal
	 */
	closeModal(){
		this.currentModal.value = null;
		this.isOpen.value = false;
	}

}
