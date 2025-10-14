"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./configs/database"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello from TypeScript + Express!");
});
database_1.default
    .authenticate()
    .then(() => {
    console.log("Database connection has been established successfully.");
    return database_1.default.sync();
})
    .then(() => {
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
})
    .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
