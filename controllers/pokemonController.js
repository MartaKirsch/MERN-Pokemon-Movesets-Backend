const session = require('express-session');
const axios = require("axios");

const loadPokedexList = (req, res) => {

  const skip = parseInt(req.params.skip);

  let requests=[];
  for(let i=1+skip;i<=10+skip;i++)
  {
    if(i<=898)
    {
      requests.push( axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`) );
    }
    else if(i<=1118)
    {
      requests.push( axios.get(`https://pokeapi.co/api/v2/pokemon/${i+9103}/`) );
    }
  }

  axios.all(requests).then(axios.spread((...responses) => {

    let list = [];

    responses.forEach((response) => {

      let types = [];
      response.data.types.forEach((type) => {
        types.push(type.type.name);
      });


      const obj = {
        id:response.data.id,
        name: response.data.name,
        img: response.data.sprites.front_default,
        types
      };
      list.push(obj);
    });

    res.json({list});
  })).catch(errors => {
    res.status(502).json({errors});
  });



};

const loadFullPokedex = (req, res) => {
  axios.get('https://pokeapi.co/api/v2/pokemon-species/?limit=898').then(response=>{

    res.json({list:response.data.results});
  }).catch(error => {
    res.status(502).json({error});
  });
};

const checkIfExists = (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${req.params.name}`).then(response=>{
    res.json({isOK:true});
  }).catch(error => {
    res.status(502).json({isOK:false});
  });
};

const pokeInfo = (req, res) => {
  let { name } = req.params;
  let { species } = req.body;
  name=name.toLowerCase();
  species=species.toLowerCase();

  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${species}`).then(resp => {

    const speciesObj = resp.data;

    let index = 0;
    speciesObj.varieties.forEach((variety,i) => {
      if(variety.pokemon.name===name)
        index=i;
    });


    let requests = [axios.get(speciesObj.varieties[index].pokemon.url),
    axios.get(speciesObj.evolution_chain.url)];

    axios.all(requests).then(axios.spread((...responses) => {

      const pokemon = responses[0].data;
      const evolution = responses[1].data;

      res.json({pokemon, species:speciesObj, evolution});

    })).catch(errors => {
      res.status(502).json({errors});
    });

  }).catch(err => {
    res.status(502).json({err});
  });


};

const allPokemonNames = (req, res) => {
  axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1118').then(response=>{
    res.json({list:response.data.results});
  }).catch(error => {
    res.status(502).json({error});
  });
};

const allHeldItems = (req, res) => {
  axios.get('https://pokeapi.co/api/v2/item-attribute/7').then(response=>{
    res.json({list:response.data.items});
  }).catch(error => {
    res.status(502).json({error});
  });
};

const abilities = (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`).then(response=>{
    let arr = [];
    response.data.abilities.forEach(item => {
      arr.push(item.ability);
    });
    res.json({list:arr});
  }).catch(error => {
    res.status(502).json({error});
  });
};

const allNatures = (req, res) => {
  axios.get('https://pokeapi.co/api/v2/nature/?limit=25').then(response=>{
    res.json({list:response.data.results});
  }).catch(error => {
    res.status(502).json({error});
  });
};

const allMoves = (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`).then(response=>{
    let list = response.data.moves.map(item=>item.move);
    res.json({list});
  }).catch(error => {
    res.status(502).json({error});
  });
};

module.exports={
  loadPokedexList,
  loadFullPokedex,
  checkIfExists,
  pokeInfo,
  allPokemonNames,
  allHeldItems,
  abilities,
  allNatures,
  allMoves
};
