import db from '../config/db';

class DUsuario {
    async registerStudent(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }) {
        const { id_rol, name_full, mail, cellphone, num_register, password } = data;
        return await db.usuario.create({
            data: {
                id_rol,
                name_full,
                mail,
                cellphone,
                num_register,
                password
            }
        });
    }

    async registerTeacher(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }) {
        const { id_rol, name_full, mail, cellphone, num_register, password } = data;
        return await db.usuario.create({
            data: {
                id_rol,
                name_full,
                mail,
                cellphone,
                num_register,
                password
            }
        });
    }

    async login(data: { num_register: string, password: string }) {
        return await db.usuario.findFirst({
            where: {
                num_register: data.num_register,
                password: data.password
            },
            include: {
                rol: true
            }
        });
    }

    async getAllDocenteByGrupo(ids_grupo: number[]) {
        return await db.usuario.findMany({
            where: {
                grupos: {
                    some: {
                        id_grupo: {
                            in: ids_grupo
                        }
                    }
                },
                rol: {
                    description: "DOCENTE"
                }
            }
        });
    }

    async getAdministrador() {
        return await db.usuario.findFirst({
            where: {
                rol: {
                    description: "ADMINISTRADOR"
                }
            }
        });
    }

    async getById(id: number) {
        return await db.usuario.findUnique({ where: { id } });
    }

    async getByIdLicencia(id_licencia: number) {
        return await db.usuario.findFirst({
            where: {
                licencias_generadas: {
                    some: {
                        id: id_licencia
                    }
                }
            }
        });
    }

    async getDocentesByLicencia(id_licencia: number) {
        return await db.usuario.findMany({
            where: {
                grupos: {
                    some: {
                        grupo: {
                            licencia_detalles: {
                                some: { id_licencia }
                            }
                        }
                    }
                },
                rol: { description: 'DOCENTE' }
            },
            include: {
                grupos: {
                    where: {
                        grupo: {
                            licencia_detalles: {
                                some: { id_licencia }
                            }
                        }
                    },
                    include: {
                        grupo: {
                            include: { materia: true }
                        }
                    }
                }
            }
        });
    }
}

export default new DUsuario();