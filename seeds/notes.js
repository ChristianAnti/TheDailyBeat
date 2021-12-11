// might not need kinda just made cause Im dumb

const { Notes } = require("../models");

const notesData = [
    {
        note: "get to the store before it closes"
    }
];

const seedNotes = () => notes.bulkCreate(notesData);

module.exports = seedNotes;