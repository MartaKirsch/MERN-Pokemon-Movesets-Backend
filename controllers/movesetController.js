const session = require('express-session');
const axios = require('axios');
const Moveset = require('../models/movesetModel');

const exists = (req, res) => {
  const { name, pokemon } = req.params;

  Moveset.findOne({name_lowercase:name.toLowerCase(), pokemon}).then(doc=>{
    const isOK = doc ? false : true;
    res.json({isOK});
  })
  .catch(err=>{
    res.status(502).json({isOK:false});
  })
};

const existsEmpty = (req, res) => {
  res.json({isOK:true});
};

const add = (req, res) => {
  const { pokemon, name, ability, evs, moves, nature, description, heldItem } = req.body;
  const author = req.session.user;



  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(resp=>{
    const url = resp.data.sprites.front_default;
    const data = {
      pokemon,
      ability,
      name,
      name_lowercase : name.toLowerCase(),
      evs,
      moves,
      nature,
      description,
      heldItem,
      author,
      url
    };

    const moveset = new Moveset(data);
    moveset.save().then(doc=>{
      const saved = doc ? true : false;
      res.json({saved});
    });
  }).catch(err=>{
    res.status(502).json({saved: false});
  });



};

const loadUsersList = (req, res) => {
  const { skip, pokemon } = req.body;
  const { user } = req.session;

  const reg = new RegExp('^'+pokemon);
  Moveset.find({pokemon: { $regex: reg }, author:user})
  .skip(skip)
  .limit(10)
  .sort({createdOn: -1})
  .then(docs=>{
    res.json({movesets:docs});
  })
  .catch(err=>{
    res.status(502).json({movesets:[]});
  })
};

const loadList = (req, res) => {
  const { skip, pokemon:msname, pokeName } = req.body;

  const reg = new RegExp('^'+msname);
  Moveset.find({name: { $regex: reg, $options:'i' }, pokemon:pokeName})
  .sort({createdOn: -1})
  .skip(skip)
  .limit(10)
  .then(docs=>{
    res.json({movesets:docs});
  })
  .catch(err=>{
    res.status(502).json({movesets:[]});
  })
};

const existsById = (req, res) => {
  const { id } = req.params;

  Moveset.findOne({_id:id}).then(doc=>{
    const isOK = doc ? true : false;
    res.json({isOK});
  })
  .catch(err=>{
    res.status(502).json({isOK:false});
  })
};

const load = (req, res) => {
  const { id, pokemon } = req.params;

  //first find moveset
  Moveset.findOne({_id:id}).then(doc=>{
    return doc;
  })
  //then find pokemon info
  .then(ms=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then(resp=>{
      return {ms, pokemon:resp.data};
    })
    //then find species info
    .then(({ms,pokemon})=>{
      axios.get(pokemon.species.url)
      .then(resp=>{
        res.json({moveset:ms, pokemon, species:resp.data});
      });
    });
  })
  .catch(err=>{
    res.status(502).json({isOK:false});
  })
};

module.exports={
  exists,
  existsEmpty,
  add,
  loadUsersList,
  loadList,
  existsById,
  load
};
