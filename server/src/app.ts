import dotenv from "dotenv";
dotenv.config();

import express from "express";
import models from "./models";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Base route
app.get("/", (req, res) => {
  res.send("Hello from TypeScript + Express!");
});

// API routes
app.use("/api", routes);

models.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    return models.sequelize.sync(); // ensure table is created/updated
  })
  .then(() => {
    app.listen(3000, () =>
      console.log("Server running on http://localhost:3000")
    );
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });
