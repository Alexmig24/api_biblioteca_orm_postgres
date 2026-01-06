const {  sequelize } = require('./models/database');

require('./models/autor');
require('./models/genero');
require('./models/libro'); 

const iniciar = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida con éxito.');
        await sequelize.sync({ alter: true });
        console.log('Tablas creadas o actualizadas con éxito.');
        process.exit(0);
    } catch (error) {
        console.log('No se pudo conectar a la base de datos o crear las tablas:', error);
        process.exit(1);
    }
}

iniciar();