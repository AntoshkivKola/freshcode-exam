const fs = require('fs');

module.exports.errorLoger = async function (err) {
  const file = 'src/server/logs/todayLogs.json';

  const errors = [];
  console.log('start!');
  fs.access(file, fs.F_OK, findFileError => {
    errors.push({
      message: err.message,
      time: new Date().toLocaleTimeString(),
      code: err.status ? err.status : '-',
      stackTrace: err.stack,
    });
    console.log('add!');
    if (!findFileError) {
      fs.readFile(file, (err, data) => {
        if (err) {
          throw err;
        }
        errors.push(...JSON.parse(data));
        console.log('read!');
        fs.writeFile(file, JSON.stringify(errors), err => {
          console.log('write!');
          console.log(
            'errorLoger>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..',
            errors
          );
          if (err) {
            throw err;
          }
        });
      });
      return;
    }
    fs.writeFile(file, JSON.stringify(errors), err => {
      console.log('write!');
      console.log(
        'errorLoger>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..',
        errors
      );
      if (err) {
        throw err;
      }
    });
  });
};
