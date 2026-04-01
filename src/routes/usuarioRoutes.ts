import express from 'express';
import PUsuario from '../presentacion/usuarioPresentacion';
const router = express.Router();

router.post('/login', PUsuario.login);
router.post('/student', PUsuario.registerStudent);
router.post('/teacher', PUsuario.registerTeacher);

export default router;