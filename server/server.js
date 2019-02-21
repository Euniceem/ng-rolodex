const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const contacts = require('./routes/contacts');
const users = require('./routes/users');

const PORT = process.env.NG_HOST_PORT || 8080;
const ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET
// app.use(session({
//   store: new redis({ url: `${process.env.REDIS_URL}:${process.env.REDIS_HOST_PORT}`, logErrors: true }),
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   // cookie: { secure: ENV === 'production' }

// }));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// after login
passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

// after every request
passport.deserializeUser((user, done) => {
  console.log('deserializing');
  return new User({ id: user.id }).fetch()
    .then(dbUser => {
      dbUser = dbUser.toJSON();
      console.log('dbUser', dbUser)
      return done(null, {
        id: user.id,
        username: user.username
      });
    })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
});


passport.use(new LocalStrategy(function (username, password, done) {
  return new User({ username: username })
    .fetch()
    .then(user => {
      console.log(user)
      user = user.toJSON();

      if (user === null) {
        return done(null, false, { message: 'bad username or password' });
      }
      else {
        bcrypt.compare(password, user.password)
          .then((res) => {
            if (res) { return done(null, user); }
            else {
              return done(null, false, { message: 'bad username or password' });
            }
          });
      }
    })
    .catch(err => {
      console.log('error: ', err);
      return done(err); //500 error
    });
}));


app.use(express.static('public'));
app.use('/api/contacts', contacts);
app.use('/api', users);

app.get('/', (req, res) => {
  return res.send('smoke test');
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log('This is docker!')
});