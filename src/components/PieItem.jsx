/*
	PieItem.jsx
	-----------

	An item in the pie menu.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";

// PieItem component
export const PieItem = ({ title, x, y, width, children, slug, ...props }) => {

	// default width
	width = width || 100;

	// memoize just dynamic styles
	const dynamicStyle = useMemo(() => css`

		transform: translate(-50%, -50%) translate(${x}px, ${y}px);
		width: ${width}px;
		height: ${width}px;

		&:hover {
			transform: translate(-50%, -50%) translate(${x}px, ${y}px) scale(1.2);
		}

		.pie-thumb-container {
			width: ${width}px;
			height: ${width}px;
		}
	`, [x, y, width]);

	return (
		<div
			css={[style, dynamicStyle]}
			{...props}
		>
			<div className="pie-thumb-container">
				<div className="centerWrapper">
					<div className="centerContents">{children}</div>
				</div>
			</div>
			<div className="pie-title">
				{title}
			</div>
		</div>
	);
}

// styles
const style = css`

	// position the item in the pie menu
	position: absolute;
	top: 50%;
	left: 50%;	

	// pointer/cursor settings
	pointer-events: initial;
	cursor: pointer;

	// animation bigger on hover
	transition: all 0.2s;
	&:hover { 
		z-index: 1000;
		.pie-title {
			background: white;
		}
	}

	// the thumb should be circle in the center
	.pie-thumb-container {

		// fixed pos
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		
		// transparent gray circle
		border-radius: 50%;
		background-color: #efefef99;

		// center whatever goes in
		.centerWrapper {

			position: relative;
			left: 50%;
			top: 53%;
			width: 0px;
			height: 0px;

			// used to force center whatever is inside
			.centerContents {
				transform: translate(-50%, -50%);
				
				display: inline-block;
				width: auto;
				height: auto;
				max-width: max-content;
				max-height: max-content;

			}// .centerContents

		}// .centerWrapper

	}// .pie-thumb-container

	// center the label on the bottom with center alignment of the text
	.pie-title {

		// force bottom center
		position: absolute;
		bottom: -30px;
		left: 50%;
		transform: translateX(-50%);			

		// text settings (centered, no white space, etc)
		text-align: center;
		white-space: nowrap;
		font-weight: 600;

		// pill style
		padding: 0px 10px;
		border-radius: 20px;
		background-color: #fff;
		background-color: #efefef99;

	}// .pie-title
`;
