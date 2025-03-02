/*
	TangramScene.jsx
	----------------

	The main R3F scene to render the current project in 3D.
*/

// react and r3f stuffs
import React, { useState, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Environment } from "@react-three/drei";

// other components
import { Piece3D } from "./Piece3D";

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

	// Compute center of all pieces
    const { centerX, centerY } = useMemo(() => {
        if (pieces.length === 0) return { centerX: 0, centerY: 0 };
        let sumX = 0, sumY = 0;
        pieces.forEach(p => {
            sumX += p.x;
            sumY += p.y;
        });
        return { centerX: sumX / pieces.length, centerY: sumY / pieces.length };
    }, [pieces]);

	const [hdri, setHdri] = useState("A");
	const { scene } = useThree();
	// const hdrTexture = useTexture(HDRI_PATHS[hdri]);

	return (
		<>
			{/* Lights */}
			<ambientLight intensity={0.75} />
            <directionalLight position={[10, 10, 10]} intensity={2} />

            {/* Camera Controls */}
            <OrbitControls
                target={[centerX, 0, centerY]} // Look at the computed center
                makeDefault
            />

			{pieces.map((piece, index) => (
				<Piece3D key={piece.id} {...piece} index={index} game={game} />
			))}
		</>
	);
};
