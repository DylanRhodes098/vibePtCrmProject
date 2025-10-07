'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
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
    role: {
      type: Sequelize.ENUM('PT', 'ADMIN'),
      allowNull: false,
      defaultValue: 'PT',
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
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
  await queryInterface.dropTable('Users');
}


