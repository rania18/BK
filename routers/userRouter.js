import express from 'express';

import { getSeedUsers, signin, listUsers, editUser, deleteUser, signup, getUser, editProfile, addUser } from '../controller/users.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/seed', auth, getSeedUsers);
router.get("/", listUsers);
router.get("/profile/:id", getUser);

router.post('/signin', signin);
router.post('/addUser', addUser);
router.post("/signup", signup);
router.patch('/:id', editUser);
router.patch("/profile/:id",  editProfile);

router.delete("/:id", auth, deleteUser);

export default router;