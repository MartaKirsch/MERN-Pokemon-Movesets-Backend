const session = require('express-session');
const axios = require('axios');
const Moveset = require('../models/movesetModel');

//if moveset name is not taken
const exists = (req, res) => {
  const { name, pokemon, id } = req.body;

  if(!name || !pokemon || name=="" || pokemon =="")
    res.json({isOK:true});

  else
  {
    Moveset.findOne({name_lowercase:name.toLowerCase(), pokemon}).then(doc=>{
      let isOK = false;
      if(id && id!=="")
        isOK = (doc && doc._id==id);
      else
        isOK = doc ? false : true;
      res.json({isOK});
    })
    .catch(err=>{
      res.status(502).json({isOK:false});
    })
  }

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

const deleteOne = (req, res) => {
  const { id } = req.params;

  Moveset.findOneAndDelete({_id:id}).then(doc=>{
    const deleted = doc ? true : false;
    res.json({deleted});
  })
  .catch(err=>{
    res.status(502).json({deleted:false});
  })
};

const checkForUpdate = (req, res) => {
  const { user } = req.session;
  const { id } = req.params;

  if(!user || user==="")
    res.json({isOK:false});
  else
  {
    Moveset.findOne({_id:id}).then(doc=>{
      const isOK = doc && doc.author===user ? true : false;
      res.json({isOK, additional:doc});
    })
    .catch(err=>{
      res.status(502).json({isOK:false});
    })
  }
};

const update = (req, res) => {
  const { pokemon, name, ability, evs, moves, nature, description, heldItem } = req.body;
  const { id } = req.params;

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
      url
    };

    Moveset.findOneAndUpdate({_id:id},data).then(doc=>{
      const saved = doc ? true : false;
      res.json({saved});
    })

  }).catch(err=>{
    res.status(502).json({saved: false});
  });






};

module.exports={
  exists,
  add,
  loadUsersList,
  loadList,
  existsById,
  load,
  deleteOne,
  checkForUpdate,
  update
};
