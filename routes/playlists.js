var express = require('express');
var router = express.Router();
const playlistsCtrl = require('../controllers/playlists');

// all routes start with: /playlists (because of the mounting in server.js)

router.get('/', playlistsCtrl.index);


module.exports = router;