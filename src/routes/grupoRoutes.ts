import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/grupo', (req: Request, res: Response) => {
    res.json({ message: 'Lista de grupos' });
});

router.get('/grupo/:id', (req: Request, res: Response) => {
    res.json({ message: 'Grupo por ID' });
});

router.post('/grupo', (req: Request, res: Response) => {
    res.json({ message: 'Crear grupo' });
});

router.put('/grupo/:id', (req: Request, res: Response) => {
    res.json({ message: 'Actualizar grupo' });
});

router.delete('/grupo/:id', (req: Request, res: Response) => {
    res.json({ message: 'Eliminar grupo' });
});

export default router;