/* eslint-disable no-nested-ternary */
const PostgresDbOperation = require('../../services/postgres-db-operation');
const { createSlug } = require('../../utils');

class SubCategoryService extends PostgresDbOperation {
  static async listSubCategories(query) {
    const { category, ...restQuery } = query;

    const categoryFilter = category
      ? /^\d+$/.test(category)
        ? { [`categoryId`]: parseInt(category, 10) }
        : { [`$category.slug$`]: category }
      : {};

    const data = await this.findAndCountAll(this.SubCategory, {
      ...restQuery,
      ...categoryFilter,
      searchItems: ['SubCategory.name'],
      exclude: ['description'],
      distinct: false,
      include: [
        {
          model: this.Category,
          as: 'category',
          attributes: ['id', 'slug', 'name'],
        },
      ],
    });

    return {
      ...data,
      subCategories: data.collection,
      collection: undefined,
    };
  }

  static async findOneSubCategory(queryKeys, options) {
    const subCategory = await this.findOne(this.SubCategory, queryKeys, {
      ...options,
    });
    return subCategory;
  }

  static async detailSubCategory(queryKeys, options) {
    const subCategory = await this.findOne(this.SubCategory, queryKeys, {
      ...options,
      include: [
        {
          model: this.Category,
          as: 'category',
          attributes: ['id', 'name', 'slug', 'createdAt', 'updatedAt'],
        },
      ],
    });
    return subCategory;
  }

  static async createSubCategory({ body, category }) {
    const { name, description, categoryId } = body;

    let slug = createSlug([category.slug, name]);

    const subCategory = await this.findAndCountAll(this.SubCategory, {
      q: slug,
      searchItems: ['slug'],
      all: true,
    });
    if (subCategory.total > 1) {
      slug += `-${subCategory.total}`;
    }

    const payload = { name, description, slug, categoryId };

    return this.create(this.SubCategory, payload);
  }

  static async updateSubCategory({ instance, body, category }) {
    let slug = createSlug([category.slug, body.name]);

    const subCategory = await this.findAndCountAll(this.SubCategory, {
      q: slug,
      searchItems: ['slug'],
      all: true,
    });
    if (subCategory.total > 1) {
      slug += `-${subCategory.total}`;
    }

    const updatedPayload = {
      ...body,
      slug,
    };
    return this.save(instance, updatedPayload);
  }

  static async deleteSubCategory({ id }) {
    const deletedSubCategory = await this.destroy(this.SubCategory, { id });
    return deletedSubCategory;
  }
}

module.exports = SubCategoryService;
