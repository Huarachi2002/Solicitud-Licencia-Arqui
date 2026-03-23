import horarioDato from "../datos/horarioDato";

class HorarioNegocio {
    async getAll() {
        return await horarioDato.getAll();
    }
    async getById(id: number) {
        return await horarioDato.getById(id);
    }
    async create(data: { day_of_week: number, start_time: string, end_time: string }) {
        return await horarioDato.create(data);
    }
    async update(id: number, data: Partial<{ day_of_week: number, start_time: string, end_time: string }>) {
        return await horarioDato.update(id, data);
    }
    async delete(id: number) {
        return await horarioDato.delete(id);
    }
}

export default new HorarioNegocio();