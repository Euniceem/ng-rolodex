const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../../database/models/User');

//AUTHENTICATION
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else {
    res.redirect('/login');
  }
}

router.get('/profile', isAuthenticated, (req, res) => {
  let userId = req.user.id;

  return User.where({ id: userId })
    .fetch({
      columns: ['id', 'username', 'name', 'email', 'address']
    })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    })
});

router.put('/users', isAuthenticated, (req, res) => {
  let userId = req.user.id;
  let body = req.body;

  return User.where({ id: userId })
    .fetch({
      columns: ['id', 'username', 'name', 'email', 'address']
    })
    .save({
      username: body.username,
      name: body.name,
      email: body.email,
      address: body.address
    })
    .then(user => {
      res.json('Successfully edited');
    })
    .catch(err => {
      res.json(err);
    })
});

router.post('/login', (req, res) => {
  if (req.isAuthenticated()) {return res.redirect('/contacts')}
  else {return res.redirect('/register')}
});

router.post('/logout', (req, res) => {
  console.log('hit logout')
  req.logout();
  res.end()
});

router.post('/register', (req, res) => {
  User.where({ username: req.body.username })
  .fetch()
  .then(dbUser => {
    if (dbUser) {
      return res.redirect('/register');
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        res.status(500);
        res.send(err)
      }

      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) {
          res.status(500);
          res.send(err);
        }

        return new User({
          username: req.body.username,
          password: hash
        })
          .save()
          .then((user) => {
            res.redirect('/login');
          })
          .catch((err) => {
            return res.send('Error Creating account');
          });
      })
    })
  });
})

module.exports = router;