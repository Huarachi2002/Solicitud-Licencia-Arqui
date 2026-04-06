import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import licenciaRoutes from './routes/licenciaRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import grupoRoutes from './routes/grupoRoutes';
import materiaRoutes from './routes/materiaRoutes';
import horarioRoutes from './routes/horarioRoutes';
import rolRoutes from './routes/rolRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'presentacion/vistas')));

app.get('/materias', (req, res) => {
    res.redirect('/gestionar-materias.html');
});

app.get('/roles', (req, res) => {
    res.redirect('/gestionar-roles.html');
});

app.get('/student', (req, res) => {
    res.redirect('/registro-estudiante.html')
})

app.get('/teacher', (req, res) => {
    res.redirect('/registro-docente.html')
})

app.get('/horarios', (req, res) => {
    res.redirect('/gestionar-horarios.html')
})

app.get('/grupos', (req, res) => {
    res.redirect('/gestionar-grupo.html')
})

app.get('/home', (req, res) => {
    res.redirect('/home.html')
})

app.get('/licencias', (req, res) => {
    res.redirect('/gestionar-licencias.html')
})

app.get('/login', (req, res) => {
    res.redirect('/login.html')
})

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.use('/api/licencia', licenciaRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/grupo', grupoRoutes);
app.use('/api/materia', materiaRoutes);
app.use('/api/horario', horarioRoutes);
app.use('/api/rol', rolRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(`[Error]: ${err.message}`);
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Error interno del servidor',
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;
