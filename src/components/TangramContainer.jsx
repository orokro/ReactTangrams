/*
	TangramContainer.jsx
	--------------------

	This file will provides the component that will be a draggable-grid
	area, where tangram pieces can be placed and moved around.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";

// libs
import { signal, useSignal } from "@preact/signals-react";

// components
import { SVGTestTray } from "./SVGTestTray";

/**
 * Function to generate a base64 transparent png for the grid
 * 
 * @param width {Number} width of the grid
 * @param color {String} color of the grid dots
 * 
 * @returns {String} base64 transparent png for the grid
 */
function generateGrid(width, color){
	
	// create a canvas
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = width;

	// make sure canvas clear color is transparent
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// set the color
	ctx.fillStyle = color;

	// draw a single dot on the top-left
	ctx.fillRect(0, 0, 1, 1);

	// return the base64 png
	return canvas.toDataURL();
}

// generate the grid bg pattern to use
const gridSize = 20;
const base64GridImage = generateGrid(gridSize, 'rgba(0, 0, 0, 1)');

// the x/y positions of the board having been dragged
const boardX = signal(0);
const boardY = signal(0);

// main component export
export const TangramContainer = ({ game }) => {

	// position that follows the mouse as a shadow (primarily for debugging)
	const mouseShadowX = useSignal(0);
	const mouseShadowY = useSignal(0);

	// when right mouse button is down, start dragging the grid area
	const handleDragStart = (e) => {

		// GTFO if not right click
		if (e.button !== 2) return;

		// return the position the board was at when starting the drag
		const startPos = {
			x: boardX.value,
			y: boardY.value
		};

		// start dragging the board
		game.dragHelper.dragStart(
			
			// on move
			(dx, dy) => {
				boardX.value = (startPos.x - dx);
				boardY.value = (startPos.y - dy);
			},

			// on end
			(dx, dy) => {
				// ...
			}
		);
	}


	// styles
	const style = css`

		// fill the entire screen under the header
		position: absolute;
		inset: 52px 0px 0px 0px;

		// background color
		background-color: #EFEFEF;
		background: url(${base64GridImage}) ${boardX.value}px ${boardY.value}px;

		// make look inset with inner shadow
		box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3);

		// the area where the pieces are spawned in
		.piece-container {

			// even though we'll overflow, we'll start with full width/height
			width: 100%;
			height: 100%;

			// this container will drag along with the grid dot bg
			position: absolute;		
			left: ${boardX.value}px;
			top: ${boardY.value}px;
			// background-color: rgba(255, 255, 255, 0.5); 
			border: 1px solid red;

			// debug shadow 
			.debug-shadow {

				// dynamically set the position
				position: absolute;	
				left: ${mouseShadowX.value}px;
				top: ${mouseShadowY.value}px;

				// blurry square for now
				filter: blur(3px);
				width: 10px;
				height: 10px;
				background-color: rgba(0, 0, 0, 0.5);
			}// .debug-shadow

		}// .piece-container
	`;

	return (
		<>
			{/* the main container */}
			<div 
				css={style}
				onMouseDown={handleDragStart}
			>

				{/* the area where piece spawn */}
				<div className="piece-container">

					{/* a debug shadow for mouse position */}
					<div className="debug-shadow"></div>

					{/* the SVG tray */}
					<SVGTestTray />
				</div>
				
			</div>
		</>
	);
}
