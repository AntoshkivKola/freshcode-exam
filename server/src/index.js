const http = require('http');
require('dotenv').config();
require('./server/dbMongo/mongoose');
const controller = require('./socketInit');
const app = require('./app')();
const { client } = require('./server/models/chatModels');

const PORT = process.env.PORT || 3000;

async function start () {
  await client.connect(err => {
    if (err) {
      console.error('connection error', err.stack);
    } else {
      console.log('connected');
    }
  });
}
start();

const server = http.createServer(app);
controller.createConnection(server);

server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);

