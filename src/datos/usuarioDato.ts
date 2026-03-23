import prisma from '../config/db';

class UsuarioDato {
    async getAll() {
        return await prisma.usuario.findMany();
    }

    async getById(id: number) {
        return await prisma.usuario.findUnique({
            where: { id }
        });
    }

    async findByEmail(mail: string) {
        return await prisma.usuario.findUnique({
            where: { mail }
        });
    }
    async create(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }) {
        return await prisma.usuario.create({
            data
        });
    }

    async update(id: number, data: Partial<{ id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }>) {
        return await prisma.usuario.update({
            where: { id },
            data
        });
    }

    async delete(id: number) {
        return await prisma.usuario.delete({
            where: { id }
        });
    }
}

export default new UsuarioDato();