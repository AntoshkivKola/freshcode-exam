const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const { checkRefreshToken } = require('../middlewares/tokenMw');
const Validators = require('../middlewares/validators');

authRouter.post('/sign-in', Validators.validateLogin, AuthController.signIn);
authRouter.post(
  '/sign-up',
  Validators.validateRegistrationData,
  AuthController.signUp
);
authRouter.post('/refresh', checkRefreshToken, AuthController.refresh);
authRouter.post('/change-password', AuthController.changePassword);
authRouter.post('/update-password', AuthController.updateUserPassword);

module.exports = authRouter;
