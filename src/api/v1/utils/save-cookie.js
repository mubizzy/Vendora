const config = require('../../../config/global');
const {
  APP: { TOKEN },
} = require('../constants');

module.exports = ({ res, accessToken, refreshToken }) => {
  res.cookie(TOKEN.ACCESS, accessToken, {
    httpOnly: true,
    secure: config.ENV === 'production',
    sameSite: config.ENV === 'production' ? 'Strict' : 'Lax',
    maxAge: parseInt(config.JWT_ACCESS_TOKEN_EXPIRED_IN, 10) * 1000,
  });
  res.cookie(TOKEN.REFRESH, refreshToken, {
    httpOnly: true,
    secure: config.ENV === 'production',
    sameSite: config.ENV === 'production' ? 'Strict' : 'Lax',
    maxAge: parseInt(config.JWT_REFRESH_TOKEN_EXPIRED_IN, 10) * 1000,
  });
};
