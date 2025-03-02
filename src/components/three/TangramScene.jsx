/*
	TangramScene.jsx
	----------------

	The main R3F scene to render the current project in 3D.
*/

// react and r3f stuffs
import React, { useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Environment } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

// Ensure required Three.js features are extended
extend({
	ExtrudeGeometry: THREE.ExtrudeGeometry,
	MeshStandardMaterial: THREE.MeshStandardMaterial,
	EquirectangularReflectionMapping: THREE.EquirectangularReflectionMapping,
});


// other components
import { Piece } from "./Piece3D";

// import { extend } from "@react-three/fiber";
// extend(THREE);

// HDRI Paths
const HDRI_PATHS = {
	A: "hdri/A.hdr",
	B: "hdri/B.hdr",
	C: "hdri/C.hdr",
};

// Main Scene Component
export const TangramScene = ({game}) => {

	// get the pieces data once on start up
	const currentProject = game.projectManager.getSelectedProject();
	const pieces = currentProject.data.pieces;


	const [hdri, setHdri] = useState("A");
	const { scene } = useThree();
	// const hdrTexture = useTexture(HDRI_PATHS[hdri]);

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 10]} intensity={1} />
			<OrbitControls />

			{pieces.map((piece) => (
				<Piece key={piece.id} {...piece} />
			))}
		</>
	);
};
