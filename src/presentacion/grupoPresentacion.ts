import NGrupo from '../negocios/grupoNegocio';
import NMateria from '../negocios/materiaNegocio';
import NHorario from '../negocios/horarioNegocio';
import { Request, Response } from 'express';

class PGrupo {

    private name: string;
    private materias: string[];
    private horarios: string[];

    constructor() {
        this.name = '';
        this.materias = [];
        this.horarios = [];
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const grupos = await NGrupo.getAll();
            return res.status(200).json(grupos);
        } catch (error: any) {
            console.log("Error al obtener grupos: ", error.message);
            return res.status(500).json(error.message);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, materia, horarios } = req.body;
            const grupo = await NGrupo.create({
                name,
                id_materia: materia,
                ids_horario: horarios || []
            });
            return res.status(201).json(grupo);
        } catch (error: any) {
            console.log("Error al crear grupo: ", error.message);
            return res.status(500).json(error.message);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id as string);
            const { name, materia, horarios } = req.body;
            const grupo = await NGrupo.update(id, {
                name,
                id_materia: materia,
                ids_horario: horarios || []
            });
            return res.status(200).json(grupo);
        } catch (error: any) {
            console.log("Error al actualizar grupo: ", error.message);
            return res.status(500).json(error.message);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id as string);
            const grupo = await NGrupo.delete(id);
            return res.status(200).json(grupo);
        } catch (error: any) {
            console.log("Error al eliminar grupo: ", error.message);
            return res.status(500).json(error.message);
        }
    }

    getAllMaterias = async (req: Request, res: Response) => {
        try {
            const materias = await NMateria.getAll();
            return res.status(200).json(materias);
        } catch (error: any) {
            console.log("Error al obtener materias: ", error.message);
            return res.status(500).json(error.message);
        }
    }

    getAllHorarios = async (req: Request, res: Response) => {
        try {
            const horarios = await NHorario.getAll();
            return res.status(200).json(horarios);
        } catch (error: any) {
            console.log("Error al obtener horarios: ", error.message);
            return res.status(500).json(error.message);
        }
    }
}

export default new PGrupo();