/*global module, require */
'use strict';

var router = require('express').Router();

router.get('/poppy-cock', function (req, res) {
  res.render('page', {
    name: 'Poppy Cock',
    next : {
      link: 'balderdash',
      name: 'Balderdash'
    }
  });
});

router.get('/balderdash', function (req, res) {
  res.render('page', {
    name: 'Balderdash'
  });
});

module.exports = router;