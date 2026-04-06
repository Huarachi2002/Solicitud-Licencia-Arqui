import DLicencia, { LicenciaEstado } from "../datos/licenciaDato";
import NUsuario from "../negocios/usuarioNegocio";
import NNotificacion from "../negocios/notificacionNegocio";

/* ─── helpers de formato ─────────────────────────────── */
function fmtFecha(d: Date | string) {
    return new Date(d).toLocaleDateString('es-BO', { day: '2-digit', month: 'long', year: 'numeric' });
}

function filaInfo(label: string, valor: string) {
    return `<tr>
      <td style="padding:6px 0;color:#64748b;font-size:13px;width:160px;vertical-align:top">${label}</td>
      <td style="padding:6px 0;color:#1e293b;font-size:13px;font-weight:600">${valor}</td>
    </tr>`;
}

function htmlEmail(titulo: string, color: string, cuerpo: string): string {
    return `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
  <div style="background:${color};padding:28px 32px">
    <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;letter-spacing:.5px">Sistema de Licencias — UAGRM · FCCT</h1>
    <p style="margin:6px 0 0;color:rgba(255,255,255,.8);font-size:13px">Notificación automática del sistema</p>
  </div>
  <div style="padding:28px 32px;background:#fff">
    <h2 style="margin:0 0 18px;color:#1e293b;font-size:17px;font-weight:700">${titulo}</h2>
    ${cuerpo}
  </div>
  <div style="padding:14px 32px;background:#f1f5f9;text-align:center">
    <p style="margin:0;color:#94a3b8;font-size:11px">Este es un mensaje automático. Por favor no responda directamente a este correo.</p>
  </div>
</div>`;
}

/* ─── clase principal ────────────────────────────────── */
class NLicencia {

    async getAll(start_date: Date = new Date(), end_date: Date = new Date(new Date().setMonth(new Date().getMonth() + 1))) {
        return await DLicencia.getAll(start_date, end_date);
    }

    async getByStudentId(id: number, start_date: Date = new Date(), end_date: Date = new Date(new Date().setMonth(new Date().getMonth() + 1))) {
        return await DLicencia.getByStudentId(id, start_date, end_date);
    }

    async solicitarLicenciaEstudiante(data: {
        id_usuario_solicitante: number,
        ids_grupo: number[],
        start_date: Date,
        end_date: Date,
        reason: string,
        url_attached_1: string
    }) {
        const docentes = await NUsuario.getAllDocenteByGrupo(data.ids_grupo);
        if (!docentes) throw new Error("Docente no encontrado");

        const administrador = await NUsuario.getAdministrador();
        if (!administrador) throw new Error("Administrador no encontrado");

        const estudiante = await NUsuario.getById(data.id_usuario_solicitante);
        const nombreEstudiante = estudiante?.name_full ?? `ID ${data.id_usuario_solicitante}`;
        const registroEstudiante = estudiante?.num_register ?? '—';
        const fechaDesde = fmtFecha(data.start_date);
        const fechaHasta = fmtFecha(data.end_date);

        const gruposSet = new Set<string>();
        for (const doc of docentes as any[]) {
            for (const ug of (doc.grupos ?? [])) {
                const texto = `${ug.grupo?.name ?? '?'} — ${ug.grupo?.materia?.name ?? '?'}`;
                gruposSet.add(texto);
            }
        }
        const gruposLista = gruposSet.size
            ? [...gruposSet].map(g => `<li style="margin:4px 0">${g}</li>`).join('')
            : '<li>No especificado</li>';

        // ── Email a cada docente ──────────────────────────────────────────
        const asuntoDocente = `[LICENCIA NUEVA] Solicitud de ${nombreEstudiante} — ${fechaDesde} al ${fechaHasta}`;
        const cuerpoDocente = `
          <p style="margin:0 0 16px;color:#475569;font-size:13px">
            Se ha registrado una nueva solicitud de licencia académica de uno de sus estudiantes.
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            ${filaInfo('Estudiante:', nombreEstudiante)}
            ${filaInfo('Nro. de Registro:', registroEstudiante)}
            ${filaInfo('Período solicitado:', `${fechaDesde} al ${fechaHasta}`)}
            ${filaInfo('Motivo:', data.reason)}
          </table>
          <p style="margin:0 0 8px;color:#475569;font-size:13px">Grupos bajo su responsabilidad afectados:</p>
          <ul style="margin:0 0 16px;padding-left:20px;color:#1e293b;font-size:13px">${gruposLista}</ul>
          <p style="margin:0;color:#475569;font-size:13px">
            El administrador del sistema resolverá la aprobación o rechazo de esta solicitud. 
            Recibirá una notificación cuando se tome una decisión.
          </p>`;

        for (const docente of docentes as any[]) {
            await NNotificacion.sendEmail(
                docente.mail,
                asuntoDocente,
                htmlEmail('Nueva solicitud de licencia estudiantil', '#1565a8', cuerpoDocente)
            );
        }

        // ── Email al administrador ────────────────────────────────────────
        const asuntoAdmin = `[PENDIENTE] Licencia de ${nombreEstudiante} — del ${fechaDesde} al ${fechaHasta}`;
        const cuerpoAdmin = `
          <p style="margin:0 0 16px;color:#475569;font-size:13px">
            Se ha registrado una nueva solicitud de licencia estudiantil que requiere su revisión y decisión.
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            ${filaInfo('Estudiante:', nombreEstudiante)}
            ${filaInfo('Nro. de Registro:', registroEstudiante)}
            ${filaInfo('Período:', `${fechaDesde} al ${fechaHasta}`)}
            ${filaInfo('Motivo:', data.reason)}
            ${filaInfo('Docentes notificados:', String((docentes as any[]).length))}
          </table>
          <p style="margin:0 0 8px;color:#475569;font-size:13px">Grupos involucrados:</p>
          <ul style="margin:0 0 16px;padding-left:20px;color:#1e293b;font-size:13px">${gruposLista}</ul>
          <p style="margin:0;color:#475569;font-size:13px">
            Ingrese al sistema de licencias para aprobar o rechazar esta solicitud.
          </p>`;

        await NNotificacion.sendEmail(
            administrador.mail,
            asuntoAdmin,
            htmlEmail('Solicitud de licencia pendiente de revisión', '#7c3aed', cuerpoAdmin)
        );

        return await DLicencia.solicitarLicenciaEstudiante(data);
    }

