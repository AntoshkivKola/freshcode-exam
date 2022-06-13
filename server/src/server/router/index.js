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

router.get(
  '/contests_data',
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

router.get(
  '/customer/contests',

  contestController.getCustomersContests,
);

router.get(
  '/contest/:id',

  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

router.get(
  '/creative/contests',

  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

router.get(
  '/downloadFile/:fileName',

  contestController.downloadFile,
);

router.put(
  '/contest/:id',

  upload.updateContestFile,
  contestController.updateContest,
);

router.post(
  '/contest/:id/offer',

  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.post(
  '/offer/:id/status',

  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

router.put(
  '/offer/:id/mark',

  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.put(
  '/user',

  upload.uploadAvatar,
  userController.updateUser,
);

router.post(
  '/cashout',

  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

router.post('/message', chatControllerSQL.addMessage);// chatController.addMessage,

router.get('/chat', chatControllerSQL.getChat);

router.get('/chat/preview', chatControllerSQL.getPreview);

router.post('/blacklist', chatControllerSQL.blackList);

router.post('/favorite', chatControllerSQL.favoriteChat);

router.post('/catalog', chatControllerSQL.createCatalog);

router.put('/catalog/:id', chatControllerSQL.updateNameCatalog);

router.post('/catalog/:catalogId/chat/:chatId', chatControllerSQL.addNewChatToCatalog);

router.delete('/catalog/:catalogId/chat/:chatId', chatControllerSQL.removeChatFromCatalog);

router.delete('/catalog/:catalogId', chatControllerSQL.deleteCatalog);

router.get('/catalogs', chatControllerSQL.getCatalogs);

router.get('/offers', contestController.getModeratorOffers);//get
router.post('/moderate_offer', contestController.banOrPandingOffer);

module.exports = router;
