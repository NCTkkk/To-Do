import sequelize from "../configs/database";
import Task from "./task";
import User from "./user";
import Member from "./member";
import Admin from "./admin";

const models = {
  Task,
  User,
  Member,
  Admin,
  sequelize,
};

export default models;
