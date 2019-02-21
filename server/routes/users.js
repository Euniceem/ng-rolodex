const express = require('express');
const router = express.Router();
const Users = require('../../database/models/User');

//AUTHENTICATION
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else {
    res.redirect('/login');
  }
}

router.get('/profile', (req, res) => {

  return Users.fetchAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    })
});

router.put('/users', (req, res) => {

});

router.post('/login', (res, req) => {

});

router.post('/logout', (req, res) => {

});

router.post('/register', (req, res) => {

});




module.exports = router;