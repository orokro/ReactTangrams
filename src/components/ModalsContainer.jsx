/*
	ModalsContainer.jsx
	-------------------

	This fill will provide a light wrapper container to keep
	all the modals in one place, and therefore keep 
	the main app component clean and tidy.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// app classes
import ModalManager from "../classes/ModalManager";

// components
import { ModalLayer } from './ModalLayer'
import { WelcomeModal } from "./modals/WelcomeModal";
import { ImportExportModal } from "./modals/ImportExportModal";
import { ShareLinkModal } from "./modals/ShareLinkModal";
import { HelpModal } from "./modals/HelpModal";
import { ThreeDViewModal } from "./modals/ThreeDViewModal";

// main component
export const ModalsContainer = ({ game }) => {

	const modalManager = game.modalManager;

	const handleClose = () => {
		modalManager.closeModal();
	}

	// render
	return (
		<ModalLayer game={game}>

			{ modalManager.currentModal.value == ModalManager.MODALS.WELCOME && (
				<WelcomeModal game={game} onClose={handleClose} />) }

			{ modalManager.currentModal.value == ModalManager.MODALS.IMPORT_EXPORT && (
				<ImportExportModal game={game} onClose={handleClose} />) }

			{ modalManager.currentModal.value == ModalManager.MODALS.SHARE_URL && (
				<ShareLinkModal game={game} onClose={handleClose} />) }

			{ modalManager.currentModal.value == ModalManager.MODALS.HELP && (
				<HelpModal game={game} onClose={handleClose} />) }

			{ modalManager.currentModal.value == ModalManager.MODALS.THREED && (
				<ThreeDViewModal game={game} onClose={handleClose} />) }

		</ModalLayer>
	);
}

// styles
const style = css`

`;