    async aprobarLicencia(id_licencia: number, id_usuario_aprobador: number) {
        const licencia = await DLicencia.getById(id_licencia);
        if (!licencia) throw new Error("Licencia no encontrada");

        const estudiante = await NUsuario.getByIdLicencia(id_licencia);
        if (!estudiante) throw new Error("Estudiante no encontrado");

        const gruposLista = licencia.licencia_detalles.length
            ? licencia.licencia_detalles.map((d: any) =>
                `<li style="margin:4px 0">${d.grupo?.name ?? '?'} — ${d.grupo?.materia?.name ?? '?'}</li>`
            ).join('')
            : '<li>No especificado</li>';

        const fechaDesde = fmtFecha((licencia as any).start_date);
        const fechaHasta = fmtFecha((licencia as any).end_date);

        const asunto = `✅ Tu solicitud de licencia ha sido APROBADA`;
        const cuerpo = `
          <p style="margin:0 0 16px;color:#475569;font-size:13px">
            Estimado/a <strong>${estudiante.name_full}</strong>, nos complace informarle que su solicitud de licencia 
            ha sido <strong style="color:#059669">APROBADA</strong> por el administrador del sistema.
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            ${filaInfo('Período aprobado:', `${fechaDesde} al ${fechaHasta}`)}
            ${filaInfo('Motivo registrado:', (licencia as any).reason ?? '—')}
          </table>
          <p style="margin:0 0 8px;color:#475569;font-size:13px">Grupos incluidos en la licencia:</p>
          <ul style="margin:0 0 16px;padding-left:20px;color:#1e293b;font-size:13px">${gruposLista}</ul>
          <p style="margin:0;color:#475569;font-size:13px">
            Sus docentes han sido notificados. Puede ingresar al sistema para consultar el detalle completo.
          </p>`;

        await NNotificacion.sendEmail(
            estudiante.mail,
            asunto,
            htmlEmail('Licencia Académica APROBADA', '#059669', cuerpo)
        );

        return await DLicencia.aprobarLicencia(id_licencia, LicenciaEstado.APROBADA, id_usuario_aprobador);
    }

    async rechazar(id_licencia: number, id_usuario_rechazo: number) {
        const licencia = await DLicencia.getById(id_licencia);
        if (!licencia) throw new Error("Licencia no encontrada");

        const estudiante = await NUsuario.getByIdLicencia(id_licencia);
        if (!estudiante) throw new Error("Estudiante no encontrado");

        const fechaDesde = fmtFecha((licencia as any).start_date);
        const fechaHasta = fmtFecha((licencia as any).end_date);

        const asunto = `❌ Tu solicitud de licencia ha sido RECHAZADA`;
        const cuerpo = `
          <p style="margin:0 0 16px;color:#475569;font-size:13px">
            Estimado/a <strong>${estudiante.name_full}</strong>, lamentamos informarle que su solicitud de licencia 
            ha sido <strong style="color:#dc2626">RECHAZADA</strong> por el administrador del sistema.
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            ${filaInfo('Período solicitado:', `${fechaDesde} al ${fechaHasta}`)}
            ${filaInfo('Motivo de la solicitud:', (licencia as any).reason ?? '—')}
          </table>
          <p style="margin:0;color:#475569;font-size:13px">
            Si considera que existe un error o desea más información, puede comunicarse directamente con 
            la administración de la Facultad de Ciencias de la Computación y Tecnología (FCCT).
          </p>`;

        await NNotificacion.sendEmail(
            estudiante.mail,
            asunto,
            htmlEmail('Licencia Académica RECHAZADA', '#dc2626', cuerpo)
        );

        return await DLicencia.rechazarLicencia(id_licencia, LicenciaEstado.RECHAZADA, id_usuario_rechazo);
    }

    async delete(id: number) {
        return await DLicencia.delete(id);
    }

    async getById(id: number) {
        return await DLicencia.getById(id);
    }
}

export default new NLicencia();