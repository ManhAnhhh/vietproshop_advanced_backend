const jwt = require("jsonwebtoken");
const config = require("config");
exports.verifyAuthenticationCustomer = (req, res, next) => {
  // verify bang header va ca jwt
  // console.log(req.cookies);
  const { token } = req.headers;
  // token authentication co bearer o dau dung de thong bao.
  if (token) {
    const verifyToken = token.split(" ")[1]; // ;
    jwt.verify(verifyToken, config.get("app.jwtAccessKey"), (err, customer) => {
      if (err) {
        // console.log(err);
        return res.status(401).json("Authentication failed");
      }
      next();
    });
  } else {
    return res.status(403).json("Authentication required");
  }
};
