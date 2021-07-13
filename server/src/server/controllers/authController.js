const createHttpError = require('http-errors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const AuthService = require('../services/authService');
const { User, RefreshToken } = require('../models');
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME } = require('../../constants');
const signJWT = promisify(jwt.sign);
const createHash = promisify(bcrypt.hash);

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await User.findOne({
      where: { email },
    });

    if (user && (await user.comparePassword(password))) {
      const data = await AuthService.createSession(user);
      return res.status(201).send({ data });
    }
    next(createHttpError(401, 'Invalid credentials'));
  } catch (error) {
    console.log('catched ,', error);
    next(error);
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const data = await AuthService.createSession(user);
      return res.status(201).send({ data });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken }, // refresh token is not expired
    } = req;

    const refreshTokenInstance = await RefreshToken.findOne({
      where: { value: refreshToken },
    });

    if (!refreshTokenInstance) {
      return next(createHttpError(404, 'Token not found'));
    }
    const data = await AuthService.refreshSession(refreshTokenInstance);
    res.status(201).send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.changePassword = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<');
    console.log(email, password);

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      next(createHttpError(401, 'Invalid credentials'));
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newPassToken = await signJWT(
      { newPasswordHash: passwordHash, email: email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TIME }
    );
    const decoded = jwt_decode(newPassToken);

    console.log('passwordHash', passwordHash);
    console.log('decoded passwordHash', decoded);
    const linkWithPass = `http://localhost:5000/changePassword?pt=${newPassToken}`;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'testsender615',
        pass: 'testsender87o(p)',
      },
    });

    await transporter.sendMail(
      {
        from: '"EXAMsqyadhelp.com"',
        to: email,
        subject: 'Change password',
        text: 'change password',
        html: `<h2>Hello dear ${user.firstName} ${user.lastName}</h2><br/>
      To confirm your new password click <a target="_blank" href="${linkWithPass}">here</a>`,
      },
      function (error, response) {
        if (error) {
          console.log(error);
        }
      }
    );
    return res.status(202).send('Accepted');
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserPassword = async (req, res, next) => {
  try {
    const {
      body: { passwordToken },
    } = req;
    const { newPasswordHash, email } = jwt_decode(passwordToken);

    const updatedUser = await User.update(
      { password: newPasswordHash },
      { where: { email }, returning: true }
    );
    if (!updatedUser) {
      return res.status(404).send('Not found');
    }

    return res.status(200).send('ok');
  } catch (err) {
    next(err);
  }
};
