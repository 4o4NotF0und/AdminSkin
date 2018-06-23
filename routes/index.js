var express = require('express');
var router = express.Router();

var movies = require('./movies.js');
var casts = require('./casts.js');
var directors = require('./directors.js');
var admin = require('./adminLOginAction.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var type = req.cookies.loginState == 1 ? {page:'index',title:'首页'} : {page:'loginAction',title:'登陆'};
  res.render(type.page,{title:type.title});
});

// router.get('/movies', movies.defaultRoute);
router.get('/movies', function(req, res, next) {
  var type = req.cookies.loginState == 1 ? {page:'movies',title:'电影'} : {page:'loginAction',title:'登陆'};
  res.render(type.page,{title:type.title});
});

router.get('/casts', casts.defaultRoute);

router.get('/castspaging', casts.castspaging);
router.get('/addCastRoute', casts.addCastRoute);
router.post('/addCastsAction', casts.addCastsAction);
router.post('/updataCastsAction', casts.updataCastsAction);



router.get('/directors', directors.defaultRoute);


router.post('/adminLOginAction', admin.adminLOginAction);
router.post('/admin', admin.adminLOginAction);
router.get('/logout', admin.logout);
router.get('/deleteCastRoute', casts.deleteCastRoute);

 

module.exports = router;
