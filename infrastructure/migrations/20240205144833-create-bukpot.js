"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bukpot", {
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
      ptkp_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "ptkp",
          key: "pkid",
        },
      },
      year: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      gaji: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      tunjangan_pph: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      tunjangan_lain: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      honorarium_imbalan: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      premi_asuransi: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      natura: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      gratifikasi_thr: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      biaya_jabatan_pensiun: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      iuran_pensiun: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      neto_sebelum: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      pajak: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      pajak_telah_dipotong: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      pajak_lunas: {
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

  async down(queryInterface) {
    await queryInterface.dropTable("bukpot");
  },
};
