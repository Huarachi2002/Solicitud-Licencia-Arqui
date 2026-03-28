import express, { Request, Response } from 'express';
import usuarioPresentacion from '../presentacion/usuarioPresentacion';
const router = express.Router();

router.post('/usuario/student', usuarioPresentacion.registerStudent);

export default router;