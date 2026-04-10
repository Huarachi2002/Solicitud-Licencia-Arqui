import db from "../config/db";

class DUsuarioGrupo {
    async asignarGrupos(id_usuario: number, ids_grupo: number[]) {
        for (const id_grupo of ids_grupo) {
            await db.usuario_Grupo.create({
                data: {
                    id_usuario,
                    id_grupo
                }
            });
        }
    }
}

export default new DUsuarioGrupo();