import db from '../config/db';

export enum LicenciaEstado {
    PENDIENTE = 0,
    APROBADA = 1,
    RECHAZADA = 2
}

class LicenciaDato {

    async getAll(start_date: Date = new Date(), end_date: Date = new Date(new Date().setMonth(new Date().getMonth() + 1))) {
        return await db.licencia.findMany({
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
        return await db.licencia.findUnique({
            where: { id },
            include: {
                usuario_solicitante: {
                    select: { id: true, name_full: true, num_register: true }
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
            }
        });
    }

    async getByStudentId(id: number, start_date: Date = new Date(), end_date: Date = new Date(new Date().setMonth(new Date().getMonth() + 1))) {
        return await db.licencia.findMany({
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

    async solicitarLicenciaEstudiante(data: { id_usuario_solicitante: number, start_date: Date, end_date: Date, reason: string, url_attached_1: string }) {
        return await db.licencia.create({
            data: {
                ...data,
                state: LicenciaEstado.PENDIENTE,
            }
        });
    }

    async aprobarLicencia(id: number, state: number, id_usuario_aprobador: number) {
        return await db.licencia.update({
            where: { id },
            data: {
                state,
                id_usuario_aprobador
            }
        });
    }

    async rechazarLicencia(id: number, state: number, id_usuario_rechazo: number) {
        return await db.licencia.update({
            where: { id },
            data: {
                state,
                id_usuario_aprobador: id_usuario_rechazo
            }
        });
    }
    async delete(id: number) {
        return await db.licencia.delete({
            where: { id }
        });
    }

    async getDocentesByLicencia(id_licencia: number) {
        // Obtener los grupos de la licencia, luego los docentes de cada grupo
        const detalles = await db.licencia_Detalle.findMany({
            where: { id_licencia },
            include: {
                grupo: {
                    include: {
                        materia: true,
                        usuarios: {
                            include: {
                                usuario: {
                                    include: { rol: true }
                                }
                            }
                        }
                    }
                }
            }
        });

        // Extraer docentes únicos con info del grupo/materia
        const docentesMap = new Map<number, { id: number; name_full: string; mail: string; cellphone: string; grupos: { id_grupo: number; grupo_name: string; materia_name: string }[] }>();

        for (const detalle of detalles) {
            const grupo = detalle.grupo;
            for (const ug of grupo.usuarios) {
                const usuario = ug.usuario;
                if (usuario.rol.description !== 'DOCENTE') continue;

                if (!docentesMap.has(usuario.id)) {
                    docentesMap.set(usuario.id, {
                        id: usuario.id,
                        name_full: usuario.name_full,
                        mail: usuario.mail,
                        cellphone: usuario.cellphone,
                        grupos: []
                    });
                }
                docentesMap.get(usuario.id)!.grupos.push({
                    id_grupo: grupo.id,
                    grupo_name: grupo.name,
                    materia_name: grupo.materia.name
                });
            }
        }

        return Array.from(docentesMap.values());
    }
}

export default new LicenciaDato();