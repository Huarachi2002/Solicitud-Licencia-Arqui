import DRol from "../datos/rolDato";

class NRol {
    async getAll() {
        return await DRol.getAll();
    }

    async getByName(name: string) {
        return await DRol.getByName(name);
    }
    async create(data: { description: string }) {
        await DRol.create(data);
    }
    async update(id: number, data: Partial<{ description: string }>) {
        await DRol.update(id, data);
    }
    async delete(id: number) {
        await DRol.delete(id);
    }
}

export default new NRol();