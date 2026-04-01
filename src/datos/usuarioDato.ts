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

    async login(data: { num_register: string, password: string }) {
        return await prisma.usuario.findFirst({
            where: {
                num_register: data.num_register,
                password: data.password
            },
            include: {
                rol: true
            }
        });
    }
}

export default new DUsuario();