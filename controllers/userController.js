const session = require('express-session');
//const axios = require("axios");

const checkIfLoggedIn = (req, res) => {
  res.json({loggedIn:false});
};

module.exports = {
  checkIfLoggedIn
};
