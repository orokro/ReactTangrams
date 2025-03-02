/*
	ShareLinkModal.jsx
	------------------

	Shows the copy-and-paste able link to share the current project.
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
export const ShareLinkModal = ({ game, onClose }) => {

	// ref to our text box & modal
	const txtAreaRef = useRef(null);
	const modalRef = useRef(null);

	// get the link URL
	const linkURL = useMemo(() => {
		return game.projectManager.generateShareLink();	}
	, []);

	// select all text in the textarea
	const selectAllText = (e) => {
		e.target.select();
	};

	// copy the text to the clipboard
	const copyText = () => {
		txtAreaRef.current.select();
		document.execCommand('copy');
	};

	// hand button clicks
	const buttonClicked = (buttonAction, buttonName) => {
		switch (buttonAction) {
			case 'copy':
				copyText();
				break;
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
			modalKey={ModalManager.MODALS.SHARE_URL}
			showClose={true}
			title="Share Project"
			materialIcon="share"
			onClose={handleClose}
		>
			<div css={style}>
				<p>Copy and paste the following link to share this project:</p>
				<textarea 
					ref={txtAreaRef}
					css={{ resize: 'none' }}
					className="txtCopyBox"
					value={linkURL}
					readOnly 
					onClick={selectAllText}
				/>
				<ModalButtonBar
					buttonsList={[
						['Copy', 'copy'],
						['close', 'close', true],
					]}
					onButtonClicked={buttonClicked}
				/>
				
			</div>
		</Modal>
	);
}

// styles
const style = css`

	// center the text
	text-align: center;

	// center the input
	.txtCopyBox {

		// fixed size
		width: 590px;
		height: 100px;
		margin: 0 auto;

		// look nice
		background: white;
		border: 2px solid black;
		border-radius: 5px;
		outline: none;

		word-wrap: break-word;
		overflow-wrap: break-word;

	}// .txtCopyBox

`;
