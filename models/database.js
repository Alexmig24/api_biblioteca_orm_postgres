const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('biblioteca_orm', 'postgres','210904', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

module.exports = { DataTypes, sequelize };