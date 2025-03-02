/*
	ProjectManager.js
	-----------------

	This file will provide a regular OOP class for managing projects,
	using localStorage to save and load projects.
*/

// libs
import { signal, useSignal } from "@preact/signals-react";
import pako from "pako";

// our app
import { TangramGame } from './TangramGame';
import Util from "./Util";

const JSON2 = Util.JSON2;
window.JSON2 = JSON2;

// main class export
export default class ProjectManager {

	/**
	 * Constructor
	 * 
	 * @param {TangramGame} game - reference to the game state
	 * @param {Function} onLoad - callback when a project is loaded
	 */
    constructor(game, onLoad) {
		
		// save ref to our game
        this.game = game;

		// callback when a project is loaded
        this.onLoad = onLoad;

		// our list of projects & the selected project
        this.projects = signal([]);
        this.selectedProject = signal(null);

		// load projects from storage
        this._loadProjectsFromStorage();

		// bind some methods
		this.createNewProject = this.createNewProject.bind(this);

		// check if we have a project in the URL, and load it if SO
		this.checkURLForProject();

		window.p = this;
    }

	/**
	 * Check the URL for a project to load
	 */
	checkURLForProject(){

		// check if the URL we loaded from has the ?projectData query value.
		// if it does, call loadShareLink with the value of the query
		const urlParams = new URLSearchParams(window.location.search);
		const projectData = urlParams.get('projectData');
		if (projectData) {
			setTimeout(()=>{
				this.loadShareLink(projectData);
			}, 10);
		}

		// clear the query string from the URL
		window.history.replaceState({}, document.title, window.location.pathname);
	}


	/**
	 * Save the projects to localStorage
	 */
	_saveProjectsToStorage() {

		// wrap in promise to avoid
		return new Promise((resolve, reject) => {

			// sort & save a copy of the projects
			const sorted = [...this.projects.value].sort((a, b) => b.lastEdited - a.lastEdited);

			// we need to clear this or else rendering bugs
			this.projects.value = [];

			// set the projects after a timeout to avoid rendering bugs
			setTimeout(() => {
				this.projects.value = sorted
				resolve();
			}, 0);

			// save the projects to storage regardless of the timeout
			localStorage.setItem('projects', JSON.stringify(sorted));
		});
	}


	/**
	 * Load projects from localStorage
	 */
    _loadProjectsFromStorage() {

		// load projects from storage (if any, or empty array otherwise)
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
		storedProjects.sort((a, b) => b.lastEdited - a.lastEdited);
        this.projects.value = storedProjects;

		// if no projects, create a new one
        if (storedProjects.length === 0) {
            this.createNewProject();
        } else {
            this.selectedProject.value = storedProjects[0].id;
            if (this.onLoad)
				this.onLoad(this.getSelectedProject());
        }
    }


	/**
	 * Create a new project
	 * 
	 * @param {String} name - (optional) name of the project
	 */
    async createNewProject(name = "Untitled Project") {

		// give the project a unique name
		let untitledIndex = 1;
		let newName = name;
		while (this.projects.value.some(p => p.name === newName)) {
			untitledIndex++;
			newName = `${name} (${untitledIndex})`;
		}
		name = newName;

        const newProject = {
            id: crypto.randomUUID(),
            name,
            lastEdited: Date.now(),
            data: {},
			fromURL: null,
        };
        this.projects.value = [...this.projects.value, newProject];
        await this._saveProjectsToStorage();
        this.loadProject(newProject.id);
    }


	/**
	 * Load a project
	 * 
	 * @param {Object|String} project - the project object or the project id
	 */
    loadProject(project) {

		// get the project id & find the project
        const projectId = typeof project === 'string' ? project : project.id;
        const foundProject = this.projects.value.find(p => p.id === projectId);

		// if found, set the selected project and call the onLoad callback
        if (foundProject) {
            this.selectedProject.value = foundProject.id;
            if (this.onLoad) this.onLoad(foundProject);
        }
    }


	/**
	 * Save a project
	 * 
	 * @param {Object|String} project - the project object or the project id
	 * @param {Object} data - the project data to save
	 */
    saveProject(project, data) {

        const projectId = typeof project === 'string' ? project : project.id;
        this.projects.value = this.projects.value.map(p => 
            p.id === projectId ? { ...p, data, lastEdited: Date.now() } : p
        );
        this._saveProjectsToStorage();
    }


	/**
	 * Delete a project
	 * 
	 * @param {Object|String} project - the project object or the project id
	 */
    deleteProject(project) {

		// get the project id & filter out the project
        const projectId = typeof project === 'string' ? project : project.id;
        this.projects.value = this.projects.value.filter(p => p.id !== projectId);

		// save the projects and load the first project
        this._saveProjectsToStorage();
        if (this.projects.value.length > 0) {
            this.loadProject(this.projects.value[0]);
        } else {
            this.createNewProject();
        }
    }


	/**
	 * Save the current project, or create a new one if none is selected
	 * 
	 * @param {Object} data - the project data to save
	 */
    save(data) {
        if (!this.selectedProject.value) {
            this.createNewProject();
        }
        this.saveProject(this.selectedProject.value, data);
    }


