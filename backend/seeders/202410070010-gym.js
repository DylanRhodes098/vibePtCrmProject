'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Gyms', [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Vibe Fitness',
      brand_theme_json: JSON.stringify({ primary: '#0ea5e9', secondary: '#1f2937' }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Momentum Gym',
      brand_theme_json: JSON.stringify({ primary: '#22c55e', secondary: '#0f172a' }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Gyms', null, {});
}


