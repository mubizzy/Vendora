const PostgresDbOperation = require('../../services/postgres-db-operation');

class SettingService extends PostgresDbOperation {
  static async findOneSetting(queryKeys, options) {
    return this.findOne(this.Setting, queryKeys, {
      ...options,
    });
  }

  static async detailSetting(query) {
    return this.findOneSetting(
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
        ],
      },
    );
  }

  static async addSetting(body) {
    return this.create(this.Setting, body);
  }

  static async updateSetting({ instance, payload }) {
    return this.save(instance, payload);
  }
}

module.exports = SettingService;
