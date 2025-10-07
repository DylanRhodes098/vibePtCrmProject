// Import libraries //
import sequelize from "../lib/db.js";
import { Model, DataTypes } from "sequelize";

// Define Gym container for db //
export class Gym extends Model {}

// Initiate hot reloads function //
export const hotReloads = () => {
  if (sequelize.models.Gym) {
    return sequelize.models.Gym;
  }
};

if (!sequelize.models.Gym) {
  // Create columns for db using init //
  Gym.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      brand_theme_json: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Gym",
      tableName: "Gyms",
      freezeTableName: true,
      underscored: false,
      timestamps: true, // adds createdAt and updatedAt
    }
  );
}

export default Gym;


