const fs = require('fs');
const cron = require('node-cron');

const file = 'src/server/logs/todayLogs.json';
const path = 'src/server/logs/';

function createNewLogFile(newFileName) {
  fs.access(file, fs.F_OK, (findFileError) => {
    if (findFileError) {
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      const prerearedData = JSON.stringify(
        JSON.parse(data).map(({ message, time, code }) => ({
          message,
          time,
          code,
        })),
      );
      fs.writeFile(`${path}${newFileName}.json`, prerearedData, (error) => {
        if (error) {
          throw error;
        }
      });
      fs.rm(file, (error) => {
        if (error) {
          throw error;
        }
      });
    });
  });
}

module.exports.errorLoger = async function (err) {
  const prerearedStackTrace = {
    errorType: err.stack.split(':')[0],
    path: err.stack.split('\n').filter((e, index) => index !== 0),
  };
  const errors = [];

  fs.access(file, fs.F_OK, (findFileError) => {
    errors.push({
      message: err.message,
      time: new Date().toLocaleTimeString(),
      code: err.status ? err.status : '-',
      stackTrace: prerearedStackTrace,
    });
    if (findFileError) {
      fs.writeFile(file, JSON.stringify(errors), (err) => {
        if (err) {
          throw err;
        }
      });
      return;
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      errors.push(...JSON.parse(data));
      fs.writeFile(file, JSON.stringify(errors), (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
};

(function startLogTimer() {
  console.log('Start');
  cron.schedule(
    '00 00 * * *', //  minute , hour,  day of month, month,  day of week
    () => {
      createNewLogFile(new Date().toISOString());
    },
    {
      timezone: 'Europe/Kiev',
    },
  );
}());
