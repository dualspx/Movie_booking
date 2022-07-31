const uri = "mongodb+srv://dualspx:-rxyX7eRVBZngwe@cluster0.jtmfm.mongodb.net/?retryWrites=true&w=majority"
var express = require('express');
const passport = require('passport')
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var User = require('./models/user')
var MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => User.find(User => User.email === email)
)

// app.set('view engine','ejs')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  
}));


app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var admin = require('./routes/admin');
var index = require('./routes/index');


app.use('/', index);
app.use('/admin',admin)


// app.use('/',ticketRouter)

app.get('/logout',(req,res) =>{
  res.redirect('/login')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });
  
  
  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });
  
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log('Server is started on http://127.0.0.1:'+PORT);
  });
