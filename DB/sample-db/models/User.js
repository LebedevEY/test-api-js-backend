const { DataTypes } = require("sequelize");
const {sampleDB} = require("../../../services/database.service")

const db = sampleDB.connection;

const User = db.define("User", {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: "users",
  timestamps: true,
})

module.exports = User;
