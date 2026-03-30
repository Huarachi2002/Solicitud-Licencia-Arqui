import prisma from '../config/db';

class DGrupo {
    async getAll() {
        return await prisma.grupo.findMany({
            include: {
                materias: {
                    include: { materia: true }
                },
                horario: {
                    include: { horario: true }
                }
            }
        });
    }

    async create(data: { name: string, ids_materia: number[], ids_horario: number[] }) {
        const { name, ids_materia, ids_horario } = data;
        return await prisma.grupo.create({
            data: {
                name: name,
                materias: {
                    create: ids_materia.map((id_materia: number) => ({
                        id_materia: id_materia
                    }))
                },
                horario: {
                    create: ids_horario.map((id_horario: number) => ({
                        id_horario: id_horario
                    }))
                }
            }
        });
    }

    async update(id: number, data: Partial<{ name: string, ids_materia: number[], ids_horario: number[] }>) {
        const { name, ids_materia, ids_horario } = data;
        return await prisma.grupo.update({
            where: { id },
            data: {
                name: name,
                materias: ids_materia ? {
                    deleteMany: {},
                    create: ids_materia.map((id_materia: number) => ({
                        id_materia: id_materia
                    }))
                } : undefined,
                horario: ids_horario ? {
                    deleteMany: {},
                    create: ids_horario.map((id_horario: number) => ({
                        id_horario: id_horario
                    }))
                } : undefined
            }
        });
    }
    async delete(id: number) {
        return await prisma.grupo.delete({
            where: { id }
        });
    }
}

export default new DGrupo();