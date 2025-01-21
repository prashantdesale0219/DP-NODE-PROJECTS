const jwt = require('jsonwebtoken');
const SECRET_KEY = "02192611";

const authenticator = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send("Invalid token");
  }
};

module.exports = { authenticator };
