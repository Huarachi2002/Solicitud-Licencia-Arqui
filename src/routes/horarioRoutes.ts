import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/horario', (req: Request, res: Response) => {
    res.json({ message: 'Lista de horarios' });
});

router.post('/horario', (req: Request, res: Response) => {
    res.json({ message: 'Crear horario' });
});

router.put('/horario/:id', (req: Request, res: Response) => {
    res.json({ message: 'Actualizar horario' });
});

router.delete('/horario/:id', (req: Request, res: Response) => {
    res.json({ message: 'Eliminar horario' });
});

export default router;