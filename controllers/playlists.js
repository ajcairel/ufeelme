const Playlist = require("../models/playlist");

module.exports = {
  index,
  show,
  new: newPlaylist,
  create,
  delete: deletePlaylist,
};

function deletePlaylist(req, res) {
  console.log("PLSPLSPSLPSL");
  Playlist.findOneAndDelete(
    { _id: req.params.id, user: req.user._id },
    function (err) {
      if (err) console.log("NOT DELETED");
      res.redirect("/home");
    }
  );
}

async function index(req, res) {
  const query = req.query.filter;
  const playlists = await Playlist.find({});
  if (query === "Spotify") {
    title = "Spotify Playlists";
    stream = "Spotify";
  } else if (query === "Apple") {
    title = "Apple Music Playlists";
    stream = "Apple Music";
  } else if (query === "Sound") {
    title = "Soundcloud Playlists";
    stream = "Soundcloud";
  }

  res.render("playlists/index", { title: title, stream, query, playlists });
}



function show(req, res) {
  let hasComment = false;
  Playlist.findById(req.params.id, function (err, playlist) {
    res.render("playlists/show", {
      title: playlist.name,
      playlist,
      hasComment,
    });
  });
}

function newPlaylist(req, res) {
  const service = req.query.filter;
  res.render("playlists/new", { title: `Add Playlist`, service });
}

function create(req, res) {
  var playlist = new Playlist(req.body);
  playlist.user = req.user.id;
  playlist.save(function (err) {
    if (err) return console.log("Error");
    res.redirect(`/playlists/${playlist.id}`);
  });
}
