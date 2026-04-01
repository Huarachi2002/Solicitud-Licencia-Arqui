import DGrupo from "../datos/grupoDato";

class NGrupo {
    async getAll() {
        return await DGrupo.getAll();
    }
    async create(data: { name: string, ids_materia: number[], ids_horario: number[] }) {
        return await DGrupo.create(data);
    }
    async update(id: number, data: Partial<{ name: string, ids_materia: number[], ids_horario: number[] }>) {
        return await DGrupo.update(id, data);
    }
    async delete(id: number) {
        return await DGrupo.delete(id);
    }

    async getGrupoByMateria(id_materia: number) {
        return await DGrupo.getGrupoByMateria(id_materia);
    }
}

export default new NGrupo();