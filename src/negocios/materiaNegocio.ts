import DMateria from "../datos/materiaDato";

class NMateria {
    async getAll() {
        return await DMateria.getAll();
    }
    async create(data: { name: string, initials: string }) {
        return await DMateria.create(data);
    }
    async update(id: number, data: Partial<{ name: string, initials: string }>) {
        return await DMateria.update(id, data);
    }
    async delete(id: number) {
        return await DMateria.delete(id);
    }
}

export default new NMateria();