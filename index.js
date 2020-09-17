const express = require('express');
const conectarDB = require('./config/db');

//crear el servidor
const app = express();

//Conectar a la base de datos
conectarDB();

// Habilitar express.json (antiguo bodyparser)
app.use(express.json({extended: true}));

//puerto de la application
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarioRoutes'));

// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor funcionando en puerto ${PORT}`);
})