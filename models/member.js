// Import libraries //
import sequelize from "../lib/db.js";
import { Model, DataTypes } from "sequelize";

// Define Member container for db //
export class Member extends Model {}

// Initiate hot reloads function //
export const hotReloads = () => {
  if (sequelize.models.Member) {
    return sequelize.models.Member;
  }
};

if (!sequelize.models.Member) {
  // Create columns for db using init //
  Member.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      gymId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Gyms",
          key: "id",
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      joinDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Member",
      tableName: "Members",
      freezeTableName: true,
      underscored: false,
      timestamps: true, // adds createdAt and updatedAt
    }
  );
}

export default Member;


