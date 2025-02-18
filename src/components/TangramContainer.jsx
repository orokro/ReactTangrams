/*
	TangramContainer.jsx
	--------------------

	This file will provides the component that will be a draggable-grid
	area, where tangram pieces can be placed and moved around.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";


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


// main component export
export const TangramContainer = ({ game }) => {

	// the x/y positions of the board having been dragged
	const [boardX, setBoardX] = useState(0);
	const [boardY, setBoardY] = useState(0);

	// generate the grid bg pattern to use
	const gridSize = 20;
	const base64GridImage = generateGrid(gridSize, 'rgba(0, 0, 0, 1)');

	// when right mouse button is down, start dragging the grid area
	const handleDragStart = (e) => {

		// GTFO if not right click
		if (e.button !== 2) return;

		const startPos = {boardX, boardY};
		game.dragHelper.dragStart(

			// on move
			(dx, dy) => {
				setBoardX(startPos.boardX - dx);
				setBoardY(startPos.boardY - dy);
			},

			// on end
			(dx, dy) => {
				// ...
			}
		);
	}


	// styles
	const style = css`

		/* fill the entire screen under the header */
		position: absolute;
		inset: 52px 0px 0px 0px;

		/* background color */
		background-color: #EFEFEF;
		background: url(${base64GridImage}) ${boardX}px ${boardY}px;

		/* make look inset with inner shadow */
		box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3);

		/* the area where the pieces are spawned in */
		.piece-container {

			// even though we'll overflow, we'll start with full width/height
			width: 100%;
			height: 100%;

			// this container will drag along with the grid dot bg
			position: absolute;
			top: ${boardY}px;
			left: ${boardX}px;			

			/* background-color: rgba(255, 255, 255, 0.5); */
			border: 1px solid red;
		}
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
				</div>
				
			</div>
		</>
	);
}
