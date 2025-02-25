/*
	Piece.jsx
	---------

	This component will represent a instance of the Piece() class
	on the games state.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// components
import { Shape } from './Shape'

// Piece component
export const Piece = ({ piece, game, ...props }) => {

	console.log(`Rendering Piece: ${piece.id}`);

	return (
		<div 
			css={style}
			className="piece"
			style={{
				left: `${piece.x.value}px`,
				top: `${piece.y.value}px`,
				transform: `translate(-50%, -50%) rotate(${piece.rotation.value}deg)`,
			}}

		>
			<Shape
				shape={piece.type.value}
				color={piece.color.value}
				rawScale={1.2}
			/>
		</div>
	)
}

// styles
const style = css`

	// fixed position
	position: absolute;
`;
