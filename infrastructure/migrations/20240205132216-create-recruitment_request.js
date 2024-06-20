"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recruitment_request", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      position_id: {
        allowNull: true,
        type: DataTypes.BIGINT,
        references: {
          model: "position",
          key: "pkid",
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      needed_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Open", "Closed"),
        allowNull: false,
        defaultValue: "Open",
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("recruitment_request");
  },
};
