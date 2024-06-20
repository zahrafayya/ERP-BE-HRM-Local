"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("overtime", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM("Hari kerja", "Hari libur", "Hari libur nasional"),
      },
      jam_pertama: {
        type: DataTypes.INTEGER,
      },
      overtime_rate_ph: {
        type: DataTypes.FLOAT,
      },
      overtime_rate_type: {
        type: DataTypes.ENUM("Alfa", "Nominal", "Percentage"),
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("overtime");
  },
};
