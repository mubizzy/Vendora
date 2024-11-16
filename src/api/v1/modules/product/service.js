/* eslint-disable no-plusplus */
/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable no-nested-ternary */
const PostgresDbOperation = require('../../services/postgres-db-operation');

const variantAttributes = [
  'id',
  'weight',
  'length',
  'height',
  'width',
  'size',
  'color',
  'quantity',
  'sellingPrice',
];

const productExcludeAttributes = [
  'subTitle',
  'description',
  'originCountry',
  'material',
  'images',
];

const detailVarintAttributes = [
  'id',
  'sku',
  'barcode',
  'ean',
  'upc',
  'hsCode',
  'midCode',
  'weight',
  'length',
  'height',
  'width',
  'size',
  'color',
  'sellingPrice',
  'quantity',
];

class ProductService extends PostgresDbOperation {
  static async listProducts(query) {
    const {
      category,
      subCategory,
      size,
      color,
      width,
      height,
      weight,
      length,
      type,
      stockStatus,
      price,
      userId,
      ...restQuery
    } = query;

    const createSlugFilter = (item, key) =>
      item
        ? /^\d+$/.test(item)
          ? { id: parseInt(item, 10) }
          : { [`$${key}.slug$`]: item }
        : {};

    const variantFilters = {
      ...(size && { size }),
      ...(color && { color }),
      ...(stockStatus && {
        quantity: {
          [this.Sequelize.Op[stockStatus === 'InStock' ? 'gt' : 'eq']]: 0,
        },
      }),
    };

    const productFilter = type ? { type } : {};

    const addStringRangeFilter = (field, value) => {
      const [min, max] = value.split('-').map((str) => parseFloat(str.trim()));

      if (!isNaN(min) && !isNaN(max)) {
        variantFilters[this.Sequelize.Op.and] = [
          ...(variantFilters[this.Sequelize.Op.and] || []),
          this.Sequelize.where(
            this.Sequelize.literal(
              `CAST(REGEXP_REPLACE(${field}, '[^0-9.]', '', 'g') AS FLOAT)`,
            ),
            { [this.Sequelize.Op.between]: [min, max] },
          ),
        ];
      }
    };

    const rangeFields = { width, height, weight, length };
    for (const [field, value] of Object.entries(rangeFields)) {
      if (value) addStringRangeFilter(field, value);
    }

    if (price) {
      const [minPrice, maxPrice] = price
        .split('-')
        .map((str) => parseFloat(str.trim()));
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        variantFilters.sellingPrice = {
          [this.Sequelize.Op.between]: [minPrice, maxPrice],
        };
      }
    }

    if (userId) {
      variantAttributes.push('buyingPrice');
    }

    const allTypesData = await this.Product.findAll({
      attributes: [
        'type',
        [this.Sequelize.fn('COUNT', this.Sequelize.col('id')), 'count'],
      ],
      group: ['type'],
    });

    const allTypesCount = {};
    for (const typeData of allTypesData) {
      allTypesCount[typeData.type] = 0;
    }

    const queryData = {
      ...restQuery,
      ...productFilter,
      searchItems: ['title', 'subTitle'],
      exclude: [
        'description',
        'images',
        'originCountry',
        'material',
        'subTitle',
      ],
      include: [
        {
          model: this.Category,
          as: 'category',
          where: createSlugFilter(category, 'category'),
          attributes: ['id', 'slug', 'name'],
        },
        {
          model: this.SubCategory,
          as: 'subcategory',
          where: createSlugFilter(subCategory, 'subcategory'),
          attributes: ['id', 'slug', 'name'],
        },
        {
          model: this.User,
          as: 'creator',
          attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
        },
        {
          model: this.User,
          as: 'updater',
          attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
        },
        {
          model: this.ProductVariant,
          as: 'variants',
          where: Reflect.ownKeys(variantFilters).length
            ? variantFilters
            : undefined,
          attributes: variantAttributes,
        },
      ],
    };

    const data = await this.findAndCountAll(this.Product, queryData);

