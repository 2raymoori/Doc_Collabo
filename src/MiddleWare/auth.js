const jwt = require("jsonwebtoken");
const config = require("config");

const authenticate = (req, res, next) => {
  const token = req.header("tokenizer");
  if (!token) {
    return res.status(401).json({
      status: "Error",
      data: [{ msg: "No token, authorization denied" }],
    });
  } else {
    try {
      const decoded = jwt.verify(token, config.get("TOKEN_KEY"));
      req.user = {
        email: decoded.email,
        uId: decoded.id,
      };
      next();
    } catch (error) {
      return res.status(401).json({
        status: "Error",
        data: [{ msg: "Invalid token, authorization denied" }],
      });
    }
  }
};
module.exports = authenticate;
