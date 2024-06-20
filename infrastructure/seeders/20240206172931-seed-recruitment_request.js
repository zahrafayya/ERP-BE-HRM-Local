"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "recruitment_request",
      [
        {
          pkid: 1,
          position_id: 1,
          needed_number: 3,
          status: "Closed",
          tenant: 1,
        },
        {
          pkid: 2,
          position_id: 2,
          needed_number: 4,
          status: "Closed",
          tenant: 1,
        },
        {
          pkid: 3,
          position_id: 3,
          needed_number: 20,
          status: "Open",
          tenant: 1,
        },
        {
          pkid: 4,
          position_id: 4,
          needed_number: 20,
          status: "Open",
          tenant: 1,
        },
        {
          pkid: 5,
          position_id: 5,
          needed_number: 20,
          status: "Open",
          tenant: 1,
        },
        {
          pkid: 6,
          position_id: 6,
          needed_number: 100,
          status: "Open",
          tenant: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recruitment_request", null, {});
  },
};
