const http = require('http');
const cron = require('node-cron');
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

const { createNewLogFile } = require('./server/utils/errorLoger.js');

const server = http.createServer(app);

controller.createConnection(server);

server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);

cron.schedule(
  '00 00 * * *',
  () => {
    createNewLogFile(new Date().toISOString());
    console.log('Running a job at 00 00 ');
  },
  {
    timezone: 'Europe/Kiev',
  }
); 
