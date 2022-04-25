const express = require('express');
const router = express.Router();

const reviewsCrtl = require('../controllers/reviews');

router.post('/playlists/:id/reviews', reviewsCrtl.create);
