/*
	ProjectPanel.jsx
	----------------

	This shows the project panel on the left side of the screen,
	with this of projects in local storage & etc.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import classNames from "classnames";

// main component
export const ProjectPanel = ({ game }) => {

	// get the project manager & our list of projects
	const { projectManager } = game;
	const projects = projectManager.projects;

	// memoize the project list
	const projectList = useMemo(() => projects.value.map((project, i) => (
		<ProjectItem 
			key={project.id}
			project={project}
			game={game}
		/>
	)), [projects]);

	return (
		<>
			{/* the main panel outer most box */}
			<div 
				css={style}
				className={classNames(
					'project-panel', 
					{ 'open': game.projectPanelIsOpen.value }
				)}
			>
				<h2>Projects</h2>

				{/* button to add a project */}
				<button onClick={projectManager.createNewProject}>+</button>

				{/* the list of projects */}
				<div className="project-list">
					{projectList}
				</div>
			</div>
		</>
	);
}

// the project item component
const ProjectItem = ({ project, game }) => {

	// get the project manager
	const { projectManager } = game;

	// click handler
	const handleClick = () => {
		projectManager.loadProject(project.id);
	}

	return (
		<div 
			className={ classNames(
				'project-item', 
				{ 'selected': project.id === projectManager.selectedProject.value }
			)}
			onClick={handleClick}
		>
			{project.name}
		</div>
	);
}

// styles
const style = css`

	// the panel is fixed on the left side
	position: fixed;
	top: 0;
	left: 0;
	width: 200px;
	height: 100%;

	// normally hidden off screen
	transform: translateX(-100%);

	// animate open
	transition: transform 0.2s;
	&.open {
		transform: translateX(0);
	}

	// box style
	background: #11111199;
	backdrop-filter: blur(10px);
	color: #fff;
	padding: 10px;
	overflow-y: auto;
	z-index: 100;

	// the title
	h2 {
		margin: 0 0 10px 0;
	}

	// the list of projects
	.project-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	// each project item
	.project-item {
		padding: 10px;
		border-bottom: 1px solid #666;
		cursor: pointer;
		transition: background 0.2s;

		&:hover {
			background: #444;
		}
	}
`;
