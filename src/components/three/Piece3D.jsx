/*
	Piece3D.jsx
	-----------

	This is a component that represents a single piece in 3D space.
	It is used in the 3D view of the project.
*/

// react and r3f stuffs
import React, { useRef } from "react";
import { ExtrudeGeometry, Shape } from "three";

// our app
import { shapeData } from "../../classes/Piece";

/**
 * Function to generate Three.js shape from shapeData
 * 
 * @param {Array<Array<Number>>} points - 2d array of points
 * @returns {ExtrudeGeometry} - the geometry for the shape
 */
function createShapeGeometry(points) {
	const shape = new Shape();

	// Swap Y → Z so the shapes generate lying flat
	shape.moveTo(points[0][0] * 1.2, points[0][1] * 1.2);
	points.slice(1).forEach(([x, y]) => shape.lineTo(x * 1.2, y * 1.2));

	return new ExtrudeGeometry(shape, {
		depth: 25,
		bevelEnabled: true,
		bevelSize: 1,

	});
}


// Cache geometries per shape type to avoid reprocessing
const shapeGeometries = {};
Object.entries(shapeData).forEach(([key, data]) => {
	shapeGeometries[key] = createShapeGeometry(data.points);
});

const scaleFactor = 1; // Scale down everything

// Component for an individual piece
export const Piece3D = ({ type, x, y, rotation, color }) => {

	const meshRef = useRef();

	return (
		<mesh
			ref={meshRef}
			geometry={shapeGeometries[type]}
			position={[x * scaleFactor, 2.5 * scaleFactor, y * scaleFactor]}
			rotation={[Math.PI/2, 0, (rotation * Math.PI) / 180]} 
			scale={[scaleFactor, scaleFactor, scaleFactor]}
		>
			<meshStandardMaterial color={color} />
		</mesh>
	);
};
