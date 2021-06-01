const express = require('express');
const pokemonController = require('../controllers/pokemonController');

const router = express.Router();

router.get('/loadPokedexList/:skip', pokemonController.loadPokedexList);
router.get('/loadFullPokedex', pokemonController.loadFullPokedex);
router.get('/checkIfExists/:name', pokemonController.checkIfExists);
router.get('/allPokemonNames', pokemonController.allPokemonNames);
router.get('/allHeldItems', pokemonController.allHeldItems);
router.get('/abilities/:name', pokemonController.abilities);
router.get('/allNatures', pokemonController.allNatures);

router.post('/pokeInfo/:name', pokemonController.pokeInfo);

module.exports=router;
