var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/admin', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'admin.html'));
});

/*

/!* GET home page. *!/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/



module.exports = router;
