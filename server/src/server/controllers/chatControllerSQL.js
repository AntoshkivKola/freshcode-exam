const _ = require('lodash');
const db = require('../models/index');
const userQueries = require('./queries/userQueries');
const controller = require('../../socketInit');
const { Message, Conversation, Catalog } = require('../models/chatModels');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const newConversation = await Conversation.findOneOrCreate(participants);
    console.log('newCon: ', newConversation);

    const message = new Message({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: newConversation.id,
    });

    await message.save();
    message.participants = participants;
    const interlocutorId = participants.filter(
      participant => participant !== req.tokenData.userId
    )[0];
    const preview = {
      _id: newConversation.id,
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
      message: message,
      preview: {
        _id: newConversation.id,
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
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const messages = await Message.getMessages(participants);

    const interlocutor = await userQueries.findUser({
      id: req.body.interlocutorId,
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
    conversations.forEach(conversation => {
      interlocutors.push(
        conversation.participants.find(
          participant => participant !== req.tokenData.userId
        )
      );
    });
    const senders = await db.User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    conversations.forEach(conversation => {
      senders.forEach(sender => {
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
    console.log(' chat >>>>>>>>>>', chat);

    res.send(chat);
    const interlocutorId = req.body.participants.filter(
      participant => participant !== req.tokenData.userId
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

