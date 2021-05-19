const express = require('express');
const pokemonController = require('../controllers/pokemonController');

const router = express.Router();

router.get('/loadPokedexList/:skip', pokemonController.loadPokedexList);
router.get('/loadFullPokedex', pokemonController.loadFullPokedex);
router.get('/checkIfExists/:name', pokemonController.checkIfExists);
router.get('/pokeInfo/:species/:name', pokemonController.pokeInfo);

module.exports=router;
