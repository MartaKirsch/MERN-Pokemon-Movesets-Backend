const express = require('express');
const movesetController = require('../controllers/movesetController');

const router = express.Router();

router.get('/exists', movesetController.existsEmpty);
router.get('/exists/:name', movesetController.existsEmpty);
router.get('/exists/:name/:pokemon', movesetController.exists);

router.post('/', movesetController.add);

module.exports = router;
