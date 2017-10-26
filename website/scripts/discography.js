// Also take inn array containing song titles.
function addAlbum(title, year, coverName) {
  var albumList = document.getElementById('album-list')

  // Create elements needed for album
  var albumContainer = document.createElement('div');
  var albumTitle = document.createElement('h3');
  var albumContent = document.createElement('div');
  var albumArt = document.createElement('img');
  var albumSongs = document.createElement('div');
  var albumSongList = document.createElement('ol');
  var song1 = document.createElement('li');
  var song2 = document.createElement('li');

  // Add classes to elements
  albumContainer.classList.add('album-container');
  albumTitle.classList.add('album-title');
  albumContent.classList.add('album-content');
  albumArt.classList.add('album-art');
  albumSongs.classList.add('album-songs');

  // Add other attributes to elements
  albumTitle.innerText = title + " (" + year + ")";
  albumArt.src = "../images/albumart/" + coverName + ".png";
  song1.innerText = "Title 1";
  song2.innerText = "Title 2";

  // Put together album elements to one piece
  albumSongList.appendChild(song1);
  albumSongList.appendChild(song2);

  albumContent.appendChild(albumArt);
  albumContent.appendChild(albumSongList);

  albumContainer.appendChild(albumTitle);
  albumContainer.appendChild(albumContent);

  albumList.appendChild(albumContainer);
}
