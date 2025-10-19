// npx ts-node src/scripts/createAdmins.ts
import Admin from "../models/admin";
import sequelize from "../configs/database";

const createSampleAdmins = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully.");

    await sequelize.sync();
    console.log("Database synced.");

    const admins = await Admin.bulkCreate([
      { name: "Admin One", password: "adminpass1", email: "ad1@gmail.com" },
      { name: "Admin Two", password: "adminpass2", email: "ad2@gmail.com" },
      { name: "Admin Three", password: "adminpass3", email: "ad3@gmail.com" },
    ]);
    console.log("Created admins successfully:");
    admins.forEach((admin) => {
      console.log(`- ${admin.id}: ${admin.name} (${admin.email})`);
    });
  } catch (error) {
    console.error("Error creating admins:", error);
  } finally {
    await sequelize.close();
  }
};

createSampleAdmins();
