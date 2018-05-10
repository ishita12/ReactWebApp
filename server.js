const express = require('express');
const mongoose = require('mongoose');
const app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const db = require('./config/database').mongoURI;

mongoose.connect(db).then(() => {
  console.log('connected to database '+ db);
}).catch(err => {
  console.log(err);
});

app.get('/', (req, res) => res.send('Ishita babel'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/users', users);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('listening to port '+ port));
