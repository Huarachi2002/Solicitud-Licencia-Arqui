import rolDato from "../datos/rolDato";

class RolNegocio {
    async getAll() {
        return await rolDato.getAll();
    }

    async getByName(name: string) {
        return await rolDato.getByName(name);
    }
    async create(data: { description: string }) {
        await rolDato.create(data);
    }
    async update(id: number, data: Partial<{ description: string }>) {
        await rolDato.update(id, data);
    }
    async delete(id: number) {
        await rolDato.delete(id);
    }
}

export default new RolNegocio();