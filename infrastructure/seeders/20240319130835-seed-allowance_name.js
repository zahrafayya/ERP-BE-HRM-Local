"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "allowance_name",
      [
        {
          pkid: 1,
          name: "Tunjangan Konsumsi",
          type: "Tunjangan PPh",
          tenant: 1,
        },
        {
          pkid: 2,
          name: "Tunjangan Transportasi",
          type: "Tunjangan PPh",
          tenant: 1,
        },
        {
          pkid: 3,
          name: "Uang THR",
          type: "Bonus",
          tenant: 1,
        },
        {
          pkid: 4,
          name: "Uang Tahunan",
          type: "Bonus",
          tenant: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("allowance_name", null, {});
  },
};
