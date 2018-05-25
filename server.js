const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const postShift = require('./routes/api/postShift');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/database').mongoURI;

mongoose.connect(db).then(() => {
  console.log('connected to database '+ db);
}).catch(err => {
  console.log(err);
});

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/users', users);
app.use('./api/postShift', postShift);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('listening to port '+ port));
