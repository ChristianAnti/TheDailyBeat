const seedUser = require("./userdata")
const seedNotes = require("./notes")

const sequelize = require("../config/connection.js");

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log(" Database synced ! ")

    await seedUser();
    console.log(" Users seeded ! ")

    process.exit(0);
}