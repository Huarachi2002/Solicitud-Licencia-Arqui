import prisma from '../config/db';

class DHorario {
    async getAll() {
        return await prisma.horario.findMany();
    }
    async create(data: { day_of_week: string, start_time: string, end_time: string }) {
        return await prisma.horario.create({
            data
        });
    }
    async update(id: number, data: Partial<{ day_of_week: string, start_time: string, end_time: string }>) {
        return await prisma.horario.update({
            where: { id },
            data
        });
    }
    async delete(id: number) {
        return await prisma.horario.delete({
            where: { id }
        });
    }
}

export default new DHorario();