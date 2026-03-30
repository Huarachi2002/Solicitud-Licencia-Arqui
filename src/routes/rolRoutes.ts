import express from 'express';
import PRol from '../presentacion/rolPresentacion';

const router = express.Router();

router.get('/', (req, res) => PRol.getAll(req, res));

router.get('/:name', (req, res) => PRol.getByName(req, res));

router.post('/', (req, res) => PRol.create(req, res));

router.put('/:id', (req, res) => PRol.update(req, res));

router.delete('/:id', (req, res) => PRol.delete(req, res));

export default router;
