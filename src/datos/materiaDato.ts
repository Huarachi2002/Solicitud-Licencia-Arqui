import prisma from '../config/db';

class DMateria {
    async getAll() {
        return await prisma.materia.findMany();
    }
    async create(data: { name: string, initials: string }) {
        return await prisma.materia.create({
            data
        });
    }
    async update(id: number, data: Partial<{ name: string, initials: string }>) {
        return await prisma.materia.update({
            where: { id },
            data
        });
    }
    async delete(id: number) {
        return await prisma.materia.delete({
            where: { id }
        });
    }
}

export default new DMateria();