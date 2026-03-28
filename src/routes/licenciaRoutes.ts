import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/licencia', (req: Request, res: Response) => {
    res.json({ message: 'Lista de licencias' });
});

export default router;
