import DGrupo from "../datos/grupoDato";
import DGrupoHorario from "../datos/grupoHorarioDato";

class NGrupo {
    async getAll() {
        return await DGrupo.getAll();
    }
    async create(data: { name: string, id_materia: number, ids_horario: number[] }) {
        const { ids_horario, ...rest } = data;
        const newGrupo = await DGrupo.create(rest);
        await DGrupoHorario.asignarHorarios(newGrupo.id, ids_horario);
        return newGrupo;
    }
    async update(id: number, data: Partial<{ name: string, id_materia: number, ids_horario: number[] }>) {
        const { ids_horario, ...rest } = data;
        if (ids_horario) {
            await DGrupoHorario.asignarHorarios(id, ids_horario);
        }
        return await DGrupo.update(id, rest);
    }
    async delete(id: number) {
        return await DGrupo.delete(id);
    }

    async getGrupoByMateria(id_materia: number) {
        return await DGrupo.getGrupoByMateria(id_materia);
    }
}

export default new NGrupo();