const PostgresDbOperation = require('../../services/postgres-db-operation');
const VendorVariant = require('../vendor-product/service');

const vendorAttributes = [
  'companyName',
  'companyEmail',
  'officeAddress',
  'companyPhoto',
  'officePhone',
  'tssaAuthorizationNumber',
  'tssaProLeUrl',
  'tssaAuthorizationStartDate',
  'tssaAuthorizationExpiryDate',
  'hraiAuthorizationNumber',
  'hraiProLeUrl',
  'hraiAuthorizationStartDate',
  'hraiAuthorizationExpiryDate',
  'vendorVerified',
];

class CartService extends PostgresDbOperation {
  static async findOneCartItem(queryKeys, options) {
    const category = await this.findOne(this.Cart, queryKeys, {
      ...options,
    });
    return category;
  }

  static async listCartItems(query) {
    const data = await this.findAndCountAll(this.Cart, {
      ...query,
      searchItems: ['vendorProduct.product.title'],
      include: [
        {
          model: this.VendorProduct,
          as: 'vendorProduct',
          include: [
            {
              model: this.Product,
              as: 'product',
              attributes: ['id', 'title', 'thumbnail', 'slug'],
            },
            {
              model: this.User,
              as: 'creator',
              attributes: [
                'id',
                'firstName',
                'lastName',
                'name',
                'email',
                ...vendorAttributes,
              ],
            },
          ],
        },
        {
          model: this.VendorVariant,
          as: 'vendorVariant',
          attributes: [
            'id',
            'size',
            'color',
            'weight',
            'length',
            'height',
            'width',
            'sku',
            'midCode',
            'sellingPrice',
          ],
        },
      ],
    });

    return { ...data, cart: data.collection, collection: undefined };
  }

  static async findCartQuanity(variants) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        for await (const variant of variants) {
          const { data: variantQuantityExist } =
            await VendorVariant.findOneVariant({
              id: variant.vendorVariantId,
            });

          if (variantQuantityExist.quantity < 1) {
            resolve({
              error: { variant },
              data: null,
            });
          }
        }
        resolve({ error: null, data: true });
      } catch (error) {
        reject(error);
      }
    });
  }

  static async addCartItem({ body }) {
    return this.create(this.Cart, {
      ...body,
    });
  }

  static async updateCartItem({ instance, quantity }) {
    return this.save(instance, { quantity });
  }

  static async deleteCartItem({ id }) {
    return this.destroy(this.Cart, { id });
  }

  static async deleteAllCardItem(cart = []) {
    cart.forEach(async (cartItem) => {
      await this.deleteCartItem({
        id: cartItem.id,
      });
    });
  }
}

module.exports = CartService;
