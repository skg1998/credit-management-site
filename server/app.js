const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const cors= require('cors');
const flash = require('express-flash');
const Users = require('./routes/Users');

const port = process.env.PORT || 3000;

const app = express();


//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
app.use(cors());


//session
app.use(session({ secret: 'session secret key' }));

//flaSH
app.use(flash());
app.use(function(req, res, next){
  res.locals.messages = req.flash();
  next();
});


app.use('/users',Users);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


//Express-session
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true
}));

//mongoose connection
const mongoURI = 'mongodb://localhost:27017/DoCoGen';
mongoose.connect(mongoURI ,{ useUnifiedTopology: true }).then(()=>{
  console.log("MongoDb connected...")
}).catch(err=>{
   console.log(err)
  });


//listining on port 3000
app.listen(port,()=>{
  console.log("server is runing on port :" + port)
});
