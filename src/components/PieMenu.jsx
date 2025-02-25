/*
	PieMenu.jsx
	-----------

	This component will show a pie menu that can be used to select
	pieces to place on the tangram board.
*/

// react imports
/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";

// libs
import { useSignal } from "@preact/signals-react";

// PieMenu component
export const PieMenu = ({x, y, menuSize, onItemSelect, closing, children, ...props}) => {

	// default menu size
	menuSize = menuSize || 400;

	// for opening animation
	const opening = useSignal(false);

	// toggle value on open
	useEffect(() => {
		setTimeout(() => opening.value = true, 1);
	}, []);

	// we will iterate over the children and add some custom props
	// and compute their custom angle, etc.

	// get the total number of children & compute the pie-slice angle
	const totalChildElements = React.Children.count(children);
	const angle = 360 / totalChildElements;

	// clone & recompute the children
	const newChildren = React.Children.map(children, (child, index) => {

		// compute the angle for this child
		const childAngle = (angle * index -90) * (Math.PI / 180);

		// compute the x/y position for this child based on it's angular position in the menu
		const childX = Math.cos(childAngle) * (menuSize / 2);
		const childY = Math.sin(childAngle) * (menuSize / 2);

		// clone the child and add some custom props
		return React.cloneElement(child, {

			onClick: (event) => {
				if (child.props.onClick)
					child.props.onClick(event);				
				onItemSelect(child.props.slug, index);
			},

			className: `${child.props.className || ""} pie-child-item`,
			x: childX,
			y: childY,
		});
	});

	return (
		<div
			css={style}
			style={{
				top: y + "px",
				left: x + "px",
				width: menuSize + "px",
				height: menuSize + "px",
			}}
			{...props}
			className={`pie-menu ${opening.value && !closing  ? "open" : ""}`}
		>
			{ newChildren }
		</div>
	);
}

// styles
const style = css`

	// fixed positioning on top of errthang
	position: absolute;
	z-index: 1001;

	// force center with default space
	transform: translate(-50%, -50%) scale(0);

	// transition scale
	transition: transform 0.15s;
	&.open {
		transform: translate(-50%, -50%) scale(1);
	}

	// disable pointer events if menu is animating closed
	&.closing {
		pointer-events: none;
	}

	// big circle
	background-color: rgba(0, 0, 0, 0.01);
	border-radius: 50%;

	// base styles for positioning the children pie items
	.pie-child-item {
		position: absolute;
		top: 50%;
		left: 50%;
	}// .pie-child-item
`;
