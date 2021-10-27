import express from 'express';

import { getAllProjects, getSeedProjects, getProject, createProject, updateProject, deleteProject} from '../controller/projects.js'
const router = express.Router();

router.get('/', getAllProjects);
router.get('/seed',getSeedProjects);
router.get('/:id', getProject);
router.post('/add', createProject);
router.patch('/edit/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;