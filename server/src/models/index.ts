import sequelize from "../configs/database";
import Task from "./task";
import User from "./user";
import Member from "./member";

const models = {
  Task,
  User,
  Member,
  sequelize,
};

export default models;
