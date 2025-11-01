import sequelize from "../configs/database";
import Task from "./task";
import User from "./user";

const models = {
  Task,
  User,

  sequelize,
};

export default models;
