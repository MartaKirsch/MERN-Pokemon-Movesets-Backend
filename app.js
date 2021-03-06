require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pokemonRoutes = require('./routes/pokemonRoutes');
const userRoutes = require('./routes/userRoutes');
const movesetRoutes = require('./routes/movesetRoutes');

const app = express();

//mongoose findOneAndUpdate depracation
mongoose.set('useFindAndModify', false);

//heroku stuff - port/db uri selection
let port = process.env.PORT;
let dbURI = process.env.DBURI;

if (port == null || port == "") {
  port = 5000;
}
else
{
  dbURI = process.env.DBURI;
}

dbURI = process.env.DBURI;

//db connection
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then((result)=>{console.log('connected to db');app.listen(port);console.log(`listening to port: ${port}`);})
  .catch((err)=>console.log('there is an error: '+err));

// app.listen(port);
// console.log(`listening to port: ${port}`);


//use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session
app.use(session({
  secret: 'pandeuek',
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: dbURI,
    clear_interval: 3600,
    ttl:60*60*24})
}));

//routes
app.use('/pokemon', pokemonRoutes);
app.use('/user', userRoutes);
app.use('/moveset',movesetRoutes);

//404
app.use((req,res)=>{
  res.status(404).send('An error occured');
})
