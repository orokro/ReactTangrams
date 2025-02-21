/*
	PieMenu.jsx
	-----------

	This component will show a pie menu that can be used to select
	pieces to place on the tangram board.
*/

// react imports
/** @jsxImportSource @emotion/react */
import React from "react";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";

// libs
import { signal, useSignal } from "@preact/signals-react";

// PieMenu component
export const PieMenu = ({x, y, menuSize, onItemSelect, children}) => {

	// default menu size
	menuSize = menuSize || 400;

	// styles
	const style = css`

		// disable mouse events for the menu itself
		pointer-events: none;

		// fixed positioning
		position: absolute;
		top: ${y}px;
		left: ${x}px;

		// force center
		transform: translate(-50%, -50%);

		// big circle
		width: ${menuSize}px;
		height: ${menuSize}px;
		background-color: rgba(0, 0, 0, 0.01);
		border-radius: 50%;

		// base styles for positioning the children pie items
		.pie-child-item {
			position: absolute;
			top: 50%;
			left: 50%;
		}// .pie-child-item
	`;

	// we will iterate over the children and add some custom props
	// and compute their custom angle, etc.

	// get the total number of children & compute the pie-slice angle
	const totalChildElements = React.Children.count(children);
	const angle = 360 / totalChildElements;

	// clone & recompute the children
	const newChildren = React.Children.map(children, (child, index) => {

		// compute the angle for this child
		const childAngle = (angle * index -90) * (Math.PI / 180);

		// compute the x/y position for this child
		const childX = Math.cos(childAngle) * (menuSize / 2);
		const childY = Math.sin(childAngle) * (menuSize / 2);

		// clone the child and add some custom props
		return React.cloneElement(child, {

			onClick: (event) => {
				if (child.props.onClick)
					child.props.onClick(event);				
				onItemSelect(index);
			},

			className: `${child.props.className || ""} pie-child-item`,
			x: childX,
			y: childY,
		});
	});

	return (
		<div css={style} className="pie-menu">
			{ newChildren }
		</div>
	);
}
