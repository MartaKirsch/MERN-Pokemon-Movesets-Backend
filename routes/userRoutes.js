const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/checkIfLoggedIn',userController.checkIfLoggedIn);
router.get('/checkIfExists/:name',userController.checkIfExists);
router.get('/checkIfEmailExists/:email',userController.checkIfEmailExists);
router.get('/logOut',userController.logOut);
router.get('/username',userController.getUsername);

router.post('/register',userController.register);
router.post('/logIn',userController.logIn);

module.exports = router;
