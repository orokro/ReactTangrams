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
		if(onClose) onClose();
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
			style={{ width: '900px', maxHeight: '70%' }}
		>
			<div css={style}>
				<h2>Here's some interesting and useful help.</h2>
				<p>
					Purr, jump around on couch, meow constantly until given food, and
					destroy	the blinds. Eat and than sleep on your face. Meow meow, i tell my
					hooman for pushes butt to face and chase mouse. Meow meow, i tell my hooman
					for pushes butt to face and chase mouse. Purr, jump around on couch, meow
					constantly until given food, and
					destroy the blinds. Eat and than sleep on your face. Meow meow, i tell my
					hooman for pushes butt to face and chase mouse. Meow meow, i tell my hooman
					for pushes butt to face and chase mouse.
				</p>
				<h2>Enjoy this video</h2>				
				<iframe width="560" height="315" src="https://www.youtube.com/embed/y0sF5xhGreA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
