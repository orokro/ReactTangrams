/*
	SortPieceMenu.jsx
	-----------------

	Shows the menu to move pieces forwards/back int he stack
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
export const SortPieceMenu = ({game, onItemSelect, children, ...props}) => {

	return (
		<PieMenu 
			cssStyles={style}
			menuSize={165}
			{...props}
			onItemSelect={onItemSelect}
		>
			{/* items start at 12 o'clock and go right, clockwise */}			
			<PieItem width={menuItemWidth} title="Send Forward" slug="sendForward">
				<span className="material-icons">arrow_drop_up</span>
			</PieItem>
			
			<PieItem width={menuItemWidth} title="Send to Bottom" slug="sendToBack">
				<span className="material-icons">vertical_align_bottom</span>
			</PieItem>			
			<PieItem width={menuItemWidth} title="Send Backward" slug="sendBackward">
				<span className="material-icons">arrow_drop_down</span>
			</PieItem>
			<PieItem width={menuItemWidth} title="Send To Top" slug="sendToFront">
				<span className="material-icons">vertical_align_top</span>
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
