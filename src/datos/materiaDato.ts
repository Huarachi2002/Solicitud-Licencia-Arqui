import db from '../config/db';

class DMateria {
    async getAll() {
        return await db.materia.findMany();
    }
    async create(data: { name: string, initials: string }) {
        return await db.materia.create({
            data
        });
    }
    async update(id: number, data: Partial<{ name: string, initials: string }>) {
        return await db.materia.update({
            where: { id },
            data
        });
    }
    async delete(id: number) {
        return await db.materia.delete({
            where: { id }
        });
    }
    async getMateriaByGrupo(id_grupo: number) {
        return await db.materia.findMany({
            where: { grupos: { some: { id: id_grupo } } }
        });
    }
}

export default new DMateria();