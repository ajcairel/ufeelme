const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    streamingService: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        // This will make sure it is a url
        match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)'/
    }
});

module.exports = mongoose.model('Playlist', playlistSchema);