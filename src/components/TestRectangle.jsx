/*
	TestRectangle.jsx
	-----------------

	Code from ChatGPT to see if I can get the styles to work as I like.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";

// Rectangle component
const TestRectangle = ({ title }) => {

	// change the background color of the rectangle
	const [bgColor, setBgColor] = useState("#ADD8E6"); // Baby Blue

	// styles
	const rectangleStyle = css`

		/* fixed positioning */
		position: absolute;
		left: 100px;
		top: 50px;
		width: 200px;
		height: 200px;

		background-color: ${bgColor};
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

		.foo {
			color: red;

			span {
				font-weight: bold;
			}
		}
	`;

	const buttonStyle = css`
		margin-top: 10px;
		padding: 10px 15px;
		border: none;
		background-color: white;
		border-radius: 8px;
		cursor: pointer;
		font-size: 14px;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

		&:hover {
		background-color: #f0f0f0;
		}
	`;

	return (
		<div css={rectangleStyle}>
			<h3>{title}</h3>
			<button className="foo"
				onClick={() => setBgColor("#E6E6FA")}
			>
				Change <span>Color</span>
			</button>
		</div>
	);
};

export default TestRectangle;
