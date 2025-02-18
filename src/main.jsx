/*
	main.jsx
	--------

	Main entry point for the app, to bootstrap the React app and render it to the DOM.
*/

// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
