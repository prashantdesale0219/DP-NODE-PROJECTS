const jwt = require("jsonwebtoken");
const isAuth = (req, res, next) => {
  const { AccessToken } = req.cookies;
  console.log(AccessToken)
  console.log(AccessToken);
  if (!AccessToken) {
    return res.status(401).json({ msg: "Please login first" });
  }
  jwt.verify(AccessToken, "02192611", function (err, decoded) {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }

    req.user = decoded.userData;
    next();
  });
};

module.exports = isAuth;
