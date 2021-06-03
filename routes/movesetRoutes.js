const express = require('express');
const movesetController = require('../controllers/movesetController');

const router = express.Router();

router.get('/exists', movesetController.existsEmpty);
router.get('/exists/:name', movesetController.existsEmpty);
router.get('/exists/:name/:pokemon', movesetController.exists);

router.post('/', movesetController.add);
router.post('/loadUsersList',movesetController.loadUsersList);
router.post('/loadList',movesetController.loadList);

module.exports = router;
