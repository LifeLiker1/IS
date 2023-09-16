const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      jwt.verify(token, "test", (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    }
  };
module.exports = {
  authenticateJWT,
};
