const PostgresDbOperation = require('../../services/postgres-db-operation');
const { createSlug } = require('../../utils');

class CategoryService extends PostgresDbOperation {
  static async listCategories(query) {
    const data = await this.findAndCountAll(this.Category, {
      ...query,
      searchItems: ['name'],
    });

    return { ...data, categories: data.collection, collection: undefined };
  }

  static async findOneCategory(queryKeys, options) {
    const category = await this.findOne(this.Category, queryKeys, {
      ...options,
    });
    return category;
  }

  static async createCategory(data) {
    const { name, description } = data;

    const slug = createSlug([name]);
    const payload = { name, description, slug };

    return this.create(this.Category, payload);
  }

  static async updateCategory({ instance, payload }) {
    const slug = createSlug([payload.name]);
    const updatedPayload = {
      ...payload,
      slug,
    };
    return this.save(instance, updatedPayload);
  }

  static async deleteCategory({ id }) {
    const deletedUser = await this.destroy(this.Category, { id });
    return deletedUser;
  }
}

module.exports = CategoryService;
