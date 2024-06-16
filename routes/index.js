var express = require('express');
var router = express.Router();

var saveformData = require('formData/postFormData');
var getFormData = require('formData/getFormData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/formData/saveFormData',saveformData);
router.get('/formData/getFormData',getFormData);

module.exports = router;
