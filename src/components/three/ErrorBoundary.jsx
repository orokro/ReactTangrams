/*
	ErrorBoundary.jsx
	-----------------

	Provided from ChatGPT to help catch errors in the 3D renderer.
*/

// react
import React, { Component } from "react";

// main component
export class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in R3F Canvas:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong in the 3D Renderer.</h1>;
    }
    return this.props.children;
  }
}
