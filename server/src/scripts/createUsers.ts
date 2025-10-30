// npx ts-node src/scripts/createUsers.ts
import sequelize from "../configs/database";
import User from "../models/user";

const createSampleUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully.");

    await sequelize.sync({ alter: true });

    const users = await User.bulkCreate([
      { name: "admin", password: "admin123", role: "admin" },
      { name: "user", password: "user123", role: "user" },
      { name: "member", password: "member123", role: "member" },
    ]);

    console.log("Created users successfully:");
    users.forEach((user) => {
      console.log(`- ${user.id}: ${user.name} (${user.role})`);
    });
  } catch (error) {
    console.error("Error creating users:", error);
  } finally {
    await sequelize.close();
  }
};

createSampleUsers();
