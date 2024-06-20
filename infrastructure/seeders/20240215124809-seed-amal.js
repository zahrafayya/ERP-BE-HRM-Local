"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "amal",
      [
        {
          pkid: 1,
          name: "Amal 1",
          amal_type: "Nominal",
          amal_amount: 1000000,
          tenant: 1,
        },
        {
          pkid: 2,
          name: "Amal 2",
          amal_type: "Percentage",
          amal_amount: 10,
          tenant: 1,
        },
        {
          pkid: 3,
          name: "Amal Tenant Baru",
          amal_type: "Percentage",
          amal_amount: 10,
          tenant: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("amal", null, {});
  },
};
