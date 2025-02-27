/*
	Shape.jsx
	---------

	Generates the SVG for a shape.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";

// const shape details
export const shapeData = {

	// square
	squareSM: {
		name: "Small Square",
		points: [[50, 1], [100, 50], [50, 100], [1, 50]],
		defaultColor: 'red',
	},
	squareMD: {
		name: "Medium Square",
		points: [[1, 1], [100, 1], [100, 100], [1, 100]],
		defaultColor: 'blue',
	},
	squareLG: {
		name: "Large Square",
		points: [[100, 1], [200, 100], [100, 200], [1, 100]],
		defaultColor: 'green',
	},
	triangleSM: {
		name: "Small Triangle",
		points: [[1, 50], [50, 1], [100, 50]],
		defaultColor: 'orange',
	},
	triangleMD: {
		name: "Medium Triangle",
		points: [[100, 1], [100, 100], [1, 100]],
		defaultColor: 'purple',
	},
	triangleLG: {
		name: "Large Triangle",
		points: [[100, 1], [200, 100], [1, 100]],
		defaultColor: 'yellow',
	},
	parallelogramA: {
		name: "Parallelogram A",
		points: [[1, 50], [50, 1], [150, 1], [100, 50]],
		defaultColor: 'pink',
	},
	parallelogramB: {
		name: "Parallelogram B",
		points: [[1, 1], [100, 1], [150, 50], [50, 50]],
		defaultColor: 'brown',
	},
	trapezoid: {
		name: "Trapezoid",
		points: [[1, 50], [50, 1], [100, 1], [150, 50]],
		defaultColor: 'gray',
	},
};

// Shape component
export const Shape = ({shape, color, edgeThickness, edgeColor, rawScale, ...props}) => {

	// defaults
	rawScale = rawScale || 1;
	color = color || '#00ABAE';
	edgeThickness = edgeThickness || 2;
	edgeColor = edgeColor || '#000';

	// we need to build the path string for the SVG and get the bounds
	const { name, points } = shapeData[shape];

	// memoize the path string and bounds
	const { d, maxX, maxY, size} = useMemo(() => {

		let maxX = 0, maxY = 0;
		const d = points.reduce((acc, p, i)=>{

			// scale the points
			const x = p[0] * rawScale;
			const y = p[1] * rawScale;

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
			width={size}
			height={size}
			viewBox={`0 0 ${maxX} ${maxY}`}
			xmlns="http://www.w3.org/2000/svg"
			title={name}
			{...props}			
		>
			<path 
				fill={color} 
				stroke={edgeColor} 
				strokeWidth={edgeThickness}
				d={d}
				onMouseDown={(e) => {
					console.log('aids');
					props.onMouseDown && props.onMouseDown(e)}
				}
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
	/* background: rgba(0, 0, 0, 0.02); */
`;
