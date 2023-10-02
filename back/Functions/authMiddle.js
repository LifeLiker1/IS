const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Токен отсутствует. Авторизация не выполнена." });
  }

  try {
    const decoded = jwt.verify(token, "test");
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Токен недействителен. Авторизация не выполнена." });
  }
};
