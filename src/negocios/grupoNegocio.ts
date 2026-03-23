import grupoDato from "../datos/grupoDato";

class GrupoNegocio {
    async getAll() {
        return await grupoDato.getAll();
    }
    async getById(id: number) {
        return await grupoDato.getById(id);
    }
    async create(data: { name: string, id_materia: number, id_horario: number }) {
        return await grupoDato.create(data);
    }
    async update(id: number, data: Partial<{ name: string, id_materia: number }>) {
        return await grupoDato.update(id, data);
    }
    async delete(id: number) {
        return await grupoDato.delete(id);
    }
}

export default new GrupoNegocio();