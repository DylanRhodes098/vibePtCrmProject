'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('PtMembers', {
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
    ptId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    memberId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Members',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM('new', 'engaged', 'consult_booked', 'client', 'lost'),
      allowNull: false,
      defaultValue: 'new',
    },
    lastContactedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    nextActionAt: {
      type: Sequelize.DATE,
      allowNull: true,
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

  await queryInterface.addConstraint('PtMembers', {
    fields: ['ptId', 'memberId'],
    type: 'unique',
    name: 'uniq_pt_member',
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('PtMembers');
}


