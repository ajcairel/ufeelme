var express = require('express');
var router = express.Router();
const playlistsCtrl = require('../controllers/playlists');
const isLoggedIn = require('../config/auth');

// all routes start with: /playlists (because of the mounting in server.js)

router.get('/', playlistsCtrl.index);
router.get('/new', isLoggedIn, playlistsCtrl.new);
router.post('/', isLoggedIn, playlistsCtrl.create);
router.get('/:id', playlistsCtrl.show);
router.delete('/:id', playlistsCtrl.delete);


module.exports = router;