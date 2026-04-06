import db from '../config/db';

class DHorario {
    async getAll() {
        return await db.horario.findMany();
    }
    async create(data: { day_of_week: string, start_time: string, end_time: string }) {
        return await db.horario.create({
            data
        });
    }
    async update(id: number, data: Partial<{ day_of_week: string, start_time: string, end_time: string }>) {
        return await db.horario.update({
            where: { id },
            data
        });
    }
    async delete(id: number) {
        return await db.horario.delete({
            where: { id }
        });
    }
}

export default new DHorario();