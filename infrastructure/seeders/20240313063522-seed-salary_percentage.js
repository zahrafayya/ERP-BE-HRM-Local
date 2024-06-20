"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "salary_percentage",
      [
        {
          pkid: 1,
          bpjs_kesehatan_type: "Percentage",
          bpjs_kesehatan_perusahaan: 4,
          // bpjs_kesehatan_perusahaan_percentage_max: 120000,
          bpjs_kesehatan_pribadi: 1,
          // bpjs_kesehatan_pribadi_percentage_max: 120000,
          is_adding_bpjs_kesehatan: true,
          bpjs_ketenagakerjaan_jht_type: "Percentage",
          bpjs_ketenagakerjaan_jht_perusahaan: 3.7,
          // bpjs_ketenagakerjaan_jht_perusahaan_percentage_max: 100000,
          bpjs_ketenagakerjaan_jht_pribadi: 1,
          // bpjs_ketenagakerjaan_jht_pribadi_percentage_max: 100000,
          is_adding_bpjs_ketenagakerjaan_jht: true,
          bpjs_ketenagakerjaan_jkk_type: "Percentage",
          bpjs_ketenagakerjaan_jkk_perusahaan: 0.24,
          // bpjs_ketenagakerjaan_jkk_perusahaan_percentage_max: 0,
          is_adding_bpjs_ketenagakerjaan_jkk: false,
          bpjs_ketenagakerjaan_jkm_type: "Percentage",
          bpjs_ketenagakerjaan_jkm_perusahaan: 0.3,
          // bpjs_ketenagakerjaan_jkm_perusahaan_percentage_max: 100000,
          is_adding_bpjs_ketenagakerjaan_jkm: true,
          bpjs_ketenagakerjaan_jp_type: "Percentage",
          bpjs_ketenagakerjaan_jp_perusahaan: 2,
          // bpjs_ketenagakerjaan_jp_perusahaan_percentage_max: 100000,
          bpjs_ketenagakerjaan_jp_pribadi: 1,
          // bpjs_ketenagakerjaan_jp_pribadi_percentage_max: 100000,
          is_adding_bpjs_ketenagakerjaan_jp: true,
          tenant: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("salary_percentage", null, {});
  },
};
