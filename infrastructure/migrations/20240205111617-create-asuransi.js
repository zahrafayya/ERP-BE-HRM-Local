"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("asuransi", {
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
      asuransi_type: {
        type: DataTypes.ENUM("Nominal", "Percentage"),
      },
      asuransi_amount: {
        type: DataTypes.FLOAT,
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("asuransi");
  },
};
