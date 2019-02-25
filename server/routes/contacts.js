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

  return Contact.fetchAll({ created_by: userId })
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/search/:term', isAuthenticated, (req, res) => {
  let userId = req.user.id;
  let term = `%${req.params.term}`

  return Contact.query((search) => {
    search.where('created_by', userId)
      .andWhere(() => {
        search.whereRaw('LOWER(name) LIKE ?', term.toLowerCase() + '%')
          .orWhereRaw('LOWER(address) LIKE ?', term.toLowerCase() + '%')
          .orWhereRaw('LOWER(mobile) LIKE ?', term.toLowerCase() + '%')
          .orWhereRaw('LOWER(work) LIKE ?', term.toLowerCase() + '%')
          .orWhereRaw('LOWER(email) LIKE ?', term.toLowerCase() + '%')
          .orWhereRaw('LOWER(twitter) LIKE ?', term.toLowerCase() + '%')
          .orWhereRaw('LOWER(instagram) LIKE ?', term.toLowerCase() + '%')
          .orWhereRaw('LOWER(github) LIKE ?', term.toLowerCase() + '%')
      })
  })
    .fetchAll()
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      res.json(err);
    })
});

router.post('/', isAuthenticated, (req, res) => {
  let userId = req.user.id;
  let body = req.body;

  return Contact
    .forge({
      name: body.name,
      address: body.address,
      mobile: body.mobile,
      work: body.work,
      home: body.home,
      email: body.email,
      twitter: body.twitter,
      instagram: body.instagram,
      github: body.github,
      created_by: body.created_by
    })
    .save()
    .then(contact => {
      res.json({ success: 'true' });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/:id', isAuthenticated, (req, res) => {
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
    .save({
      name: body.name,
      address: body.address,
      mobile: body.mobile,
      work: body.work,
      home: body.home,
      email: body.email,
      twitter: body.twitter,
      instagram: body.instagram,
      github: body.github,
    }, { patch: true })
    .then(contact => {
      res.json({ success: 'true' });
    })
    .catch(err => {
      res.json(err);
    })
});

router.delete('/:id', isAuthenticated, (req, res) => {
  let id = req.params.id;

  return new Contact({ id: id })
    .destroy()
    .then(() => {
      res.json({ success: 'true' })
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

module.exports = router;