	/**
	 * Rename a specific project & save it
	 * 
	 * @param {Object|String} project - the project object or the project id
	 * @param {String} name - the new name for the project
	 */
    setProjectName(project, name) {

		// make sure its ok
		if (!this.validateProjectName(name)) return;

		// update the project name and save it
        const projectId = typeof project === 'string' ? project : project.id;
        this.projects.value = this.projects.value.map(p => 
            p.id === projectId ? { ...p, name, lastEdited: Date.now() } : p
        );
        this._saveProjectsToStorage();
    }


	/**
	 * Set the name of the selected project & save it
	 * 
	 * @param {String} name - the new name for the project
	 */
    setName(name) {
        if (!this.selectedProject.value) {
            this.createNewProject(name);
        } else {
            this.setProjectName(this.selectedProject.value, name);
        }
    }

	
	/**
	 * Helper to validate a project name
	 * 
	 * @param {String} name - the name to validate
	 * @returns {String} true if the name is valid
	 */
	validateProjectName(name) {
        const validName = /^[a-zA-Z0-9 ]{1,64}$/.test(name.trim());
        return validName;
    }


	/**
	 * Get the currently selected project
	 * 
	 * @returns {Object} the currently selected project
	 */
    getSelectedProject() {
        return this.projects.value.find(p => p.id === this.selectedProject.value) || null;
    }


	// function that generates a sharable link for the project
	generateShareLink() {
		const project = this.getSelectedProject();
		if (!project) return null;
		
		// get data for project
		let data = {
			projectName: project.name,
			...project.data
		};

		// compress data
		data = this.transformData(data);

		const dataStr = JSON2.stringify(data);
		const dataURLData = encodeURIComponent(Util.compressToUrlSafe(dataStr));

		// get the current project base URL and append the project data
		const baseURL = window.location.href.split('?')[0];
		const dataURL = `${baseURL}?projectData=${dataURLData}`;

		return dataURL;		
	}


	/**
	 * Loads project from URL
	 * 
	 * @param {String} dataURL - the dataURL to load
	 * @returns 
	 */
	async loadShareLink(dataURL) {

		// before we load, check if we've already loaded this project
		const project = this.projects.value.find(p => p.fromURL === dataURL);
		if (project) {
			this.loadProject(project);
			return;
		}
		
		// decompress data after decode from URL
		const dataStr = decodeURIComponent(Util.decompressFromUrlSafe(dataURL));

		// un-transform data
		const data = this.unTransformData(dataStr);

		// create a new project
		const newProject = {
			id: crypto.randomUUID(),
			name: data.projectName,
			lastEdited: Date.now(),
			data,
			fromURL: dataURL
		};

		// create & load the project
		this.projects.value = [...this.projects.value, newProject];
		await this._saveProjectsToStorage();
		this.loadProject(newProject.id);

		// select the project
		this.selectedProject.value = newProject.id;
	}


	/**
	 * Compressed project data to save space
	 * 
	 * @param {Object} data - project data to transform	
	 * @returns {Object} - transformed project data
	 */
	transformData(data) {

		// Mapping for type conversion
		const typeMap = {
			squareSM: 0,
			squareMD: 1,
			squareLG: 2,
			triangleSM: 3,
			triangleMD: 4,
			triangleLG: 5,
			parallelogramA: 6,
			parallelogramB: 7,
			trapezoid: 8
		};
	
		// Helper function to round to 3 decimal places
		const round3 = (num) => Math.round(num * 1000) / 1000;
		
		// Map colors to indices
		const colorMap = {};
		let colorIndex = 0;
		
		// Transform pieces array (first pass to collect unique colors)
		let pieces = data.pieces.map(piece => {
			const roundedX = round3(piece.x);
			const roundedY = round3(piece.y);
			const roundedR = Math.round(piece.rotation / 45); // Normalize rotation to multiple of 45
			
			// Assign color index if not already assigned
			if (!(piece.color in colorMap)) {
				colorMap[piece.color] = colorIndex++;
			}
			
			return {
				t: typeMap[piece.type],
				x: roundedX,
				y: roundedY,
				r: roundedR,
				c: colorMap[piece.color]
			};
		});
		
		// Create the transformed object
		return {
			pn: data.projectName,
			x: data.boardX,
			y: data.boardY,
			p: pieces,
			cm: colorMap
		};
	}


	/**
	 * Decodes the compressed project data
	 * 
	 * @param {String} dataStr - the compressed project data to untransform
	 * @returns {Object} - the untransformed project data
	 */
	unTransformData(dataStr) {

		// custom JSON parser to handle unquoted keys
		const data = JSON2.parse(dataStr);

		// Mapping for type conversion
		const typeMap = {
			0: 'squareSM',
			1: 'squareMD',
			2: 'squareLG',
			3: 'triangleSM',
			4: 'triangleMD',
			5: 'triangleLG',
			6: 'parallelogramA',
			7: 'parallelogramB',
			8: 'trapezoid',
		};

		// the map of indexes to colors
		const colorMap = {};
		for (const [color, index] of Object.entries(data.cm)) 
			colorMap[index] = color;
		
		// build new object with renamed properties
		return {
			projectName: data.pn,
			boardX: data.x,
			boardY: data.y,
			pieces: data.p.map(piece => ({
				id: crypto.randomUUID(),
				type: typeMap[piece.t],
				x: piece.x,
				y: piece.y,
				rotation: piece.r * 45,
				color: colorMap[piece.c]
			}))
		};

	}


}
