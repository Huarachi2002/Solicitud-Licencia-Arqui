import { Request, Response } from 'express';
import NUsuario from '../negocios/usuarioNegocio';
import NRol from '../negocios/rolNegocio';
import NGrupo from '../negocios/grupoNegocio';
import NMateria from '../negocios/materiaNegocio';

class PUsuario {

    private name_full: string;
    private mail: string;
    private cellphone: string;
    private num_register: string;
    private password: string;
    private grupos: string[];
    private materias: string[];

    constructor() {
        this.name_full = '';
        this.mail = '';
        this.cellphone = '';
        this.num_register = '';
        this.password = '';
        this.grupos = [];
        this.materias = [];
    }

    messagePop = (req: Request, res: Response) => {
        const { message, type } = req.query;
        res.render('message-pop', {
            message: message || '',
            type: type || 'info'
        });
    }

    registerStudent = async (req: Request, res: Response) => {
        try {
            const { name_full, mail, cellphone, num_register, password, ids_grupo } = req.body;
            const id_rol = await this.getByName('ESTUDIANTE');
            if (!id_rol) {
                return res.status(404).json({ success: false, message: 'Rol no encontrado' });
            }
            await NUsuario.registerStudent({ id_rol, name_full, mail, cellphone, num_register, password, ids_grupo });
            res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
        } catch (error: any) {
            console.log("Error al registrar usuario: ", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    registerTeacher = async (req: Request, res: Response) => {
        try {
            const { name_full, mail, cellphone, num_register, password, ids_grupo } = req.body;
            const id_rol = await this.getByName('DOCENTE');
            if (!id_rol) {
                return res.status(404).json({ success: false, message: 'Rol no encontrado' });
            }
            await NUsuario.registerTeacher({ id_rol, name_full, mail, cellphone, num_register, password, ids_grupo });
            res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
        } catch (error: any) {
            console.log("Error al registrar usuario: ", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    getByName = async (name_full: string): Promise<number | undefined> => {
        try {
            const result = await NRol.getByName(name_full.toString());
            return result?.id;
        } catch {
            return undefined;
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { num_register, password } = req.body;
            const usuario = await NUsuario.login({ num_register, password });
            if (!usuario) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado o contraseña incorrecta' });
            }
            res.status(200).json({
                success: true,
                message: 'Usuario logueado exitosamente',
                data: {
                    id: usuario.id,
                    name_full: usuario.name_full,
                    num_register: usuario.num_register,
                    mail: usuario.mail,
                    id_rol: usuario.id_rol,
                    rol: usuario.rol?.description ?? ''
                }
            });
        } catch (error: any) {
            console.log("Error al loguear usuario: ", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    getAllGrupo = async (req: Request, res: Response) => {
        try {
            const result = await NGrupo.getAll();
            res.status(200).json({ success: true, message: 'Grupo obtenido exitosamente', data: result });
        } catch (error: any) {
            console.log("Error al obtener grupo: ", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    getMateriaByGrupo = async (req: Request, res: Response) => {
        try {
            const { id_grupo } = req.params;
            const result = await NMateria.getMateriaByGrupo(Number(id_grupo));
            res.status(200).json({ success: true, message: 'Materia obtenida exitosamente', data: result });
        } catch (error: any) {
            console.log("Error al obtener materia: ", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default new PUsuario();