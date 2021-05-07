const session = require('express-session');

const loadPokedexList = (req, res) => {
  res.json({mssg:"it works!"});
};

module.exports={
  loadPokedexList
};
