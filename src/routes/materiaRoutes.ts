import express from 'express';
import PMateria from '../presentacion/materiaPresentacion';
const router = express.Router();

router.get('/', PMateria.getAll);
router.post('/', PMateria.create);
router.put('/:id', PMateria.update);
router.delete('/:id', PMateria.delete);

export default router;
