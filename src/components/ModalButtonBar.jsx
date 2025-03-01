/*
	ModalButtonBar.jsx
	------------------

	This component will provide a horizontal bar of buttons,
	for the bottom of the modal windows.
*/


// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";

// libs
import classNames from "classnames";

// main component
export const ModalButtonBar = ({ buttonsList, onButtonClicked, ...props }) => {

	// the buttons is is a 2d array like [['Name', 'action'], ...]
	// memoize the buttons from the array
	const buttons = useMemo(() => {

		return buttonsList.map(([name, action, defaultButton]) => {
			
			defaultButton = defaultButton ?? false;
			return (
				<button 
					className={classNames({ default: defaultButton })}
					key={action}
					onClick={() => onButtonClicked(action, name)}
				>
					{name}
				</button>
			);
		});
	}, [buttonsList, onButtonClicked]);

	// render
	return (
		<div css={style} className="modal-button-bar">
			{ buttons }
		</div>
	);
}

// styles
const style = css`

	// center the text
	display: flex;
	justify-content: flex-end;

	// for debug
	/* border-top: 2px solid rgba(0, 0, 0, 0.1); */
	padding: 5px 0px;

	// center the input
	button {

		margin-left: 0.5em;
		font-size: 20px;
		padding: 5px 20px 10px;

		border: 2px solid rgba(0, 0, 0, 0.2);
		text-transform: uppercase;
		// default button styling
		&.default {

			background: #21b5c9;
			color: white;
			text-shadow: 3px 2px 0px #1d7491;
			border: 2px solid transparent;
		}		

		&:hover {
			border: 2px solid black;
		}

	}// button
`;
