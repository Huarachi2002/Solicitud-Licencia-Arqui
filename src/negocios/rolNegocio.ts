import rolDato from "../datos/rolDato";

class RolNegocio {
    async getAll() {
        return await rolDato.getAll();
    }

    async getByName(name: string) {
        return await rolDato.getByName(name);
    }
    async create(data: { description: string }) {
        return await rolDato.create(data);
    }
    async update(id: number, data: Partial<{ description: string }>) {
        return await rolDato.update(id, data);
    }
    async delete(id: number) {
        return await rolDato.delete(id);
    }
}

export default new RolNegocio();