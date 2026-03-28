import { Request, Response } from "express";
import rolNegocio from "../negocios/rolNegocio";

class RolPresentacion {
    async getAll(req: Request, res: Response) {
        const roles = await rolNegocio.getAll();
        return res.status(200).json(roles);
    }

    async getByName(req: Request, res: Response) {
        const { name } = req.params;
        const rol = await rolNegocio.getByName(name.toString());
        if (!rol) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        return res.status(200).json(rol);
    }

    async create(req: Request, res: Response) {
        const { description } = req.body;
        await rolNegocio.create({ description });
        return res.status(201).json({ message: "Rol creado correctamente" });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { description } = req.body;
        await rolNegocio.update(Number(id), { description });
        return res.status(200).json({ message: "Rol actualizado correctamente" });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await rolNegocio.delete(Number(id));
        return res.status(200).json({ message: "Rol eliminado correctamente" });
    }
}

export default new RolPresentacion();