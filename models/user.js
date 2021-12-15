const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: { // have to configure the model to match for both the passport and frontend // add valadation 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        console.log("trying to hash password");
        newUserData.password = await bcrypt.hash(newUserData.password, 13);
        console.log("finish hash password");
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        console.log("before update");
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 13);
        console.log("after update");
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
