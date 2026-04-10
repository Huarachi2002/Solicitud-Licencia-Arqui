import db from '../config/db';

class DGrupo {
    async getAll() {
        return await db.grupo.findMany({
            include: {
                materia: true,
                horario: {
                    include: { horario: true }
                }
            }
        });
    }

    async create(data: { name: string, id_materia: number }) {
        const { name, id_materia } = data;
        return await db.grupo.create({
            data: {
                name,
                id_materia,             // FK directo en tabla Grupo
            }
        });
    }

    async update(id: number, data: Partial<{ name: string, id_materia: number }>) {
        const { name, id_materia } = data;
        return await db.grupo.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(id_materia !== undefined && { id_materia }),
            }
        });
    }

    async delete(id: number) {
        await db.grupo_Horario.deleteMany({
            where: { id_grupo: id }
        });
        return await db.grupo.delete({
            where: { id }
        });
    }

    async getGrupoByMateria(id_materia: number) {
        return await db.grupo.findMany({
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
