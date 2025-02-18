/*
	App.jsx
	-------

	Main root of the application
*/

// react
import { useState } from 'react'

// components
import { HeaderBar } from './components/HeaderBar'
import { TangramContainer } from './components/TangramContainer'

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

	return (
		<div
			className="App"
			onContextMenu={handleCtxMenu}
		>

			<HeaderBar />
			<TangramContainer game={game} />

		</div>
	)
}

export default App
