import { Request, Response } from "express";
import NMateria from "../negocios/materiaNegocio";

class PMateria {

    private name: string;
    private initials: string;

    constructor() {
        this.name = '';
        this.initials = '';
    }

    messagePop = (req: Request, res: Response) => {
        const { message, type } = req.query;
        res.render('message-pop', {
            message: message || '',
            type: type || 'info'
        });
    }

    getAll = async (req: Request, res: Response) => {
        const materias = await NMateria.getAll();
        return res.status(200).json(materias);
    }

    create = async (req: Request, res: Response) => {
        const { name, initials } = req.body;
        await NMateria.create({ name, initials });
        return res.status(201).json({ message: "Materia creada correctamente" });
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, initials } = req.body;
        await NMateria.update(Number(id), { name, initials });
        return res.status(200).json({ message: "Materia actualizada correctamente" });
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        await NMateria.delete(Number(id));
        return res.status(200).json({ message: "Materia eliminada correctamente" });
    }
}

export default new PMateria();