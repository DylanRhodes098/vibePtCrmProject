'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Members', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    gymId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Gyms',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    joinDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Members');
}


