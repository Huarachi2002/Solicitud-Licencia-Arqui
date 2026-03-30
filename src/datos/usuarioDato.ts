import prisma from '../config/db';

class DUsuario {
    async registerStudent(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }) {
        return await prisma.usuario.create({
            data
        });
    }

    async registerTeacher(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }) {
        return await prisma.usuario.create({
            data
        });
    }
}

export default new DUsuario();