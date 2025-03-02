/*
	HeaderBarIcon.jsx
	-----------------

	One of our action icons in the header bar
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import classNames from "classnames";

// the main header bar icon component
export const HeaderBarIcon = ({ title, active, onClick, children }) => {

	// state for the hover effect
	const [hover, setHover] = useState(false);

	return (
		<div 
			css={style}
			className={classNames(
				"header-bar-icon",
				{ active: active },
				{ hover: hover }
			)}
			title={title}
			onClick={onClick}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{children}
		</div>
	);
}

// styles
const style = css`

	// stack left w/ space on right
	display: inline-block;
	margin-right: 15.5px;

	// appear clickable
	cursor: pointer;

	// fixed square size with nice rounded corners
	width: 40px;
	height: 40px;
	border-radius: 10px;
	
	// hover & pressed (active) styles
	&:hover {
		.material-icons, img {
			top: -2px;
		}
	}
	&:active {
		.material-icons, img {
			top: 4px;
		}
	}

	// active stylez
	&.active {
		background: rgba(0, 0, 0, 0.2);
		.material-icons {
			font-size: 35px !important;
		}
	}

	// make the icon bigger than the default google material font size
	.material-icons, img {

		// animate position for hover and what not
		position: relative;
		top: 2px;
		left: 2.5px;
		transition: all 0.2s;
		
		// default icon styles
		font-size: 35px !important;
		color: white;

	}// .material-icons

`;
