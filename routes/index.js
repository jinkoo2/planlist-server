var express = require('express');
var router = express.Router();
var Pt = require('../models/pt');

/* GET home page. */
router.get('/', function(req, res, next) {

  var pt = new Pt({Id:"abc"})
  pt.save()
  console.log('------- saved a test pt -------------')

  // console.log('Hello from Index.JS!!!')
  res.render('index', { title: 'Express' });
});

module.exports = router;
