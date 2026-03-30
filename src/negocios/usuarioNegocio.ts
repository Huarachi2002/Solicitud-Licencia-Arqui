import DUsuario from "../datos/usuarioDato";

class NUsuario {
    async registerStudent(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }) {
        return await DUsuario.registerStudent(data);
    }

    async registerTeacher(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }) {
        return await DUsuario.registerTeacher(data);
    }
}

export default new NUsuario();