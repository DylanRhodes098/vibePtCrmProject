'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('PtMembers', [
    {
      id: '55555555-5555-5555-5555-555555555555',
      gymId: '11111111-1111-1111-1111-111111111111',
      ptId: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
      memberId: '33333333-3333-3333-3333-333333333333',
      notes: 'Initial consultation completed.',
      status: 'engaged',
      lastContactedAt: new Date('2024-03-20'),
      nextActionAt: new Date('2024-03-27'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '66666666-6666-6666-6666-666666666666',
      gymId: '22222222-2222-2222-2222-222222222222',
      ptId: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ac',
      memberId: '44444444-4444-4444-4444-444444444444',
      notes: 'Booked first PT session.',
      status: 'consult_booked',
      lastContactedAt: new Date('2024-04-05'),
      nextActionAt: new Date('2024-04-12'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('PtMembers', null, {});
}


