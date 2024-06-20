"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("presence_blue", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employee",
          key: "pkid",
        },
      },
      req_man_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      presence: {
        allowNull: false,
        type: DataTypes.ENUM("Alfa", "Izin", "Hadir"),
      },
      check_in: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      check_out: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      actual_check_in: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      actual_check_out: {
        type: DataTypes.DATE,
      },
      event_description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      is_recapped_in_salary_slip: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("presence_blue");
  },
};
