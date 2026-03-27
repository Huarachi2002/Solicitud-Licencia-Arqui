import prisma from '../config/db';

class GrupoDato {
    async getAll() {
        return await prisma.grupo.findMany();
    }

    async create(data: { name: string, id_materia: number, id_horario: number }) {
        return await prisma.grupo.create({
            data: {
                name: data.name,
                materias: {
                    create: {
                        id_materia: data.id_materia
                    }
                },
                horario: {
                    create: {
                        id_horario: data.id_horario
                    }
                }
            }
        });
    }
    async update(id: number, data: Partial<{ name: string, id_materia: number }>) {
        return await prisma.grupo.update({
            where: { id },
            data
        });
    }
    async delete(id: number) {
        return await prisma.grupo.delete({
            where: { id }
        });
    }
}

export default new GrupoDato();