const { v4: uuidv4 } = require('uuid');
const { PostgresDbOperation } = require('../../services');
const utils = require('../../utils');
const constant = require('../../constants');
const rateLimiterPostgres = require('../../utils/rate-limiter-postgres');
const deleteObjectProperty = require('../../utils/delete-object-property');

const exclude = [
  ...constant.EXCLUDE,
  'password',
  'firstName',
  'lastName',
  'lastLogin',
  'emailVerificationToken',
  'resetPasswordToken',
];

const verifyToken = (storedToken, token) => {
  // eslint-disable-next-line security/detect-possible-timing-attacks
  if (storedToken !== token) return 'error-invalid-token';
  return '';
};

class AuthService extends PostgresDbOperation {
  static async findOneUser(queryKeys, options) {
    const user = await this.findOne(this.User, queryKeys, {
      ...options,
    });
    return user;
  }

  static async authLimiter(req) {
    const { promises } = rateLimiterPostgres.consumeLimitter(req, [
      constant.RATE_LIMIT.KEY_LOGIN_IP,
      constant.RATE_LIMIT.KEY_LOGIN_EMAIL,
      constant.RATE_LIMIT.KEY_LOGIN_EMAIL_IP,
    ]);
    await Promise.all(promises);
  }

  static async createUser({ payload }) {
    const userInput = { ...payload };

    userInput.emailVerificationToken = uuidv4();
    if (userInput.role === 3) {
      userInput.active = true;
    }

    const newUser = await this.create(this.User, userInput);
    const detailUser = { ...newUser.data };

    return {
      detailUser,
      instance: newUser.instance,
      user: deleteObjectProperty(newUser.data, exclude),
    };
  }

  static async lastLogin({ instance }) {
    const updatedUser = await this.save(
      instance,
      { lastLogin: utils.timestampWithTimezone() },
      { exclude },
    );
    return updatedUser;
  }

  static async resendEmailVerificationCodeLimiter(req) {
    const { promises } = rateLimiterPostgres.consumeLimitter(req, [
      constant.RATE_LIMIT.KEY_VERIFY_EMAIL,
    ]);
    await Promise.all(promises);
  }

  static async generateVerifyEmailToken({ instance }) {
    const emailVerificationToken = uuidv4();

    await this.save(
      instance,
      { emailVerificationToken },
      { exclude: ['password', 'emailVerificationToken', 'resetPasswordToken'] },
    );

    return { token: emailVerificationToken };
  }

  static async verifyEmail({ instance, data, token }) {
    const key = verifyToken(data.emailVerificationToken || '', token);
    if (key) {
      return { key };
    }

    await this.save(instance, { verified: true, emailVerificationToken: null });
    return { key: '' };
  }

  static async generateForgotPasswordToken({ instance }) {
    const token = uuidv4();
    await this.save(instance, { resetPasswordToken: token });

    return { token };
  }

  static async forgotPasswordEmailLimiter(req) {
    const { promises } = rateLimiterPostgres.consumeLimitter(req, [
      constant.RATE_LIMIT.KEY_FORGOT_PASSWORD_EMAIL,
    ]);
    await Promise.all(promises);
  }

  static async verifyPasswordResetToken({ data, token }) {
    const key = verifyToken(data.resetPasswordToken || '', token);
    if (key) {
      return { key };
    }

    return { key: '' };
  }

  static async resetPassword({ instance, password }) {
    const updatedUser = await this.save(
      instance,
      { password, resetPasswordToken: null },
      { exclude },
    );
    return updatedUser;
  }

  static async changePassword({ instance, password }) {
    await this.save(instance, { password });
  }

  static async updateStatus({ instance, active }) {
    return this.save(instance, { active }, { exclude });
  }

  static async updateVendorInfo({ instance, body }) {
    return this.save(instance, { ...body, vendorVerified: false }, { exclude });
  }

  static async verifyVendor({ instance }) {
    return this.save(instance, { vendorVerified: true }, { exclude });
  }

  static async authList(query) {
    const {
      q,
      page = 1,
      limit = 10,
      sort = [],
      all = false,
      role,
      active,
      verified,
    } = query;

    let sqlQuery = `
          SELECT * FROM "Users"
          WHERE "deletedAt" IS NULL
      `;

    if (q) {
      sqlQuery += `
              AND ("email" ILIKE :search OR ("firstName" || ' ' || "lastName") ILIKE :search)
          `;
    }

    const roleQuery = [];
    if (role === 'admin') roleQuery.push(1);
    if (role === 'vendor') roleQuery.push(2);
    if (role === 'customer') roleQuery.push(3);
    if (roleQuery.length > 0) {
      sqlQuery += ` AND "role" IN (:roles)`;
    }

    if (typeof active === 'boolean') {
      sqlQuery += ` AND "active" = :active`;
    }

    if (typeof verified === 'boolean') {
      sqlQuery += ` AND "verified" = :verified`;
    }

    if (sort.length > 0) {
      const orderClauses = sort
        .map(({ whom, order }) => `"${whom}" ${order.toUpperCase()}`)
        .join(', ');
      sqlQuery += ` ORDER BY ${orderClauses}`;
    }

    if (!all) {
      sqlQuery += ` LIMIT :limit OFFSET :offset`;
    }

    const offset = (page - 1) * limit;

    const replacements = {
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    };

    if (q) replacements.search = `%${q}%`;
    if (roleQuery.length > 0) replacements.roles = roleQuery;
    if (typeof active === 'boolean') replacements.active = active;
    if (typeof verified === 'boolean') replacements.verified = verified;

    const results = await this.sequelize.query(sqlQuery, {
      replacements,
      type: this.sequelize.QueryTypes.SELECT,
    });

    let total = 0;
    if (!all) {
      const countQuery = `
                  SELECT COUNT(*) FROM "Users"
                  WHERE "deletedAt" IS NULL
                  ${q ? `AND ("email" ILIKE :search OR ("firstName" || ' ' || "lastName") ILIKE :search)` : ''}
                  ${roleQuery.length > 0 ? `AND "role" IN (:roles)` : ''}
                  ${typeof active === 'boolean' ? `AND "active" = :active` : ''}
                  ${typeof verified === 'boolean' ? `AND "verified" = :verified` : ''}
              `;
      const countResult = await this.sequelize.query(countQuery, {
        replacements,
        type: this.sequelize.QueryTypes.SELECT,
      });
      total = parseInt(countResult[0].count, 10);
    }

    return {
      total: all ? results.length : total,
      pages: all ? 1 : Math.ceil(total / limit),
      users: results,
    };
  }

  static async deleteUser({ id }) {
    const deletedUser = await this.destroy(this.User, { id });
    return deletedUser;
  }
}

module.exports = AuthService;
