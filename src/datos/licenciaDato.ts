import prisma from '../config/db';

export enum LicenciaEstado {
    PENDIENTE = 0,
    APROBADA = 1,
    RECHAZADA = 2
}

class LicenciaDato {

    async getAll(start_date: Date = new Date(), end_date: Date = new Date(new Date().setMonth(new Date().getMonth() + 1))) {
        return await prisma.licencia.findMany({
            include: {
                usuario_solicitante: {
                    select: { id: true, name_full: true }
                },
                licencia_detalles: {
                    include: {
                        grupo: {
                            include: {
                                materia: true
                            }
                        }
                    }
                }
            },
            orderBy: { id: 'desc' }
        });
    }

    async getById(id: number) {
        return await prisma.licencia.findUnique({
            where: { id }
        });
    }

    async getByStudentId(id: number, start_date: Date = new Date(), end_date: Date = new Date(new Date().setMonth(new Date().getMonth() + 1))) {
        return await prisma.licencia.findMany({
            where: {
                id_usuario_solicitante: id,
                // start_date: {
                //     gte: start_date
                // },
                // end_date: {
                //     lte: end_date
                // }
            },
            include: {
                licencia_detalles: {
                    include: {
                        grupo: {
                            include: {
                                materia: true
                            }
                        }
                    }
                }
            }
        });
    }

    async getByStudentIdAndState(id: number, state: number, start_date: Date = new Date(), end_date: Date = new Date(new Date().setMonth(new Date().getMonth() + 1))) {
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

    async getByAllByState(state: number, start_date: Date = new Date(), end_date: Date = new Date(new Date().setMonth(new Date().getMonth() + 1))) {
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


    async solicitarLicenciaEstudiante(data: { id_usuario_solicitante: number, ids_grupo: number[], start_date: Date, end_date: Date, reason: string, url_attached_1: string }) {
        const { ids_grupo, ...rest } = data;
        const grupoIds: number[] = Array.isArray(ids_grupo) ? ids_grupo : [];
        return await prisma.licencia.create({
            data: {
                ...rest,
                state: LicenciaEstado.PENDIENTE,
                licencia_detalles: {
                    create: grupoIds.map((id_grupo: number) => ({
                        id_grupo: id_grupo
                    }))
                }
            }
        });
    }

    async aprobarLicencia(id: number, state: number, id_usuario_aprobador: number) {
        return await prisma.licencia.update({
            where: { id },
            data: {
                state,
                id_usuario_aprobador
            }
        });
    }

    async rechazarLicencia(id: number, state: number, id_usuario_rechazo: number) {
        return await prisma.licencia.update({
            where: { id },
            data: {
                state,
                id_usuario_aprobador: id_usuario_rechazo
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