const nodemailer = require('nodemailer');
const db = require('../models/index');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../../constants');

module.exports.dataForContest = async (req, res, next) => {
  try {
    const payload = {};
    const {
      query: { characteristic1, characteristic2 },
    } = req;
    const predicate = [characteristic1, characteristic2, 'industry'].filter(
      Boolean,
    );

    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: predicate,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach((characteristic) => {
      if (!payload[characteristic.type]) {
        payload[characteristic.type] = [];
      }
      payload[characteristic.type].push(characteristic.describe);
    });
    res.send(payload);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await db.Contest.findOne({
      where: { id: req.params.id },
      order: [[db.Offer, 'id', 'asc']],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance'],
          },
        },
        {
          model: db.Offer,
          required: false,
          where:
            req.tokenData.role === CONSTANTS.ROLES.CREATOR
              ? { userId: req.tokenData.userId }
              : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance'],
              },
            },
            {
              model: db.Rating,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (err) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const { contestId } = req.body;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.CONTEST_TYPES.LOGO) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUSES.REJECTED },
    { id: offerId },
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId,
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction,
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
  CONSTANTS.CONTESTS_STATUSES.FINISHED
}'::"enum_Contests_status"
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
  CONSTANTS.CONTESTS_STATUSES.ACTIVE
}'::"enum_Contests_status"
            ELSE '${
  CONSTANTS.CONTESTS_STATUSES.PENDING
}'::"enum_Contests_status"
            END
    `),
    },
    { orderId },
    transaction,
  );
  await userQueries.updateUser(
    { balance: db.sequelize.literal(`balance + ${finishedContest.prize}`) },
    creatorId,
    transaction,
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUSES.WON}'::"enum_Offers_status"
            WHEN "status"='${CONSTANTS.OFFER_STATUSES.PENDING}' THEN '${CONSTANTS.OFFER_STATUSES.REJECTED}'::"enum_Offers_status"
            ELSE '${CONSTANTS.OFFER_STATUSES.BANNED}'::"enum_Offers_status"
            END
    `),
    },
    {
      contestId,
    },
    transaction,
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED
      && creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId,
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

module.exports.banOrPandingOffer = async (req, res, next) => {
  const {
    body: {
      newStatus, offerId, reasonOfBan, customerId, email, text,
    },
  } = req;
  console.log('email', email);
  try {
    const offer = await db.Offer.update(
      { status: newStatus, reasonOfBan },
      {
        where: { id: offerId },
      },
    );
    if (newStatus === CONSTANTS.OFFER_STATUSES.PENDING) {
      controller
        .getNotificationController()
        .emitEntryCreated(customerId);
    }

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
        subject: 'One of your offer have new status!',
        text: `Your offer "${text}" was ${newStatus === CONSTANTS.OFFER_STATUSES.BANNED ? `banned  by moderator. Reason: ${reasonOfBan}` : 'resolve by moderator'}.`,
      },
      (error) => {
        if (error) {
          console.log(error);
        }
      },
    );

    console.log('email was send!');

    res.send(offer);
  } catch (err) {
    next(err);
  }
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId,
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction,
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getCustomersContests = (req, res, next) => {//
  const { limit, offset } = req.query;

  db.Contest.findAll({
    where: { status: req.headers.status, userId: req.tokenData.userId },
    limit,
    offset: offset ? offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offer,
        required: false,
        attributes: ['id'],
        where: {
          status: [
            CONSTANTS.OFFER_STATUSES.REJECTED,
            CONSTANTS.OFFER_STATUSES.PENDING,
            CONSTANTS.OFFER_STATUSES.WON,
          ],
        },
      },
    ],
  })
    .then((contests) => {
      contests.forEach(
        contest => (contest.dataValues.count = contest.dataValues.Offers.length),
      );
      res.send({
        contests,
        haveMore: !contests.length === 0,
      });
    })
    .catch(err => next(new ServerError(err)));
};

module.exports.getContests = (req, res, next) => {
  const { offset, limit, typeIndex, contestId, industry, awardSort, ownEntries } = req.query;

  const predicates = UtilFunctions.createWhereForAllContests(
    typeIndex,
    contestId,
    industry,
    awardSort,
  );
  db.Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: limit,
    offset: offset ? offset : 0,
    include: [
      {
        model: db.Offer,
        required: ownEntries,
        where: ownEntries ? { userId: req.tokenData.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then((contests) => {
      contests.forEach(
        contest => (contest.dataValues.count = contest.dataValues.Offers.length),
      );
      res.send({
        contests,
        haveMore: !contests.length === 0,
      });
    })
    .catch((err) => {
      next(new ServerError());
    });
};

module.exports.getModeratorOffers = async (req, res, next) => {
  try {
    console.log('getting offers>>>>>>>>>>');
    const { body: pagination } = req;

    const offers = await db.Offer.findAll({
      where: { status: CONSTANTS.OFFER_STATUSES.MODERATED },
      attributes: { exclude: ['userId', 'contestId'] },
      order: [['id', 'asc']],
      ...pagination,
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance'],
          },
        },
        {
          model: db.Contest,
          required: true,
          attributes: ['userId'],
        },
      ],
    });
    res.send(offers);
  } catch (err) {
    next(new ServerError());
  }
};
