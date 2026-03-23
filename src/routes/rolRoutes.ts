import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/rol', (req: Request, res: Response) => {
    res.json({ message: 'Lista de rols' });
});

router.get('/rol/:id', (req: Request, res: Response) => {
    res.json({ message: 'rol por ID' });
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
