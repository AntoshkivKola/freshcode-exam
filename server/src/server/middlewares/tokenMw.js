const createHttpError = require('http-errors');
const JwtService = require('../services/jwtService');

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    req.tokenData = await JwtService.verifyRefreshToken(refreshToken);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization }, // Bearer asejnvr.srgrgbd.rfgdrgb
    } = req;
    if (authorization) {
      const [type, token] = authorization.split(' ');
      if (type !== 'Bearer') {
        res.set('WWW-Authenticate', 'Bearer realm="squadhelp.com"');
        return res.status(401).end();
      }
      req.tokenData = await JwtService.verifyAccessToken(token);
      return next();
    }
    next(createHttpError(401, 'Need token'));
  } catch (error) {
    if (error instanceof SyntaxError) {
      next(createHttpError(401, 'Invalid token'));
    }
    next(error);
  }
};
