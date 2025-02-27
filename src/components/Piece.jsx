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
				transform: `translate(-50%, calc(-50% - ${piece.isDragging.value ? 10 : 0}px)) rotate(${piece.rotation.value}deg)`,
			}}
		>
			<Shape
				shape={piece.type.value}
				color={piece.color.value}
				rawScale={1.2}
				onMouseDown={(e) => {
				
					// don't bubble the event
					e.preventDefault();
					e.stopPropagation();
					e.cancelBubble = true;
	
					// game.selectPiece(piece.id);
					piece.startDrag();
				}}
			/>
		</div>
	)
}

// styles
const style = css`

	// don't block the mouse events for things under us
	// (i.e. ignore the arbitrary bounding box of the piece)
	pointer-events: none;

	// fixed position
	position: absolute;
	z-index: 10;
	
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

`;
