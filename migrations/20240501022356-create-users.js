'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { id: {
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
    } });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    
  }
};
