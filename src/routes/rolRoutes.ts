import express from 'express';
import rolPresentacion from '../presentacion/rolPresentacion';

const router = express.Router();

router.get('/', (req, res) => rolPresentacion.getAll(req, res));

router.get('/:name', (req, res) => rolPresentacion.getByName(req, res));

router.post('/', (req, res) => rolPresentacion.create(req, res));

router.put('/:id', (req, res) => rolPresentacion.update(req, res));

router.delete('/:id', (req, res) => rolPresentacion.delete(req, res));

export default router;
