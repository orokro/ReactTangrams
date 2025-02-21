/*
	PieItem.jsx
	-----------

	An item in the pie menu.
*/

// react imports
/** @jsxImportSource @emotion/react */
import React from "react";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";

// libs
import { signal, useSignal } from "@preact/signals-react";

// PieItem component
export const PieItem = ({title, x, y, width, children, ...props}) => {

	// default width
	width = width || 100;

	// styles
	const style = css`

		// position the item in the pie menu
		position: absolute;
		top: 50%;
		left: 50%;	
		transform: translate(-50%, -50%) translate(${x}px, ${y}px);

		// fixed item size
		width: ${width}px;
		height: ${width}px;

		// pointer/cursor settings
		pointer-events: initial;
		cursor: pointer;

		// animation bigger on hover
		transition: all 0.2s;
		&:hover {
			transform: translate(-50%, -50%) translate(${x}px, ${y}px) scale(1.2);
		}

		// the thumb should be circle in the center
		.pie-thumb-container {

			// fixed pos
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: ${width}px;
			height: ${width}px;
			
			// transparent gray circle
			border-radius: 50%;
			background-color: #efefef99;

			// center whatever goes in
			.centerWrapper {

				position: relative;
				left: 50%;
				top: 50%;

				width: 0px;
				height: 0px;
				border: 1px solid blue;

				.centerContents {
					transform: translate(-50%, -50%);
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

	return (
		<div css={style} {...props}>
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
