const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { sequelize  } = require('./models/database');
const autor = require('./routes/autor');
const genero = require('./routes/genero');
const libro = require('./routes/libro');

app.use(express.json());
app.use(cors());

app.use('/autor', autor);
app.use('/genero', genero);
app.use('/libro', libro);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida con éxito.');
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    } catch (error) {
        console.log('No se pudo conectar a la base de datos:', error);
    }
};

start();