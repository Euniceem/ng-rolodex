const express = require('express');
const router = express.Router();
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

module.exports = router;