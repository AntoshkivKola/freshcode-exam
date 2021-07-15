const socketio = require('socket.io');
const ChatController = require('./server/controllers/sockets/ChatController');
const NotificationController = require(
  './server/controllers/sockets/NotificationController',
);

let notificationController;
let chatController;

module.exports.createConnection = (httpServer) => {
  const io = socketio.listen(httpServer);
  notificationController = new NotificationController();
  notificationController.connect('/notifications', io);
  chatController = new ChatController();
  chatController.connect('/chat', io);
};

module.exports.getChatController = () => chatController;

module.exports.getNotificationController = () => notificationController;
