/*
	App.jsx
	-------

	Main root of the application
*/

// react
/** @jsxImportSource @emotion/react */
import React from "react";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import "@preact/signals-react";

// components
import { HeaderBar } from './components/HeaderBar'
import { TangramContainer } from './components/TangramContainer'
import { PieMenu } from './components/PieMenu';
import { PieItem } from './components/PieItem';

// app
import { TangramGame } from './classes/TangramGame'

// global css
import './App.css'

function App() {

	// state logic fo the game lives in here
	const game = new TangramGame();

	// prevent context menu unless shift is held
	const handleCtxMenu = (e) => {
		
		// disable context menu unless shift is held
		if (!e.shiftKey) e.preventDefault();
	}

	const handlePieItemSelect = (item) => {
		console.log('Pie item selected:', item);
	};

	// styles
	const style = css`

	`;

	return (
		<div
			className="App"
			css={style}
			onContextMenu={handleCtxMenu}
		>

			<HeaderBar />
			<TangramContainer game={game} />
			<PieMenu x={400} y={350} menuSize={400} onItemSelect={handlePieItemSelect}>
				<PieItem title="Item 1">aidsasdasdads</PieItem>
				<PieItem title="Item 2">aids </PieItem>
				<PieItem title="Item 3">aids </PieItem>
				<PieItem title="Item 4">aids </PieItem>
			</PieMenu>
		
		</div>
	)
}

export default App
