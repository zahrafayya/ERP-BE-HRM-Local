"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("salary_slip", {
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
      gaji_pokok: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      gaji_lembur: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      penalti: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      tunjangan_jabatan: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      tunjangan_keluarga: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      deduction_asuransi_pribadi: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      deduction_amal: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      deduction_bpjs_kesehatan: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      deduction_bpjs_tk_jht: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      deduction_bpjs_tk_jp: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      deduction_pph21: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },

      benefit_bpjs_kesehatan: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      benefit_bpjs_tk_jht: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      benefit_bpjs_tk_jkk: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      benefit_bpjs_tk_jkm: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      benefit_bpjs_tk_jp: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      gaji_take_home: {
        defaultValue: 0,
        type: DataTypes.DOUBLE,
      },
      status: {
        type: DataTypes.ENUM(
          "Not Written In Journal",
          "Written In Journal",
          "Paid"
        ),
        defaultValue: "Not Written In Journal",
      },
      year: {
        type: DataTypes.INTEGER,
      },
      month: {
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
      start_date: {
        type: DataTypes.DATE,
      },
      last_date: {
        type: DataTypes.DATE,
      },
      ...initBaseAttributes(),
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("salary_slip");
  },
};
