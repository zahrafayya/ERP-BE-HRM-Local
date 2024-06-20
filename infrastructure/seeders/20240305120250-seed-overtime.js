"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "overtime",
      [
        {
          pkid: 1,
          type: "Hari kerja",
          jam_pertama: 1,
          overtime_rate_ph: 1.5,
          overtime_rate_type: "Percentage",
          tenant: 1,
        },
        {
          pkid: 2,
          type: "Hari kerja",
          jam_pertama: 2147483647,
          overtime_rate_ph: 2,
          overtime_rate_type: "Percentage",
          tenant: 1,
        },
        {
          pkid: 3,
          type: "Hari libur",
          jam_pertama: 8,
          overtime_rate_ph: 2,
          overtime_rate_type: "Percentage",
          tenant: 1,
        },
        {
          pkid: 4,
          type: "Hari libur",
          jam_pertama: 9,
          overtime_rate_ph: 3,
          overtime_rate_type: "Percentage",
          tenant: 1,
        },
        {
          pkid: 5,
          type: "Hari libur",
          jam_pertama: 2147483647,
          overtime_rate_ph: 4,
          overtime_rate_type: "Percentage",
          tenant: 1,
        },
        {
          pkid: 6,
          type: "Hari libur nasional",
          jam_pertama: 5,
          overtime_rate_ph: 2,
          overtime_rate_type: "Percentage",
          tenant: 1,
        },
        {
          pkid: 7,
          type: "Hari libur nasional",
          jam_pertama: 6,
          overtime_rate_ph: 3,
          overtime_rate_type: "Percentage",
          tenant: 1,
        },
        {
          pkid: 8,
          type: "Hari libur nasional",
          jam_pertama: 2147483647,
          overtime_rate_ph: 4,
          overtime_rate_type: "Percentage",
          tenant: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("overtime", null, {});
  },
};
