const jwt = require("jsonwebtoken");
const { responseReturn } = require("../utilities/response");

module.exports.authMiddleware = async function (req, res, next) {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    responseReturn(res, 409, { error: "You are not login" });
  } else {
    try {
      const deCodeToken = await jwt.verify(accessToken, process.env.SECRET);
      console.log(deCodeToken);
      req.role = deCodeToken.role;
      req.id = deCodeToken.id;

      next();
    } catch (error) {
      responseReturn(res, 409, { error: "You are not login" });
    }
  }
};
