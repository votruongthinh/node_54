
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mysql://root:123456@localhost:3307/cyber_community");

try {
    await sequelize.authenticate();
    console.log("✅ [SEQUELIZE] Connection has been established successfully.");
} catch (error) {
    console.error("❌ Unable to connect to the database:", error);
}

export default sequelize