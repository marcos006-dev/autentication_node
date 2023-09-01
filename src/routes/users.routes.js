
import express from "express";
import userController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/JwtVerify.js";

// create router
const router = express.Router();
// create routes
router.get('/users',verifyToken, userController.getUsers);
router.post('/user',verifyToken, userController.postUser);
router.put('/user/:id',verifyToken, userController.putUser);
router.delete('/user/:id',verifyToken, userController.deleteUser);

export default router;