const express = require('express');
const pokemonController = require('../controllers/pokemonController');

const router = express.Router();

router.get('/loadPokedexList/:skip', pokemonController.loadPokedexList);
router.get('/loadFullPokedex', pokemonController.loadFullPokedex);

module.exports=router;
