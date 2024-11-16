const generateToken = require('./generate-jwt-token');
const config = require('../../../config/global');

module.exports = async (user) => {
  const { name, email, id, uniqueId, role, verified } = user;

  const payload = {
    name,
    email,
    id,
    verified,
    role,
    uniqueId,
    aud: config.APP_NAME,
  };

  const accessToken = await generateToken({
    payload,
    expiresIn: config.JWT_ACCESS_TOKEN_EXPIRED_IN,
    secret: config.JWT_ACCESS_TOKEN_SECRET,
  });
  const refreshToken = await generateToken({
    payload,
    expiresIn: config.JWT_REFRESH_TOKEN_EXPIRED_IN,
    secret: config.JWT_REFRESH_TOKEN_SECRET,
  });

  return { accessToken, refreshToken };
};
