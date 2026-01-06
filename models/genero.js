const { sequelize, DataTypes } = require('./database');

const Genero = sequelize.define('Genero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'genero',
    timestamps: false,
});

module.exports = Genero;