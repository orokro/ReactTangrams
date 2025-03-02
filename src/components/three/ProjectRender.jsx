/*
	ProjectRender.jsx
	-----------------

	This is the root level component for doing ThreeJS (React Three Fiber) rendering
	in our project.

	At the time of writing, this will be used in the 3D pop-up modal,
	but maybe later will be more integrated into the main workspace.

	For now, it's just a way to view the project in 3D, not edit it.
*/

// React & R3F
import React from "react";

// Other components
import { ResponsiveCanvas } from "./ResponsiveCanvas";
import { TangramScene } from "./TangramScene";
import { ErrorBoundary } from "./ErrorBoundary";

// Main Component Export
export const ProjectRender = ({ game }) => {
	return (
		<div 
			style={{
				width: "100%",
				height: "100%",
				position: "relative",
			}}
		>
			<ErrorBoundary>
				<ResponsiveCanvas>
					<TangramScene game={game} />
				</ResponsiveCanvas>
			</ErrorBoundary>
		</div>
	);
};
