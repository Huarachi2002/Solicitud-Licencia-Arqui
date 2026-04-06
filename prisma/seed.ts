import 'dotenv/config';
import db from '../src/config/db';

async function main() {

  // 1. ROLES
  const rolAdmin = await db.rol.upsert({ where: { id: 1 }, update: { description: 'ADMINISTRADOR' }, create: { description: 'ADMINISTRADOR' } });
  const rolDocente = await db.rol.upsert({ where: { id: 2 }, update: { description: 'DOCENTE' }, create: { description: 'DOCENTE' } });
  const rolEstudiante = await db.rol.upsert({ where: { id: 3 }, update: { description: 'ESTUDIANTE' }, create: { description: 'ESTUDIANTE' } });

  // 2. ADMINISTRADOR (único)
  const admin = await db.usuario.upsert({
    where: { num_register: '101' },
    update: {},
    create: { id_rol: rolAdmin.id, name_full: 'Administrador Sistema', mail: 'roberthuarachi27@gmail.com', cellphone: '76023033', num_register: '101', password: '123456' },
  });

  // 3. MATERIAS
  const materias = await Promise.all([
    db.materia.upsert({ where: { id: 1 }, update: {}, create: { name: 'Programación I', initials: 'PROG1' } }),
    db.materia.upsert({ where: { id: 2 }, update: {}, create: { name: 'Programación II', initials: 'PROG2' } }),
    db.materia.upsert({ where: { id: 3 }, update: {}, create: { name: 'Base de Datos I', initials: 'BD1' } }),
    db.materia.upsert({ where: { id: 4 }, update: {}, create: { name: 'Base de Datos II', initials: 'BD2' } }),
    db.materia.upsert({ where: { id: 5 }, update: {}, create: { name: 'Arquitectura de Software', initials: 'ARQUI' } }),
    db.materia.upsert({ where: { id: 6 }, update: {}, create: { name: 'Sistemas Operativos', initials: 'SSOO' } }),
    db.materia.upsert({ where: { id: 7 }, update: {}, create: { name: 'Redes de Computadoras', initials: 'REDES' } }),
    db.materia.upsert({ where: { id: 8 }, update: {}, create: { name: 'Ingeniería de Software', initials: 'IS' } }),
    db.materia.upsert({ where: { id: 9 }, update: {}, create: { name: 'Inteligencia Artificial', initials: 'IA' } }),
    db.materia.upsert({ where: { id: 10 }, update: {}, create: { name: 'Inglés Técnico', initials: 'ING' } }),
    db.materia.upsert({ where: { id: 11 }, update: {}, create: { name: 'Física I', initials: 'FIS1' } }),
    db.materia.upsert({ where: { id: 12 }, update: {}, create: { name: 'Física II', initials: 'FIS2' } }),
    db.materia.upsert({ where: { id: 13 }, update: {}, create: { name: 'Física III', initials: 'FIS3' } }),
  ]);

  // 4. HORARIOS
  const horarios = await Promise.all([
    db.horario.upsert({ where: { id: 1 }, update: {}, create: { day_of_week: '0,2,4', start_time: '07:00', end_time: '09:15' } }),
    db.horario.upsert({ where: { id: 2 }, update: {}, create: { day_of_week: '1,3,5', start_time: '07:00', end_time: '09:15' } }),
    db.horario.upsert({ where: { id: 3 }, update: {}, create: { day_of_week: '0,2,4', start_time: '10:00', end_time: '12:15' } }),
    db.horario.upsert({ where: { id: 4 }, update: {}, create: { day_of_week: '1,3,5', start_time: '10:00', end_time: '12:15' } }),
    db.horario.upsert({ where: { id: 5 }, update: {}, create: { day_of_week: '0,2,4', start_time: '14:00', end_time: '16:15' } }),
    db.horario.upsert({ where: { id: 6 }, update: {}, create: { day_of_week: '1,3,5', start_time: '18:15', end_time: '20:30' } }),
    db.horario.upsert({ where: { id: 7 }, update: {}, create: { day_of_week: '0,2,4', start_time: '18:15', end_time: '20:30' } }),
    db.horario.upsert({ where: { id: 8 }, update: {}, create: { day_of_week: '5', start_time: '08:00', end_time: '11:00' } }),
  ]);

  // 5. GRUPOS (sin crear horarios nested, se asignan por separado)
  const grupos = await Promise.all([
    db.grupo.upsert({ where: { id: 1 }, update: {}, create: { name: 'SA', id_materia: materias[0].id } }),
    db.grupo.upsert({ where: { id: 2 }, update: {}, create: { name: 'SB', id_materia: materias[0].id } }),
    db.grupo.upsert({ where: { id: 3 }, update: {}, create: { name: 'SC', id_materia: materias[1].id } }),
    db.grupo.upsert({ where: { id: 4 }, update: {}, create: { name: 'SD', id_materia: materias[2].id } }),
    db.grupo.upsert({ where: { id: 5 }, update: {}, create: { name: 'SE', id_materia: materias[2].id } }),
    db.grupo.upsert({ where: { id: 6 }, update: {}, create: { name: 'SF', id_materia: materias[3].id } }),
    db.grupo.upsert({ where: { id: 7 }, update: {}, create: { name: 'SG', id_materia: materias[4].id } }),
    db.grupo.upsert({ where: { id: 8 }, update: {}, create: { name: 'SH', id_materia: materias[5].id } }),
    db.grupo.upsert({ where: { id: 9 }, update: {}, create: { name: 'SI', id_materia: materias[6].id } }),
  ]);

  // 6. ASIGNAR HORARIOS A GRUPOS (con @@unique, ignoramos duplicados)
  const grupoHorarios = [
    { id_grupo: grupos[0].id, id_horario: horarios[0].id }, // SA → Lun/Mie/Vie 07:00
    { id_grupo: grupos[0].id, id_horario: horarios[2].id }, // SA → Lun/Mie/Vie 10:00
    { id_grupo: grupos[1].id, id_horario: horarios[1].id }, // SB → Mar/Jue/Sab 07:00
    { id_grupo: grupos[1].id, id_horario: horarios[3].id }, // SB → Mar/Jue/Sab 10:00
    { id_grupo: grupos[2].id, id_horario: horarios[5].id }, // SC → Mar/Jue/Sab 18:15
    { id_grupo: grupos[2].id, id_horario: horarios[6].id }, // SC → Lun/Mie/Vie 18:15
    { id_grupo: grupos[3].id, id_horario: horarios[0].id }, // SD → Lun/Mie/Vie 07:00
    { id_grupo: grupos[3].id, id_horario: horarios[1].id }, // SD → Mar/Jue/Sab 07:00
    { id_grupo: grupos[4].id, id_horario: horarios[7].id }, // SE → Sab 08:00
    { id_grupo: grupos[5].id, id_horario: horarios[7].id }, // SF → Sab 08:00
    { id_grupo: grupos[6].id, id_horario: horarios[2].id }, // SG → Lun/Mie/Vie 10:00
    { id_grupo: grupos[6].id, id_horario: horarios[4].id }, // SG → Lun/Mie/Vie 14:00
    { id_grupo: grupos[7].id, id_horario: horarios[3].id }, // SH → Mar/Jue/Sab 10:00
    { id_grupo: grupos[8].id, id_horario: horarios[6].id }, // SI → Lun/Mie/Vie 18:15
    { id_grupo: grupos[8].id, id_horario: horarios[7].id }, // SI → Sab 08:00
  ];
  for (const gh of grupoHorarios) {
    await db.grupo_Horario.create({ data: gh }).catch(() => { });
  }

  // 7. DOCENTES
  const docentes = await Promise.all([
    db.usuario.upsert({ where: { num_register: '201' }, update: {}, create: { id_rol: rolDocente.id, name_full: 'Carlos Mamani Flores', mail: 'c.mamani@ficct.uagrm.edu.bo', cellphone: '71234567', num_register: '201', password: '123456' } }),
    db.usuario.upsert({ where: { num_register: '202' }, update: {}, create: { id_rol: rolDocente.id, name_full: 'María Vásquez Torrez', mail: 'm.vasquez@ficct.uagrm.edu.bo', cellphone: '76543210', num_register: '202', password: '123456' } }),
    db.usuario.upsert({ where: { num_register: '203' }, update: {}, create: { id_rol: rolDocente.id, name_full: 'Roberto Suárez Peña', mail: 'r.suarez@ficct.uagrm.edu.bo', cellphone: '78901234', num_register: '203', password: '123456' } }),
  ]);

  // 8. ASIGNAR DOCENTES A GRUPOS
  const docGrupos = [
    { id_usuario: docentes[0].id, id_grupo: grupos[0].id }, // 201 → SA
    { id_usuario: docentes[0].id, id_grupo: grupos[1].id }, // 201 → SB
    { id_usuario: docentes[0].id, id_grupo: grupos[3].id }, // 201 → SD
    { id_usuario: docentes[1].id, id_grupo: grupos[2].id }, // 202 → SC
    { id_usuario: docentes[1].id, id_grupo: grupos[6].id }, // 202 → SG
    { id_usuario: docentes[2].id, id_grupo: grupos[4].id }, // 203 → SE
    { id_usuario: docentes[2].id, id_grupo: grupos[5].id }, // 203 → SF
    { id_usuario: docentes[2].id, id_grupo: grupos[7].id }, // 203 → SH
    { id_usuario: docentes[2].id, id_grupo: grupos[8].id }, // 203 → SI
  ];
  for (const dg of docGrupos) {
    await db.usuario_Grupo.create({ data: dg }).catch(() => { });
  }

  // 9. ESTUDIANTES
  const estudiantes = await Promise.all([
    db.usuario.upsert({ where: { num_register: '220001499' }, update: {}, create: { id_rol: rolEstudiante.id, name_full: 'Yeferson Huarachi Aleman', mail: 'prueba@gmail.com', cellphone: '76023033', num_register: '220001499', password: '123456' } }),
    db.usuario.upsert({ where: { num_register: '220001500' }, update: {}, create: { id_rol: rolEstudiante.id, name_full: 'Luis Herrera Sandoval', mail: 'l.herrera@est.uagrm.edu.bo', cellphone: '76023034', num_register: '220001500', password: '123456' } }),
    db.usuario.upsert({ where: { num_register: '220001501' }, update: {}, create: { id_rol: rolEstudiante.id, name_full: 'Paola Quispe Apaza', mail: 'p.quispe@est.uagrm.edu.bo', cellphone: '76023035', num_register: '220001501', password: '123456' } }),
    db.usuario.upsert({ where: { num_register: '220001502' }, update: {}, create: { id_rol: rolEstudiante.id, name_full: 'Diego Mamani Condori', mail: 'd.mamani@est.uagrm.edu.bo', cellphone: '76023036', num_register: '220001502', password: '123456' } }),
    db.usuario.upsert({ where: { num_register: '220001503' }, update: {}, create: { id_rol: rolEstudiante.id, name_full: 'Sofía Torrez Villanueva', mail: 's.torrez@est.uagrm.edu.bo', cellphone: '76023037', num_register: '220001503', password: '123456' } }),
  ]);

  // 10. ASIGNAR ESTUDIANTES A GRUPOS
  const estGrupos = [
    { id_usuario: estudiantes[0].id, id_grupo: grupos[0].id }, // Yeferson → SA
    { id_usuario: estudiantes[0].id, id_grupo: grupos[3].id }, // Yeferson → SD
    { id_usuario: estudiantes[1].id, id_grupo: grupos[1].id }, // Luis → SB
    { id_usuario: estudiantes[1].id, id_grupo: grupos[4].id }, // Luis → SE
    { id_usuario: estudiantes[2].id, id_grupo: grupos[0].id }, // Paola → SA
    { id_usuario: estudiantes[2].id, id_grupo: grupos[2].id }, // Paola → SC
    { id_usuario: estudiantes[3].id, id_grupo: grupos[6].id }, // Diego → SG
    { id_usuario: estudiantes[3].id, id_grupo: grupos[7].id }, // Diego → SH
    { id_usuario: estudiantes[4].id, id_grupo: grupos[5].id }, // Sofía → SF
    { id_usuario: estudiantes[4].id, id_grupo: grupos[8].id }, // Sofía → SI
  ];
  for (const eg of estGrupos) {
    await db.usuario_Grupo.create({ data: eg }).catch(() => { });
  }

  // 11. LICENCIAS DE PRUEBA
  const now = new Date();
  const d = (offset: number) => new Date(now.getTime() + offset * 86400000);

  await db.licencia.create({ data: { id_usuario_solicitante: estudiantes[0].id, start_date: d(1), end_date: d(3), reason: 'Consulta médica programada con especialista', state: 0, url_attached_1: 'consulta_medica.pdf', licencia_detalles: { create: [{ id_grupo: grupos[0].id }, { id_grupo: grupos[3].id }] } } });
  await db.licencia.create({ data: { id_usuario_solicitante: estudiantes[1].id, start_date: d(-5), end_date: d(-3), reason: 'Viaje familiar de urgencia por fallecimiento', state: 0, url_attached_1: 'acta_defuncion.pdf', licencia_detalles: { create: [{ id_grupo: grupos[1].id }, { id_grupo: grupos[4].id }] } } });
  await db.licencia.create({ data: { id_usuario_solicitante: estudiantes[2].id, start_date: d(-10), end_date: d(-8), reason: 'Trámites administrativos universitarios', state: 0, url_attached_1: 'solicitud_tramite.pdf', licencia_detalles: { create: [{ id_grupo: grupos[0].id }] } } });
  await db.licencia.create({ data: { id_usuario_solicitante: estudiantes[3].id, start_date: d(2), end_date: d(4), reason: 'Participación en olimpiada nacional', state: 0, url_attached_1: 'convocatoria_olimpiada.pdf', licencia_detalles: { create: [{ id_grupo: grupos[6].id }, { id_grupo: grupos[7].id }] } } });
  await db.licencia.create({ data: { id_usuario_solicitante: estudiantes[4].id, start_date: d(-2), end_date: d(0), reason: 'Cirugía programada de urgencia menor', state: 0, url_attached_1: 'orden_cirugia.pdf', licencia_detalles: { create: [{ id_grupo: grupos[5].id }, { id_grupo: grupos[8].id }] } } });

  console.log('Seed completado correctamente.');
  console.log('Credenciales:');
  console.log('  ADMIN       → num_register: 101       | password: 123456');
  console.log('  DOCENTE 1   → num_register: 201       | password: 123456');
  console.log('  DOCENTE 2   → num_register: 202       | password: 123456');
  console.log('  DOCENTE 3   → num_register: 203       | password: 123456');
  console.log('  ESTUDIANTE  → num_register: 220001499 | password: 123456');
}

main()
  .catch(e => { console.error('Error en seed:', e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
