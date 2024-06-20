"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pkp", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      pkp_min: {
        type: DataTypes.BIGINT,
      },
      pkp_max: {
        type: DataTypes.BIGINT,
      },
      tariff_percentage: {
        type: DataTypes.FLOAT,
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pkp");
  },
};
