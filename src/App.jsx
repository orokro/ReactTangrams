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
import { PieMenu } from './components/PieMenu';
import { PieItem } from './components/PieItem';
import { Shape } from './components/Shape';

// app
import { TangramGame } from './classes/TangramGame'

// global css
import './App.css'

function App() {

	// state logic fo the game lives in here
	const gameRef = useRef(new TangramGame());

	// for debug
	const game = gameRef.current;
	window.game = game;

	// prevent context menu unless shift is held
	const handleCtxMenu = (e) => {
		
		// disable context menu unless shift is held
		if (!e.shiftKey) e.preventDefault();
	}

	// handle when our pie menu picks an item
	const handlePieItemSelect = (slug, idx) => {
		console.log(`Pie item selected: ${slug} at index ${idx}`);
		game.hidePieMenu();
	};

	// handle key down
	const handleKeyDown = (e) => {

		// toggle the menu if spacebar is pushed
		if (e.key === " ") {
			game.togglePieMenu();
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
			{ game.pieMenuOpen.value && (
				<PieMenu 
					x={game.pieMenuX.value}
					y={game.pieMenuY.value}
					menuSize={400}
					onItemSelect={handlePieItemSelect}
					onMouseLeave={() => game.hidePieMenu()}
				>
					<PieItem title="Small Square" slug="squareSM">
						<Shape shape="squareSM" color="red" rawScale={0.5}></Shape>
					</PieItem>
					<PieItem title="Medium Square" slug="squareMD">
						<Shape shape="squareMD" color="blue" rawScale={0.5}></Shape>
					</PieItem>
					<PieItem title="Large Square" slug="squareLG">
						<Shape shape="squareLG" color="green" rawScale={0.45}></Shape>
					</PieItem>
					<PieItem title="Small Triangle" slug="triangleSM">
						<Shape shape="triangleSM" color="orange" rawScale={0.5}></Shape>
					</PieItem>
					<PieItem title="Medium Triangle" slug="triangleMD">
						<Shape shape="triangleMD" color="purple" rawScale={0.5}></Shape>
					</PieItem>
					<PieItem title="Large Triangle" slug="triangleLG">
						<Shape shape="triangleLG" color="yellow" rawScale={0.45}></Shape>
					</PieItem>
					<PieItem title="Parallelogram A" slug="parallelogramA">
						<Shape shape="parallelogramA" color="pink" rawScale={0.5}></Shape>
					</PieItem>
					<PieItem title="Parallelogram B" slug="parallelogramB">
						<Shape shape="parallelogramB" color="brown" rawScale={0.5}></Shape>
					</PieItem>
					<PieItem title="Trapezoid" slug="trapezoid">
						<Shape shape="trapezoid" color="gray" rawScale={0.5}></Shape>
					</PieItem>
				</PieMenu>
			)}
		
		</div>
	)
}

export default App;
