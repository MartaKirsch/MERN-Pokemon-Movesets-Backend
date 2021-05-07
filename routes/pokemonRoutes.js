const express = require('express');
const pokemonController = require('../controllers/pokemonController');

const router = express.Router();

router.get('/loadPokedexList/:skip', pokemonController.loadPokedexList);

module.exports=router;
