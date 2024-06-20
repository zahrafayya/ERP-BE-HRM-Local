"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("amal", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      amal_type: {
        type: DataTypes.ENUM("Nominal", "Percentage"),
      },
      amal_amount: {
        type: DataTypes.BIGINT,
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("amal");
  },
};
