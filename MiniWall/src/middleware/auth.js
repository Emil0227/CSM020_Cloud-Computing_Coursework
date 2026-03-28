// import jsonwebtoken library to verify JWT tokens
const jwt = require('jsonwebtoken');

// middleware to enforce authentication on protected routes
// validate the JWT token provided in the Authorization header
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.sub,
      email: payload.email
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// export middleware for use in protected routes
module.exports = requireAuth;