    const countQueryData = {
      status: 'published',
      all: true,
      exclude: [
        'description',
        'images',
        'originCountry',
        'material',
        'subTitle',
      ],
      include: [
        {
          model: this.Category,
          as: 'category',
          where: createSlugFilter(category, 'category'),
          attributes: ['id', 'slug', 'name'],
        },
        {
          model: this.SubCategory,
          as: 'subcategory',
          where: createSlugFilter(subCategory, 'subcategory'),
          attributes: ['id', 'slug', 'name'],
        },
        {
          model: this.ProductVariant,
          as: 'variants',
          attributes: variantAttributes,
        },
      ],
    };
    const filterCount = await this.findAndCountAll(
      this.Product,
      countQueryData,
    );
    const products = filterCount.collection;

    const createFilter = (ranges) =>
      Object.fromEntries(
        Object.values(ranges).map((range) => [range.label, new Set()]),
      );

    const ranges = {
      weight: [
        { min: 0, max: 5, label: '0 - 5 kg' },
        { min: 5, max: 15, label: '5 - 15 kg' },
        { min: 15, max: 30, label: '15 - 30 kg' },
        { min: 30, max: Infinity, label: '30+ kg' },
      ],
      length: [
        { min: 0, max: 3, label: '0 - 3"' },
        { min: 3, max: 5, label: '3 - 5"' },
        { min: 5, max: 10, label: '5 - 10"' },
        { min: 10, max: Infinity, label: '10+"' },
      ],
      height: [
        { min: 0, max: 3, label: '0 - 3"' },
        { min: 3, max: 5, label: '3 - 5"' },
        { min: 5, max: 10, label: '5 - 10"' },
        { min: 10, max: Infinity, label: '10+"' },
      ],
      width: [
        { min: 0, max: 3, label: '0 - 3"' },
        { min: 3, max: 5, label: '3 - 5"' },
        { min: 5, max: 10, label: '5 - 10"' },
        { min: 10, max: Infinity, label: '10+"' },
      ],
    };

    const stockCounts = { InStock: 0, OutOfStock: 0 };

    const productsWithVariants = await this.Product.findAll({
      include: [
        {
          model: this.VendorProduct,
          as: 'vendorProducts',
          include: [
            {
              model: this.VendorVariant,
              as: 'vendorVariants',
              attributes: ['quantity'],
            },
          ],
        },
      ],
    });

    productsWithVariants.forEach((product) => {
      let isInStock = false;

      product.vendorProducts.forEach((vendorProduct) => {
        vendorProduct.vendorVariants.forEach((variant) => {
          if (variant.quantity > 0) {
            isInStock = true;
          }
        });
      });

      if (isInStock) {
        stockCounts.InStock++;
      } else {
        stockCounts.OutOfStock++;
      }
    });

    const filters = {
      Price: { min: Infinity, max: -Infinity },
      Type: { ...allTypesCount },
      Size: {},
      Color: {},
      Weight: createFilter(ranges.weight),
      Length: createFilter(ranges.length),
      Height: createFilter(ranges.height),
      Width: createFilter(ranges.width),
      Stock: {
        InStock: stockCounts.InStock || undefined,
        OutOfStock: stockCounts.OutOfStock || undefined,
      },
    };

    const extractNumber = (str) =>
      parseFloat(str.match(/^(\d+(\.\d+)?)/)?.[0]) || null;

    for (const product of products) {
      const variantType = product.type || 'Unknown';
      filters.Type[variantType] = (filters.Type[variantType] || 0) + 1;

      for (const variant of product.variants || []) {
        if (variant.sellingPrice < filters.Price.min) {
          filters.Price.min = variant.sellingPrice;
        }
        if (variant.sellingPrice > filters.Price.max) {
          filters.Price.max = variant.sellingPrice;
        }

        for (const [dim, items] of Object.entries({
          weight: ranges.weight,
          length: ranges.length,
          height: ranges.height,
          width: ranges.width,
        })) {
          const value = extractNumber(variant[dim]);
          if (value !== null) {
            for (const range of items) {
              if (value >= range.min && value < range.max)
                filters[dim.charAt(0).toUpperCase() + dim.slice(1)][
                  range.label
                ].add(product.id);
            }
          }
        }

        if (variant.size)
          filters.Size[variant.size] = (filters.Size[variant.size] || 0) + 1;
        if (variant.color)
          filters.Color[variant.color] =
            (filters.Color[variant.color] || 0) + 1;
      }
    }

