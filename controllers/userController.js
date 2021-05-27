const session = require('express-session');
const User = require('../models/userModel');
//const axios = require("axios");

const checkIfLoggedIn = (req, res) => {
  let session = req.session;
  const isOK = session.user ? true : false;
  res.json({isOK});
};

const checkIfExists = (req, res) => {
  User.findOne({username_lowercase:req.params.name.toLowerCase()}).then(doc=>{
    const exists = doc ? true : false;
    res.json({exists});
  })
  .catch(err=>{
    res.json({exists:true});
  });
};

const checkIfEmailExists = (req, res) => {
  User.findOne({email:req.params.email}).then(doc=>{
    const exists = doc ? true : false;
    res.json({exists});
  })
  .catch(err=>{
    res.json({exists:true});
  });
};

const register = (req, res) => {

  const { login, email, passwd } = req.body;

  const user = new User({
    username:login,
    username_lowercase:login.toLowerCase(),
    password:passwd,
    email
  });

  user.save().then(doc=>{
    const registered = doc ? true : false;
    if(registered)
      req.session.user=login;
    res.json({registered});
  }).catch(err=>{
    res.json({registered:false});
  })
};


const logIn = (req, res) => {
  let session = req.session;

  const { login, passwd } = req.body;

  User.findOne({
    $or: [{username_lowercase: login.toLowerCase()}, {email: login}],
    password:passwd
    })
  .then(doc=>{
    const ok = doc ? true : false;

    if(ok)
      session.user = login;

    res.json({loggedIn:ok});
  })
  .catch(err=>{
    res.json({loggedIn:false});
  });
};

const logOut = (req, res) => {
  let sess = req.session;
  sess.user = null;
  res.json({mssg:"logged out"});
};

module.exports = {
  checkIfLoggedIn,
  checkIfExists,
  checkIfEmailExists,
  register,
  logIn,
  logOut
};
