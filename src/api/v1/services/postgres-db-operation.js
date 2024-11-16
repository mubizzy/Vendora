/* eslint-disable lines-between-class-members */
const db = require('../models');
const helpers = require('../helpers');
const utils = require('../utils');

class PostgresDbOperation {
  static Sequelize = db.Sequelize;
  static sequelize = db.sequelize;
  static User = db.User;
  static Category = db.Category;
  static SubCategory = db.SubCategory;
  static Product = db.Product;
  static ProductVariant = db.ProductVariant;
  static Subscription = db.Subscription;
  static Cart = db.Cart;
  static Address = db.Address;
  static ShippingMethod = db.ShippingMethod;
  static Order = db.Order;
  static Tax = db.Tax;
  static Coupon = db.Coupon;
  static Review = db.Review;
  static VendorProduct = db.VendorProduct;
  static VendorVariant = db.VendorVariant;
  static Setting = db.Setting;

  static async findOne(Model, queryKeys = {}, options = {}) {
    const query = helpers.queryBuilder(queryKeys, options);
    const instance = await Model.findOne(query);
    if (!instance) return { instance: null, data: null };
    const data = utils.deleteObjectPropery(instance.get(), options.exclude);
    return { instance, data };
  }

  static async findAndCountAll(Model, payload = {}) {
    const {
      page = 1,
      limit = 10,
      q = '',
      searchItems = [],
      sort = [],
      all = false,
      include = [],
      exclude = [],
      distinct = true,
    } = payload;

    const keysToExclude = [
      'page',
      'limit',
      'q',
      'all',
      'sort',
      'searchItems',
      'exclude',
      'include',
      'distinct',
    ];
    const queryKeys = utils.excludeProperties(payload, keysToExclude);

    const options = {
      offset: all ? undefined : (parseInt(page, 10) - 1) * parseInt(limit, 10),
      limit: all ? undefined : parseInt(limit, 10),
      order: sort.map(({ whom, order }) => [whom, order.toUpperCase()]),
      include: include.length > 0 ? include : undefined,
      attributes: exclude.length > 0 ? { exclude } : undefined,
      distinct,
    };

    if (q) {
      queryKeys[this.Sequelize.Op.or] = helpers.searchQuery(
        this.sequelize,
        q,
        searchItems,
      );
    }

    const query = helpers.queryBuilder(queryKeys, options);
    const { count, rows } = await Model.findAndCountAll(query);

    const data = {
      total: count,
      // collection: rows.map((row) => row.dataValues),
      collection: rows,
      pages: all ? undefined : Math.ceil(count / options.limit),
    };

    return data;
  }

  static async findAll(Model, queryKeys = {}, options = {}) {
    const query = helpers.queryBuilder(queryKeys, options);
    const data = await Model.findAndCountAll(query);
    return data;
  }

  static async create(Model, payload, options = {}) {
    const instance = await Model.create(payload);
    const data = utils.deleteObjectPropery(instance.get(), options.exclude);
    return { instance, data };
  }

  static async bulkCreate(Model, payload, options = {}) {
    const data = await Model.bulkCreate(payload, options);
    return data;
  }

  static async save(source, destination, options = {}) {
    const instance = utils.modifyObjectValue(source, destination);
    await instance.save();
    const data = utils.deleteObjectPropery(instance.get(), options.exclude);
    return { instance, data };
  }

  static async update(Model, payload, queryKeys, options = {}) {
    const query = helpers.queryBuilder(queryKeys, options);
    const data = await Model.update(payload, query);
    return data;
  }

  static async destroy(Model, queryKeys, options, force = true) {
    const query = helpers.queryBuilder(queryKeys, { force });
    const instance = Model.destroy(query, options);
    return instance;
  }

  static async restore(Model, query = {}) {
    const { instance, data } = await this.findOne(
      Model,
      {
        ...query,
        deletedAt: { [this.Sequelize.Op.ne]: null },
      },
      { paranoid: false },
    );

    if (!data) return { data: null, instance: null };

    instance.setDataValue('deletedAt', null);
    instance.setDataValue('deletedBy', null);
    await instance.save();

    return { instance, data: instance.get() };
  }
}

module.exports = PostgresDbOperation;
