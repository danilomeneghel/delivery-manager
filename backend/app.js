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
  moment = require('moment');

app.locals.moment = moment;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
  console.log('App listening on port 3001!');
});