import ChatSocket from './sockets/ChatSocket';
import NotificationSocket from './sockets/NotificationSocket';
import store from '../../store';

export const controller = new NotificationSocket(
  store.dispatch,
  store.getState,
  '/notifications',
);
export const chatController = new ChatSocket(
  store.dispatch,
  store.getState,
  '/chat',
);
