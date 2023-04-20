const { writeTextToFile } = require('./server-err-logs/error-logs');

const date = Date.now();
const serverErrorFile = `./errors/server-err-logs/log-${date}.txt`;

module.exports = (err, req, res) => {
  if (err.statusCode === undefined) {
    res.status(500).send({ message: 'На сервере произошла ошибка.' });
    writeTextToFile(serverErrorFile, `Дата и время ошибки: ${new Date()}; Текст ошибки: ${err.message}`);
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
};
