var albums = [
  {
    title: "The Best Album Sunset",
    year: "2017",
    coverArtName: "sunsetalbum.png",
    songs: [
      "Hello World", "Songs are the best", "The best I'm telling you", "THE BEST",
    ]
  },

  {
    title: "To cool for you",
    year: "2016",
    coverArtName: "themaninthewindowalbum.png",
    songs: [
      "Hello World2", "Songs are the best2", "The best I'm telling you2", "THE BEST2",
    ]
  },

  {
    title: "Love PizZA YA",
    year: "2015",
    coverArtName: "thetapealbum.png",
    songs: [
      "Hello World3", "Songs are the best3", "The best I'm telling you3", "THE BEST3", "Baby baby",
    ]
  },
]


// Also take inn array containing song titles.
function addAlbum(album) {
  var albumList = document.getElementById('album-list');

  console.log(album.title, typeof(album.title));
  console.log(album.songs)

  // Create elements needed for album
  var albumContainer = document.createElement('div');
  var albumTitle = document.createElement('h3');
  var albumContent = document.createElement('div');
  var albumArt = document.createElement('img');
  var albumSongs = document.createElement('div');
  var albumSongList = document.createElement('ol');

  console.log("Same as above", album.title)

  album.songs.map(function(song) {
    var albumSongTitle = document.createElement('li');
    albumSongTitle.innerText = song;
    albumSongList.appendChild(albumSongTitle);
  });

  // Add classes to elements
  albumContainer.classList.add('album-container');
  albumTitle.classList.add('album-title');
  albumContent.classList.add('album-content');
  albumArt.classList.add('album-art');
  albumSongList.classList.add('album-songs');

  // Add other attributes to elements
  albumTitle.innerText = album.title + " (" + album.year + ")";
  albumArt.src = "images/albumart/" + album.coverArtName;

  // Put together album elements to one piece
  albumContent.appendChild(albumArt);
  albumContent.appendChild(albumSongList);

  albumContainer.appendChild(albumTitle);
  albumContainer.appendChild(albumContent);

  albumList.appendChild(albumContainer);
}


function addAlbums() {
  albums.map(function(album) {
    addAlbum(album);
  });
}
