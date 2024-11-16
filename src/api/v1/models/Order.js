const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'customerId',
        as: 'customer',
        onDelete: 'SET NULL',
      });

      Order.belongsTo(models.User, {
        foreignKey: 'adminId',
        as: 'admin',
        onDelete: 'SET NULL',
      });

      Order.belongsTo(models.User, {
        foreignKey: 'vendorId',
        as: 'vendor',
        onDelete: 'SET NULL',
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      adminId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      vendorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      tax: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      shippingCharge: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      address: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      variants: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      billingAddress: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      paymentInfo: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      shippingMethod: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('ordered', 'delivering', 'delivered', 'cancel'),
        defaultValue: 'ordered',
      },
    },
    {
      sequelize,
      modelName: 'Order',
      timestamps: true,
      paranoid: false,
    },
  );

  return Order;
};
