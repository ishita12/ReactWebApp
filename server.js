const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const postShift = require('./routes/api/postShift');
const proctorShift = require('./routes/api/proctorShift');
const path = require('path');

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
app.use('/api/postShift', postShift);
app.use('/api/proctor', proctorShift);

// serve static assets if in production.

if(process.env.NODE_ENV === 'production') {
//set static folder
app.use(express.static('client/build'));
app.get('*', (req, res) => {

res.send(path.resolve(__dirname, 'client', 'build', 'index.html'));


});
}



const port = process.env.PORT || 5000;

app.listen(port, () => console.log('listening to port '+ port));
