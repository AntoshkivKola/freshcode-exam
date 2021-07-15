const JwtService = require('./jwtService');
const { MAX_DEVICE_AMOUNT } = require('../../constants');
const prepareUser = require('../utils/prepareUser');

module.exports.createSession = async (user) => {
  const tokenPair = await JwtService.createTokenPair(user);
  if ((await user.countRefreshTokens()) >= MAX_DEVICE_AMOUNT) {
    const [oldestToken] = await user.getRefreshTokens({
      order: [['updatedAt', 'ASC']],
    });
    await oldestToken.update({ value: tokenPair.refresh });
  } else {
    await user.createRefreshToken({ value: tokenPair.refresh });
  }
  return { tokenPair, user: prepareUser(user) };
};
module.exports.refreshSession = async (refreshToken) => {
  const user = await refreshToken.getUser();
  const tokenPair = await JwtService.createTokenPair(user);
  await refreshToken.update({ value: tokenPair.refresh });
  return { user: prepareUser(user), tokenPair };
};
