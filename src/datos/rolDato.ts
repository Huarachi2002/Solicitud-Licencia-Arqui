import prisma from "../config/db";

class RolDato {
    async getAll() {
        return await prisma.rol.findMany();
    }
    async getById(id: number) {
        return await prisma.rol.findUnique({
            where: { id }
        });
    }
    async create(data: { description: string }) {
        return await prisma.rol.create({
            data
        });
    }
    async update(id: number, data: Partial<{ description: string }>) {
        return await prisma.rol.update({
            where: { id },
            data
        });
    }
    async delete(id: number) {
        return await prisma.rol.delete({
            where: { id }
        });
    }
}

export default new RolDato();