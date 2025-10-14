"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("todo_db", "root", "07032002", {
    host: "localhost",
    dialect: "mysql",
    logging: true,
});
exports.default = sequelize;
