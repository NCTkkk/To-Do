// npx ts-node src/scripts/createUsers.ts
import Task from "../models/task";
import sequelize from "../configs/database";

const createSampleTasks = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log("Connected to database successfully.");

    // Create tasks
    const tasks = await Task.bulkCreate([
      {
        title: "Học Node.js",
        completed: false,
      },
      {
        title: "Học Express",
        completed: false,
      },
      {
        title: "Học TypeScript",
        completed: false,
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
