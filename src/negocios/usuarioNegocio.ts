import usuarioDato from "../datos/usuarioDato";

class UsuarioNegocio {
    async registerStudent(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }) {
        return await usuarioDato.registerStudent(data);
    }
}

export default new UsuarioNegocio();