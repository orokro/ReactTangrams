/*
	Modal.jsx
	---------

	The actual modal window component.

	Provides header bar, close button, escape key close, and more.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, forwardRef, useImperativeHandle, use } from "react";

// libs
import classNames from "classnames";

// forward ref component so we can call close
export const Modal = forwardRef(
	({game, modalKey, title, showClose, allowEscapeToClose, onClose, children, ...props}, ref) => {

	// default values
	showClose = showClose ?? true;
	allowEscapeToClose = allowEscapeToClose ?? true;

	// true while closing
	const [open, setOpen] = useState(false);

	// on mount, open the modal (trigger CSS animation)
	useEffect(() => {
		setTimeout(() => {			
			setOpen(true);
		}, 1);
	}, []);
	
	// close the modal
	const close = () => {
		setOpen(false);
		setTimeout(() => {
			if(onClose) onClose();
			setOpen(false);
		}, 175);
	}

	// allow closing from parent
	useImperativeHandle(ref, () => ({
		close: () => { close();},
	}));

	// close on escape key
	if(allowEscapeToClose){
		useEffect(() => {
			const closeOnEscape = (e) => {
				if (e.key === 'Escape') {
					close();
				}
			};
			window.addEventListener('keydown', closeOnEscape);
			return () => window.removeEventListener('keydown', closeOnEscape);
		}, [onClose]);
	}

	return (
		<div 
			css={style}
			className={classNames(
				'modal',
				{ open: open }
			)}
			{...props}
		>

			<div className="modal-header">
				<h2>{title}</h2>
				{showClose && (
					<div className="cmdClose" title="close" onClick={close}>
						<span className="material-icons">close</span>
					</div>
				)}
			</div>

			<div className="modal-content">
				{children}
			</div>
		</div>
	);
});

// styles
const style = css`

	// new stacking context, centered
	position: relative;
	transform: translate(-50%, 0%);
	
	// don't allow input if not set open
	pointer-events: none;

	// for animating in/out
	transition: top 0.3s ease-in-out;
	top: -100%;

	// move down when open
	&.open {
		pointer-events: initial;
		top: 10% !important;
	}
	
	// box settings
	background: white;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.75);

	border-radius: 10px;
	overflow: clip;
	
	padding: 60px 20px 20px 20px;
	
	// dimensions
	min-width: 600px;
	min-height: 100px;	

	// header bar
	.modal-header {

		// fixed on top
		position: absolute;
		inset: 0px 0px auto 0px;

		// 40 px thicc blue bar with a bottom border
		height: 40px;
		background: #21b5c9;
		border-bottom: 2px solid #1d7491;

		// title
		h2 {
			text-align: center !important;
			color: white;
			text-shadow: 3px 2px 1px #1d7491;
			margin: 0;
		}

		// close button
		.cmdClose {
			
			// look clickable
			cursor: pointer;

			// circle fixed to top right
			position: absolute;
			top: 10px;
			right: 10px;
			width: 23px;
			height: 23px;
			border-radius: 50%;

			// light up on hover (animated)
			background: rgba(0, 0, 0, 0.25);
			color: rgba(255, 255, 255, 0.75);
			transition:
				background 0.1s ease-in-out,
				color 0.1s ease-in-out;
			
			&:hover {
				background: rgba(255, 0, 0, 0.6);
				color: rgba(255, 255, 255, 1);
			}

			span {
				position: relative;
				left: 0px;
				top: 2px;
				font-size: 19px;
			}
		}// .cmdClose

	}// .modal-header

	// content
	.modal-content {

		// for debug
		/* border: 1px solid red;
		 */
	}// .modal-content
`;
