"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "family_member",
      [
        {
          pkid: 1,
          nik: "3204190104990001",
          employee_id: 1,
          name: "Abiel",
          role: "Istri",
          education: "S1",
          date_of_birth: "1999-01-01",
          is_working: true,
          tenant: 1,
        },
        {
          pkid: 2,
          nik: "6408160405990002",
          employee_id: 1,
          name: "Ana",
          role: "Anak Kandung Perempuan",
          education: "SMP",
          date_of_birth: "1999-01-01",
          is_working: false,
          tenant: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("family_member", null, {});
  },
};
