/*
	HeaderBar.jsx
	-------------

	This file will provide a component that shows the apps name and maybe couple buttons or <w />
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// assets and components
import reactLogo from '../assets/react.svg'

// the main header bar component
export const HeaderBar = ({ game }) => {
	
	return (
		<div css={style}>
			<div className="header-bar">
				<h1>
					Greg's Tangrams in 
					<a href="https://react.dev" target="_blank">
						<img src={reactLogo} className="logo react" alt="React logo" />
					</a>
					React
				</h1>
			</div>
		</div>
	);
}

// styles
const style = css`

	.header-bar {

		/* long blue bar across the top */
		position: fixed;
		inset: 0px 0px auto 0px;
		z-index: 1000;

		// 50 px thicc blue bar
		height: 50px;
		background: #ADD8E6;

		// no wrapping / escaping
		white-space: nowrap;
		overflow: hidden;

		// bottom border
		border-bottom: 2px solid #739ba8;

		h1 {

			// spacing & positioning
			margin: 0px;
			padding-top: 0px;
			position: relative;
			top: -4px;

			// text settings
			font-size: 32px;

		}// h1

		// make the logo a little smaller and float right
		.logo {

			// stack w/ text
			display: inline-block;

			// clear built-in spacing
			padding: 0px;
			margin: 0px 5px 0px 10px;

			// make it a little smaller
			width: 40px;
			height: 40px;

			position: relative;
			top: 10px;

		}// .logo

	}// .header-bar
`;
