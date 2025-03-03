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
import { HeaderBarIcon } from "./HeaderBarIcon";
import ModalManager from "../classes/ModalManager";

// the main header bar component
export const HeaderBar = ({ game }) => {
	
	const toggleProjectPanel = () => {
		game.projectPanelIsOpen.value = !game.projectPanelIsOpen.value;
	}

	const showIOModal = () => {
		game.modalManager.openModal(ModalManager.MODALS.IMPORT_EXPORT);
	}

	const showShareModel = () => {
		game.modalManager.openModal(ModalManager.MODALS.SHARE_URL);
	}

	const showHelpModal = () => {
		game.modalManager.openModal(ModalManager.MODALS.HELP);
	}

	const show3dModal = () => {
		game.modalManager.openModal(ModalManager.MODALS.THREED);
	}

	const toggleDarkMode = () => {
		game.darkMode.value = !game.darkMode.value;
	}

	return (
		<div css={style}>
			<div className="header-bar">

				{/* box with some icons stacked on the left of the header */}
				<div className="header-icons" align="left">

					<HeaderBarIcon title="Projects" active={game.projectPanelIsOpen.value} onClick={toggleProjectPanel}>
						<span className="material-icons">folder</span>
					</HeaderBarIcon>
					<HeaderBarIcon title="Import / Export" onClick={showIOModal}>
						<span className="material-icons">import_export</span>
					</HeaderBarIcon>
					<HeaderBarIcon title="Share" onClick={showShareModel}>
						<span className="material-icons">share</span>
					</HeaderBarIcon>
					<HeaderBarIcon title="Help" onClick={showHelpModal}>
						<span className="material-icons">help</span>
					</HeaderBarIcon>
					<HeaderBarIcon title="Toggle Light/Dark Mode" onClick={toggleDarkMode}>
						<span className="material-icons">
							{ game.darkMode.value ? "dark_mode" : "light_mode" }
						</span>
					</HeaderBarIcon>
					<HeaderBarIcon title="View 3D" onClick={show3dModal}>
						<span className="material-icons">3d_rotation</span>
					</HeaderBarIcon>					

				</div>

				{/* box with some icons stacked on the left of the header */}
				<div className="header-icons-right" align="left">
					<a href="https://github.com/orokro/ReactTangrams" target="_blank">
						<HeaderBarIcon title="Project Github">
							<img src="/ReactTangrams/github.svg" className="ghLogo" alt="GitHub logo" />
						</HeaderBarIcon>
					</a>
					<a href="http://gmiller.net" target="_blank">
						<HeaderBarIcon title="My Homepage">
							<span className="material-icons">home</span>
						</HeaderBarIcon>
					</a>
				</div>

				{/* the main title area */}
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

	// main header bar styles
	.header-bar {

		/* long blue bar across the top */
		position: fixed;
		inset: 0px 0px auto 0px;
		z-index: 1000;

		// 50 px thicc blue bar with a bottom border
		height: 50px;
		background: #21b5c9;
		border-bottom: 2px solid #1d7491;

		// no wrapping / escaping
		white-space: nowrap;
		overflow: hidden;

		h1 {

			position: absolute;
			inset: -5px 110px 0px 330px;
			/* border: 1px solid red; */

			// spacing & positioning
			margin: 0px;
			padding-top: 0px;
			overflow: hidden;

			// text settings
			font-size: 32px;

			color: white;
			text-shadow: 3px 2px 1px #1d7491;

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

			// make a drop shadow
			/* filter: drop-shadow(3px 2px 1px rgba(0, 0, 0, 1)); */

		}// .logo

		// the icons that go on the left
		.header-icons {

			// force on left
			position: absolute;
			inset: 0px auto auto 0px;

			width: 270px;

			// padding
			padding: 5px 0px 0px 6px;

			// for debug
			/* border: 1px solid red; */

		}// .header-icons

		// the icons that go on the right
		.header-icons-right {
			
			// force on right
			position: absolute;
			inset: 0px 0px auto auto;

			width: 110px;

			// padding
			padding: 5px 0px 0px 6px;
		}

		// the github logo
		.ghLogo {
			filter: invert(1);
			transform: scale(1.2) translateY(-1px);
		}

	}// .header-bar
`;
