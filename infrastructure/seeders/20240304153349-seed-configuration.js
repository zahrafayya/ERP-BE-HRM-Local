"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "configuration",
      [
        {
          pkid: 1,
          white_start_time: "07:00",
          white_work_duration: "08:00",
          white_working_days_per_week: 5,
          white_is_penalty_given: true,
          white_late_time_tolerance: "00:15",
          white_late_salary_penalty_ph: 10000,
          white_late_salary_penalty_type: "Nominal",
          blue_is_penalty_given: false,
          blue_late_time_tolerance: "00:05",
          blue_late_salary_penalty_ph: 800,
          blue_late_salary_penalty_type: "Nominal",
          tenant: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("configuration", null, {});
  },
};
