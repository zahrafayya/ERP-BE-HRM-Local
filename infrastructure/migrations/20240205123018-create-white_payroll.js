"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("white_payroll", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      nama_golongan: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tahun_0: {
        type: DataTypes.INTEGER,
      },
      tahun_1: {
        type: DataTypes.INTEGER,
      },
      tahun_2: {
        type: DataTypes.INTEGER,
      },
      tahun_3: {
        type: DataTypes.INTEGER,
      },
      tahun_4: {
        type: DataTypes.INTEGER,
      },
      tahun_5: {
        type: DataTypes.INTEGER,
      },
      tahun_6: {
        type: DataTypes.INTEGER,
      },
      tahun_7: {
        type: DataTypes.INTEGER,
      },
      tahun_8: {
        type: DataTypes.INTEGER,
      },
      tahun_9: {
        type: DataTypes.INTEGER,
      },
      tahun_10: {
        type: DataTypes.INTEGER,
      },
      tahun_11: {
        type: DataTypes.INTEGER,
      },
      tahun_12: {
        type: DataTypes.INTEGER,
      },
      tahun_13: {
        type: DataTypes.INTEGER,
      },
      tahun_14: {
        type: DataTypes.INTEGER,
      },
      tahun_15: {
        type: DataTypes.INTEGER,
      },
      tahun_16: {
        type: DataTypes.INTEGER,
      },
      tahun_17: {
        type: DataTypes.INTEGER,
      },
      tahun_18: {
        type: DataTypes.INTEGER,
      },
      tahun_19: {
        type: DataTypes.INTEGER,
      },
      tahun_20: {
        type: DataTypes.INTEGER,
      },
      tahun_21: {
        type: DataTypes.INTEGER,
      },
      tahun_22: {
        type: DataTypes.INTEGER,
      },
      tahun_23: {
        type: DataTypes.INTEGER,
      },
      tahun_24: {
        type: DataTypes.INTEGER,
      },
      tahun_25: {
        type: DataTypes.INTEGER,
      },
      tahun_26: {
        type: DataTypes.INTEGER,
      },
      tahun_27: {
        type: DataTypes.INTEGER,
      },
      tahun_28: {
        type: DataTypes.INTEGER,
      },
      tahun_29: {
        type: DataTypes.INTEGER,
      },
      tahun_30: {
        type: DataTypes.INTEGER,
      },
      tahun_31: {
        type: DataTypes.INTEGER,
      },
      tahun_32: {
        type: DataTypes.INTEGER,
      },
      tahun_33: {
        type: DataTypes.INTEGER,
      },
      ...initBaseAttributes(),
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("white_payroll");
  },
};
