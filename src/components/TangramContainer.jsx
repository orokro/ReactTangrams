/*
	TangramContainer.jsx
	--------------------

	This file will provides the component that will be a draggable-grid
	area, where tangram pieces can be placed and moved around.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";

// libs
import { useSignal } from "@preact/signals-react";
import classNames from "classnames";

// components
import { Piece } from "./Piece";

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
// const base64GridImage = generateGrid(gridSize, 'rgba(0, 0, 0, 1)');

// main component export
export const TangramContainer = ({ game }) => {

	// position that follows the mouse as a shadow (primarily for debugging)
	const mouseShadowX = useSignal(0);
	const mouseShadowY = useSignal(0);

	// true whilst we're dragging the board
	const isDragging = useSignal(false);
	
	// when right mouse button is down, start dragging the grid area
	const handleMouseDown = (e) => {


		// if right click, show menu instead
		if (e.button === 2) {
			game.addShapePieMenu.toggle();
			return;
		}

		// start dragging the board
		dragStart(e);
	}

	// memoize the base64 grid image based on light/dark mode and grid size
	// using useMemo
	const base64GridImage = useMemo(() => {
		return generateGrid(gridSize, game.darkMode.value ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 1)');
	}
	, [game.darkMode.value]);

	const dragStart = (e) => {

		// GTFO if not right click
		// if (e.button !== 2) return;

		// return the position the board was at when starting the drag
		const startPos = {
			x: game.boardX.value,
			y: game.boardY.value
		};

		// we draggin' now, baybee
		isDragging.value = true;

		// start dragging the board
		game.dragHelper.dragStart(
			
			// on move
			(dx, dy) => {
				game.boardX.value = (startPos.x - dx);
				game.boardY.value = (startPos.y - dy);
			},

			// on end
			(dx, dy) => {

				// no longer dragging, disable style
				isDragging.value = false;
			}
		);
	}

	// handle mouse events so we can know where the mouse is locally
	const handleMouseMove = (e) => {

		const pos = game.dragHelper.getCursorPos();
		mouseShadowX.value = pos.x - game.boardX.value;
		mouseShadowY.value = pos.y - game.boardY.value -50;
	}

	return (
		<>
			{/* the main container */}
			<div 
				css={style}
				className={classNames({ dragging: isDragging.value })}
				style={{
					backgroundPosition: `${game.boardX.value}px ${game.boardY.value}px`,
					backgroundImage: `url(${base64GridImage})`,
					backgroundColor: game.darkMode.value ? '#333' : '#fff',
				}}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
			>

				{/* the area where piece spawn */}
				<div
					className="piece-container"
					style={{
						left: game.boardX.value + 'px',
						top: game.boardY.value + 'px'
					}}
				>

					{/* a debug shadow for mouse position */}
					{false && <div 
						className="debug-shadow"
						style={{
							left: mouseShadowX.value + 'px',
							top: mouseShadowY.value + 'px'
						}}
					></div>}

					{/* spawn active game pieces */}
					{ 	game.pieces.value.map((piece, idx) => (
							<Piece
								key={piece.id}
								piece={piece}
								game={game}
							/>
					))}
				</div>
				
			</div>
		</>
	);
}

// styles
const style = css`

	// fill the entire screen under the header
	position: absolute;
	inset: 52px 0px 0px 0px;

	// make look inset with inner shadow
	box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3);

	// animate bg
	transition: background-color 0.3s;

	// appear like a pan-able surface to the user via cursor
	cursor: grab;
	&.dragging {
		cursor: grabbing;
	}

	// the area where the pieces are spawned in
	.piece-container {

		// even though we'll overflow, we'll start with full width/height
		width: 100%;
		height: 100%;

		// this container will drag along with the grid dot bg
		position: absolute;		

		// for debug
		/* border: 1px solid red; */

		// debug shadow 
		.debug-shadow {

			// dynamically set the position
			position: absolute;	

			// blurry square for now
			filter: blur(3px);
			width: 10px;
			height: 10px;
			background-color: rgba(0, 0, 0, 0.5);
			
		}// .debug-shadow

	}// .piece-container
`;
