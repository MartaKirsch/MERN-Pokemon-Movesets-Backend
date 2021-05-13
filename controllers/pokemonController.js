const session = require('express-session');
const axios = require("axios");

const loadPokedexList = (req, res) => {

  const skip = parseInt(req.params.skip);

  let requests=[];
  for(let i=1+skip;i<=10+skip;i++)
  {
    if(i<=1118)
    {
      requests.push( axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`) );
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
  axios.get('https://pokeapi.co/api/v2/pokemon?limit=1118').then(response=>{

    res.json({pokedex:response.data.results});
  }).catch(error => {
    res.status(502).json({error});
  });
};

module.exports={
  loadPokedexList,
  loadFullPokedex
};
