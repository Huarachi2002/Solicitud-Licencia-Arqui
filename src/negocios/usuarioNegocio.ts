import usuarioDato from "../datos/usuarioDato";

class UsuarioNegocio {
    async getAll() {
        return await usuarioDato.getAll();
    }
    async getById(id: number) {
        return await usuarioDato.getById(id);
    }
    async findByEmail(mail: string) {
        return await usuarioDato.findByEmail(mail);
    }
    async create(data: { id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }) {
        return await usuarioDato.create(data);
    }
    async update(id: number, data: Partial<{ id_rol: number, name_full: string, mail: string, cellphone: string, num_register: string, password: string }>) {
        return await usuarioDato.update(id, data);
    }
    async delete(id: number) {
        return await usuarioDato.delete(id);
    }
}

export default new UsuarioNegocio();