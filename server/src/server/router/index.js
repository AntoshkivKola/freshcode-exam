const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const validators = require('../middlewares/validators');
const chatControllerSQL = require('../controllers/chatControllerSQL');
const upload = require('../utils/fileUpload');
const authRouter = require('./auth');
const { checkAccessToken } = require('../middlewares/tokenMw');

const router = express.Router();

router.use('/auth', authRouter);

router.use(checkAccessToken);

router.post(
  '/dataForContest',
  contestController.dataForContest,
);

router.post(
  '/pay',

  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

router.post(
  '/getCustomersContests',

  contestController.getCustomersContests,
);

router.get(
  '/contest/:id',

  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

router.post(
  '/getAllContests',

  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

router.get(
  '/downloadFile/:fileName',

  contestController.downloadFile,
);

router.post(
  '/updateContest',

  upload.updateContestFile,
  contestController.updateContest,
);

router.post(
  '/setNewOffer',

  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.post(
  '/setOfferStatus',

  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

router.post(
  '/changeMark',

  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.post(
  '/updateUser',

  upload.uploadAvatar,
  userController.updateUser,
);

router.post(
  '/cashout',

  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

router.post('/newMessage', chatControllerSQL.addMessage);// chatController.addMessage,

router.post('/getChat', chatControllerSQL.getChat);

router.post('/getPreview', chatControllerSQL.getPreview);

router.post('/blackList', chatControllerSQL.blackList);

router.post('/favorite', chatControllerSQL.favoriteChat);

router.post('/createCatalog', chatControllerSQL.createCatalog);

router.post('/updateNameCatalog', chatControllerSQL.updateNameCatalog);

router.post('/addNewChatToCatalog', chatControllerSQL.addNewChatToCatalog);

router.post('/removeChatFromCatalog', chatControllerSQL.removeChatFromCatalog);

router.post('/deleteCatalog', chatControllerSQL.deleteCatalog);

router.post('/getCatalogs', chatControllerSQL.getCatalogs);

router.post('/getOffers', contestController.getModeratorOffers);
router.post('/banOrPandingOffer', contestController.banOrPandingOffer);

module.exports = router;
