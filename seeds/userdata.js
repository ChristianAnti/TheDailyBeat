const { User } = require("../models");

const userdata = [
  {
    username: "Christian123",
    email: "christian@gmail.com",
    password: "Christian416",
  },
  {
    username: "Kieran123",
    email: "Kieran@gmail.com",
    password: "Kieran416",
  },
  {
    username: "Linda",
    email: "Linda@gmail.com",
    password: "Linda416",
  },
  {
    username: "Estefany",
    email: "Estefany@gmail.com",
    password: "Estefany416",
  },
  {
    username: "Luis",
    email: "Luis@gmail.com",
    password: "Luis416",
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;