import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/materia', (req: Request, res: Response) => {
    res.json({ message: 'Lista de materia' });
});

router.get('/materia/:id', (req: Request, res: Response) => {
    res.json({ message: 'Materia por ID' });
});

router.post('/materia', (req: Request, res: Response) => {
    res.json({ message: 'Crear materia' });
});

router.put('/materia/:id', (req: Request, res: Response) => {
    res.json({ message: 'Actualizar materia' });
});

router.delete('/materia/:id', (req: Request, res: Response) => {
    res.json({ message: 'Eliminar materia' });
});

export default router;
