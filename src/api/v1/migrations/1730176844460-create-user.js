/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uniqueId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      role: {
        type: Sequelize.INTEGER,
        defaultValue: 3,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emailVerificationToken: {
        type: Sequelize.STRING,
      },
      verified: { type: Sequelize.BOOLEAN, defaultValue: false },
      active: { type: Sequelize.BOOLEAN, defaultValue: false },
      resetPasswordToken: {
        type: Sequelize.STRING,
      },
      lastLogin: {
        type: Sequelize.DATE,
      },
      // vendor info start
      companyName: Sequelize.STRING,
      companyEmail: Sequelize.STRING,
      officeAddress: Sequelize.STRING,
      companyPhoto: Sequelize.STRING,
      officePhone: Sequelize.STRING,
      tssaAuthorizationNumber: Sequelize.STRING,
      tssaProLeUrl: Sequelize.STRING,
      tssaAuthorizationStartDate: Sequelize.DATE,
      tssaAuthorizationExpiryDate: Sequelize.DATE,
      hraiAuthorizationNumber: Sequelize.STRING,
      hraiProLeUrl: Sequelize.STRING,
      hraiAuthorizationStartDate: Sequelize.DATE,
      hraiAuthorizationExpiryDate: Sequelize.DATE,
      vendorVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
      // vendor info start
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
