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

// app imports
import { shapeData } from "./Shape";

// Piece component
export const Piece = ({ piece, game, ...props }) => {

	console.log(`Rendering Piece: ${piece.id}`);

	// styles
	const style = css`

		// fixed position
		position: absolute;
		top: ${piece.y.value}px;
		left: ${piece.x.value}px;

		border: 1px solid black;

		// px allow overflow
		transform: translate(-50%, -50%) rotate(${piece.rotation.value}deg);
	`;

	return (
		<div css={style} className="piece">
			<Shape
				shape={piece.type.value}
				color={piece.color.value}
				rawScale={1.2}
			/>
		</div>
	)
}
