const session = require('express-session');
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
    author
  };

  const moveset = new Moveset(data);
  moveset.save().then(doc=>{
    const saved = doc ? true : false;
    res.json({saved});
  })
  .catch(err=>{
    res.status(502).json({saved: false});
  });
};

module.exports={
  exists,
  existsEmpty,
  add
};
