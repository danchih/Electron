const Sequelize = require('sequelize');
const database = require('../db');
const Usuario = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      endereco: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      cep: {
        type: Sequelize.STRING(11),
        allowNull: false
      }
    },
    {
    timestamps: false
})
module.exports = Usuario;