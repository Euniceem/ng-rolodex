const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('connect-redis')(session);
const contacts = require('./routes/contacts');
const users = require('./routes/users');

const PORT = process.env.NG_HOST_PORT || 8080;
const ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET
app.use(session({
  store: new redis({ url: `${process.env.REDIS_URL}:${process.env.REDIS_HOST_PORT}`, logErrors: true }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: ENV === 'production' }

}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/api/contacts', contacts);
app.use('/api/users', users);

app.get('/', (req, res) => {
  return res.send('smoke test');
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log('This is docker!')
});