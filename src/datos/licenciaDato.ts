import prisma from '../config/db';

export enum LicenciaEstado {
    PENDIENTE = 0,
    APROBADA = 1,
    RECHAZADA = 2
}

class LicenciaDato {

    async getAll(start_date: Date = new Date(), end_date: Date = new Date().setMonth(new Date().getMonth() + 1) as any) {
        return await prisma.licencia.findMany({
            where: {
                start_date: {
                    gte: start_date
                },
                end_date: {
                    lte: end_date
                }
            }
        });
    }

    async getById(id: number) {
        return await prisma.licencia.findUnique({
            where: { id }
        });
    }
    async getByStudentId(id: number, start_date: Date = new Date(), end_date: Date = new Date().setMonth(new Date().getMonth() + 1) as any) {
        return await prisma.licencia.findMany({
            where: {
                id_usuario_solicitante: id,
                start_date: {
                    gte: start_date
                },
                end_date: {
                    lte: end_date
                }
            }
        });
    }

    async getByStudentIdAndState(id: number, state: number, start_date: Date = new Date(), end_date: Date = new Date().setMonth(new Date().getMonth() + 1) as any) {
        return await prisma.licencia.findMany({
            where: {
                id_usuario_solicitante: id,
                state,
                start_date: {
                    gte: start_date
                },
                end_date: {
                    lte: end_date
                }
            }
        });
    }

    async getByAllByState(state: number, start_date: Date = new Date(), end_date: Date = new Date().setMonth(new Date().getMonth() + 1) as any) {
        return await prisma.licencia.findMany({
            where: {
                state,
                start_date: {
                    gte: start_date
                },
                end_date: {
                    lte: end_date
                }
            }
        });
    }

    async create(data: { id_usuario_solicitante: number, start_date: Date, end_date: Date, reason: string, url_attached_1: string }) {
        return await prisma.licencia.create({
            data: {
                ...data,
                state: LicenciaEstado.PENDIENTE
            }
        });
    }

    async updateState(id: number, state: number, id_usuario_aprobador: number) {
        return await prisma.licencia.update({
            where: { id },
            data: {
                state,
                id_usuario_aprobador
            }
        });
    }
    async delete(id: number) {
        return await prisma.licencia.delete({
            where: { id }
        });
    }
}

export default new LicenciaDato();