import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo_db", "root", "07032002", {
  host: "localhost",
  dialect: "mysql",
  logging: true,
});

export default sequelize;
