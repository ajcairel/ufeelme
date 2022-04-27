const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    content: {
        type: String,
        match: /.{5,}/
    },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

const playlistSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    streamingService: {
        type: String,
        // required: true
    },
    link: {
        type: String,
        required: true,
        // match: /<iframe(.+)<\/iframe>/,
    },
      
        // This will make sure it is a url
    user :{type: Schema.Types.ObjectId, ref: 'User', required: true},
    reviews: [reviewSchema]
});



module.exports = mongoose.model('Playlist', playlistSchema);