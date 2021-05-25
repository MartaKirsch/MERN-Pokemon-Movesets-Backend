const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/checkIfLoggedIn/:name',userController.checkIfLoggedIn);

module.exports = router;
