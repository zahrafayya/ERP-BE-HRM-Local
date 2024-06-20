"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("family_member", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      nik: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      employee_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "employee",
          key: "pkid",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(
          "Istri",
          "Suami",
          "Ayah",
          "Ibu",
          "Ayah Mertua",
          "Ibu Mertua",
          "Anak Kandung Perempuan",
          "Anak Kandung Laki-laki",
          "Anak Angkat Perempuan",
          "Anak Angkat Laki-laki"
        ),
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATE,
      },
      education: {
        type: DataTypes.STRING,
      },
      is_working: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      bukti_tidak_kerja: DataTypes.STRING,
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("family_member");
  },
};
