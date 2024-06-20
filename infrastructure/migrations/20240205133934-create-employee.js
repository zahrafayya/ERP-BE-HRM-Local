"use strict";

const { DataTypes } = require("sequelize");
const { initBaseAttributes } = require("../interfaces/baseMigration");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employee", {
      pkid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        unique: true,
      },

      req_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "recruitment_request",
          key: "pkid",
        },
      },

      position_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "position",
          key: "pkid",
        },
      },

      ptkp_id: {
        allowNull: true,
        type: DataTypes.BIGINT,
        references: {
          model: "ptkp",
          key: "pkid",
        },
      },
      updated_ptkp_id: {
        allowNull: true,
        type: DataTypes.BIGINT,
      },
      updated_ptkp_status: {
        type: DataTypes.ENUM(
          "Tidak ada pengajuan",
          "Diajukan",
          "Ada isu",
          "Terverifikasi"
        ),
        defaultValue: "Tidak ada pengajuan",
      },
      updated_ptkp_year: DataTypes.INTEGER,
      updated_ptkp_issue: DataTypes.STRING,
      amal_id: {
        allowNull: true,
        type: DataTypes.BIGINT,
        references: {
          model: "amal",
          key: "pkid",
        },
      },
      asuransi_id: {
        allowNull: true,
        type: DataTypes.BIGINT,
        references: {
          model: "asuransi",
          key: "pkid",
        },
      },

      // Data Penting
      email: DataTypes.STRING,
      nip: DataTypes.STRING,
      npwp: DataTypes.STRING, // Nomor Pokok Wajib Pajak
      nik: DataTypes.STRING, // Nomor Induk Kependudukan
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Laki-laki", "Perempuan"),
        allowNull: false,
      },
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      country_code: {
        type: DataTypes.STRING,
      },
      education: {
        type: DataTypes.ENUM(
          "Tidak sekolah",
          "SD",
          "SMP",
          "SMA/SMK",
          "D1/D2",
          "D3",
          "S1",
          "S2",
          "S3"
        ),
      },
      signature_url: DataTypes.STRING,
      kartu_keluarga_url: DataTypes.STRING,
      verification_state: {
        type: DataTypes.ENUM(
          "Belum diajukan",
          "Diajukan",
          "Ada isu",
          "Terverifikasi"
        ),
        defaultValue: "Belum diajukan",
      },
      verification_issue: DataTypes.STRING,
      active_status: {
        type: DataTypes.ENUM("Aktif", "Cuti", "Putus Kerja"),
        defaultValue: "Aktif",
      },
      inactive_since: {
        type: DataTypes.DATE,
      },
      join_date: DataTypes.DATE,
      ...initBaseAttributes(),
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("employee");
  },
};
