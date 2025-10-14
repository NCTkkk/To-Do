import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/database";

class Task extends Model {
  public id!: string;
  public title!: string;
  public completed!: boolean;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;
