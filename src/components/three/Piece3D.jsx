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

	const scale = 1.10;

	// Swap Y → Z so the shapes generate lying flat
	shape.moveTo(points[0][0] * scale, points[0][1] * scale);
	points.slice(1).forEach(([x, y]) => shape.lineTo(x * scale, y * scale));

	return new ExtrudeGeometry(shape, {
		depth: 25,
		bevelEnabled: true,
		bevelSize: 5,
		bevelThickness: 2,

	});
}


// Cache geometries per shape type to avoid reprocessing
const shapeGeometries = {};
Object.entries(shapeData).forEach(([key, data]) => {
	shapeGeometries[key] = createShapeGeometry(data.points);
});



// Component for an individual piece
export const Piece3D = ({ type, x, y, rotation, color, game, index }) => {

	const meshRef = useRef();

	const scaleFactor = 1;
	const heightIncrease = game.zIndexOffset.value * index;
    
    return (
        <mesh
            ref={meshRef}
            geometry={shapeGeometries[type]}
            position={[x * scaleFactor, 0, y * scaleFactor]} // Move up by heightIncrease
            rotation={[Math.PI / 2, 0, (rotation * Math.PI) / 180]} // Keep correct rotation
            scale={[scaleFactor, scaleFactor, -(1 + heightIncrease)]} // Scale taller
        >
            <meshStandardMaterial 
				color={color}
				roughness={0}
			/>
        </mesh>
    );
};
