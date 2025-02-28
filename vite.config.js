import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	
	server: {
		// port: 8080,
	},
	plugins: [
		react({
			babel: {
				plugins: [
					['@emotion/babel-plugin', { sourceMap: true }],
					["module:@preact/signals-react-transform"]
				],
			}
		})
	],
	base: './', // Add this line to set the base path to relative
})
