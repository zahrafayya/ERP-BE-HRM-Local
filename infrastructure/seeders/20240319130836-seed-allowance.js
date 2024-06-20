'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
    await queryInterface.bulkInsert('allowance', [
      {
        pkid: 1,
        ss_id: 'SEED01',
        allowance_name_id: 1,
        amount: 5000,
      },
      {
        pkid: 2,
        ss_id: 'SEED01',
        allowance_name_id: 2,
        amount: 15000,
      },
      {
        pkid: 3,
        ss_id: 'SEED02',
        allowance_name_id: 1,
        amount: 22000,
      },
    ], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('allowance', null, {});
  }
};
