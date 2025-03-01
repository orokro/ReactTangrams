/*
	App.jsx
	-------

	Main root of the application
*/

// react
/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import { css } from "@emotion/react";
import "@preact/signals-react";

// components
import { HeaderBar } from './components/HeaderBar'
import { TangramContainer } from './components/TangramContainer'
import { PieMenuContainer } from "./components/PieMenuContainer"; 
import { ProjectPanel } from "./components/ProjectPanel";
import { ModalsContainer } from "./components/ModalsContainer";

// app
import { TangramGame } from './classes/TangramGame'

// global css
import "material-icons/iconfont/material-icons.css";
import './App.css'

function App() {

	// state logic fo the game lives in here
	const gameRef = useRef(new TangramGame());

	// for debug
	const game = gameRef.current;
	window.game = game;

	// prevent context menu unless shift is held
	const handleCtxMenu = (e) => {
		
		// disable context menu unless shift and alt are held
		if (!e.shiftKey || !e.altKey) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	// handle key down
	const handleKeyDown = (e) => {

		// toggle the menu if spacebar is pushed, and the event isn't focused in an input
		if (e.key === ' ' && e.target.tagName !== 'INPUT') {
			e.preventDefault();
			game.addShapePieMenu.toggle();
		}
	}

	return (
		<div
			className="App"
			css={style}
			tabIndex="0"
			onContextMenu={handleCtxMenu}
			onKeyDown={handleKeyDown}
		>

			{/* Header Bar */}
			<HeaderBar game={game} />

			{/* Tangram Container which is the main work area, where pieces will spawn and move */}
			<TangramContainer game={game} />

			{/* All our pie menus mount in here */}
			<PieMenuContainer game={game} />

			{/* The project panel */}
			<ProjectPanel game={game} />

			{/* All our modals are compartmentalized in here... */}
			<ModalsContainer game={game} />

		</div>
	)
}

// styles
const style = css`

`;

export default App;
