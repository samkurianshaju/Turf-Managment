const jwt = require("jsonwebtoken");

const readAuthTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    return authHeader.split(" ")[1];
  } else {
    return undefined;
  }
};

const signJwt = (payload, expiry) => {
  return jwt.sign(payload, "qppgafhgartyryahfra", {
    expiresIn: expiry,
  });
};

const verify = (req, res, next) => {
  let token = readAuthTokenFromRequest(req);
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, "qppgafhgartyryahfra", function (err, decoded) {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verify, signJwt };
