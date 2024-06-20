"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bukpot_blue", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      employee_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "employee",
          key: "pkid",
        },
      },
      pemotong_id: {
        allowNull: true,
        type: DataTypes.BIGINT,
        references: {
          model: "employee",
          key: "pkid",
        },
      },
      month: {
        allowNull: false,
        type: DataTypes.ENUM(
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember"
        ),
      },
      year: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      penghasilan_bruto: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      tarif: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      pph_dipotong: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      status: {
        type: DataTypes.ENUM("Not Verified", "Verified"),
        defaultValue: "Not Verified",
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bukpot_blue");
  },
};
