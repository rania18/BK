import express from 'express';
import Project from '../models/projectModel.js';
import data from '../data.js';

const router = express.Router();


// GET ALL PROJECTS
export const getAllProjects = async (req, res) => {
    const projects = await Project.find({});
    //     res.send(projects);
};

// SEED PROJECTS FROM DATA.JS
export const getSeedProjects = async (req, res) => {
    await Project.deleteMany({});
    const createdProjects = await Project.insertMany(data.Projects);
    res.send({ createdProjects });
};

// GET PROJECT BY ID
export const getProject = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
       /*  const category = await Category.findById(project.category);
        project.category = category */
        res.send(project);
    } else {
        res.status(404).send({message: 'Project Not Found'});
    }
};

// Add Project
export const createProject = async (req, res) => {
    const newProject = req.body
    const project = new Project({ ...newProject });
    // SAVE PROJECT
    try {
        const result = await project.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(501).send(error);
    }
};

// Update Projct
export const updateProject = async (req, res) => {

    const { id } = req.params;
    const { title, image, desc} = req.body;
    const updatedProject = {title, image, desc, _id: id };

    try {
        await Project.findByIdAndUpdate(id, updatedProject, { new: true });
        res.json(updatedProject);
    } catch (error) {
        res.status(403).send('Project Not Update');
    }

}

// DELETE PROJECT
export const deleteProject = async (req, res) => {

    const { id } = req.params;

    try {
        await Project.findByIdAndRemove( id )
        res.send('Project Deleted');
    } catch (error) {
        res.status(403).send('Project Not Deleted');
    }

};

export default router;