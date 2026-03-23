import licenciaDato, { LicenciaEstado } from "../datos/licenciaDato";

class LicenciaNegocio {
    async getAll(start_date: Date = new Date(), end_date: Date = new Date().setMonth(new Date().getMonth() + 1) as any) {
        return await licenciaDato.getAll(start_date, end_date);
    }
    async getById(id: number) {
        return await licenciaDato.getById(id);
    }
    async getByStudentId(id: number, start_date: Date = new Date(), end_date: Date = new Date().setMonth(new Date().getMonth() + 1) as any) {
        return await licenciaDato.getByStudentId(id, start_date, end_date);
    }
    async getByStudentIdAndState(id: number, state: number, start_date: Date = new Date(), end_date: Date = new Date().setMonth(new Date().getMonth() + 1) as any) {
        return await licenciaDato.getByStudentIdAndState(id, state, start_date, end_date);
    }
    async getByAllByState(state: number, start_date: Date = new Date(), end_date: Date = new Date().setMonth(new Date().getMonth() + 1) as any) {
        return await licenciaDato.getByAllByState(state, start_date, end_date);
    }
    async solicitarLicenciaEstudiante(data: { id_usuario_solicitante: number, start_date: Date, end_date: Date, reason: string, url_attached_1: string }) {
        return await licenciaDato.create(data);
    }
    async aprobarLicencia(id_licencia: number, id_usuario_aprobador: number) {
        const licencia = await licenciaDato.getById(id_licencia);
        if (!licencia) throw new Error("Licencia no encontrada");
        if (licencia.state !== LicenciaEstado.PENDIENTE) {
            throw new Error("La licencia no está pendiente de autorización por el administrador.");
        }

        return await licenciaDato.updateState(id_licencia, LicenciaEstado.APROBADA, id_usuario_aprobador);
    }
    async rechazar(id_licencia: number, id_usuario_rechazo: number) {
        return await licenciaDato.updateState(id_licencia, LicenciaEstado.RECHAZADA, id_usuario_rechazo);
    }
    async delete(id: number) {
        return await licenciaDato.delete(id);
    }
}

export default new LicenciaNegocio();