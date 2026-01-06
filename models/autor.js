const { sequelize, DataTypes } = require('./database');

const Autor = sequelize.define('Autor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nacionalidad: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'autor',
    timestamps: false,
});

module.exports = Autor;