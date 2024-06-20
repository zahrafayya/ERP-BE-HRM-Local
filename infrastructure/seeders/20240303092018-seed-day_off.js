"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "day_off",
      [
        {
          pkid: 1,
          date: "2024-02-01 00:00:00",
          tenant: 1,
        },
        {
          pkid: 2,
          date: "2024-02-13 00:00:00",
          tenant: 1,
        },
        {
          pkid: 3,
          date: "2024-02-13 00:00:00",
          tenant: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("day_off", null, {});
  },
};
