import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../configs/database";
import User from "./user";
import { v4 as uuidv4 } from "uuid";

interface TaskAttributes {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  assignedTo?: string | null;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: string;
  public title!: string;
  public description?: string;
  public completed!: boolean;
  public userId!: string;
  public priority!: "low" | "medium" | "high";
  public status!: "todo" | "in-progress" | "done";
  public dueDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public assignedTo?: string | null;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "users", key: "id" },
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    status: {
      type: DataTypes.ENUM("todo", "in-progress", "done"),
      defaultValue: "todo",
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "tasks",
  }
);

Task.belongsTo(User, { foreignKey: "userId", as: "user" });
Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });

User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
User.hasMany(Task, { foreignKey: "assignedTo", as: "assignedTasks" });

export default Task;
