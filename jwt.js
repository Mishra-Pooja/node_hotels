// // jwtauthmiddleware.js
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const jwtauthmiddleware = (req, res, next) => {
//     // Check for authorization header
//     const authorization = req.headers.authorization; 
//     if (!authorization) return res.status(401).json({ error: 'Token not found' });

//     // Extract the token from the header
//     const token = authorization.split(' ')[1]; 
//     if (!token) return res.status(401).json({ error: 'Unauthorized' });

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); 
//         req.user = decoded;
//         next();
//     } catch (err) {
//         console.log(err);
//         res.status(401).json({ error: 'Invalid token' });
//     }
// };

// // Function to generate JWT token
// const generatetoken = (userData) => {
//     // Generate a new JWT token using user data
//     return jwt.sign(userData, process.env.JWT_SECRET); 
// };

// module.exports = { jwtauthmiddleware, generatetoken };
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Load environment variables

const jwtauthmiddleware = (req, res, next) => {
  // Check for authorization header
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: 'Token not found' });

  // Extract the token from the header
  const token = authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') { // Handle specific JWT errors
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const generatetoken = (userData) => {
  // Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtauthmiddleware, generatetoken };