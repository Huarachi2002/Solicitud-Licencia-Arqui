import express from 'express';
import PUsuario from '../presentacion/usuarioPresentacion';
const router = express.Router();

router.post('/login', PUsuario.login);
router.post('/student', PUsuario.registerStudent);
router.post('/teacher', PUsuario.registerTeacher);
router.get('/grupos', PUsuario.getAllGrupo);
router.get('/grupos/:id_grupo/materia', PUsuario.getMateriaByGrupo);

export default router;