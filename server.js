const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear el servidor
const app = express();

//Conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json (antiguo bodyparser)
app.use(express.json({extended: true}));

//puerto de la application
const PORT = process.env.PORT || 4000;

// importar rutas e indicar los accesos a la api
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/proyectos', require('./routes/proyectosRoutes'));
app.use('/api/tareas', require('./routes/tareasRoutes'));

// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor funcionando en puerto ${PORT}`);
})