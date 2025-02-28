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
import { useSignal } from "@preact/signals-react";

// main component
export const ProjectPanel = ({ game }) => {

	// get the project manager & our list of projects
	const { projectManager } = game;
	const projects = projectManager.projects.value;

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
				<h2 title="Projects">
					Projects
					<span className="projects-arrow material-icons">subdirectory_arrow_left</span>
				</h2>

				{/* button to add a project */}
				<div
					className="cmdAddNew"
					title="Add New Project"
					onClick={(e)=>projectManager.createNewProject()}
				>
					<span className="material-icons">add</span>
				</div>

				{/* the list of projects */}
				<div className="project-list">
					{projects.map((project, i) => (
						<ProjectItem 
							key={project.id}
							project={project}
							game={game}
						/>))
					}
				</div>
			</div>
		</>
	);
}

// the project item component
const ProjectItem = ({ project, game }) => {

	// get the project manager
	const { projectManager } = game;

	// vars for editing the project name
	const isEditing = useSignal(false);
	const nameIsValid = useSignal(true);
	const tempName = useSignal(project.name);

	// click handler
	const handleClick = () => {
		projectManager.loadProject(project.id);
	}

	// name click handler - enter edit mode if we're selected
	const handleNameClick = () => {
		if (project.id === projectManager.selectedProject.value) {
			tempName.value = project.name;
			isEditing.value = true;			
		}
	}

	// validate the name
	const validateName = (newName) => {
        return game.projectManager.validateProjectName(newName);
    };

	// handle name change input box
    const handleChange = (e) => {
        const newName = e.target.value;
        tempName.value = newName;
        nameIsValid.value = validateName(newName);
    };

	// when the user presses return (enter) or the input loses focus, we can save the name
    const handleBlurOrEnter = () => {
        if (nameIsValid.value) {
            game.projectManager.setProjectName(project.id, tempName.value);
        }
        isEditing.value = false;
    };

	// name when is editing
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleBlurOrEnter();
        } else if (e.key === "Escape") {
            tempName.value = project.name;
            nameIsValid.value = true;
            isEditing.value = false;
        }
    };

	return (
		<div 
			className={ classNames(
				'project-item', 
				{ 'selected': project.id === projectManager.selectedProject.value }
			)}
			align="left"
			onClick={handleClick}
		>	
			{isEditing.value ? (
				<input 
					type="text" 
					value={tempName.value} 
					onChange={handleChange}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={handleKeyDown}
					autoFocus
					className={classNames(
						"project-name-input",
						{ invalid: !nameIsValid.value }
					)}
				/>
			) : (
				<div className="project-name" title={project.name} onClick={handleNameClick}>
					{project.name}
				</div>
			)}

			<div className="project-date" title={`Last edit on ${new Date(project.lastEdited).toLocaleString()}`} >
				{new Date(project.lastEdited).toLocaleString()}
			</div>

			{/* delete trash icon */}
			<div className="cmdDelete" title="Delete Project" onClick={(e) => {
					e.stopPropagation();
					projectManager.deleteProject(project);
				}}
			>
				<span className="material-icons">delete</span>
			</div>
		</div>
	);
}

// styles
const style = css`

	// the panel is fixed on the left side
	position: fixed;
	top: 50px;
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
		text-align: left;

		.projects-arrow {
			position: relative;
			top: 9px;
			left: 5px;
			font-size: 24px;
			font-weight: bold;
			transform: rotate(-90deg) scale(1.2);
		}
	}
	
	// put the add new button on the top right
	.cmdAddNew {

		// appear clickable
		cursor: pointer;

		// fixed on the top right
		position: absolute;
		top: 10px;
		right: 10px;

		// nice round circle
		width: 35px;
		height: 35px;
		background: white;
		border-radius: 50%;

		transition: top 0.2s;
		&:hover {
			top: 8px;
		}
		&:active {
			top: 12px; 
		}

		// icon styles
		.material-icons {
			position: relative;
			top: 2px;			
			font-size: 30px;
			color: #22222299;
		}

	}// .cmdAddNew

	// the list of projects
	.project-list {

		// fill remaining space
		height: calc(100% - 120px);
		overflow-y: auto;
		overflow-x: hidden;

		// border & box stiles
		border: 1px solid #444;
		border-radius: 5px;

		list-style: none;
		padding: 0;
		margin: 0;
	}

	// each project item
	.project-item {

		// set new stacking context
		position: relative;

		padding: 10px;
		border-bottom: 1px solid #666;
		cursor: pointer;
		transition: background 0.2s;

		// common styles for both hover and selected
		&:hover, &.selected {
			background: #444;

			.cmdDelete {
				display: block;
			}			
		}

		// just selected
		&.selected {
			.project-name {
				font-weight: bold;

				cursor: text;
			}
		}

		// the actual project name box
		.project-name {
			width: 155px;
		}

		// the text box for editing the name
		.project-name-input {

			// fixed width
			width: 150px;

			// text settings
			font-size: 14px;
			color: white;

			// spacing
			padding: 2px;
			border: 1px solid #444;

			// back bg style when invalid
			background: #222;
			&.invalid {
				background: red;
			}

		}// .project-name-input

		// the date box
		.project-date {
			font-size: 12px;
			font-style: italic;
			color: #aaa;
		}

		// delete button
		.cmdDelete {

			// normally hidden unless the main project item is hovered or selected
			display: none;

			// fixed on right side of item
			position: absolute;
			right: 6px;
			top: 12px;
			width: 20px;
			height: 20px;

			// appear clickable
			cursor: pointer;

			// red when hovered
			&:hover {
				.material-icons {
					color: red;
				}
			}

			.material-icons {
				font-size: 16px;
				color: white
			}

		}// .cmdDelete 

	}// .project-item

`;
