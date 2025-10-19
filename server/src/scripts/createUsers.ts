// npx ts-node src/scripts/createUsers.ts
import sequelize from "../configs/database";
import User from "../models/user";

const createSampleUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully.");

    const users = await User.bulkCreate([
      { name: "Nguyen Van A", password: "password123" },
      { name: "Tran Thi B", password: "password456" },
      { name: "Le Van C", password: "password789" },
    ]);

    console.log("Created users successfully:");
    users.forEach((user) => {
      console.log(`- ${user.id}: ${user.name}`);
    });
  } catch (error) {
    console.error("Error creating users:", error);
  } finally {
    await sequelize.close();
  }
};

createSampleUsers();
