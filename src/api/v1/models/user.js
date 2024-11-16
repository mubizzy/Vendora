const { Model } = require('sequelize');
const { hashPassword } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uniqueId: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'First name is required' },
          notEmpty: { msg: 'First name is required' },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Last name is required' },
          notEmpty: { msg: 'Last name is required' },
        },
      },
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: 'Name in use' },
        validate: {
          notNull: { msg: 'Email is required' },
          notEmpty: { msg: 'Email is required' },
          isEmail: { msg: 'Invalid email' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: 'Password is required' },
          len: {
            args: [6, 64],
            msg: 'Password should be between 6 and 64 characters long',
          },
        },
      },
      emailVerificationToken: {
        type: DataTypes.STRING,
      },
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      active: { type: DataTypes.BOOLEAN, defaultValue: false },
      resetPasswordToken: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      lastLogin: {
        type: DataTypes.DATE,
      },
      role: { type: DataTypes.INTEGER, defaultValue: 3 },
      companyName: DataTypes.STRING,
      companyEmail: DataTypes.STRING,
      officeAddress: DataTypes.STRING,
      companyPhoto: DataTypes.STRING,
      officePhone: DataTypes.STRING,
      tssaAuthorizationNumber: DataTypes.STRING,
      tssaProLeUrl: DataTypes.STRING,
      tssaAuthorizationStartDate: DataTypes.DATE,
      tssaAuthorizationExpiryDate: DataTypes.DATE,
      hraiAuthorizationNumber: DataTypes.STRING,
      hraiProLeUrl: DataTypes.STRING,
      hraiAuthorizationStartDate: DataTypes.DATE,
      hraiAuthorizationExpiryDate: DataTypes.DATE,
      vendorVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
      hooks: {
        afterValidate: async (record) => {
          const user = record;
          const password = user.getDataValue('password');
          const changed = user.changed('password');

          if (password && changed && !user.hashedPassword) {
            const hashedPassword = await hashPassword(password);
            user.setDataValue('password', hashedPassword);
            user.hashedPassword = true;
          }
        },
      },
    },
  );

  return User;
};
