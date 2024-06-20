const { DataTypes, Sequelize } = require("sequelize");

function initBaseAttributes() {
  return {
    tenant: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    created_host: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "localhost",
    },
    updated_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_host: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deleted_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    deleted_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_host: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };
}

module.exports = { initBaseAttributes };
