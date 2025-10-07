'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('TimeLines', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    ptMemberId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'PtMembers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    type: {
      type: Sequelize.ENUM('note', 'contacted', 'consult_booked', 'session'),
      allowNull: false,
      defaultValue: 'note',
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    createdBy: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
  await queryInterface.dropTable('TimeLines');
}


