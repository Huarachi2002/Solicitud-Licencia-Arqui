import { Request, Response } from "express";
import NLicencia from "../negocios/licenciaNegocio";
import NMateria from "../negocios/materiaNegocio";
import NGrupo from "../negocios/grupoNegocio";
import NUsuario from "../negocios/usuarioNegocio";

class PLicencia {
    private materias: [];
    private grupos: [];
    private id_usuario_solicitante: number;
    private id_usuario: number;
    private id: number;
    private start_date: string;
    private end_date: string;

    constructor() {
        this.materias = [];
        this.grupos = [];
        this.id_usuario_solicitante = 0;
        this.id_usuario = 0;
        this.id = 0;
        this.start_date = '';
        this.end_date = '';
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

    getByStudentId = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log("ID de estudiante: ", id);
            const licencia = await NLicencia.getByStudentId(Number(id));
            console.log("Licencia obtenida: ", licencia);
            return res.status(200).json(licencia);
        } catch (error: any) {
            console.log("Error al obtener licencia: ", error.message);
            return res.status(500).json(error.message);
        }
    }

    solicitarLicenciaEstudiante = async (req: Request, res: Response) => {
        try {
            const { id_usuario_solicitante, ids_grupo, start_date, end_date, reason, url_attached_1 } = req.body;

            if (!Array.isArray(ids_grupo) || ids_grupo.length === 0) {
                return res.status(400).json({ message: 'Debe seleccionar al menos un grupo' });
            }

            await NLicencia.solicitarLicenciaEstudiante({ id_usuario_solicitante, ids_grupo, start_date, end_date, reason, url_attached_1 });
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

    contactarDocente = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const licencia = await NLicencia.getById(Number(id));
            if (!licencia) {
                return res.status(404).json({ success: false, message: 'Licencia no encontrada' });
            }

            const estudiante = licencia.usuario_solicitante;
            const nombreEstudiante = estudiante.name_full;
            const registroEstudiante = estudiante.num_register;

            const docentes = await NUsuario.getDocentesByLicencia(Number(id));
            if (!docentes || docentes.length === 0) {
                return res.status(404).json({ success: false, message: 'No se encontraron docentes para esta licencia' });
            }

            const result = docentes.map(docente => {
                const gruposText = docente.grupos
                    .map(g => `grupo ${g.grupo.name} (${g.grupo.materia.name})`)
                    .join(', ');

                const mensaje =
                    `Estimado/a ${docente.name_full}, le informamos que la solicitud de licencia ` +
                    `del/la estudiante ${nombreEstudiante} (Nro. de registro: ${registroEstudiante}) ` +
                    `ha sido APROBADA. Los grupos afectados bajo su responsabilidad son: ${gruposText}. ` +
                    `Por favor tome nota de esta novedad. — Sistema de Licencias UAGRM`;

                const telefono = docente.cellphone.replace(/\D/g, '');
                const whatsapp_url = `https://wa.me/+591${telefono}?text=${encodeURIComponent(mensaje)}`;
                return {
                    id: docente.id,
                    name_full: docente.name_full,
                    mail: docente.mail,
                    cellphone: docente.cellphone,
                    grupos: docente.grupos,
                    whatsapp_url
                };
            });

            return res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            console.log("Error al contactar docente: ", error.message);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default new PLicencia();