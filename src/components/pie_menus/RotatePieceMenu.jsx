/*
	RotatePieceMenu.jsx
	-------------------

	Shows the menu to rotate a piece:
	- rotate 180
	- rotate +/- 90
	- rotate +/- 45
*/

// react imports
/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";

// components
import { PieMenu } from '../PieMenu';
import { PieItem } from '../PieItem';

// circle menu item width
const menuItemWidth = 70;

// PieMenu component
export const RotatePieceMenu = ({game, onItemSelect, children, ...props}) => {

	return (
		<PieMenu 
			cssStyles={style}
			menuSize={165}
			{...props}
			onItemSelect={onItemSelect}
		>
			{/* items start at 12 o'clock and go right, clockwise */}
			<PieItem width={menuItemWidth} title="180°" slug="rotate180">
				<span className="material-icons">refresh</span>
			</PieItem>			
			<PieItem width={menuItemWidth} title="+45°" slug="rotate45">
				<span className="material-icons">redo</span>
			</PieItem>
			<PieItem width={menuItemWidth} title="+90°" slug="rotate90">
				<span className="material-icons">redo</span>
			</PieItem>

			{/* these continue the pattern back up to 12 o'clock */}
			<PieItem width={menuItemWidth} title="-90°" slug="rotate-90">
				<span className="material-icons">undo</span>
			</PieItem>
			<PieItem width={menuItemWidth} title="-45°" slug="rotate-45">
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
