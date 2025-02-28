/*
	ProjectManager.js
	-----------------

	This file will provide a regular OOP class for managing projects,
	using localStorage to save and load projects.
*/

// libs
import { signal, useSignal } from "@preact/signals-react";
import { TangramGame } from './TangramGame';

// main class export
export default class ProjectManager {

	/**
	 * Constructor
	 * 
	 * @param {TangramGame} game - reference to the game state
	 * @param {Function} onLoad - callback when a project is loaded
	 */
    constructor(game, onLoad) {

		console.log('construcccc');
		
		// save ref to our game
        this.game = game;

		// callback when a project is loaded
        this.onLoad = onLoad;

		// our list of projects & the selected project
        this.projects = signal([]);
        this.selectedProject = signal(null);

		// load projects from storage
        this._loadProjectsFromStorage();
    }

	/**
	 * Save the projects to localStorage
	 */
	_saveProjectsToStorage() {
        this.projects.value.sort((a, b) => b.lastEdited - a.lastEdited);
        localStorage.setItem('projects', JSON.stringify(this.projects.value));
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
    createNewProject(name = "Untitled Project") {
        const newProject = {
            id: crypto.randomUUID(),
            name,
            lastEdited: Date.now(),
            data: {},
        };
        this.projects.value = [...this.projects.value, newProject];
        this._saveProjectsToStorage();
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

}
