/* eslint-disable security/detect-object-injection */
const PostgresDbOperation = require('../../services/postgres-db-operation');

class ReviewService extends PostgresDbOperation {
  static async listReview(query) {
    const data = await this.findAndCountAll(this.Review, {
      ...query,
      searchItems: ['review'],
      include: [
        {
          model: this.User,
          as: 'customer',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'name',
            'email',
            'verified',
          ],
        },
        {
          model: this.Product,
          as: 'product',
          attributes: ['id', 'title', 'thumbnail', 'slug'],
        },
      ],
    });

    return { ...data, reviews: data.collection, collection: undefined };
  }

  static findAverageRating(reviews = []) {
    if (reviews.length === 0) return 0.0;

    const totalRating = reviews.reduce((acc, { rating }) => acc + rating, 0);
    return (totalRating / reviews.length).toFixed(2);
  }

  static reviewCount(reviews = []) {
    const reviewCounts = reviews.reduce((acc, { rating }) => {
      const key = `${Math.floor(rating)}:00`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return reviewCounts;
  }

  static async findOneReview(queryKeys, options) {
    return this.findOne(this.Review, queryKeys, {
      ...options,
    });
  }

  static async detailReview(query) {
    return this.findOneReview(
      {
        ...query,
      },
      {
        include: [
          {
            model: this.User,
            as: 'updater',
            attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
          },
          {
            model: this.User,
            as: 'customer',
            attributes: [
              'id',
              'firstName',
              'lastName',
              'name',
              'email',
              'verified',
            ],
          },
          {
            model: this.Product,
            as: 'product',
            attributes: ['id', 'title', 'thumbnail', 'slug'],
          },
        ],
      },
    );
  }

  static async addReview(body) {
    return this.create(this.Review, body);
  }

  static async updateReview({ instance, payload }) {
    return this.save(instance, payload);
  }

  static async deleteReview({ id }) {
    const deletedReview = await this.destroy(this.Review, {
      id,
    });
    return deletedReview;
  }
}

module.exports = ReviewService;
