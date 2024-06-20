"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("salary_percentage", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      bpjs_kesehatan_type: {
        type: DataTypes.ENUM("Nominal", "Percentage"),
      },
      bpjs_kesehatan_perusahaan: {
        type: DataTypes.FLOAT,
      },
      bpjs_kesehatan_pribadi: {
        type: DataTypes.FLOAT,
      },
      is_adding_bpjs_kesehatan: {
        type: DataTypes.BOOLEAN,
      },
      bpjs_ketenagakerjaan_jht_type: {
        type: DataTypes.ENUM("Nominal", "Percentage"),
      },
      bpjs_ketenagakerjaan_jht_perusahaan: {
        type: DataTypes.FLOAT,
      },
      bpjs_ketenagakerjaan_jht_pribadi: {
        type: DataTypes.FLOAT,
      },
      is_adding_bpjs_ketenagakerjaan_jht: {
        type: DataTypes.BOOLEAN,
      },
      bpjs_ketenagakerjaan_jkk_type: {
        type: DataTypes.ENUM("Nominal", "Percentage"),
      },
      bpjs_ketenagakerjaan_jkk_perusahaan: {
        type: DataTypes.FLOAT,
      },
      is_adding_bpjs_ketenagakerjaan_jkk: {
        type: DataTypes.BOOLEAN,
      },
      bpjs_ketenagakerjaan_jkm_type: {
        type: DataTypes.ENUM("Nominal", "Percentage"),
      },
      bpjs_ketenagakerjaan_jkm_perusahaan: {
        type: DataTypes.FLOAT,
      },
      is_adding_bpjs_ketenagakerjaan_jkm: {
        type: DataTypes.BOOLEAN,
      },
      bpjs_ketenagakerjaan_jp_type: {
        type: DataTypes.ENUM("Nominal", "Percentage"),
      },
      bpjs_ketenagakerjaan_jp_perusahaan: {
        type: DataTypes.FLOAT,
      },
      bpjs_ketenagakerjaan_jp_pribadi: {
        type: DataTypes.FLOAT,
      },
      is_adding_bpjs_ketenagakerjaan_jp: {
        type: DataTypes.BOOLEAN,
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("salary_percentage");
  },
};
