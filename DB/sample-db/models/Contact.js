const { DataTypes } = require("sequelize");
const {sampleDB} = require("../../../services/database.service")

const Contact = sampleDB.connection.define("Contact", {
  lastname: DataTypes.STRING,
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patronymic: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
}, {
  tableName: "contacts",
  timestamps: true,
  validate: {
    validate() {
      if (!this.phone && !this.email) {
        throw new Error("Phone number or email is required");
      }
    }
  }
})

Contact.associate = (models) => {
  Contact.belongsTo(
    models.Company,
    {
      foreignKey: "company_id",
      allowNull: false,
    }
  )
}

module.exports = Contact;
