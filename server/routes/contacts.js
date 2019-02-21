const express = require('express');
const router = express.Router();
const Contact = require('../../database/models/Contact');

//AUTHENTICATION
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else {
    res.redirect('/login');
  }
}

router.get('/', (req, res) => {
  let id = req.params.id;

  return Contact.fetchAll({ createdby: id })
    .then((contacts) => {
      return res.json(contacts);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/search/:term', (req, res) => {
  let id = req.params.id;

  return Contact.query
});

router.post('/', (req, res) => {

});

router.get(':id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;