'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Members', [
    {
      id: '33333333-3333-3333-3333-333333333333',
      gymId: '11111111-1111-1111-1111-111111111111',
      fullName: 'Charlie Client',
      email: 'charlie@example.com',
      phone: '555-0101',
      joinDate: new Date('2024-01-10'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '44444444-4444-4444-4444-444444444444',
      gymId: '22222222-2222-2222-2222-222222222222',
      fullName: 'Dana Member',
      email: 'dana@example.com',
      phone: '555-0102',
      joinDate: new Date('2024-02-15'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Members', null, {});
}


