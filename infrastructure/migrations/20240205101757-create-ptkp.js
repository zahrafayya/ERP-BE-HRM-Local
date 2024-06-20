"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ptkp", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      code: {
        unique: true,
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      is_married: {
        type: DataTypes.BOOLEAN,
        unique: "compositeIndex",
      },
      is_wife: {
        type: DataTypes.BOOLEAN,
        unique: "compositeIndex",
      },
      tanggungan: {
        type: DataTypes.INTEGER,
        unique: "compositeIndex",
      },
      ter_category: {
        allowNull: true,
        type: DataTypes.ENUM("A", "B", "C"),
      },
      amount: {
        type: DataTypes.BIGINT,
      },
      tunjangan_tetap: {
        type: DataTypes.BIGINT,
      },
      ...initBaseAttributes(),
    });

    await queryInterface.addConstraint("ptkp", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      fields: ["is_married", "is_wife", "tanggungan"],
      type: "unique",
      name: "compositeIndexUnique",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("ptkp");
  },
};
