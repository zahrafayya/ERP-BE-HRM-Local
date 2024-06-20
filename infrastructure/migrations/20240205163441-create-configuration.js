"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("configuration", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      white_start_time: {
        type: DataTypes.TIME,
      },
      white_work_duration: {
        type: DataTypes.TIME,
      },
      white_working_days_per_week: {
        type: DataTypes.BIGINT,
      },
      white_is_penalty_given: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      white_late_time_tolerance: {
        allowNull: true,
        type: DataTypes.TIME,
      },
      white_late_salary_penalty_ph: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      white_late_salary_penalty_type: {
        allowNull: true,
        type: DataTypes.ENUM("Percentage", "Nominal"),
      },
      blue_is_penalty_given: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      blue_late_time_tolerance: {
        allowNull: true,
        type: DataTypes.TIME,
      },
      blue_late_salary_penalty_ph: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      blue_late_salary_penalty_type: {
        allowNull: true,
        type: DataTypes.ENUM("Percentage", "Nominal"),
      },
      ...initBaseAttributes(),
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("configuration");
  },
};
