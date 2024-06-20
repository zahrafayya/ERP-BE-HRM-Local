"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "asuransi",
      [
        {
          pkid: 1,
          name: "Asuransi 1",
          asuransi_type: "Percentage",
          asuransi_amount: 3,
          tenant: 1,
        },
        {
          pkid: 2,
          name: "Asuransi Tenant Baru",
          asuransi_type: "Percentage",
          asuransi_amount: 3,
          tenant: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("asuransi", null, {});
  },
};
