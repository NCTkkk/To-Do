import sequelize from "../configs/database";
import Task from "./task";
import User from "./user";

// Define any associations here if needed
// For example:
// User.hasMany(Task);
// Task.belongsTo(User);

const models = {
  Task,
  User,
  sequelize,
};

export default models;
