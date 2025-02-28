/*
	App.jsx
	-------

	Main root of the application
*/

// react
/** @jsxImportSource @emotion/react */
import React from "react";
import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import "@preact/signals-react";

// components
import { HeaderBar } from './components/HeaderBar'
import { TangramContainer } from './components/TangramContainer'
import { AddPieceMenu } from './components/AddPieceMenu'
import { EditPieceMenu } from "./components/EditPieceMenu";

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

	// handle when our pie menu picks an item
	const handlePieItemSelect = (slug, idx) => {
		// console.log(`Pie item selected: ${slug} at index ${idx}`);
		game.addShapePieMenu.hide();
		game.spawnPiece(slug);
	};

	// handle key down
	const handleKeyDown = (e) => {

		// toggle the menu if spacebar is pushed
		if (e.key === " ") {
			game.addShapePieMenu.toggle();
		}
	}

	// styles
	const style = css`

	`;

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

			{/* Optionally show Pie Menu */}
			{ game.addShapePieMenu.isOpen.value && (
				<AddPieceMenu
					game={game}
					pieMenu={game.addShapePieMenu}
					onItemSelect={handlePieItemSelect}
					onMouseLeave={() => game.addShapePieMenu.hide()}
				/>	
			)}

			{/* Optionally show Edit Pie Menu */}
			{ game.editShapePieMenu.isOpen.value && (
				<EditPieceMenu
					game={game}
					pieMenu={game.editShapePieMenu}
					onItemSelect={(slug) => {
						// game.editShapePieMenu.hide();
						// game.deletePiece(slug);
					}}
					onMouseLeave={() => game.editShapePieMenu.hide()}
				/>
			)}
		
		</div>
	)
}

export default App;
