const fs = require('fs');

const userLogger = (req, res, next) => {
  const log = `User: ${req.user.username}, Role: ${req.user.role}\n`;
  fs.appendFileSync('log.txt', log);
  next();
};

module.exports = { userLogger };
