const express = require('express');
const movesetController = require('../controllers/movesetController');

const router = express.Router();

router.get('/checkForUpdate/:id', movesetController.checkForUpdate);
router.get('/existsById/:id', movesetController.existsById);
router.get('/:pokemon/:id', movesetController.load);

router.post('/exists', movesetController.exists);
router.post('/', movesetController.add);
router.post('/loadUsersList',movesetController.loadUsersList);
router.post('/loadList',movesetController.loadList);

router.put('/:id', movesetController.update);

router.delete('/:id', movesetController.deleteOne);

module.exports = router;
