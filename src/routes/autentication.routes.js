import express from 'express';
import auntenticateController from '../controllers/autenticate.controller.js';

const router = express.Router();
router.post('/login', auntenticateController.login);

export default router;
