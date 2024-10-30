const jwt = require("jsonwebtoken");

// Middleware function to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send("Access Denied. No token provided");
  }

  try {
    // Verify token with the secret key, if valid will return the payload
    // otherwise will throw an error, which will go to catch block
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the verified user information to the request object
    req.user = verified;

    // Proceed to the next middleware or request handler
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = verifyToken;
