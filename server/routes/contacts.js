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

router.get('/', isAuthenticated, (req, res) => {
  let userId = req.user.id;

  return Contact.fetchAll({ createdby: userId })
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/search/:term', isAuthenticated, (req, res) => {
  let userId = req.user.id;

  return Contact.query((search) => {
    search.where('created_by', userId)
      .andWhere(() => {
        let term = `%${req.params.term}%`
        this.whereRaw('LOWER(name) LIKE ?', term)
          .orWhereRaw('LOWER(address) LIKE ?', term)
          .orWhereRaw('LOWER(mobile) LIKE ?', term)
          .orWhereRaw('LOWER(work) LIKE ?', term)
          .orWhereRaw('LOWER(email) LIKE ?', term)
          .orWhereRaw('LOWER(twitter) LIKE ?', term)
          .orWhereRaw('LOWER(instagram) LIKE ?', term)
          .orWhereRaw('LOWER(github) LIKE ?', term)
      })
  })
    .fetchAll({
      columns: ['name', 'address', 'mobile', 'work', 'home', 'email', 'twitter', 'instagram', 'github']
    })
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      res.json(err);
    })
});

router.post('/', isAuthenticated, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  return new Contact({ id: id })
    .forge({
      name: body.name,
      address: body.address,
      mobile: body.mobile,
      work: body.work,
      home: body.home,
      email: body.email,
      twitter: body.twitter,
      instagram: body.instagram,
      github: body.github
    })
    .save()
    .then(contact => {
      res.json('Successfully created:', contact);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get(':id', isAuthenticated, (req, res) => {
  let id = req.params.id;

  return Contact.where({ id: id })
    .fetch({
      columns: ['name', 'address', 'mobile', 'work', 'home', 'email', 'twitter', 'instagram', 'github']
    })
    .then(contact => {
      res.json(contact);
    })
    .catch(err => {
      res.json(err);
    })
});

router.put('/:id', isAuthenticated, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  return Contact.where({ id: id })
    .fetch({
      columns: ['name', 'address', 'mobile', 'work', 'home', 'email', 'twitter', 'instagram', 'github']
    })
    .save({
      user_id: req.user.id,
      name: body.name,
      address: body.address,
      mobile: body.mobile,
      work: body.work,
      home: body.home,
      email: body.email,
      twitter: body.twitter,
      instagram: body.instagram,
      github: body.github
    }, { patch: true })
    .then(contact => {
      res.json('Successfully edited');
    })
    .catch(err => {
      res.json(err);
    })
});

router.delete('/:id', isAuthenticated, (req, res) => {
  let id = req.params.id;

  return new Contact({ id: id })
    .fetch({ createdby: id })
    .destroy()
    .then(() => {
      res.json('Successfully deleted')
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

module.exports = router;