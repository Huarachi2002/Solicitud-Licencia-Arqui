import DUsuario from "../datos/usuarioDato";
import DUsuarioGrupo from "../datos/usuarioGrupoDato";

class NUsuario {
    async registerStudent(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string, ids_grupo: number[] }) {
        const { ids_grupo, ...rest } = data;
        const newUsuario = await DUsuario.registerStudent(rest);
        await DUsuarioGrupo.asignarGrupos(newUsuario.id, ids_grupo);
        return newUsuario;
    }

    async registerTeacher(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string, ids_grupo: number[] }) {
        const { ids_grupo, ...rest } = data;
        const newUsuario = await DUsuario.registerTeacher(rest);
        await DUsuarioGrupo.asignarGrupos(newUsuario.id, data.ids_grupo);
        return newUsuario;
    }

    async login(data: { num_register: string, password: string }) {
        return await DUsuario.login(data);
    }

    async getAllDocenteByGrupo(ids_grupo: number[]) {
        return await DUsuario.getAllDocenteByGrupo(ids_grupo);
    }

    async getAdministrador() {
        return await DUsuario.getAdministrador();
    }

    async getByIdLicencia(id_licencia: number) {
        return await DUsuario.getByIdLicencia(id_licencia);
    }

    async getById(id: number) {
        return await DUsuario.getById(id);
    }

    async getDocentesByLicencia(id_licencia: number) {
        return await DUsuario.getDocentesByLicencia(id_licencia);
    }
}

export default new NUsuario();