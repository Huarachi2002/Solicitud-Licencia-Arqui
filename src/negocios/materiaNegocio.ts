import materiaDato from "../datos/materiaDato";

class MateriaNegocio {
    async getAll() {
        return await materiaDato.getAll();
    }
    async getById(id: number) {
        return await materiaDato.getById(id);
    }
    async create(data: { name: string, initials: string }) {
        return await materiaDato.create(data);
    }
    async update(id: number, data: Partial<{ name: string, initials: string }>) {
        return await materiaDato.update(id, data);
    }
    async delete(id: number) {
        return await materiaDato.delete(id);
    }
}

export default new MateriaNegocio();