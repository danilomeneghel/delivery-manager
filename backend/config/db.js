var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
