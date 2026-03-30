import express from 'express';
import PGrupo from '../presentacion/grupoPresentacion';
const router = express.Router();

router.get('/', PGrupo.getAll);

router.post('/', PGrupo.create);

router.put('/:id', PGrupo.update);

router.delete('/:id', PGrupo.delete);

router.get('/materias', PGrupo.getAllMaterias);

router.get('/horarios', PGrupo.getAllHorarios);

export default router;