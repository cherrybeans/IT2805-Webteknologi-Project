var albums = [
  {
    title: "Sunset",
    year: "2017",
    coverArtName: "sunsetalbum.png",
    songs: [
      "Waiting For You", "Dawn", "Don't Snooze", "Bridge Over Wild Waters", "Look Andy, This Is My Towel", "The Towel Is Where Your Heart", "Straight Outta Jupiter",
    ]
  },

  {
    title: "The man in the window",
    year: "2016",
    coverArtName: "themaninthewindowalbum.png",
    songs: [
      "He Knows I'm A Solider", "Storm For The Road", "Give Me Your Spoons", "Every Fairy You Take", "Give Me Your Pants", "Independent Towel", "Stairway To Window"
    ]
  },

  {
    title: "The tape",
    year: "2015",
    coverArtName: "thetapealbum.png",
    songs: [
      "Hello World", "Forgetting Opportunity", "The Best, I'm Telling You", "Raging Liberty", "Explosive Safari", "Smells Like Lonely Apple",
    ]
  },
]


// Also take inn array containing song titles.
function addAlbum(album) {
  var albumList = document.getElementById('album-list');

  // Create elements needed for album
  var albumContainer = document.createElement('div');
  var albumTitle = document.createElement('h3');
  var albumContent = document.createElement('div');
  var albumArt = document.createElement('img');
  var albumSongs = document.createElement('div');
  var albumSongList = document.createElement('ol');

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
