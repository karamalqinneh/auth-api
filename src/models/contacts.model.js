const Contact = (sequelize, dataTypes) =>
  sequelize.define("contact", {
    firstName: {
      type: dataTypes.STRING,
      // allowNull: false,
    },
    lastName: {
      type: dataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
    },
    phoneNumber: {
      type: dataTypes.INTEGER,
    },
  });

module.exports = Contact;
