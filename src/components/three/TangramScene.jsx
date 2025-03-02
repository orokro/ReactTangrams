import React, { useState, useMemo, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

// Other components
import { Piece3D } from "./Piece3D";

// Main Scene Component
export const TangramScene = ({ game }) => {

	const currentProject = game.projectManager.getSelectedProject();
	const pieces = currentProject.data.pieces;

	// Compute center of all pieces (i.e. average position)
	const { centerX, centerY } = useMemo(() => {
		if (pieces.length === 0) return { centerX: 0, centerY: 0 };
		let sumX = 0, sumY = 0;
		pieces.forEach(p => {
			sumX += p.x;
			sumY += p.y;
		});
		return { centerX: sumX / pieces.length, centerY: sumY / pieces.length };
	}, [pieces]);

	const { scene } = useThree();
	const hdrPath = "/hdri/C.hdr";

	// Load HDRI
	useEffect(() => {
		const hdriPath = hdrPath; // Path relative to public folder
		new RGBELoader().load(hdriPath, (texture) => {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			scene.environment = texture; // Apply HDRI as lighting
			// scene.background = texture;  // Apply HDRI as background
		});
	}, [scene]);

	return (
		<>
			{/* Lights */}
			<ambientLight intensity={0} />
			<directionalLight position={[10, 10, 10]} intensity={0.7} />

			{/* Camera Controls */}
			<OrbitControls target={[centerX, 0, centerY]} makeDefault />

			{/* HDRI Reflections */}
            <Environment files={hdrPath} background={false} />

			{/* Render Pieces */}
			{pieces.map((piece, index) => (
				<Piece3D key={piece.id} {...piece} index={index} game={game} />
			))}
		</>
	);
};
