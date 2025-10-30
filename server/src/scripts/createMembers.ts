// npx ts-node src/scripts/createMembers.ts
import Member from "../models/member";
import sequelize from "../configs/database";

const createSampleMembers = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully.");

    await sequelize.sync();
    console.log("Database synced.");

    const members = await Member.bulkCreate([
      { name: "Hai Anh", password: "password123", email: "anh@gmail.com" },
      { name: "Van Binh", password: "password456", email: "jane@gmail.com" },
      { name: "Tran Huy", password: "password789", email: "huy@gmail.com" },
    ]);

    console.log("Created members successfully:");
    members.forEach((member) => {
      console.log(`- ${member.id}: ${member.name} (${member.email})`);
    });
  } catch (error) {
    console.error("Error creating members:", error);
  } finally {
    await sequelize.close();
  }
};

createSampleMembers();
