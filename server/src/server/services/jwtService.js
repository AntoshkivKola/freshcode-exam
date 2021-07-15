const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
} = require('../../constants');

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: ACCESS_TOKEN_SECRET,
    time: ACCESS_TOKEN_TIME,
  },
  refresh: {
    secret: REFRESH_TOKEN_SECRET,
    time: REFRESH_TOKEN_TIME,
  },
};

const createToken = (payload, { time, secret }) => signJWT(
  {
    userId: payload.id,
    email: payload.email,
    role: payload.role,
  },
  secret,
  { expiresIn: time },
);

const verifyToken = (token, { secret }) => verifyJWT(token, secret);

module.exports.createTokenPair = async payload => ({
  refresh: await createToken(payload, tokenConfig.refresh),
  access: await createToken(payload, tokenConfig.access),
});
module.exports.verifyAccessToken = token => verifyToken(token, tokenConfig.access);

module.exports.verifyRefreshToken = token => verifyToken(token, tokenConfig.refresh);
