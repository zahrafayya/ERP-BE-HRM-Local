"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ter_pph", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
      },
      ter_category: {
        allowNull: false,
        type: DataTypes.ENUM("A", "B", "C"),
      },
      income_min: {
        type: DataTypes.BIGINT,
      },
      income_max: {
        type: DataTypes.BIGINT,
      },
      ter_pct: {
        type: DataTypes.FLOAT,
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("ter_pph");
  },
};
