const seedUser = require("./userData")
const seedNotes = require("./notes")

const sequelize = require("../config/connection.js");

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log(" Database synced ! ")

    await seedUser();
    console.log(" Users seeded ! ")

    await seedNotes();
    console.log(" Notes seeded ! ")

    process.exit(0);
};

seedAll();