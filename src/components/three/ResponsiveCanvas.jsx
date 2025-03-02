/*
	ResponsiveCanvas.jsx
	--------------------

	Provides a nice wrapper to watch the DOM we're mounted in to automatically
	resize the ThreeJS (i.e. React Three Fiber) canvas to fit the parent container.
*/

// React and R3F
import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

// Main component
export const ResponsiveCanvas = ({ children }) => 
	{
	// Reference to the parent container
	const containerRef = useRef();
	const [size, setSize] = useState({ width: 500, height: 500 });

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			if (containerRef.current) {
				setSize({
					width: containerRef.current.clientWidth,
					height: containerRef.current.clientHeight,
				});
			}
		});

		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={containerRef} style={{ width: "100%", height: "100%" }}>
			<Canvas
				style={{ background: "transparent" }}
				camera={{ position: [0, 200, 300], fov: 50 }}
				gl={{ preserveDrawingBuffer: false }} // Prevents WebGL context loss issues
				onContextLost={(event) => {
					console.warn("WebGL context lost", event);
					event.preventDefault();
				}}
			>
				{children}
			</Canvas>
		</div>
	);
};
