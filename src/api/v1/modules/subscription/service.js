const PostgresDbOperation = require('../../services/postgres-db-operation');

class SubscriptionService extends PostgresDbOperation {
  static async listSubscription(query) {
    const data = await this.findAndCountAll(this.Subscription, {
      ...query,
      searchItems: ['email'],
    });

    return { ...data, subscriptions: data.collection, collection: undefined };
  }

  static async findOneSubscription(queryKeys, options) {
    const subscription = await this.findOne(this.Subscription, queryKeys, {
      ...options,
    });
    return subscription;
  }

  static async addSubscription(body) {
    return this.create(this.Subscription, body);
  }

  static async deleteSubscription({ id }) {
    const deletedSubscription = await this.destroy(this.Subscription, { id });
    return deletedSubscription;
  }
}

module.exports = SubscriptionService;
