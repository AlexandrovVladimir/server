const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const Notices = require('../models/notices');

/*users*/
router.get('/', function(req, res, next) {
  Users.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});
router.get('/:name/:password', function(req, res, next) {
  Users.find({username: req.params.name, password: req.params.password}, function (err, post) {
    // if (err) return next(err);
    if (post.length) {
      res.json(post);
    } else {
      return next(err);
    }
  });
});
router.post('/', function(req, res) {
  Users.create(req.body, function (err, post) {
    if (err) {
      // res.status(400);
      // res.send('None shall pass');
      res.json(err);
      // return next(err);
      return;
    }
    res.json(post);
  });
});
/*users*/

/*notices*/
router.get('/notices', function(req, res, next) {
  Notices.find(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/notices/:id', function(req, res, next) {
  Notices.find({userId: req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/notices', function(req, res, next) {
  Notices.create(req.body, function (err, post) {
    if (err) return next(err);

    res.json(post);
  });
});
/*notices*/

module.exports = router;