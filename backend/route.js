const express = require('express');
const router = express.Router();

const userController = require('./controller');

console.log("userController:", userController);
console.log("signup:", userController.signup);

router.post('/signup', userController.signup);

module.exports = router;