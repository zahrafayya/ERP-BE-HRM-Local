"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("day_off", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("day_off");
  },
};
