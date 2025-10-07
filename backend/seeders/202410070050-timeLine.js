'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('TimeLines', [
    {
      id: '77777777-7777-7777-7777-777777777777',
      ptMemberId: '55555555-5555-5555-5555-555555555555',
      type: 'note',
      body: 'Discussed nutrition plan.',
      createdBy: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '88888888-8888-8888-8888-888888888888',
      ptMemberId: '66666666-6666-6666-6666-666666666666',
      type: 'contacted',
      body: 'Confirmed session schedule.',
      createdBy: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ac',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('TimeLines', null, {});
}


