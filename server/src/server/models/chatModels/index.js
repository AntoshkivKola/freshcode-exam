const { Client } = require('pg');
const Catalog = require('./Catalog');
const Conversation = require('./Conversation');
const Message = require('./Message');

const config = require('../../config/postgresConfig.json').development;
const client = new Client(config);

Catalog._client = client;
Conversation._client = client;
Message._client = client;

module.exports = {
  client,
  Catalog,
  Conversation,
  Message,
};
