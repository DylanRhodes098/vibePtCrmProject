// Import libraries //
import sequelize from "../lib/db.js";
import { Model, DataTypes } from "sequelize";

// Define TimeLine container for db //
export class TimeLine extends Model {}

// Initiate hot reloads function //
export const hotReloads = () => {
  if (sequelize.models.TimeLine) {
    return sequelize.models.TimeLine;
  }
};

if (!sequelize.models.TimeLine) {
  // Create columns for db using init //
  TimeLine.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      ptMemberId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "PtMembers",
          key: "id",
        },
      },
      type: {
        type: DataTypes.ENUM("note", "contacted", "consult_booked", "session"),
        defaultValue: "note",
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "TimeLine",
      tableName: "TimeLines",
      freezeTableName: true,
      underscored: false,
      timestamps: true, // adds createdAt and updatedAt
    }
  );
}

export default TimeLine;


