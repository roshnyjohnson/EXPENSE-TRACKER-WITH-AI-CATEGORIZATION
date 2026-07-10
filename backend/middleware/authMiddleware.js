const jwt = require('jsonwebtoken');
 
const protect = (req, res, next) => {
  // Check the Authorization header exists and starts with 'Bearer '
  const authHeader = req.headers.authorization;
 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, access denied' });
  }
 
  // Extract the token (everything after 'Bearer ')
  const token = authHeader.split(' ')[1];
 
  try {
    // Verify signature and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    // Attach the userId to the request object so route handlers can use it
    req.userId = decoded.userId;
 
    next(); // Token is valid — proceed to the actual route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
 
module.exports = { protect };