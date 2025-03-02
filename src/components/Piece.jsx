/*
	Piece.jsx
	---------

	This component will represent a instance of the Piece() class
	on the games state.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// libs
import classNames from "classnames";
import Util from "../classes/Util";

// components
import { Shape } from './Shape'

// Piece component
export const Piece = ({ piece, game, ...props }) => {

	return (
		<div 
			css={style}
			className={classNames(
				"piece", 
				{ selected: piece.isSelected.value },
				{ dragging: piece.isDragging.value },
			)}
			style={{
				left: `${piece.x.value}px`,
				top: `${piece.y.value}px`,
				...props.style
			}}
		>
			<Shape
				style={{
					transform: `translate(-50%, calc(-50% - ${piece.isDragging.value ? 10 : 0}px)) rotate(${piece.rotation.value}deg)`,
				}}
				className="piece-shape"
				shape={piece.type.value}
				color={piece.color.value}
				rawScale={1.2}
				onMouseDown={(e) => {
					
					// don't bubble the event
					Util.stopEvent(e);
	
					// game.selectPiece(piece.id);
					piece.startDrag();
				}}
				onMouseUp={(e) => {
					
					// don't bubble the event
					Util.stopEvent(e);

					// only right click
					if (e.button !== 2) return;
						game.editShapePieMenu.toggle(piece.handleEditMenu.bind(piece));
				}}
			/>

			{/* below shows the corners for debugging snap */}
			{ false && piece.rotatedPoints.value.length > 0 && (
				<div className="rotated-points">
					{ piece.rotatedPoints.value.map((point, index) => (
						<div
							key={index}
							className="point"
							style={{
								left: point[0] + "px",
								top: point[1] + "px"
							}}
						/>
					))}
				</div>
			)}

			{/* below shows the snapped point, only visible while dragging */}
			{ piece.snappedPoint.value && piece.isDragging.value && (
				<div
					className="snapped-point"
					style={{
						left: (piece.snappedPoint.value[0] - 4) + "px",
						top: (piece.snappedPoint.value[1] - 4) + "px" 
					}}
				/>
			)}
		</div>
	)
}

// styles
const style = css`

	// don't block the mouse events for things under us
	// (i.e. ignore the arbitrary bounding box of the piece)
	pointer-events: none;

	// reset cursor
	cursor: default;
	
	// fixed position
	position: absolute;
	z-index: 10;

	// small box at the X/Y pos, and let the shape itself center
	/* border: 1px solid red; */
	width: 0px;
	height: 0px;
	
	// a drop shadow
	filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.0));	

	// for animating the lift up for dragging
	transition:
		transform 0.1s ease-in-out,
		filter 0.1s ease-in-out;

	&.dragging {
		filter: drop-shadow(2px 10px 2px rgba(0, 0, 0, 0.5));
		z-index: 20;
		cursor: move;		
	}

	.piece-shape {
		transition: transform 0.1s ease-in-out;
	}

	// during debug we can show the mathematical points of the rotated shape
	// that we use to determine snap
	.rotated-points {
		.point {
			position: absolute;
			border: 2px solid red;
		}
	}// .rotated-points

	// shows which corner was used to determine snap
	.snapped-point {
		position: absolute;
		background-color: white;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		border: 2px solid black;
		z-index: 100;
	}// .snapped-point

`;
