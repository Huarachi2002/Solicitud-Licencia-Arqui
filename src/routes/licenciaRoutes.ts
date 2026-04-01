import express from 'express';
import PLicencia from '../presentacion/licenciaPresentacion';
const router = express.Router();

router.get('/', PLicencia.getAll);
router.post('/', PLicencia.solicitarLicenciaEstudiante);
router.put('/:id/aprobar', PLicencia.aprobarLicencia);
router.put('/:id/rechazar', PLicencia.rechazarLicencia);
router.get('/materias', PLicencia.getAllMaterias);
router.get('/materia/:id_materia/grupos', PLicencia.getGrupoByMateria);

export default router;
