import { Request, Response } from 'express';
import NUsuario from '../negocios/usuarioNegocio';
import NRol from '../negocios/rolNegocio';

class PUsuario {

    private name_full: string;
    private mail: string;
    private cellphone: string;
    private num_register: string;
    private password: string;

    constructor() {
        this.name_full = '';
        this.mail = '';
        this.cellphone = '';
        this.num_register = '';
        this.password = '';
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
            const { name_full, mail, cellphone, num_register, password } = req.body;
            const id_rol = await this.getByName('ESTUDIANTE');
            if (!id_rol) {
                return res.status(404).json({ success: false, message: 'Rol no encontrado' });
            }
            await NUsuario.registerStudent({ id_rol, name_full, mail, cellphone, num_register, password });
            res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
        } catch (error: any) {
            console.log("Error al registrar usuario: ", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    registerTeacher = async (req: Request, res: Response) => {
        try {
            const { name_full, mail, cellphone, num_register, password } = req.body;
            const id_rol = await this.getByName('DOCENTE');
            if (!id_rol) {
                return res.status(404).json({ success: false, message: 'Rol no encontrado' });
            }
            await NUsuario.registerTeacher({ id_rol, name_full, mail, cellphone, num_register, password });
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
}

export default new PUsuario();