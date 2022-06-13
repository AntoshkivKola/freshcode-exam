const db = require('../models/index');
const userQueries = require('./queries/userQueries');
const controller = require('../../socketInit');
const { Message, Conversation, Catalog } = require('../models/chatModels');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2,
  );
  try {
    const newConversation = await Conversation.findOneOrCreate(participants);

    const message = new Message({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: newConversation._id,
    });

    await message.save();
    message.participants = participants;
    const interlocutorId = participants.filter(
      participant => participant !== req.tokenData.userId,
    )[0];
    const preview = {
      _id: newConversation._id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };
    const sender = await db.User.findByPk(req.tokenData.userId, {
      attributes: ['firstName', 'lastName', 'id'],
      raw: true,
    });
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        _id: newConversation._id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    controller.getNotificationController().emitNewMessage({
      interlocutorId,
      sender,
      dialogId: message.conversation,
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const interlocutorId = JSON.parse(req.query.interlocutorId);
  const participants = [req.tokenData.userId, interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2,
  );
  try {
    const messages = await Message.getMessages(participants);

    const interlocutor = await userQueries.findUser({
      id: interlocutorId,
    });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await Conversation.getPreview();

    const interlocutors = [];
    conversations.forEach((conversation) => {
      interlocutors.push(
        conversation.participants.find(
          participant => participant !== req.tokenData.userId,
        ),
      );
    });
    const senders = await db.User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    conversations.forEach((conversation) => {
      senders.forEach((sender) => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const userIndex = req.body.participants.indexOf(req.tokenData.userId) + 1;
  try {
    const chat = await Conversation.changeBlackListFlag({
      userIndex,
      participants: req.body.participants,
      blackListFlag: req.body.blackListFlag,
    });

    res.send(chat);
    const interlocutorId = req.body.participants.filter(
      participant => participant !== req.tokenData.userId,
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const userIndex = req.body.participants.indexOf(req.tokenData.userId) + 1;
  try {
    const chat = await Conversation.changeFavoriteListFlag({
      userIndex,
      participants: req.body.participants,
      favoriteFlag: req.body.favoriteFlag,
    });

    res.send(chat);
    const interlocutorId = req.body.participants.filter(
      participant => participant !== req.tokenData.userId,
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const catalog = new Catalog({
    userId: req.tokenData.userId,
    catalogName: req.body.catalogName,
    chats: [req.body.chatId],
  });
  try {
    await catalog.save();
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalog.getCatalogs(req.tokenData.userId);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.updateNameCatalog({
      _id: +req.params.id,
      catalogName: req.body.catalogName,
    });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const catalogId = +req.params.catalogId;

    await Catalog.remove({
      _id: catalogId,
      userId: req.tokenData.userId,
    });
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const chatId = +req.params.chatId;
    const catalogId = +req.params.catalogId;
    const catalogs = await Catalog.getCatalogs(req.tokenData.userId);
    const catalogToInsert = catalogs.find(({ _id }) => _id === catalogId);

    if (catalogToInsert.chats.includes(chatId)) {
      return res.sendStatus(200);
    }

    const catalog = await Catalog.addNewChatToCatalog({
      _id: catalogId,
      userId: req.tokenData.userId,
      chat: chatId,
    });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const chatId = +req.params.chatId;
    const catalogId = +req.params.catalogId;

    const catalog = await Catalog.removeChatFromCatalog({
      _id: catalogId,
      userId: req.tokenData.userId,
      chat: chatId,
    });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};
