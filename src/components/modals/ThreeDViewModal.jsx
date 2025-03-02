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
				<div className="cancelMargin">
					<ProjectRender game={game} />
				</div>
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

	position: relative;
	width: 900px;
	height: 600px;

	border-bottom: 1px solid #858585;
	margin-bottom: 10px;

	.cancelMargin {
		position: absolute;
		inset: -18px -20px 0px -20px;
	}
`;
