/*
	ThreeDViewModal.jsx
	-------------------

	As a way to test out React Three Fiber, I'm going to create a modal
	that shows a 3D view of the current project.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef } from "react";

// components
import { Modal } from "../Modal";
import { ModalButtonBar } from "../ModalButtonBar";
import { ProjectRender } from "../three/ProjectRender";	

// our classes
import ModalManager from "../../classes/ModalManager";

// main component
export const ThreeDViewModal = ({ game, onClose }) => {

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
			modalKey={ModalManager.MODALS.THREED}
			showClose={true}
			title="Live 3D View"
			materialIcon="3d_rotation"
			onClose={handleClose}
			style={{ width: '900px', maxHeight: '70%' }}
		>
			<div css={style}>
				<ProjectRender game={game} />
			</div>
			<ModalButtonBar
				buttonsList={[
					['close', 'close', true],
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

	width: 800px;
	height: 600px;

	margin-bottom: 10px;
	overflow-y: auto;	
`;
