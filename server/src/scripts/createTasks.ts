// npx ts-node src/scripts/createTasks.ts
import Task from "../models/task";
import sequelize from "../configs/database";

const createSampleTasks = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log("Connected to database successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database synced successfully.");

    // Create tasks
    const tasks = await Task.bulkCreate([
      {
        title: "ngủ",
        description: "",
        completed: false,
        userId: "05cbf6ae-829b-4421-8cf9-9caa4a4a800a",
        priority: "high",
        status: "in-progress",
        dueDate: new Date("2026-10-30"),
        assignedTo: "591686ed-de0d-4abd-a846-42ca6406de01",
      },
      {
        title: "ăn",
        description: "",
        completed: false,
        userId: "05cbf6ae-829b-4421-8cf9-9caa4a4a800a",
        priority: "medium",
        status: "todo",
        dueDate: new Date("2026-11-05"),
        assignedTo: "591686ed-de0d-4abd-a846-42ca6406de01",
      },
    ]);

    console.log("Created tasks successfully:");
    tasks.forEach((task) => {
      console.log(`- ${task.id}: ${task.title}`);
    });
  } catch (error) {
    console.error("Error creating tasks:", error);
  } finally {
    // Close database connection
    await sequelize.close();
  }
};

// Run the script
createSampleTasks();
