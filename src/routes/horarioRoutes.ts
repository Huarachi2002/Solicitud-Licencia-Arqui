import express from 'express';
import PHorario from '../presentacion/horarioPresentacion';
const router = express.Router();

router.get('/', PHorario.getAll);
router.post('/', PHorario.create);
router.put('/:id', PHorario.update);
router.delete('/:id', PHorario.delete);

export default router;