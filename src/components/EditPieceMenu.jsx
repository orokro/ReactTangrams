/*
	EditPieceMenu.jsx
	-----------------

	When a piece is right clicked, this menu will appear to allow the user to
	edit the piece. Including options such as:
	- rotate 180
	- rotate +/- 90
	- rotate +/- 45
	- pick color
	- delete
*/

// react imports
/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";

// components
import { PieMenu } from './PieMenu';
import { PieItem } from './PieItem';

// PieMenu component
export const EditPieceMenu = ({game, onItemSelect, children, ...props}) => {

	return (
		<PieMenu 
			cssStyles={style}
			menuSize={265}
			{...props}
			onItemSelect={onItemSelect}
		>
			{/* items start at 12 o'clock and go right, clockwise */}
			<PieItem width={80} title="Rotate 180" slug="rotate180">
				<span className="material-icons">refresh</span>
			</PieItem>			
			<PieItem width={80} title="Rotate +45" slug="rotate45">
				<span className="material-icons">redo</span>
			</PieItem>
			<PieItem width={80} title="Rotate +90" slug="rotate90">
				<span className="material-icons">redo</span>
			</PieItem>

			{/* these two at the bottom */}
			<PieItem width={80} title="Pick Color" slug="pickColor">
				<span className="material-icons">palette</span>
			</PieItem>
			<PieItem width={80} slug="delete">
				<span className="material-icons">delete</span>
			</PieItem>
						
			{/* these continue the pattern back up to 12 o'clock */}
			<PieItem width={80} title="Rotate -90" slug="rotate-90">
				<span className="material-icons">undo</span>
			</PieItem>
			<PieItem width={80} title="Rotate -45" slug="rotate-45">
				<span className="material-icons">undo</span>
			</PieItem>	
		</PieMenu>
	);
}

// styles
const style = css`

	// make the icons bigger than the default google material font size
	.material-icons {
		font-size: 50px !important;
	}
`;
