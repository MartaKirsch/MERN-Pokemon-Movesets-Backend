const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/checkIfLoggedIn',userController.checkIfLoggedIn);
router.get('/checkIfExists/:name',userController.checkIfExists);
router.get('/checkIfEmailExists/:email',userController.checkIfEmailExists);

router.post('/register',userController.register);

module.exports = router;
