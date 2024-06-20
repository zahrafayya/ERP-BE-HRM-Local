"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "position",
      [
        {
          pkid: 1,
          department_id: 1,
          name: "Pemotong Bukpot",
          description:
            "Pemotong bukti potong para pegawai setiap akhir masa kerja dalam satu tahun",
          type: "White",
          tunjangan_tetap: 1000000,
          white_payroll_id: 6,
          white_is_pemotong_bukpot: true,
          tenant: 1,
        },
        {
          pkid: 2,
          department_id: 2,
          name: "White Seeder",
          type: "White",
          tunjangan_tetap: 2500000,
          white_payroll_id: 10,
          tenant: 1,
        },
        {
          pkid: 3,
          department_id: 2,
          name: "Blue Seeder 1",
          type: "Blue",
          blue_cost_ph: 10653.125,
          tenant: 1,
        },
        {
          pkid: 4,
          department_id: 2,
          name: "Blue Seeder 2",
          type: "Blue",
          blue_cost_ph: 9755,
          tenant: 1,
        },
        {
          pkid: 5,
          department_id: 2,
          name: "Blue Seeder 3",
          type: "Blue",
          blue_cost_ph: 10062.5,
          tenant: 1,
        },
        {
          pkid: 6,
          department_id: 3,
          name: "Blue Tenant Baru",
          type: "Blue",
          blue_cost_ph: 10062.5,
          tenant: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("position", null, {});
  },
};
