const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../../database/models/User');
const saltRounds = 12;

//AUTHENTICATION
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else {
    res.json({success:'failed to authorize'});
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

router.put('/edit-profile', isAuthenticated, (req, res) => {
  let userId = req.user.id;
  let body = req.body;
  console.log("userid, body:", userId, body)

  return User.where({ id: userId })
    .save({
      username: body.username,
      password: body.password,
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

router.post('/login', passport.authenticate('local'), (req, res) => {
  if (req.isAuthenticated()) {return res.json({success: 'true'})}
  else {return res.json({success: 'fail '})}
});

router.post('/logout', (req, res) => {
  req.logout();
  res.end()
});

router.post('/register', (req, res) => {
   
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
            res.json({success: 'true'})
          })
          .catch((err) => {
            return res.send('Error Creating account');
          });
      })
    })
  });


module.exports = router;