import DHorario from "../datos/horarioDato";

class NHorario {
    async getAll() {
        return await DHorario.getAll();
    }
    async create(data: { day_of_week: number, start_time: string, end_time: string }) {
        return await DHorario.create(data);
    }
    async update(id: number, data: Partial<{ day_of_week: number, start_time: string, end_time: string }>) {
        return await DHorario.update(id, data);
    }
    async delete(id: number) {
        return await DHorario.delete(id);
    }
}

export default new NHorario();