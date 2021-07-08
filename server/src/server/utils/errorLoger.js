const fs = require('fs');

const file = 'src/server/logs/todayLogs.json';
const path = 'src/server/logs/';

module.exports.createNewLogFile = newFileName => {
  fs.access(file, fs.F_OK, findFileError => {
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
        }))
      );
      fs.writeFile(`${path}${newFileName}.json`, prerearedData, err => {
        if (err) {
          throw err;
        }
      });
      fs.rm(file, err => {
        if (err) {
          throw err;
        }
      });
    });
  });
};

module.exports.errorLoger = async function (err) {
  const errors = [];

  fs.access(file, fs.F_OK, findFileError => {
    errors.push({
      message: err.message,
      time: new Date().toLocaleTimeString(),
      code: err.status ? err.status : '-',
      stackTrace: err.stack,
    });
    if (findFileError) {
      fs.writeFile(file, JSON.stringify(errors), err => {
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
      fs.writeFile(file, JSON.stringify(errors), err => {
        if (err) {
          throw err;
        }
      });
    });
  });
};
