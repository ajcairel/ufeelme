const Playlist = require('../models/playlist');

module.exports = {
    create,
    delete: deleteReview
}

function deleteReview(req, res, next) {
    Playlist.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id}).then(function(playlist) {
        // handle rougue user
        if (!playlist) return res.redirect('/playlists');
        // Remove the review using the remove method available on arrays in Mongoose
        playlist.reviews.remove(req.params.id);
        // Save the updated playlist (review removed)
        playlist.save().then(function() {
            // Redirect back to the playlist's show view
            res.redirect(`/playlists/${playlist._id}`);
        }).catch(function(err) {
            // Let express display an error
            return next(err);
        });
    });
}

function create(req, res) {
    Playlist.findById(req.params.id, function(err, playlist) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        // let data = req.body;
        playlist.reviews.push(req.body);
        // console.log(data);
        // Save the updated playlist
        playlist.save(function(err) {
            if (err) {
                console.log("ERROR NO REVIEW");
            }
            console.log("Review SENt");
            res.redirect(`/playlists/${req.params.id}`);
        });
    });
}