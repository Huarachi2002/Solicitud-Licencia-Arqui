import db from "../config/db";

class DGrupoHorario {
    async asignarHorarios(id_grupo: number, ids_horario: number[]) {
        await db.grupo_Horario.deleteMany({
            where: { id_grupo }
        });
        for (const id_horario of ids_horario) {
            await db.grupo_Horario.create({
                data: {
                    id_grupo,
                    id_horario
                }
            });
        }
    }
}

export default new DGrupoHorario();