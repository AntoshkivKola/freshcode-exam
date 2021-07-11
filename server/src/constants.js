require('dotenv').config()

const {
  env: {
    SQUADHELP_BANK_NUMBER,
    SQUADHELP_BANK_NAME,
    SQUADHELP_BANK_CVC,
    SQUADHELP_BANK_EXPIRY,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_TIME,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_TIME
  }
} = process;

module.exports = {
  SQUADHELP_BANK_NUMBER,
  SQUADHELP_BANK_NAME,
  SQUADHELP_BANK_CVC,
  SQUADHELP_BANK_EXPIRY,

  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,

  MAX_DEVICE_AMOUNT: 3,
  SALT_ROUNDS: 6,

  ROLES: {
    CUSTOMER: 'customer',
    CREATOR: 'creator',
    MODERATOR: 'moderator'
  },

  CREATOR_ENTRIES: 'creator_entries',

  CONTEST_TYPES: {
    NAME: 'name',
    LOGO: 'logo',
    TAGLINE: 'tagline'
  },
  OFFER_STATUSES: {
    PENDING: 'pending',
    REJECTED: 'rejected',
    WON: 'won'
  },
  CONTESTS_STATUSES: {
    ACTIVE: 'active',
    FINISHED: 'finished',
    PENDING: 'pending'
  },

  FILES_PATH: 'public/',
  CONTESTS_DEFAULT_DIR: 'public/contestFiles/',

  SOCKET_CONNECTION: 'connection',
  SOCKET_SUBSCRIBE: 'subscribe',
  SOCKET_UNSUBSCRIBE: 'unsubscribe',

  NOTIFICATION_NEW_MESSAGE: 'notificationNewMessage',
  NOTIFICATION_ENTRY_CREATED: 'onEntryCreated',
  NOTIFICATION_CHANGE_MARK: 'changeMark',
  NOTIFICATION_CHANGE_OFFER_STATUS: 'changeOfferStatus',

  NEW_MESSAGE: 'newMessage',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS'
};
