const fs = require('fs');

const addID = (req, res, next) => {
  const db = JSON.parse(fs.readFileSync('./db.json'));
  const heroes = db.heroes;
  const lastID = heroes.length > 0 ? heroes[heroes.length - 1].id : 0;
  req.body.id = lastID + 1;
  next();
};

module.exports = addID;
