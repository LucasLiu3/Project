const jwt = require("jsonwebtoken");
const { responseReturn } = require("../utilities/response");

module.exports.customerMiddleware = async function (req, res, next) {
  const { token } = req.cookies;

  if (!customerToken) {
    responseReturn(res, 409, { error: "You are not login" });
  } else {
    try {
      const deCodeToken = await jwt.verify(customerToken, process.env.SECRET);

      req.id = deCodeToken.id;

      next();
    } catch (error) {
      responseReturn(res, 409, { error: "You are not login" });
    }
  }
};
