const express = require('express'),
  engine = require('ejs-mate'),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  session = require('express-session'),
  consign = require('consign'),
  db = require('./config/db'),
  error = require('./util/error'),
  flash = require('connect-flash'),
  cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'vw9CGbidDQuqJgq',
  resave: false,
  saveUninitialized: false
}));

app.engine('ejs', engine);
app.set('views', __dirname + '/../frontend/src/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/../frontend/public'));

app.use(passport.initialize())
app.use(passport.session())

app.get('*', (req, res, next) => {
  user = req.user || null
  next()
})

app.use(flash())

consign().include('routes').into(app);

app.use(error.notfound);
app.use(error.serverError);

app.listen(process.env.PORT, () => {
  console.log('App listening in ' + process.env.HOST + ':' + process.env.PORT);
});