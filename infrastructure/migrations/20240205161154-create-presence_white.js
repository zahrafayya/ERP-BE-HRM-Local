"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("presence_white", {
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
      presence: {
        allowNull: false,
        type: DataTypes.ENUM("Izin", "Hadir"),
      },
      date: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      check_in: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      check_out: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      event_description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      ...initBaseAttributes(),
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("presence_white");
  },
};
