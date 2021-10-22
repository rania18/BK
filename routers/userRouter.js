import express from 'express';

import { 
    getSeedUsers, 
    signin, 
    listUsers, 
    editUser, 
    deleteUser, 
    signup, 
    getUser, 
    editProfile 
} from '../controller/users.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/seed', auth, getSeedUsers);
router.get("/listUsers", auth, listUsers);
router.get("/profile/:id", getUser);

router.post('/signin', signin);
router.post("/signup", signup);
router.patch("/:id", auth, editUser);
router.patch("/profile/:id",  editProfile);

router.delete("/:id", auth, deleteUser);

export default router;