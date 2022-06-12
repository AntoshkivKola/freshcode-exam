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
  '/setOfferStatus',

  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

router.post(//put
  '/changeMark',

  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.post(//put
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

router.post('/getChat', chatControllerSQL.getChat);//get

router.post('/getPreview', chatControllerSQL.getPreview);//get

router.post('/blackList', chatControllerSQL.blackList);

router.post('/favorite', chatControllerSQL.favoriteChat);

router.post('/createCatalog', chatControllerSQL.createCatalog);

router.post('/updateNameCatalog', chatControllerSQL.updateNameCatalog);//put

router.post('/addNewChatToCatalog', chatControllerSQL.addNewChatToCatalog);

router.post('/removeChatFromCatalog', chatControllerSQL.removeChatFromCatalog);//delete

router.post('/deleteCatalog', chatControllerSQL.deleteCatalog);//delete

router.post('/getCatalogs', chatControllerSQL.getCatalogs);//get

router.post('/getOffers', contestController.getModeratorOffers);//get
router.post('/banOrPandingOffer', contestController.banOrPandingOffer);

module.exports = router;
