const { DataTypes } = require("sequelize");
const {sampleDB} = require("../../../services/database.service")

const db = sampleDB.connection;

const Company = db.define("Company", {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  shortName: DataTypes.STRING,
  businessEntity: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  type: {
    defaultValue: [],
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  address: DataTypes.STRING,
}, {
  tableName: "companies",
  timestamps: true
})

Company.associate = (models) => {
  Company.hasOne(
    models.Contact,
    {
      foreignKey: "company_id",
      onDelete: "CASCADE",
      as: "contact",
    }
  );
}

module.exports = Company;
