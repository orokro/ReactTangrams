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
import { PieMenu } from '../PieMenu';
import { PieItem } from '../PieItem';

// PieMenu component
export const EditPieceMenu = ({game, onItemSelect, children, ...props}) => {

	return (
		<PieMenu 
			cssStyles={style}
			menuSize={150}
			{...props}
			onItemSelect={onItemSelect}
		>
			{/* items start at 12 o'clock and go right, clockwise */}
			<PieItem width={80} title="Pick Color" slug="pickColor">
				<span className="material-icons">palette</span>
			</PieItem>
			<PieItem width={80} title="Sort" slug="sort">
				<span className="material-icons">swap_vert</span>
			</PieItem>
			<PieItem width={80} title="Delete" slug="delete">
				<span className="material-icons">delete</span>
			</PieItem>
			<PieItem width={80} title="Rotate" slug="rotate">
				<span className="material-icons">refresh</span>
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
