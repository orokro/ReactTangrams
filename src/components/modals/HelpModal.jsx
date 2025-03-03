/*
	HelpModal.jsx
	-------------

	Show Help video and text modal.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useRef } from "react";

// components
import { Modal } from "../Modal";
import { ModalButtonBar } from "../ModalButtonBar";

// our classes
import ModalManager from "../../classes/ModalManager";

// main component
export const HelpModal = ({ game, onClose }) => {

	// ref to our modal
	const modalRef = useRef(null);

	// hand button clicks
	const buttonClicked = (buttonAction, buttonName) => {
		switch (buttonAction) {
			case 'close':
				modalRef.current.close();
				break;
		}// swatch 
	};

	// close the modal
	const handleClose = () => {
		if (onClose) onClose();
	};

	// render
	return (

		<Modal
			ref={modalRef}
			game={game}
			modalKey={ModalManager.MODALS.HELP}
			showClose={true}
			title="Help"
			materialIcon="help"
			onClose={handleClose}
			style={{ width: '1000px', maxHeight: '900px' }}
		>
			<div css={style} align="left">
				<h2>Quick Start</h2>
				<ul align="left">
					<li><span>Left Click</span>+<span>Drag</span> on the grid to pan the view up/down/left/right</li>
					<li><span>Right Click</span> empty grid space to add shapes!</li>
					<li><span>Right Click</span> on a shape to edit it, or remove it.</li>
					<li>Click the folder icon <span className="material-icons down">folder</span> on the top-left to see your projects!</li>
					<li>Click the help icon <span className="material-icons down">help</span> on the header for more info.</li>
					<li>Have fun!</li>
				</ul>
				<h2>Video Tutorial</h2>
				<iframe width="980" height="600" src="https://www.youtube.com/embed/VuBKm3nOVRQ?si=oGT2GAb7E_ZGrudd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

			</div>
			<ModalButtonBar
				buttonsList={[
					['thx for the help', 'close', true],
				]}
				onButtonClicked={buttonClicked}
			/>
		</Modal>
	);
}

// styles
const style = css`

	// center the text
	text-align: center;

	height: 600px;
	margin-bottom: 10px;
	overflow-y: auto;
	
`;
