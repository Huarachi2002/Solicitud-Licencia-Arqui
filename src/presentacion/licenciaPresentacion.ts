import { Request, Response } from "express";
import NLicencia from "../negocios/licenciaNegocio";
import NMateria from "../negocios/materiaNegocio";
import NGrupo from "../negocios/grupoNegocio";
import NHorario from "../negocios/horarioNegocio";

class PLicencia {
    private materias: string[];
    private grupos: string[];
    private id_usuario_solicitante: number;

    constructor() {
        this.materias = [];
        this.grupos = [];
        this.id_usuario_solicitante = 0;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const licencias = await NLicencia.getAll();
            return res.status(200).json(licencias);
        } catch (error: any) {
            console.log("Error al obtener licencias: ", error.message);
            return res.status(500).json(error.message);
        }
    }

    solicitarLicenciaEstudiante = async (req: Request, res: Response) => {
        try {
            const { id_usuario_solicitante, id_grupo, start_date, end_date, reason, url_attached_1 } = req.body;
            await NLicencia.solicitarLicenciaEstudiante({ id_usuario_solicitante, id_grupo, start_date, end_date, reason, url_attached_1 });
            return res.status(201).json({ message: "Licencia creada correctamente" });
        } catch (error: any) {
            console.log("Error al solicitar licencia: ", error.message);
            return res.status(500).json(error.message);
        }
    }

    aprobarLicencia = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { id_usuario_aprobador } = req.body;
            await NLicencia.aprobarLicencia(Number(id), id_usuario_aprobador);
            return res.status(200).json({ message: "Licencia aprobada correctamente" });
        } catch (error: any) {
            console.log("Error al aprobar licencia: ", error.message);
            return res.status(500).json(error.message);
        }
    }

    rechazarLicencia = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { id_usuario_rechazo } = req.body;
            await NLicencia.rechazar(Number(id), id_usuario_rechazo);
            return res.status(200).json({ message: "Licencia rechazada correctamente" });
        } catch (error: any) {
            console.log("Error al rechazar licencia: ", error.message);
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

    getGrupoByMateria = async (req: Request, res: Response) => {
        try {
            const { id_materia } = req.params;
            const grupos = await NGrupo.getGrupoByMateria(Number(id_materia));
            return res.status(200).json(grupos);
        } catch (error: any) {
            console.log("Error al obtener grupos: ", error.message);
            return res.status(500).json(error.message);
        }
    }
}

export default new PLicencia();