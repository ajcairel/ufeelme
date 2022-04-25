const Playlist = require('../models/playlist');

module.exports = {
    create
}

function create(req, res) {
    Playlist.findById(req.params.id, function(err, playlist) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvata = req.user.avatar;
        playlist.reviews.push(req.body);
        // Save the updated playlist
        playlist.save(function(err) {
            res.redirect(`/playlists/${req.params.id}`);
        })
        
    })
}