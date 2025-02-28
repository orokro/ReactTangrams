/*
	Piece.js
	--------

	Stores the state for an instance of a Tangram piece.
*/

// react
import { signal } from "@preact/signals-react";

// our app classes
import { TangramGame } from "./TangramGame";

// Piece class
export default class Piece {

	// static counter for unique ids
	static idCounter = 0;

	/**
	 * Constructor
	 * 
	 * @param {TangramGame} game - reference to the game state
	 * @param {String} type - the type of piece to create (e.g. 'squareSM')
	 */
	constructor(game, type) {

		// save ref to our game
		this.game = game;

		// unique id
		this.id = Piece.idCounter++;

		// our dynamic state
		this.type = signal(type);
		this.x = signal(0);
		this.y = signal(0);
		this.rotation = signal(0);
		this.isDragging = signal(false);
		this.isSelected	= signal(false);
		this.color = signal('#000000');

		this.rotatedPoints = signal([]);
		this.snappedPoint = signal(null);
	}


	/**
	 * Sets the position of the piece
	 * 
	 * @param {Number} x - the x position to set
	 * @param {Number} y - the y position to set
	 * @param {Boolean} snap - (optional) if true, snap to the grid
	 */
	setPos(x, y, snap=true) {
		this.x.value = x;
		this.y.value = y;
		if (snap) this.snapToGrid();
	}


	/**
	 * Snaps the piece to the grid
	 * 
	 * @param {Number} gridSize - the size of the grid to snap to
	 */
	snapToGrid(gridSize = 20) {

		// Function to rotate a point around the piece's origin.
		const rotatePoint = (point) => {
      
			// Rotates a point around (0,0) by the piece's rotation angle.	
			const angleRad = (this.rotation.value * Math.PI) / 180;
			const cosTheta = Math.cos(angleRad);
			const sinTheta = Math.sin(angleRad);
			const [x, y] = point;
			const rotatedX = x * cosTheta - y * sinTheta;
			const rotatedY = x * sinTheta + y * cosTheta;
			return [rotatedX, rotatedY];
		}

		// Function to scale a point by a given factor.
		const scalePoint = (point, scale) => {
			return [point[0] * scale, point[1] * scale];
		}

        //Snaps the piece to the closest grid point based on its shape points.
        let closestPoint = null;
        let minDistance = Infinity;
        let bestOffsetX = 0;
        let bestOffsetY = 0;

		let rPoints = [];

		// process each point in the piece
		const points = shapeData[this.type.value].points;
        for (const point of points) {

            // Rotate point around origin
			const scaledPoint = scalePoint(point, 1.2);
            const rotatedPoint = rotatePoint(scaledPoint);
            
			// so we can render the snaps
			rPoints.push(rotatedPoint);

            // Translate to world space
            const worldX = this.x.value + rotatedPoint[0];
            const worldY = this.y.value + rotatedPoint[1];
            
            // Find nearest grid intersection
            const nearestGridX = Math.round(worldX / gridSize) * gridSize;
            const nearestGridY = Math.round(worldY / gridSize) * gridSize;
            
            // Compute distance to nearest grid
            const deltaX = nearestGridX - worldX;
            const deltaY = nearestGridY - worldY;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            
            // Check if this is the closest point so far
            if (distance < minDistance) {
                minDistance = distance;
                bestOffsetX = deltaX;
                bestOffsetY = deltaY;
                closestPoint = rotatedPoint;
            }
        }

		this.rotatedPoints.value = rPoints;
		this.snappedPoint.value = closestPoint;

        // Apply the best offset to snap the piece
        this.x.value += bestOffsetX;
        this.y.value += bestOffsetY;
    }


	/**
	 * Starts dragging the piece
	 */
	startDrag() {
		this.isDragging.value = true;
		
		// save the position we were at when drag was started
		const initialPos = {
			x: this.x.value,
			y: this.y.value
		};

		// for styling
		this.isDragging.value = true;

		this.game.dragHelper.dragStart(
			(dx, dy)=>{
				this.setPos(initialPos.x - dx, initialPos.y - dy);
			},
			()=>{
				this.isDragging.value = false;
			}
		);
	}


	/**
	 * Rotates the piece left or right depending on if shift is held with the (e) event
	 * 
	 * @param {Event} e - the event object
	 * @param {Boolean} snapToGrid - if true, snap to the grid
	 */
	rotate(e, snapToGrid=true) {

		// if shift is held, rotate 45 degrees
		const rotateAmount = e.shiftKey ? -45 : 45;

		// rotate the piece
		this.rotation.value += rotateAmount;

		// snap to grid if needed
		if (snapToGrid) this.snapToGrid();

		// keep the rotation between 0 and 360
		// this.rotation.value = this.rotation.value % 360;
	}

}

// const shape details
export const shapeData = {

	// square
	squareSM: {
		name: "Small Square",
		points: [[0, -50], [50, 0], [0, 50], [-50, 0]],
		defaultColor: 'red',
	},
	squareMD: {
		name: "Medium Square",
		points: [[-50, -50], [50, -50], [50, 50], [-50, 50]],
		defaultColor: 'blue',
	},
	squareLG: {
		name: "Large Square",
		points: [[0, -100], [100, 0], [0, 100], [-100, 0]],
		defaultColor: 'green',
	},
	triangleSM: {
		name: "Small Triangle",
		points: [[-50, 17], [50, 17], [0, -33]],
		defaultColor: 'orange',
	},
	triangleMD: {
		name: "Medium Triangle",
		points: [[-50+17, -50-17], [50+17, 50-17], [-50+17, 50-17]],
		defaultColor: 'purple',
	},
	triangleLG: {
		name: "Large Triangle",
		points: [[-100, 51], [0, -100+51], [100, 51]],
		defaultColor: 'yellow',
	},
	parallelogramA: {
		name: "Parallelogram A",
		points: [[50-75, -25], [150-75, -25], [100-75, 50-25], [-75, 50-25]],
		defaultColor: 'pink',
	},
	parallelogramB: {
		name: "Parallelogram B",
		points: [[-75, -25], [100-75, -25], [150-75, 50-25], [50-75, 50-25]],
		defaultColor: 'brown',
	},
	trapezoid: {
		name: "Trapezoid",
		points: [[50-75, -25], [100-75, -25], [150-75, 50-25], [-75, 50-25]],
		defaultColor: 'gray',
	},
};
