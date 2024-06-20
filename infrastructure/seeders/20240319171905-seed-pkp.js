"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pkp",
      [
        {
          pkid: 1,
          pkp_min: 0,
          pkp_max: 60000000,
          tariff_percentage: 5,
          tenant: 1,
        },
        {
          pkid: 2,
          pkp_min: 60000001,
          pkp_max: 250000000,
          tariff_percentage: 15,
          tenant: 1,
        },
        {
          pkid: 3,
          pkp_min: 250000001,
          pkp_max: 500000000,
          tariff_percentage: 25,
          tenant: 1,
        },
        {
          pkid: 4,
          pkp_min: 500000001,
          pkp_max: 5000000000,
          tariff_percentage: 30,
          tenant: 1,
        },
        {
          pkid: 5,
          pkp_min: 5000000001,
          pkp_max: BigInt(Number.MAX_SAFE_INTEGER),
          tariff_percentage: 35,
          tenant: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pkp", null, {});
  },
};
