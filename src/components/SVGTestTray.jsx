/*
	SVGTestTray.jsx
	---------------

	Loads our SVG while we work so we can see them correctly.
*/

// react
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// components
import squareSM from '../assets/shapes/squareSM.svg';
import squareMD from '../assets/shapes/squareMD.svg';
import squareLG from '../assets/shapes/squareLG.svg';
import triLG from '../assets/shapes/triLG.svg';
import triMD from '../assets/shapes/triMD.svg';
import triSM from '../assets/shapes/triSM.svg';
import parallelogramASVG from '../assets/shapes/parallelogramA.svg';
import parallelogramBSVG from '../assets/shapes/parallelogramB.svg';
import trapezoidSVG from '../assets/shapes/trapezoid.svg';

// tray
export const SVGTestTray = () => {

	// styles
	const style = css`

		// fill the entire screen under the header
		position: absolute;
		top: 99px;
		left: 99px;

		padding: 20px;

		// background color
		background-color: #efefef7a;
	`;

	return (
		<>
			{/* the main container */}
			<div 
				css={style}
			>

				{/* load all our SVGs here so we can see them preview */}
				<img src={squareSM} />
				<img src={squareMD} />
				<img src={squareLG} />
				<img src={triLG} />
				<img src={triMD} />
				<img src={triSM} />
				<img src={parallelogramASVG} />
				<img src={parallelogramBSVG} />
				<img src={trapezoidSVG} />				
			</div>
		</>
	);
}
