const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/home');


router.get('/', homeCtrl.index);
// router.get('/', function(req, res) {
//     res.render('/', { title: 'Home' });
//   });

module.exports = router;