import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/usuario/student', (req: Request, res: Response) => {
    res.json({ message: 'Crear usuario estudiante' });
});

export default router;