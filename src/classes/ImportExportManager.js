/*
	ImportExportManager.js
	----------------------

	This pure JavaScript class will provide the functionality to:
	- export JSON of the current project
	- export SVG of the current project
	- export PNG of the current project
	- import JSON of a project

	This will be instantiated by the TangramGame class, and will
	contain the logic to handle the import/export of projects.
*/

// libs
import { saveSvgAsPng } from "save-svg-as-png";

// our app imports
import { shapeData } from "./Piece";

// main class
export default class ImportExportManager {

	/**
	 * Constructor
	 * 
	 * @param {TangramGame} game - The game instance
	 */
	constructor(game) {

		// the game instance
		this.game = game;

		// make sure some FNs are always bound
		this.bindFns();
	}

	/**
	 * Bind some functions to the class
	 */
	bindFns() {

		// bind all functions to this class
		this.exportJSON = this.exportJSON.bind(this);
		this.exportSVG = this.exportSVG.bind(this);
		this.exportPNG = this.exportPNG.bind(this);
	}


	/**
	 * Export the current project as JSON
	 */
	exportJSON() {

		// get current project JSON
		const currentProject = this.game.projectManager.getSelectedProject();
		const json = JSON.stringify(currentProject);
		const fileName = currentProject.name + '.json';

		// have browser download the file
		const a = document.createElement('a');
		a.href = 'data:application/json,' + encodeURIComponent(json);
		a.download = fileName;
		a.click();
	}


	/**
	 * Export the current project as SVG
	 */
	exportSVG() {

		// get current project JSON
		const currentProject = this.game.projectManager.getSelectedProject();
		const pieces = currentProject.data.pieces;

		// generate the SVG
		const svg = this.generateCombinedSVG(pieces, shapeData, 1.2);

		// have browser download the file
		const fileName = currentProject.name + '.svg';
		const a = document.createElement('a');
		a.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
		a.download = fileName;
		a.click();
	}


	/**
	 * Export the current project as PNG
	 */
	exportPNG() {

		// get current project JSON
		const currentProject = this.game.projectManager.getSelectedProject();
		const pieces = currentProject.data.pieces;

		// Generate the SVG string
		const svgString = this.generateCombinedSVG(pieces, shapeData, 1.2);

		// Create a temporary container for the SVG
		const tempContainer = document.createElement("div");
		tempContainer.innerHTML = svgString;
		document.body.appendChild(tempContainer);

		const svgElement = tempContainer.querySelector("svg");
		if (!svgElement) return;

		// Export the SVG as a PNG
		saveSvgAsPng(svgElement, "tangram.png", { scale: 2, backgroundColor: "transparent" });

		// Remove the temporary container
		document.body.removeChild(tempContainer);
	};


	/**
	 * Generate an SVG string for the given pieces
	 * 
	 * @param {Array} pieces - the pieces to render
	 * @param {Object} shapeData - the shape data
	 * @returns {String} - the SVG string
	 */
	generateCombinedSVG(pieces, shapeData, rawScale = 1) {

		// Handle empty case
		if (pieces.length === 0)
			return "";

		let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
		let paths = "";

		// Iterate over each piece
		pieces.forEach(piece => {

			const { type, x, y, rotation, color } = piece;
			const shape = shapeData[type];
			if (!shape) return;

			// Transform the shape points into an SVG path, applying x, y offsets and rotation
			const points = shape.points.map(([px, py]) => {
				// Apply scaling
				px *= rawScale;
				py *= rawScale;

				// Convert rotation to radians
				const angleRad = (rotation * Math.PI) / 180;
				const cosTheta = Math.cos(angleRad);
				const sinTheta = Math.sin(angleRad);

				// Apply rotation
				const rotatedX = px * cosTheta - py * sinTheta;
				const rotatedY = px * sinTheta + py * cosTheta;

				// Apply translation
				return [rotatedX + x, rotatedY + y];
			});

			// Update bounding box calculations
			points.forEach(([px, py]) => {
				minX = Math.min(minX, px);
				minY = Math.min(minY, py);
				maxX = Math.max(maxX, px);
				maxY = Math.max(maxY, py);
			});
		});

		// Add padding around the bounding box
		const padding = 20;
		minX -= padding;
		minY -= padding;
		maxX += padding;
		maxY += padding;

		// Compute viewBox values
		const width = maxX - minX;
		const height = maxY - minY;
		const viewBox = `0 0 ${width} ${height}`;

		// Adjust all paths to be positioned relative to the new viewBox
		pieces.forEach(piece => {
			const { type, x, y, rotation, color } = piece;
			const shape = shapeData[type];
			if (!shape) return;

			const points = shape.points.map(([px, py]) => {
				px *= rawScale;
				py *= rawScale;
				const angleRad = (rotation * Math.PI) / 180;
				const cosTheta = Math.cos(angleRad);
				const sinTheta = Math.sin(angleRad);
				const rotatedX = px * cosTheta - py * sinTheta;
				const rotatedY = px * sinTheta + py * cosTheta;
				return [rotatedX + x - minX, rotatedY + y - minY];
			});

			const d = `M ${points.map(p => p.join(",")).join(" L ")} Z`;
			paths += `<path d="${d}" fill="${color || shape.defaultColor}" stroke="#000" stroke-width="2" />\n`;
		});

		// Generate final SVG
		return `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
				${paths}
			</svg>
		`;
	}


	/**
	 * Light wrapper for importing a project from JSON
	 *
	 * @param {String} jsonString - the JSON string to import
	 */	
	importJSON(jsonString) {

		// ez
		this.game.projectManager.importProjectFromJSONString(jsonString);
	}

}
