import DMateria from "../datos/materiaDato";

class NMateria {
    async getAll() {
        return await DMateria.getAll();
    }
    async create(data: { name: string, initials: string }) {
        return await DMateria.create(data);
    }
    async update(id: number, data: Partial<{ name: string, initials: string }>) {
        return await DMateria.update(id, data);
    }
    async delete(id: number) {
        return await DMateria.delete(id);
    }

    async getMateriaByGrupo(id_grupo: number) {
        return await DMateria.getMateriaByGrupo(id_grupo);
    }
}

export default new NMateria();