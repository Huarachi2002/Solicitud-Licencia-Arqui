import { Request, Response } from 'express';
import UsuarioNegocio from '../negocios/usuarioNegocio';
import RolNegocio from '../negocios/rolNegocio';

class UsuarioPresentacion {
    async registerStudent(req: Request, res: Response) {
        try {
            const { name_full, mail, cellphone, num_register, password } = req.body;
            const id_rol = await this.getByName('ESTUDIANTE');
            if (!id_rol) {
                return res.status(404).json({ success: false, message: 'Rol no encontrado' });
            }
            await UsuarioNegocio.registerStudent({ id_rol, name_full, mail, cellphone, num_register, password });
            res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getByName(name_full: string): Promise<number | undefined> {
        try {
            const result = await RolNegocio.getByName(name_full.toString());
            return result?.id;
        } catch {
            return undefined;
        }
    }
}

export default new UsuarioPresentacion();