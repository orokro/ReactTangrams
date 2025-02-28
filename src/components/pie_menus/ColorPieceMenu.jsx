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
const menuItemWidth = 20;

// our list of colors to populate the menu with
const colors = [

	// 🔴 Reds
	["#FF4500", "Sunset Orange"],
	["#FF6347", "Tropical Tomato Red"],

	// 🟠 Oranges
	["#FF7F00", "Vivid Orange"],
	["#FFB347", "Warm Sunset Orange"],
	["#FFA500", "Mango Orange"],

	// 🟡 Yellows
	["#DAA520", "Golden Sand"],
	["#FFD700", "Bright Gold"],
	["#FFFF33", "Highlighter Yellow"],

	// 🟢 Greens
	["#66FF00", "Electric Lime"],
	["#32CD32", "Bright Lime Green"],
	["#2E8B57", "Seafoam Green"],
	["#00FA9A", "Tropical Mint Green"],	

	// 🔵 Teals & Blues
	["#00FF7F", "Vivid Spring Green"],
	["#00FFFF", "Aqua Blue"],
	["#40E0D0", "Turquoise Blue"],
	["#00CED1", "Deep Turquoise"],
	["#00BFFF", "Tropical Sky Blue"],
	["#1E90FF", "Bright Ocean Blue"],

	// 🔵 Deep Blues
	["#007FFF", "Electric Blue"],
	["#0000FF", "Pure Blue"],

	// 🟣 Purples
	["#8000FF", "Bright Electric Purple"],
	["#9400D3", "Deep Violet"],
	["#BA55D3", "Orchid Purple"],

	// 🟣 Pinks & Magentas
	["#DA70D6", "Vivid Orchid"],
	["#EE82EE", "Bright Violet"],
	["#FF00FF", "Pure Magenta"],
	["#FF1493", "Hot Pink"],

	// 🌈 Wrap-around warm tones
	["#FF007F", "Neon Pinkish-Red"],
	["#FF6B6B", "Coral Red"],	
];

// PieMenu component
export const ColorPieceMenu = ({game, onItemSelect, children, ...props}) => {

	return (
		<PieMenu 
			cssStyles={style}
			menuSize={165}
			{...props}
			onItemSelect={onItemSelect}
		>
			{/* items start at 12 o'clock and go right, clockwise */}
			{colors.map((color, i) => (
				<PieItem width={menuItemWidth} slug={color[0]} toolTipText={color[1]}>
					<span style={{color: color[0]}} className="material-icons">circle</span>
				</PieItem>
			))}
		</PieMenu>
	);
}

// styles
const style = css`

	// make the icons bigger than the default google material font size
	.material-icons {
		font-size: 30px !important;
	}
`;
