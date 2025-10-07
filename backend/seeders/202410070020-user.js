'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Users', [
    {
      id: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
      gymId: '11111111-1111-1111-1111-111111111111',
      role: 'PT',
      fullName: 'James Barret',
      email: 'jamesbarret@gmail.com',
      avatar: null,
      password: '$2a$10$abcdefghijklmnopqrstuv',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ac',
      gymId: '22222222-2222-2222-2222-222222222222',
      role: 'PT',
      fullName: 'Alice Example',
      email: 'alice@example.com',
      avatar: null,
      password: '$2a$10$abcdefghijklmnopqrstuv',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}


