const express = require('express');
const signInRoute = express.Router(); 

const {signInUser, logInUser} = require('../controllers/signInController');
const authenticateToken = require('../middlewares/verifyToken');


signInRoute.post('/signup', signInUser);
signInRoute.post('/login', logInUser);


module.exports = signInRoute;