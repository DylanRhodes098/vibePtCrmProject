// Import libraries //
import sequelize from "../lib/db.js";
import { Model, DataTypes } from "sequelize";

// Define PtMember container for db //
export class PtMember extends Model {}

// Initiate hot reloads function //
export const hotReloads = () => {
  if (sequelize.models.PtMember) {
    return sequelize.models.PtMember;
  }
};

if (!sequelize.models.PtMember) {
  // Create columns for db using init //
  PtMember.init(
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
      ptId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      memberId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Members",
          key: "id",
        },
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("new", "engaged", "consult_booked", "client", "lost"),
        allowNull: false,
        defaultValue: "new",
      },
      lastContactedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      nextActionAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PtMember",
      tableName: "PtMembers",
      freezeTableName: true,
      underscored: false,
      timestamps: true, // adds createdAt and updatedAt
      indexes: [
        {
          unique: true,
          fields: ["ptId", "memberId"],
          name: "uniq_pt_member",
        },
      ],
    }
  );
}

export default PtMember;


