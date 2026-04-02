import prisma from '../config/db';

class DGrupo {
    async getAll() {
        return await prisma.grupo.findMany({
            include: {
                materia: true,
                horario: {
                    include: { horario: true }
                }
            }
        });
    }

    async create(data: { name: string, id_materia: number, ids_horario: number[] }) {
        const { name, id_materia, ids_horario } = data;
        return await prisma.grupo.create({
            data: {
                name,
                id_materia,             // FK directo en tabla Grupo
                horario: {
                    create: ids_horario.map((id_horario: number) => ({
                        id_horario
                    }))
                }
            }
        });
    }

    async update(id: number, data: Partial<{ name: string, id_materia: number, ids_horario: number[] }>) {
        const { name, id_materia, ids_horario } = data;
        return await prisma.grupo.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(id_materia !== undefined && { id_materia }),
                ...(ids_horario !== undefined && {
                    horario: {
                        deleteMany: {},
                        create: ids_horario.map((id_horario: number) => ({
                            id_horario
                        }))
                    }
                })
            }
        });
    }

    async delete(id: number) {
        await prisma.grupo_Horario.deleteMany({
            where: { id_grupo: id }
        });
        return await prisma.grupo.delete({
            where: { id }
        });
    }

    async getGrupoByMateria(id_materia: number) {
        return await prisma.grupo.findMany({
            where: { id_materia },
            include: {
                materia: true,
                horario: {
                    include: { horario: true }
                }
            }
        });
    }
}

export default new DGrupo();
