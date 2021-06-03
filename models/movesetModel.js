const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movesetSchema = new Schema({
  "author": {
    type: String,
    required: true
  },
  "name": {
    type: String,
    required: true
  },
  "name_lowercase": {
    type: String,
    required: true
  },
  "pokemon": {
    type: String,
    required: true
  },
  "url": {
    type: String,
    required: true
  },
  "ability": {
    type: String,
    required: true
  },
  "nature": {
    type: String,
    required: true
  },
  "heldItem": {
    type: String
  },
  "moves": [{
    type: String
  }],
  "evs": [{
    "name":{
      type: String
    },
    "num":{
      type: Number
    }
  }],
  "description": {
    type: String
  },
  "createdOn": {
    type: Date,
    default: Date.now
  },
});

//create model
const Moveset = mongoose.model('Moveset', movesetSchema);

module.exports = Moveset;
