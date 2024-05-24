const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  const jwt_token = authHeader.split(' ')[1];
  //const jwt_token = req.headers.authorization;
  // Check if no token
  if (!jwt_token) {
    return res.status(401).json({message: "No jwt_token provided"});
  }

  try {
    // Verify token
    const decoded = jwt.verify(jwt_token, process.env.JWT_SECRET_KEY);
    //console.log(decoded);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Failed to authenticate token' });
  }
};

module.exports = verifyToken;