    const finalizeFilterCounts = (filter) =>
      Object.fromEntries(
        Object.entries(filter)
          .map(([key, set]) => [key, set.size])
          .filter(([, count]) => count > 0),
      );

    filters.Weight = finalizeFilterCounts(filters.Weight);
    filters.Length = finalizeFilterCounts(filters.Length);
    filters.Height = finalizeFilterCounts(filters.Height);
    filters.Width = finalizeFilterCounts(filters.Width);

    if (filters.Price.min === Infinity) filters.Price.min = undefined;
    if (filters.Price.max === -Infinity) filters.Price.max = undefined;

    return {
      ...data,
      products: data.collection,
      filters,
      collection: undefined,
    };
  }

  static async findOneProduct(queryKeys, options) {
    const product = await this.findOne(this.Product, queryKeys, {
      ...options,
    });
    return product;
  }

  static async bestDealProduct(queryKeys, options) {
    const product = await this.findOneProduct(queryKeys, {
      ...options,
      exclude: productExcludeAttributes,
      include: [
        {
          model: this.ProductVariant,
          as: 'variants',
          attributes: variantAttributes,
          limit: 1,
        },
      ],
    });
    return product;
  }

  static async findOneVariant(queryKeys, options) {
    const product = await this.findOne(this.ProductVariant, queryKeys, {
      ...options,
    });
    return product;
  }

  static async findAllProducts(queryKeys, options) {
    const { count, rows } = await this.findAll(
      this.Product,
      queryKeys,
      options,
    );
    return { data: rows, count };
  }

  static async limitedTimeSavingProducts() {
    return this.findAllProducts(
      {
        discountPercentage: {
          [this.Sequelize.Op.gt]: 0,
        },
        status: 'published',
      },
      {
        limit: 6,
        order: this.sequelize.random(),
        attributes: { exclude: productExcludeAttributes },
        include: [
          {
            model: this.ProductVariant,
            as: 'variants',
            attributes: variantAttributes,
            limit: 1,
          },
        ],
      },
    );
  }

  static async moreSavingProucts() {
    return this.findAllProducts(
      {
        discountPercentage: {
          [this.Sequelize.Op.gt]: 0,
        },
        status: 'published',
      },
      {
        limit: 4,
        order: [['discountPercentage', 'DESC']],
        attributes: { exclude: productExcludeAttributes },
        include: [
          {
            model: this.ProductVariant,
            as: 'variants',
            attributes: variantAttributes,
            limit: 1,
          },
        ],
      },
    );
  }

  static async popularProucts() {
    return this.findAllProducts(
      {
        status: 'published',
      },
      {
        limit: 5,
        order: [['salesCount', 'DESC']],
        attributes: { exclude: productExcludeAttributes },
        include: [
          {
            model: this.ProductVariant,
            as: 'variants',
            attributes: variantAttributes,
            limit: 1,
          },
        ],
      },
    );
  }

  static async newArrivalProucts() {
    return this.findAllProducts(
      {
        status: 'published',
      },
      {
        limit: 4,
        order: [['createdAt', 'DESC']],
        attributes: { exclude: productExcludeAttributes },
        include: [
          {
            model: this.ProductVariant,
            as: 'variants',
            attributes: variantAttributes,
            limit: 1,
          },
        ],
      },
    );
  }

  static async brandForYou() {
    return this.findAllProducts(
      {
        discountPercentage: {
          [this.Sequelize.Op.gt]: 0,
        },
        status: 'published',
      },
      {
        limit: 3,
        order: this.sequelize.random(),
        attributes: { exclude: productExcludeAttributes },
        include: [
          {
            model: this.ProductVariant,
            as: 'variants',
            attributes: variantAttributes,
            limit: 1,
          },
          {
            model: this.Category,
            as: 'category',
            attributes: ['id', 'slug', 'name'],
          },
        ],
      },
    );
  }

  static async detailProduct(query) {
    const { userId, ...rest } = query;

    if (userId) {
      detailVarintAttributes.push('buyingPrice');
    }

    const product = await this.findOneProduct(rest, {
      include: [
        {
          model: this.Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
        {
          model: this.SubCategory,
          as: 'subcategory',
          attributes: ['id', 'name'],
        },
        {
          model: this.User,
          as: 'creator',
          attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
        },
        {
          model: this.User,
          as: 'updater',
          attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
        },
        {
          model: this.ProductVariant,
          as: 'variants',
          attributes: detailVarintAttributes,
        },
      ],
    });
    return product;
  }

  static async createProduct({ body }) {
    const colorsSet = new Set();
    const sizesSet = new Set();

    const variantPayload = body.variant.map((variant) => {
      if (variant.color) colorsSet.add(variant.color);
      if (variant.size) sizesSet.add(variant.size);

      return {
        ...variant,
      };
    });

    const productPayload = {
      ...body,
      colors: Array.from(colorsSet),
      sizes: Array.from(sizesSet),
    };

    const { instance, data } = await this.create(this.Product, productPayload);

    const updatedVariantPayload = variantPayload.map((variant) => ({
      ...variant,
      productId: data.id,
    }));

    const variants = await this.bulkCreate(
      this.ProductVariant,
      updatedVariantPayload,
    );

    return { instance, data: { ...data, variants } };
  }

  static async titleExist({ title, id }) {
    const { data } = await this.findOneProduct({
      title,
      id: {
        [this.Sequelize.Op.ne]: id,
      },
    });

    return !!data;
  }

  static async bulkUpdateVariants(variants) {
    const updatedVariants = await Promise.all(
      variants.map(async (variant) => {
        const { instance } = await this.findOne(this.ProductVariant, {
          productId: variant.productId,
        });

        if (instance) {
          return (await this.save(instance, variant)).data;
        }
        return (await this.create(this.ProductVariant, variant)).data;
      }),
    );

    return updatedVariants;
  }

  static async updateProduct({ instance, body }) {
    const colorsSet = new Set();
    const sizesSet = new Set();

    const variantPayload = body.variant.map((variant) => {
      if (variant.color) colorsSet.add(variant.color);
      if (variant.size) sizesSet.add(variant.size);

      return {
        ...variant,
        productId: instance.id,
      };
    });

    const productPayload = {
      ...body,
      colors: Array.from(colorsSet),
      sizes: Array.from(sizesSet),
    };

    const { data } = await this.save(instance, productPayload);

    const updatedVariants = await this.bulkUpdateVariants(variantPayload);

    return { instance, data: { ...data, variants: updatedVariants } };
  }

  static async updateBestDeal({ id, updatedBy }) {
    const transaction = await this.sequelize.transaction();

    try {
      await this.update(
        this.Product,
        { bestDeal: false, updatedBy },
        { bestDeal: true },
        { transaction },
      );

      const data = await this.update(
        this.Product,
        { bestDeal: true, updatedBy },
        { id },
        { transaction },
      );

      await transaction.commit();

      return data;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async updateStatus({ instance, ...rest }) {
    return this.save(instance, { ...rest });
  }

  static async updateVariantQuantity(type, variants = []) {
    variants.forEach(async (variant) => {
      const { data: productVariant, instance } = await this.findOneVariant({
        id: variant.variantId,
      });

      if (productVariant) {
        let { quantity } = { ...productVariant };

        if (type === 'increase') {
          quantity += variant.quantity;
        }
        if (type === 'decrease') {
          quantity -= variant.quantity;
        }

        await this.save(instance, { quantity });
      }
    });
  }

  static async deleteProduct({ id }) {
    const deletedProduct = await this.destroy(this.Product, { id });
    return deletedProduct;
  }
}

module.exports = ProductService;
