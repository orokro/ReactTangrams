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
import * as THREE from "three";

import { extend } from "@react-three/fiber";

// Ensure required Three.js features are extended
extend({
	ExtrudeGeometry: THREE.ExtrudeGeometry,
	MeshStandardMaterial: THREE.MeshStandardMaterial,
	EquirectangularReflectionMapping: THREE.EquirectangularReflectionMapping,
});

/**
 * Function to generate Three.js shape from shapeData
 * 
 * @param {Array<Array<Number>>} points - 2d array of points
 * @returns {ExtrudeGeometry} - the geometry for the shape
 */
function createShapeGeometry(points){

	const shape = new Shape();
	shape.moveTo(points[0][0] * 1.2, points[0][1] * 1.2);
	points.slice(1).forEach(([x, y]) => shape.lineTo(x * 1.2, y * 1.2));

	return new ExtrudeGeometry(shape, { depth: 5, bevelEnabled: false });
};


// Cache geometries per shape type to avoid reprocessing
const shapeGeometries = {};
Object.entries(shapeData).forEach(([key, data]) => {
	shapeGeometries[key] = createShapeGeometry(data.points);
});


// Component for an individual piece
export const Piece = ({ type, x, y, rotation, color }) => {

	const meshRef = useRef();

	return (
		<mesh
			ref={meshRef}
			geometry={shapeGeometries[type]}
			position={[x, 2.5, y]}
			rotation={[0, (rotation * Math.PI) / 180, 0]}
		>
			<meshStandardMaterial color={color} />
		</mesh>
	);
};
