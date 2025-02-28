/*
	Shape.jsx
	---------

	Generates the SVG for a shape.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";

// get the details of the shapes
import { shapeData } from "../classes/Piece";

// Shape component
export const Shape = ({shape, color, edgeThickness, edgeColor, rawScale, ...props}) => {

	// defaults
	rawScale = rawScale || 1;
	color = color || '#00ABAE';
	edgeThickness = edgeThickness || 2;
	edgeColor = edgeColor || '#000';

	// we need to build the path string for the SVG and get the bounds
	const { name, points } = shapeData[shape];

	// we'll always use the maximum shape size (200 in units times the scale)
	// for the size of the SVG, but we'll center the shape in the middle
	const boxSize = 200 * rawScale;
	const halfBoxSize = boxSize / 2;
	
	// memoize the path string and bounds
	const { d, maxX, maxY, size} = useMemo(() => {

		let maxX = 0, maxY = 0;
		const d = points.reduce((acc, p, i)=>{

			// scale the points
			const x = halfBoxSize + p[0] * rawScale;
			const y = halfBoxSize + p[1] * rawScale;

			// update the bounds
			maxX = (x>maxX) ? x : maxX;
			maxY = (y>maxY) ? y : maxY;
			
			// build the path string via the accumulator
			return acc + `${i==0 ? 'M' : 'L'} ${x} ${y} `; 
		}, '') + 'Z';	

		// add some space for the border:
		maxX += edgeThickness;
		maxY += edgeThickness;

		// size will be the max edge
		const size = Math.max(maxX, maxY);

		return { d, maxX, maxY, size };

	}, [shape, rawScale]);
		
	return (
		<svg 
			css={style}
			width={boxSize}
			height={boxSize}
			viewBox={`0 0 ${boxSize} ${boxSize}`}
			xmlns="http://www.w3.org/2000/svg"
			title={name}
			{...props}			
		>
			<path 
				fill={color} 
				stroke={edgeColor} 
				strokeWidth={edgeThickness}
				stroke-alignment="inner"				
				d={d}
				onMouseDown={(e) => { props.onMouseDown && props.onMouseDown(e)}}
				onTouchStart={(e) => { props.onMouseDown && props.onMouseDown(e)}}
				onMouseUp={(e) => { props.onMouseUp && props.onMouseUp(e)}}
				onTouchEnd={(e) => { props.onMouseUp && props.onMouseUp(e)}}
			/>
		</svg>
	);
}

// style
const style = css`

	// we turn off pointer events on the main, rectangle SVG,
	// because we want only the path to interact with the mouse
	pointer-events: none;
	path {
		pointer-events: initial;
	}

	// for debug
	/* background: rgba(0, 0, 0, 0.05); */
`;
