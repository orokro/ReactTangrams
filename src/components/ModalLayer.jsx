/*
	ModalLayer.jsx
	--------------

	This is the modal layer that will darken and blur the background
	whenever a modal is open.

	This all the Modal components will be mounted as children.

	NOTE: this is unrelated to the Modals.jsx component, which is a wrapper
	to set up all modals specific to the app.
*/

// react imports
import { useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// libs
import classNames from "classnames";

// main component
export const ModalLayer = ({ game, children }) => {

	// ref to our modal el
	const modalLayerRef = useRef(null);

	const handleClick = (e) => {
		// close modal only if the click was on the modal layer directly
		if(e.target === modalLayerRef.current){
			game.modalManager.closeCurrentModal();
		}
	};

	// render
	return (
		<div 
			ref={modalLayerRef}
			css={style}
			className={classNames(
				'modal-layer', 
				{ open: game.modalManager.currentModal.value !== null }
			)}
			onClick={handleClick}
		>
			<div className="modal-center-wrapper">
				{children}
			</div>
		</div>
	);
}

// styles
const style = css`

	// fixed to the top left
	position: fixed;
	top: 0;
	left: 0;

	// fill the screen
	width: 100vw;
	height: 100vh;

	// dark blurry background that animates in/out
	transition: 
		background 0.3s ease-in-out,
		backdrop-filter 0.3s ease-in-out,
		opacity 0.3s ease-in-out;
	background: rgba(0, 0, 0, 0.0);
	backdrop-filter: blur(0px);

	// make sure it's on top
	z-index: 1000;

	// hidden by default, with no events
	opacity: 0;
	pointer-events: none;

	// open style
	&.open {

		// show and re-enable events
		opacity: 1;
		pointer-events: initial;

		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
	}

	// the 0x0 div that centers the modal children
	.modal-center-wrapper {

		// fixed in center
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 50%;
		
		// centering trick
		width: 0px;

		// for debug
		/* border: 1px solid red; */

	}// .modal-center-wrapper
`;
