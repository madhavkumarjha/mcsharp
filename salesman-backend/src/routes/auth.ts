import express from 'express';
import { register, login } from '../controllers/auth';

const router = express.Router();

// Correct route definitions
router.post('/register', (req, res) => register(req, res));
router.post('/login', (req, res) => login(req, res));



export default router;