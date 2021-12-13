const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const config = require('../env.json');

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1].replace('"',"").replace('"',"");
    var tokenTest = process.env.SECRET_KEY ? process.env.SECRET_KEY : config.SECRET_KEY;
    const user = jwt.verify(token,tokenTest);
    if(user) {
      var userData = jwt_decode(token);
      req.user = userData;
      next();
    }
    else {
      return res.status(400).json({ message: "Authorization required"})
    }
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
};

exports.customerMiddleware = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res.status(400).json({ message: "Customer access denied" });
  }
  next();
};

exports.managerMiddleware = (req, res, next) => {
  if (req.user.role !== "manager" && req.user.role !== "admin" ) {
      return res.status(400).json({ message: "Manager access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(200).json({ message: "Admin access denied" });
  }
  next();
};
