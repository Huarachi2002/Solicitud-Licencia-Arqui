import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/rol', (req: Request, res: Response) => {
    res.json({ message: 'Lista de rols' });
});

router.get('/rol/:name', (req: Request, res: Response) => {
    res.json({ message: 'rol por nombre' });
});

router.post('/rol', (req: Request, res: Response) => {
    res.json({ message: 'Crear rol' });
});

router.put('/rol/:id', (req: Request, res: Response) => {
    res.json({ message: 'Actualizar rol' });
});

router.delete('/rol/:id', (req: Request, res: Response) => {
    res.json({ message: 'Eliminar rol' });
});

export default router;
