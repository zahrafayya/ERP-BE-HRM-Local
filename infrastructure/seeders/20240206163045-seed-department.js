"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "department",
      [
        {
          pkid: 1,
          name: "Akuntansi",
          description:
            "Departemen yang bertugas untuk mengurusi perihal akuntansi perusahaan",
          tenant: 1,
        },
        {
          pkid: 2,
          name: "Departemen Seeder",
          tenant: 1,
        },
        {
          pkid: 3,
          name: "Departemen Seeder Tenant 2",
          tenant: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("department", null, {});
  },
};
