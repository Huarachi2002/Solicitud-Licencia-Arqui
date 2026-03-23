const express = require('express');
const cors = require('cors');
require('dotenv').config();

const licenseRoutes = require('./routes/licenciaRoutes');
const userRoutes = require('./routes/usuarioRoutes');
const groupRoutes = require('./routes/grupoRoutes');
const materiaRoutes = require('./routes/materiaRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const rolRoutes = require('./routes/rolRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/licencia', licenseRoutes);
app.use('/api/usuario', userRoutes);
app.use('/api/grupo', groupRoutes);
app.use('/api/materia', materiaRoutes);
app.use('/api/horario', horarioRoutes);
app.use('/api/rol', rolRoutes);

app.use((err, req, res, next) => {
    console.error(`[Error]: ${err.message}`);
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Error interno del servidor',
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;