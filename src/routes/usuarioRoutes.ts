import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/usuario', (req: Request, res: Response) => {
    res.json({ message: 'Lista de usuario' });
});

router.get('/usuario/:id', (req: Request, res: Response) => {
    res.json({ message: 'Usuario por ID' });
});

router.post('/usuario', (req: Request, res: Response) => {
    res.json({ message: 'Crear usuario' });
});

router.put('/usuario/:id', (req: Request, res: Response) => {
    res.json({ message: 'Actualizar usuario' });
});

router.delete('/usuario/:id', (req: Request, res: Response) => {
    res.json({ message: 'Eliminar usuario' });
});

export default router;