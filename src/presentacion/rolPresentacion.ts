import { Request, Response } from "express";
import NRol from "../negocios/rolNegocio";

class PRol {

    private description: string;

    constructor() {
        this.description = '';
    }

    messagePop = (req: Request, res: Response) => {
        const { message, type } = req.query;
        res.render('message-pop', {
            message: message || '',
            type: type || 'info'
        });
    }

    getAll = async (req: Request, res: Response) => {
        const roles = await NRol.getAll();
        return res.status(200).json(roles);
    }

    getByName = async (req: Request, res: Response) => {
        const { name } = req.params;
        const rol = await NRol.getByName(name.toString());
        if (!rol) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        return res.status(200).json(rol);
    }

    create = async (req: Request, res: Response) => {
        const { description } = req.body;
        await NRol.create({ description });
        return res.status(201).json({ message: "Rol creado correctamente" });
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { description } = req.body;
        await NRol.update(Number(id), { description });
        return res.status(200).json({ message: "Rol actualizado correctamente" });
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        await NRol.delete(Number(id));
        return res.status(200).json({ message: "Rol eliminado correctamente" });
    }
}

export default new PRol();