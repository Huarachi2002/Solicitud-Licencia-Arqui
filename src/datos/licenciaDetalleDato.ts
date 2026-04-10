import db from "../config/db";

class DLicenciaDetalle {
    async guardarDetalle(id_licencia: number, ids_grupo: number[]) {
        for (const id_grupo of ids_grupo) {
            await db.licencia_Detalle.create({
                data: {
                    id_licencia,
                    id_grupo
                }
            });
        }
    }
}

export default new DLicenciaDetalle();