// const jwt = require('jsonwebtoken');
// const config = require('config');

// module.exports = function (req, res, next) {
//   const token = req.header('x-auth-token');
//   if (!token) return res.status(401).send('Access denied. No token provided.');

//   try {
//     const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
//     //verify() verfies json web token
//     //1st arg is the token
//     //2nd arg is the private key
//     req.user = decoded; 
//     next();
//   }
//   catch (ex) {//if token isn't valid it'll throw an exception
//     res.status(400).send('Invalid token.');
//   }
// }
//EXPRESS MIDDLEWARE FUNCTION
//AUTHENTICATE GET /api/users