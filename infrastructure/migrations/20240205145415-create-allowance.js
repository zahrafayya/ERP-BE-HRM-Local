"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("allowance", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      ss_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "salary_slip",
          key: "pkid",
        },
      },
      allowance_name_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "allowance_name",
          key: "pkid",
        },
      },
      amount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("allowance");
  },
};
